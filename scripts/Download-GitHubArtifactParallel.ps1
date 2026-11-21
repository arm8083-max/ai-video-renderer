param(
    [Parameter(Mandatory = $true)]
    [string]$Repository,

    [Parameter(Mandatory = $true)]
    [long]$ArtifactId,

    [Parameter(Mandatory = $true)]
    [long]$ArtifactSize,

    [Parameter(Mandatory = $true)]
    [string]$Destination,

    [ValidateRange(1, 16)]
    [int]$Connections = 8
)

$ErrorActionPreference = "Stop"
$gh = "C:\Program Files\GitHub CLI\gh.exe"
$api = "https://api.github.com/repos/$Repository/actions/artifacts/$ArtifactId/zip"
$token = & $gh auth token

$handler = [System.Net.Http.HttpClientHandler]::new()
$handler.AllowAutoRedirect = $false
$client = [System.Net.Http.HttpClient]::new($handler)
$request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Get, $api)
$request.Headers.Authorization = [System.Net.Http.Headers.AuthenticationHeaderValue]::new("Bearer", $token)
$request.Headers.UserAgent.ParseAdd("ai-video-renderer-downloader")
$response = $client.Send($request, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead)

if ($response.StatusCode -notin 302, 303, 307, 308) {
    throw "Unexpected GitHub response: $($response.StatusCode)"
}

$signedUrl = $response.Headers.Location.AbsoluteUri
$response.Dispose()
$client.Dispose()
$handler.Dispose()
$token = $null

New-Item -ItemType Directory -Path $Destination -Force | Out-Null
$destinationRoot = (Resolve-Path $Destination).Path
$temporaryDirectory = Join-Path $destinationRoot ".download"
New-Item -ItemType Directory -Path $temporaryDirectory -Force | Out-Null
$chunkSize = [long][math]::Ceiling($ArtifactSize / $Connections)

0..($Connections - 1) | ForEach-Object -Parallel {
    $index = $_
    $start = [long]($index * $using:chunkSize)
    $end = [long][math]::Min($using:ArtifactSize - 1, $start + $using:chunkSize - 1)
    $partPath = Join-Path $using:temporaryDirectory ("part-{0:00}.bin" -f $index)

    $partHandler = [System.Net.Http.HttpClientHandler]::new()
    $partClient = [System.Net.Http.HttpClient]::new($partHandler)
    $partRequest = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Get, $using:signedUrl)
    $partRequest.Headers.Range = [System.Net.Http.Headers.RangeHeaderValue]::new($start, $end)
    $partResponse = $partClient.Send($partRequest, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead)

    if (-not $partResponse.IsSuccessStatusCode) {
        throw "Part $index failed: $($partResponse.StatusCode)"
    }

    $inputStream = $partResponse.Content.ReadAsStream()
    $outputStream = [System.IO.File]::Create($partPath)
    $inputStream.CopyTo($outputStream)
    $outputStream.Dispose()
    $inputStream.Dispose()
    $partResponse.Dispose()
    $partClient.Dispose()
    $partHandler.Dispose()

    [pscustomobject]@{
        Part = $index
        MB = [math]::Round((Get-Item -LiteralPath $partPath).Length / 1MB, 1)
    }
} -ThrottleLimit $Connections | Sort-Object Part | Format-Table -AutoSize

$zipPath = Join-Path $temporaryDirectory "artifact.zip"
$zipStream = [System.IO.File]::Create($zipPath)
Get-ChildItem -LiteralPath $temporaryDirectory -Filter "part-*.bin" |
    Sort-Object Name |
    ForEach-Object {
        $partStream = [System.IO.File]::OpenRead($_.FullName)
        $partStream.CopyTo($zipStream)
        $partStream.Dispose()
    }
$zipStream.Dispose()

if ((Get-Item -LiteralPath $zipPath).Length -ne $ArtifactSize) {
    throw "Assembled artifact size mismatch"
}

Expand-Archive -LiteralPath $zipPath -DestinationPath $destinationRoot -Force
Get-ChildItem -LiteralPath $destinationRoot -File | Select-Object Name, Length, LastWriteTime

