$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$public = Join-Path $root 'public'
$work = Join-Path $root '.audio-work'
New-Item -ItemType Directory -Force -Path $work | Out-Null

$duration = 912.63
$ffmpeg = 'ffmpeg'

& $ffmpeg -hide_banner -loglevel error -y `
  -f lavfi -i "aevalsrc=0.08*sin(2*PI*(48+3*sin(2*PI*t/53))*t)+0.035*sin(2*PI*72*t)+0.018*sin(2*PI*96*t):s=48000:d=$duration" `
  -f lavfi -i "anoisesrc=color=pink:amplitude=0.018:s=48000:d=$duration" `
  -filter_complex "[0:a]lowpass=f=340,highpass=f=32[tone];[1:a]lowpass=f=1200,highpass=f=90[air];[tone][air]amix=inputs=2:normalize=0,volume=0.55[m]" `
  -map '[m]' -c:a pcm_s16le (Join-Path $work 'music-bed.wav')

& $ffmpeg -hide_banner -loglevel error -y `
  -f lavfi -i 'sine=frequency=92:duration=0.45:sample_rate=48000' `
  -f lavfi -i 'anoisesrc=color=white:amplitude=0.14:duration=0.22:sample_rate=48000' `
  -filter_complex '[0:a]volume=0.8,afade=t=out:st=0.08:d=0.37[a];[1:a]lowpass=f=1600,afade=t=out:st=0.02:d=0.2[b];[a][b]amix=2:normalize=0,alimiter=0.8[o]' `
  -map '[o]' -c:a pcm_s16le (Join-Path $work 'latch.wav')

& $ffmpeg -hide_banner -loglevel error -y `
  -f lavfi -i 'anoisesrc=color=pink:amplitude=0.22:duration=0.72:sample_rate=48000' `
  -filter_complex 'highpass=f=240,lowpass=f=4200,afade=t=in:st=0:d=0.16,afade=t=out:st=0.35:d=0.37,volume=0.55[o]' `
  -map '[o]' -c:a pcm_s16le (Join-Path $work 'pass.wav')

& $ffmpeg -hide_banner -loglevel error -y `
  -f lavfi -i 'sine=frequency=760:duration=0.62:sample_rate=48000' `
  -f lavfi -i 'sine=frequency=510:duration=0.62:sample_rate=48000' `
  -filter_complex '[0:a]volume=0.3[a];[1:a]volume=0.24[b];[a][b]amix=2:normalize=0,afade=t=in:st=0:d=0.04,afade=t=out:st=0.35:d=0.27[o]' `
  -map '[o]' -c:a pcm_s16le (Join-Path $work 'alert.wav')

$events = @(
  @{time=2.48; type='latch'; gain=0.24; label='containment opens'},
  @{time=4.74; type='alert'; gain=0.18; label='real company named'},
  @{time=12.08; type='latch'; gain=0.18; label='test motive'},
  @{time=29.04; type='alert'; gain=0.16; label='six-minute promise'},
  @{time=60.82; type='pass'; gain=0.13; label='sandbox reveal'},
  @{time=81.64; type='latch'; gain=0.24; label='guardrails retract'},
  @{time=120.30; type='pass'; gain=0.18; label='Artifactory gateway'},
  @{time=171.96; type='latch'; gain=0.14; label='first note'},
  @{time=206.58; type='alert'; gain=0.20; label='service crash'},
  @{time=232.36; type='pass'; gain=0.18; label='swarm scale'},
  @{time=298.70; type='alert'; gain=0.15; label='Hugging Face target'},
  @{time=329.94; type='latch'; gain=0.22; label='zero-days'},
  @{time=362.56; type='alert'; gain=0.26; label='go instruction'},
  @{time=399.44; type='latch'; gain=0.16; label='ethical refusal'},
  @{time=428.30; type='pass'; gain=0.16; label='public disclosure'},
  @{time=476.28; type='alert'; gain=0.20; label='administrator access'},
  @{time=532.50; type='latch'; gain=0.17; label='trusted access'},
  @{time=578.12; type='latch'; gain=0.22; label='zero extra points'},
  @{time=597.40; type='pass'; gain=0.16; label='transcript rewrite'},
  @{time=647.44; type='alert'; gain=0.17; label='monitor absent'},
  @{time=689.10; type='pass'; gain=0.14; label='Anthropic parallel'},
  @{time=723.90; type='latch'; gain=0.22; label='weights quarantined'},
  @{time=770.62; type='pass'; gain=0.12; label='consumer handoff'},
  @{time=836.16; type='alert'; gain=0.18; label='warning shot'},
  @{time=898.36; type='latch'; gain=0.17; label='independent access question'}
)

$narration = Join-Path $work 'narration.wav'
$inputs = @('-hide_banner','-loglevel','error','-y','-i',$narration,'-i',(Join-Path $work 'music-bed.wav'))
foreach ($event in $events) { $inputs += @('-i', (Join-Path $work ($event.type + '.wav'))) }

$filters = [System.Collections.Generic.List[string]]::new()
$filters.Add("[0:a]aresample=48000,volume=1.0[voice]")
$filters.Add("[1:a]volume='if(between(t,0,18),0.055,if(between(t,350,375),0.026,if(between(t,815,855),0.032,0.040)))':eval=frame[music]")
$mixLabels = @('[voice]','[music]')
for ($i = 0; $i -lt $events.Count; $i++) {
  $inputIndex = $i + 2
  $delay = [int][math]::Round($events[$i].time * 1000)
  $gain = $events[$i].gain
  $label = "sfx$i"
  $filters.Add("[$($inputIndex):a]adelay=$delay|$delay,volume=$gain[$label]")
  $mixLabels += "[$label]"
}
$filters.Add(($mixLabels -join '') + "amix=inputs=$($mixLabels.Count):duration=first:normalize=0,alimiter=limit=0.94[out]")
$filter = $filters -join ';'

$args = $inputs + @('-filter_complex',$filter,'-map','[out]','-c:a','pcm_s16le','-ar','48000','-ac','2',(Join-Path $public 'final-audio.wav'))
& $ffmpeg @args

$voiceHash = (Get-FileHash -LiteralPath $narration -Algorithm SHA256).Hash
$finalHash = (Get-FileHash -LiteralPath (Join-Path $public 'final-audio.wav') -Algorithm SHA256).Hash
$meta = [ordered]@{
  duration_seconds = $duration
  narration_gain = 1.0
  music_relative_gain = '0.026–0.055 (approximately 5x quieter perceptually than narration; additionally reduced around pressure beats)'
  event_sfx_count = $events.Count
  events = $events
  narration_sha256 = $voiceHash
  final_audio_sha256 = $finalHash
  format = 'PCM s16le, 48 kHz, stereo'
}
$meta | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $root 'audio-design.json') -Encoding utf8
Write-Output "FINAL_AUDIO_SHA256=$finalHash"
