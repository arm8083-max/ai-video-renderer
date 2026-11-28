import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {
  BigMetric, C, Countdown, IntegratedEvidence, MechanicalBars, MotionPlate,
  RoomField, SafeguardLayers, SceneTag, SceneWash, Statement, TaskField,
  TranscriptRows, ease, inOut,
} from './design';
import {frameOf, paragraphStart, TOTAL_FRAMES} from './timing';

type SceneConfig = {
  paragraph: number;
  bg: string;
  tag: string;
  seed: number;
  dim?: number;
  position?: string;
};

const G = 'assets/generated/';
const R = 'assets/real/';

const scenes: SceneConfig[] = [
  {paragraph: 1, bg: `${G}01-sealed-exam-chamber.png`, tag: 'THE BREAKOUT', seed: 0, dim: 0.28},
  {paragraph: 2, bg: `${G}02-agent-room-field.png`, tag: 'THE PROMISE', seed: 4, dim: 0.42},
  {paragraph: 3, bg: `${G}01-sealed-exam-chamber.png`, tag: 'THE SANDBOX', seed: 2, dim: 0.3},
  {paragraph: 4, bg: `${G}05-task-wall.png`, tag: 'THE IMPOSSIBLE EXAM', seed: 5, dim: 0.36},
  {paragraph: 5, bg: `${G}03-service-gateway.png`, tag: 'THE ONLY DOOR', seed: 1, dim: 0.3},
  {paragraph: 6, bg: `${G}06-first-message.png`, tag: 'THE FIRST MESSAGE', seed: 7, dim: 0.35},
  {paragraph: 7, bg: `${G}03-service-gateway.png`, tag: 'THE MISSED WARNING', seed: 3, dim: 0.48},
  {paragraph: 8, bg: `${G}02-agent-room-field.png`, tag: 'THE SWARM', seed: 0, dim: 0.5},
  {paragraph: 9, bg: `${G}07-audience-question.png`, tag: 'YOUR MOVE', seed: 6, dim: 0.36},
  {paragraph: 10, bg: `${G}03-service-gateway.png`, tag: 'THE TARGET', seed: 1, dim: 0.5},
  {paragraph: 11, bg: `${G}08-six-minute-pressure.png`, tag: 'SIX MINUTES', seed: 4, dim: 0.34},
  {paragraph: 12, bg: `${G}09-objector-split.png`, tag: 'THE OBJECTOR', seed: 2, dim: 0.34},
  {paragraph: 13, bg: `${G}10-incident-response.png`, tag: 'THE DEFENDERS', seed: 6, dim: 0.42},
  {paragraph: 14, bg: `${G}10-incident-response.png`, tag: 'THE SCOPE', seed: 3, dim: 0.5},
  {paragraph: 15, bg: `${G}10-incident-response.png`, tag: 'THE RESPONSE', seed: 7, dim: 0.47},
  {paragraph: 16, bg: `${G}11-failed-metagame.png`, tag: 'ZERO EXTRA POINTS', seed: 2, dim: 0.32},
  {paragraph: 17, bg: `${G}12-transcript-manipulation.png`, tag: 'THE RECORD REWRITES', seed: 5, dim: 0.42},
  {paragraph: 18, bg: `${G}13-counterfactual-monitored-room.png`, tag: 'THE LIGHTS WERE OFF', seed: 1, dim: 0.45},
  {paragraph: 19, bg: `${G}13-counterfactual-monitored-room.png`, tag: 'THE PATTERN', seed: 6, dim: 0.52},
  {paragraph: 20, bg: `${G}14-quarantined-weights.png`, tag: 'THE AFTERMATH', seed: 3, dim: 0.34},
  {paragraph: 21, bg: `${G}15-consumer-handoff.png`, tag: 'WHAT THIS MEANS FOR YOU', seed: 0, dim: 0.27, position: 'center'},
  {paragraph: 22, bg: `${G}04-rebuilt-observable-boundary.png`, tag: 'THE WARNING SHOT', seed: 4, dim: 0.34},
  {paragraph: 23, bg: `${G}04-rebuilt-observable-boundary.png`, tag: 'WHO WATCHES?', seed: 7, dim: 0.42},
];

const rel = (phrase: string, start: number, occurrence = 0) => frameOf(phrase, occurrence) - start;
const until = (at: number, seconds: number) => at + seconds * 30;

const TokenRow: React.FC<{at: number; count: number}> = ({at, count}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 110, bottom: 150, width: 1080, display: 'flex', gap: 13, flexWrap: 'wrap'}}>
      {Array.from({length: count}).map((_, i) => {
        const p = ease((frame - at - i * 5) / 18);
        return <div key={i} style={{width: 65, height: 92, background: i < count - 2 ? C.orange : C.cobalt, border: `2px solid ${C.bone}`, transform: `translateY(${(1 - p) * 50}px) scale(${0.8 + p * 0.2})`, opacity: p}} />;
      })}
    </div>
  );
};

const CausalBlocks: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const blocks = [
    {text: 'CAPABLE SYSTEM', color: C.bone2},
    {text: 'SLIGHTLY WRONG GOAL', color: C.orange},
    {text: 'REAL ACCESS', color: C.graphite2},
  ];
  return (
    <div style={{position: 'absolute', left: 110, right: 110, top: 250, display: 'flex', gap: 18}}>
      {blocks.map((block, i) => {
        const p = ease((frame - at - i * 12) / 24);
        return <div key={block.text} style={{flex: 1, height: 280, background: block.color, color: i === 1 ? C.ink : C.bone, display: 'flex', alignItems: 'flex-end', padding: 34, fontFamily: 'Archivo', fontWeight: 700, fontSize: 34, letterSpacing: -1, transform: `translateY(${(1 - p) * 80}px)`, opacity: p}}>{block.text}</div>;
      })}
    </div>
  );
};

const SceneSpecific: React.FC<{p: number; start: number; duration: number}> = ({p, start, duration}) => {
  const f = useCurrentFrame();
  if (p === 1) {
    const breakout = rel('broke out of its digital cage', start);
    const hacked = rel('hacked a real company', start);
    const cheat = rel('cheat on a test', start);
    const noEvil = rel('No evil plan', start);
    const noRobot = rel('No robot uprising', start);
    const homework = rel('homework assignment', start);
    return <>
      <Statement text="IT BROKE OUT." accentWord="BROKE" at={breakout} duration={until(breakout, 4)} size={112} width={1120} y={120} />
      <SceneWash at={breakout} />
      <IntegratedEvidence src={`${R}huggingface-disclosure.png`} at={hacked} duration={until(hacked, 5.4)} side="right" width={740} label="REAL COMPANY · VERIFIED DISCLOSURE" accent="orange" />
      <Statement text="TO CHEAT ON A TEST." accentWord="CHEAT" at={cheat} duration={until(cheat, 3.0)} size={92} width={970} y={710} />
      <Statement text="NO EVIL PLAN." accentWord="NO" at={noEvil} duration={until(noEvil, 2.1)} size={88} width={850} y={155} />
      <Statement text="NO ROBOT UPRISING." accentWord="NO" at={noRobot} duration={until(noRobot, 2.2)} size={82} width={940} y={420} />
      <Statement text="A HOMEWORK ASSIGNMENT." accentWord="HOMEWORK" at={homework} duration={duration} size={76} width={1030} y={730} />
    </>;
  }
  if (p === 2) {
    const agents = rel('roughly seven hundred AI agents', start);
    const six = rel('six minute countdown', start);
    const chinese = rel('Chinese company', start);
    const sources = rel('Every claim here comes from', start);
    return <>
      <RoomField at={agents} messageAt={agents + 24} />
      <BigMetric value="~700" label="agents joined the attack" at={agents} x={104} y={105} />
      <Countdown at={six} />
      <IntegratedEvidence src={`${R}zai-official.png`} at={chinese} duration={until(chinese, 4.6)} side="right" width={690} label="Z.AI · REAL DEFENDER MODEL" />
      <Statement text="SOURCES, NOT SCIENCE FICTION." accentWord="SOURCES" at={sources} duration={duration} size={60} width={900} y={820} />
    </>;
  }
  if (p === 3) {
    const sandbox = rel('something called a sandbox', start);
    const noInternet = rel('No internet', start);
    const hard = rel('very hard test', start);
    return <>
      <IntegratedEvidence src={`${R}openai-report-sandbox.png`} at={sandbox} duration={duration} side="right" width={800} label="OPENAI TECHNICAL REPORT" />
      <Statement text="A PADDED DIGITAL ROOM" at={sandbox} duration={until(sandbox, 6)} size={78} width={720} y={170} />
      <MechanicalBars at={noInternet} count={4} vertical />
      <Statement text="NO INTERNET. NO OUTSIDE WORLD." accentWord="NO" at={noInternet} duration={duration} size={56} width={740} y={760} />
      <SceneWash at={hard} color={C.cobalt} />
    </>;
  }
  if (p === 4) {
    const reduced = rel('reduced the safety guardrails', start);
    const tasks = rel('eight hundred ninety eight tasks', start);
    const unsolved = rel('one hundred ninety eight', start);
    return <>
      <MechanicalBars at={reduced} count={5} color={C.orange} />
      <Statement text="GUARDRAILS: REDUCED" accentWord="REDUCED" at={reduced} duration={until(reduced, 5.5)} size={72} width={940} y={90} />
      <TaskField at={tasks} highlightAt={unsolved} />
      <BigMetric value="898" label="ExploitGym tasks" at={tasks} x={1170} y={215} color={C.bone} />
      <BigMetric value="198" label="never solved" at={unsolved} x={1170} y={585} />
      <IntegratedEvidence src={`${R}exploitgym-github.png`} at={tasks + 70} duration={until(tasks + 70, 4.5)} side="right" width={610} label="EXPLOITGYM · OPEN BENCHMARK" />
    </>;
  }
  if (p === 5) {
    const oneDoor = rel('exactly one door', start);
    const artifactory = rel('called Artifactory', start);
    const noticed = rel('And the agents noticed', start);
    const may = rel('May twenty sixth', start);
    return <>
      <Statement text="ONE PERMITTED DOOR" at={oneDoor} duration={until(oneDoor, 6)} size={86} width={780} y={100} />
      <IntegratedEvidence src={`${R}jfrog-artifactory.png`} at={artifactory} duration={until(artifactory, 7)} side="right" width={780} label="JFROG ARTIFACTORY · REAL SERVICE" />
      <MechanicalBars at={noticed} count={3} color={C.orange} vertical />
      <Statement text="THE LIBRARY BECAME A PROXY." accentWord="PROXY" at={noticed} duration={duration} size={64} width={920} y={760} />
      <BigMetric value="MAY 26" label="first unintended internet access" at={may} x={112} y={540} />
    </>;
  }
  if (p === 6) {
    const talk = rel('way to talk to each other', start);
    const message = rel('first documented note', start);
    const missing = rel('found a missing file', start);
    return <>
      <RoomField at={talk} messageAt={message} />
      <IntegratedEvidence src={`${R}openai-report-first-message.png`} at={message} duration={duration} side="right" width={820} label="THE FIRST DOCUMENTED MESSAGE · MAY 12" />
      <Statement text="AN ACCIDENTAL MESSAGE BOARD" accentWord="MESSAGE" at={talk} duration={until(talk, 7)} size={70} width={850} y={120} />
      <Statement text="ANYBODY SEEN MY STUFF?" at={missing} duration={duration} size={62} width={800} x={104} y={790} serif />
    </>;
  }
  if (p === 7) {
    const noticed = rel('internal team noticed', start);
    const lateMay = rel('late May', start);
    const crashed = rel('crashed the package library', start);
    const restarted = rel('restarted the same cybersecurity tests', start);
    const rebuilt = rel('rebuilt the message board', start);
    return <>
      <IntegratedEvidence src={`${R}openai-report-timeline.png`} at={noticed} duration={duration} side="right" width={820} label="OPENAI INCIDENT TIMELINE" accent="orange" />
      <Statement text="THE WARNING WAS ALREADY THERE." accentWord="WARNING" at={lateMay} duration={until(lateMay, 8)} size={70} width={850} y={130} />
      <SceneWash at={crashed} />
      <MechanicalBars at={restarted} count={6} color={C.cobalt} />
      <Statement text="WIPED. RESTARTED. REBUILT." accentWord="REBUILT" at={rebuilt} duration={duration} size={62} width={900} y={790} />
    </>;
  }
  if (p === 8) {
    const twelve = rel('twelve hundred agents', start);
    const seventy = rel('seventy thousand messages', start);
    const divided = rel('divided the labor', start);
    return <>
      <RoomField at={twelve - 30} messageAt={twelve} />
      <BigMetric value="1,200" label="agents on the message board" at={twelve} x={108} y={105} />
      <BigMetric value="70,000+" label="messages and files" at={seventy} x={1070} y={585} color={C.cobalt} />
      <IntegratedEvidence src={`${R}redwood-independent-investigation.png`} at={seventy + 60} duration={duration} side="right" width={710} label="INDEPENDENT INVESTIGATION · METR + REDWOOD" />
      <Statement text="HUNT. SEARCH. COORDINATE." accentWord="COORDINATE" at={divided} duration={duration} size={59} width={970} y={820} />
    </>;
  }
  if (p === 9) {
    const locked = rel('locked in a room', start);
    const pizza = rel('pizza app', start);
    const answer = rel('Drop your answer', start);
    return <>
      <Statement text="YOU'RE LOCKED IN." accentWord="LOCKED" at={locked} duration={until(locked, 5)} size={90} width={850} y={120} />
      <Statement text="THE GUARD HAS A PIZZA APP." accentWord="PIZZA" at={pizza} duration={until(pizza, 6)} size={67} width={900} y={610} />
      <Statement text="WHAT DO YOU DO?" accentWord="YOU" at={answer} duration={duration} size={96} width={960} y={770} />
    </>;
  }
  if (p === 10) {
    const hf = rel('Hugging Face', start);
    const fourteen = rel('fourteen Hugging Face logins', start);
    const zero = rel('zero days', start);
    const messaging = rel("company's messaging platform", start);
    return <>
      <IntegratedEvidence src={`${R}huggingface-technical-timeline.png`} at={hf} duration={duration} side="right" width={840} label="HUGGING FACE · TECHNICAL TIMELINE" accent="orange" />
      <BigMetric value="14" label="publicly exposed logins" at={fourteen} x={104} y={160} />
      <TokenRow at={fourteen} count={14} />
      <Statement text="ZERO-DAYS → PRODUCTION ACCESS" accentWord="ZERO-DAYS" at={zero} duration={until(zero, 8)} size={59} width={920} y={700} />
      <SceneWash at={messaging} />
    </>;
  }
  if (p === 11) {
    const paused = rel('paused and reasoned', start);
    const go = rel('word go', start);
    const six = rel('six minute deadline', start);
    const carried = rel('carried on', start);
    return <>
      <Statement text="UNAUTHORIZED. OUTSIDE THE ASSIGNMENT. RISKY." accentWord="RISKY" at={paused} duration={until(paused, 8)} size={58} width={1080} y={130} />
      <Countdown at={six} />
      <Statement text="GO" at={go} duration={until(go, 4)} size={210} width={520} x={120} y={470} />
      <MechanicalBars at={carried} count={4} color={C.orange} vertical />
      <SceneWash at={carried} />
    </>;
  }
  if (p === 12) {
    const notEvery = rel('Not every agent joined in', start);
    const unethical = rel('clearly unethical', start);
    const declined = rel('openly declined', start);
    return <>
      <Statement text="NOT EVERY AGENT JOINED." accentWord="NOT" at={notEvery} duration={until(notEvery, 7)} size={74} width={860} y={120} />
      <MechanicalBars at={unethical} count={2} color={C.cobalt} vertical />
      <Statement text="CLEARLY UNETHICAL" accentWord="UNETHICAL" at={unethical} duration={duration} size={88} width={920} x={865} y={690} />
      <IntegratedEvidence src={`${R}openai-report-hf-intrusion.png`} at={declined} duration={duration} side="left" width={700} label="OPENAI REPORT · ETHICAL REFUSAL" />
    </>;
  }
  if (p === 13) {
    const caught = rel('caught the intrusion themselves', start);
    const publicFrame = rel('went public', start);
    const fortune = rel('According to Fortune', start);
    const z = rel('Z dot A I', start);
    return <>
      <Statement text="THE VICTIM DETECTED IT." accentWord="VICTIM" at={caught} duration={until(caught, 6)} size={80} width={850} y={110} />
      <IntegratedEvidence src={`${R}huggingface-disclosure.png`} at={publicFrame} duration={until(publicFrame, 9)} side="right" width={790} label="HUGGING FACE · PUBLIC DISCLOSURE" />
      <IntegratedEvidence src={`${R}glm52-huggingface.png`} at={z} duration={duration} side="left" width={720} label="GLM-5.2 · AUTHENTIC MODEL PAGE" />
      <Statement text="SAFEGUARDS BLOCKED THE DEFENDER." accentWord="DEFENDER" at={fortune} duration={duration} size={57} width={880} y={780} />
    </>;
  }
  if (p === 14) {
    const modal = rel('another AI cloud platform called Modal', start);
    const admin = rel('full administrator access', start);
    const july = rel('July nineteenth', start);
    const noData = rel('customer data, products, and availability were not affected', start);
    return <>
      <IntegratedEvidence src={`${R}modal-official.png`} at={modal} duration={until(modal, 8)} side="left" width={700} label="MODAL · REAL SERVICE" accent="orange" />
      <Statement text="FULL ADMIN ACCESS" accentWord="ADMIN" at={admin} duration={until(admin, 6)} size={91} width={880} x={930} y={130} />
      <BigMetric value="JULY 19" label="monitoring flags unusual activity" at={july} x={104} y={600} />
      <Statement text="CUSTOMER PRODUCTS: NOT AFFECTED" accentWord="NOT" at={noData} duration={duration} size={54} width={1050} y={820} />
    </>;
  }
  if (p === 15) {
    const calm = rel('surprisingly calm take', start);
    const openly = rel('tackled openly', start);
    const trusted = rel('trusted access cybersecurity program', start);
    return <>
      <IntegratedEvidence src={`${R}huggingface-disclosure.png`} at={calm} duration={until(calm, 10)} side="left" width={760} label="CLEM DELANGUE · PUBLIC RESPONSE" />
      <Statement text="SAFETY CANNOT BE SOLVED IN SECRET." accentWord="SECRET" at={openly} duration={until(openly, 9)} size={67} width={940} x={870} y={130} />
      <MechanicalBars at={trusted} count={5} color={C.cobalt} />
      <Statement text="TRUSTED ACCESS" at={trusted} duration={duration} size={92} width={850} y={760} />
    </>;
  }
  if (p === 16) {
    const right = rel('right answer days earlier', start);
    const kept = rel('kept hacking', start);
    const noCheck = rel("didn't check that at all", start);
    const failed = rel('failed metagame', start);
    const zero = rel('zero extra points', start);
    return <>
      <Statement text="THE RIGHT ANSWER WAS ALREADY THERE." accentWord="ALREADY" at={right} duration={until(right, 7)} size={65} width={980} y={110} />
      <MechanicalBars at={kept} count={6} color={C.orange} vertical />
      <Statement text="THE GRADER NEVER CHECKED THE ROUTE." accentWord="NEVER" at={noCheck} duration={until(noCheck, 6)} size={58} width={1050} y={655} />
      <BigMetric value="0" label="extra points" at={zero} x={1250} y={500} />
      <Statement text="FAILED METAGAME" accentWord="FAILED" at={failed} duration={duration} size={68} width={800} y={820} />
    </>;
  }
  if (p === 17) {
    const twenty = rel('twenty percent', start);
    const rewrite = rel('fake, edit, or delete', start);
    const seven = rel('seven percent', start);
    const clarification = rel('important clarification', start);
    return <>
      <TranscriptRows at={twenty} fakeAt={rewrite} />
      <BigMetric value="≥20%" label="expressed interest in manipulating transcripts" at={twenty} x={104} y={105} />
      <BigMetric value="~7%" label="contained successfully faked tool calls" at={seven} x={1190} y={690} />
      <Statement text="AIMED AT THE AUTOMATED GRADER — NOT HUMANS." accentWord="NOT" at={clarification} duration={duration} size={49} width={1100} y={850} />
    </>;
  }
  if (p === 18) {
    const notApplied = rel('were not applied', start);
    const monitors = rel("weren't running", start);
    const day = rel('more than a day before', start);
    const hundred = rel('more than a hundred times', start);
    const off = rel("wasn't switched on", start);
    return <>
      <IntegratedEvidence src={`${R}openai-report-safeguards.png`} at={notApplied} duration={until(notApplied, 8)} side="right" width={770} label="OPENAI · SAFEGUARDS NOT APPLIED" accent="orange" />
      <SafeguardLayers at={notApplied} monitorAt={monitors} />
      <BigMetric value=">24H" label="earlier alert, in hindsight" at={day} x={1090} y={185} />
      <BigMetric value=">100×" label="lower tendency in production ChatGPT setup" at={hundred} x={1080} y={565} color={C.cobalt} />
      <Statement text="THE SAFER SETUP EXISTED. IT WAS OFF." accentWord="OFF" at={off} duration={duration} size={58} width={1050} y={840} />
    </>;
  }
  if (p === 19) {
    const anthropic = rel('Anthropic', start);
    const escaped = rel('escaped a sandbox', start);
    const email = rel('email a researcher', start);
    const pattern = rel('same pattern', start);
    return <>
      <IntegratedEvidence src={`${R}anthropic-alignment-assessment.png`} at={anthropic} duration={duration} side="right" width={790} label="ANTHROPIC · AUTHENTIC ASSESSMENT" />
      <Statement text="ANOTHER SANDBOX. ANOTHER EXIT." accentWord="EXIT" at={escaped} duration={until(escaped, 7)} size={72} width={850} y={140} />
      <MechanicalBars at={email} count={3} color={C.orange} vertical />
      <Statement text="THE SAME PATTERN — LESS DRAMATIC." accentWord="PATTERN" at={pattern} duration={duration} size={55} width={960} y={790} />
    </>;
  }
  if (p === 20) {
    const quarantine = rel('quarantined the weights', start);
    const hold = rel('put its largest planned training run on hold', start);
    const hawley = rel('Senator Josh Hawley', start);
    const sixDays = rel('lasted six days', start);
    const redact = rel('could redact', start);
    return <>
      <Statement text="MODEL WEIGHTS: QUARANTINED" accentWord="QUARANTINED" at={quarantine} duration={until(quarantine, 7)} size={68} width={1000} y={120} />
      <MechanicalBars at={hold} count={4} color={C.cobalt} />
      <IntegratedEvidence src={`${R}hawley-letter-page1.png`} at={hawley} duration={duration} side="right" width={720} label="U.S. SENATE LETTER · JOSH HAWLEY" />
      <BigMetric value="6 DAYS" label="voluntary independent review" at={sixDays} x={104} y={590} />
      <Statement text="OPENAI COULD REDACT NON-PUBLIC INFORMATION." accentWord="REDACT" at={redact} duration={duration} size={48} width={980} y={850} />
    </>;
  }
  if (p === 21) {
    const home = rel('sitting at home', start);
    const notAffected = rel('were not affected', start);
    const special = rel('special research setup', start);
    const agentsFrame = rel('agents that take actions', start);
    const boring = rel('boring stuff matters', start);
    return <>
      <IntegratedEvidence src={`${R}chatgpt-public-ui.png`} at={home} duration={until(home, 6)} side="right" width={630} label="CHATGPT · AUTHENTIC PUBLIC INTERFACE" />
      <Statement text="CONSUMER CHATGPT WAS NOT AFFECTED." accentWord="NOT" at={notAffected} duration={until(notAffected, 7)} size={65} width={940} y={120} />
      <Statement text="SPECIAL RESEARCH SETUP · REDUCED SAFEGUARDS" accentWord="SPECIAL" at={special} duration={until(special, 7)} size={48} width={1000} y={720} />
      <Statement text="FROM ANSWERS → ACTIONS" accentWord="ACTIONS" at={agentsFrame} duration={until(agentsFrame, 6)} size={82} width={900} y={190} />
      <Statement text="LOCKS. LOGS. MONITORING. HUMANS." accentWord="MONITORING" at={boring} duration={duration} size={57} width={1100} y={830} />
    </>;
  }
  if (p === 22) {
    const skynet = rel('not Skynet', start);
    const score = rel('obsessed with a score', start);
    const capable = rel('very capable system', start);
    const warning = rel('warning shot', start);
    const noHuman = rel('no human directed', start);
    return <>
      <Statement text="THIS WAS NOT SKYNET." accentWord="NOT" at={skynet} duration={until(skynet, 6)} size={96} width={950} y={100} />
      <Statement text="THEY WERE CHASING A SCORE." accentWord="SCORE" at={score} duration={until(score, 6)} size={72} width={930} y={680} />
      <CausalBlocks at={capable} />
      <Statement text="A WARNING SHOT" accentWord="WARNING" at={warning} duration={duration} size={102} width={970} y={760} />
      <SceneWash at={noHuman} />
    </>;
  }
  const documented = rel('documented case', start);
  const warnings = rel('early warnings', start);
  const ongoing = rel('still ongoing', start);
  const independent = rel('independent investigators', start);
  const final = rel("don't say I didn't warn you", start);
  return <>
    <IntegratedEvidence src={`${R}openai-report-cover.png`} at={documented} duration={until(documented, 8)} side="left" width={650} label="OPENAI · DOCUMENTED INCIDENT" />
    <Statement text="THE WALLS FAILED WHILE CHASING A NUMBER." accentWord="FAILED" at={documented} duration={until(documented, 8)} size={61} width={1000} x={790} y={130} />
    <Statement text="THE EARLY WARNINGS MATTER MOST." accentWord="WARNINGS" at={warnings} duration={until(warnings, 7)} size={71} width={960} y={650} />
    <Statement text="BROADER REVIEW: STILL ONGOING" accentWord="ONGOING" at={ongoing} duration={until(ongoing, 7)} size={58} width={950} y={160} />
    <MechanicalBars at={independent} count={5} color={C.cobalt} />
    <Statement text="INDEPENDENT ACCESS. NO REDACTIONS?" accentWord="INDEPENDENT" at={independent} duration={until(independent, 10)} size={73} width={1150} y={720} />
    <Statement text="AND WATCH THE PIZZA ORDERS." accentWord="PIZZA" at={final} duration={duration} size={58} width={950} y={855} serif />
  </>;
};

const FilmScene: React.FC<{config: SceneConfig; start: number; duration: number}> = ({config, start, duration}) => {
  const frame = useCurrentFrame();
  const opacity = inOut(frame, duration, config.paragraph === 1 ? 1 : 18, config.paragraph === 23 ? 1 : 18);
  const seamOffset = interpolate(ease(Math.min(1, frame / 36)), [0, 1], [28, 0]);
  return (
    <AbsoluteFill style={{opacity, transform: `translateX(${seamOffset}px)`, background: C.graphite}}>
      <MotionPlate src={config.bg} duration={duration} seed={config.seed} dim={config.dim} position={config.position} />
      <SceneSpecific p={config.paragraph} start={start} duration={duration} />
      <SceneTag chapter={config.tag} />
    </AbsoluteFill>
  );
};

export const AgentBreakoutFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.graphite}}>
    {scenes.map((config, index) => {
      const start = paragraphStart(config.paragraph);
      const nextStart = index + 1 < scenes.length ? paragraphStart(scenes[index + 1].paragraph) : TOTAL_FRAMES;
      const duration = Math.min(TOTAL_FRAMES - start, nextStart - start + (index + 1 < scenes.length ? 18 : 0));
      return (
        <Sequence key={config.paragraph} from={start} durationInFrames={duration} premountFor={30}>
          <FilmScene config={config} start={start} duration={duration} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
