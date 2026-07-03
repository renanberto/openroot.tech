const bootLines = [
  { text: "booting kernel...", hold: 360 },
  { text: "mounting root filesystem...", hold: 460 },
  { text: "loading tui modules...", hold: 460 },
  { text: "opening /home/visitor...", hold: 540 },
  { text: "welcome to openroot.tech", hold: 620 },
];

const $ = (id) => document.getElementById(id);
const bootText = $("bootText");
const boot = $("boot");
const tui = $("tui");
const nonroot = $("nonroot");
const output = $("output");
const form = $("commandForm");
const input = $("commandInput");
const terminalPanel = document.querySelector(".terminal-panel");
const pathLabel = $("pathLabel");
const treeView = $("treeView");
const contentTitle = $("contentTitle");
const contentCard = $("contentCard");
const clock = $("clock");
const simpleOutput = $("simpleOutput");

const FS = {
  "/home/visitor": {
    type: "dir",
    children: {
      "README.md": { type: "file", title: "Start here", body: "# openroot.tech\n\nThis is a terminal-native portfolio.\n\nUse Linux-style commands to navigate:\n\n- `ls` lists files\n- `cd projects` enters a directory\n- `cat README.md` opens a file\n- `tree` shows the map\n- `nonroot` opens a friendly button-based view\n\nYou are currently inside `/home/visitor`." },
      "about.md": { type: "file", title: "About", body: "# About\n\nRenan Berto\nDevOps Engineer\n\nopenroot.tech is a compact technical identity for cloud engineering, automation, Linux systems, DevOps practices and infrastructure design.\n\nThis website is designed to feel like a system, not a resume." },
      "skills.json": { type: "file", title: "Skills", body: "{\n  \"cloud\": [\"AWS\", \"EKS\", \"Lambda\", \"CloudFront\", \"WAF\", \"IAM\"],\n  \"containers\": [\"Docker\", \"Kubernetes\", \"Helm\"],\n  \"backend\": [\"Python\", \"FastAPI\", \"SQLAlchemy\"],\n  \"observability\": [\"CloudWatch\", \"Grafana\", \"Container Insights\"],\n  \"security\": [\"WAF\", \"bot mitigation\", \"IAM\", \"edge protection\"],\n  \"ai\": [\"LiteLLM\", \"Ollama\", \"OpenAI-ready\", \"Anthropic-ready\"]\n}" },
      "experience.md": { type: "file", title: "Experience", body: "# Experience\n\nDevOps and infrastructure engineer with strong focus on cloud platforms, automation, Linux environments, Kubernetes operations, security hardening and pragmatic product engineering.\n\nPlaceholder note: replace this section with the final professional summary later." },
      "contact.md": { type: "file", title: "Contact", body: "# Contact\n\nEmail: hello@openroot.tech\nGitHub: https://github.com/your-user\nLinkedIn: https://linkedin.com/in/your-user\nResume: /assets/resume.pdf\n\nThese are placeholders ready for PROD-6 or the final content pass." },
      "projects": {
        type: "dir",
        children: {
          "README.md": { type: "file", title: "Projects", body: "# Projects\n\nAvailable project folders:\n\n- corly\n- bemod\n- certs\n- waf\n- hermes\n- jira\n\nTry:\n\n`cd projects`\n`ls`\n`cat corly/README.md`" },
          "corly": { type: "dir", children: { "README.md": { type: "file", title: "Corly", body: "# Corly\n\nCRM platform for real estate, brokers and banking correspondents.\n\nStack: Python, FastAPI, React, MySQL, Docker\nStatus: WIP\nLink: private\n\nDesigned to manage leads, proposals, contracts, commissions and financing workflows." } } },
          "bemod": { type: "dir", children: { "README.md": { type: "file", title: "Bemod", body: "# Bemod\n\nMulti-model AI router for local and cloud LLMs.\n\nStack: Docker, FastAPI, LiteLLM, Ollama, OpenAI-ready, Anthropic-ready\nStatus: WIP\nLink: private\n\nA local-first AI routing experiment to choose models by context and task type." } } },
          "certs": { type: "dir", children: { "README.md": { type: "file", title: "AWS Certificate Validator", body: "# AWS Certificate Validator\n\nMulti-account certificate validation workflow.\n\nStack: AWS Lambda, SSM, DynamoDB, SNS, IAM AssumeRole\nStatus: MVP\nLink: private\n\nValidates internal, external and keystore certificates, persists results and sends alerts before expiration." } } },
          "waf": { type: "dir", children: { "README.md": { type: "file", title: "AWS WAF Security Cases", body: "# AWS WAF Security Cases\n\nCredential stuffing mitigation and edge protection patterns.\n\nStack: AWS WAF, CloudFront, Bot Control, CAPTCHA, CloudWatch\nStatus: Production cases\nLink: private\n\nSecurity hardening focused on suspicious user agents, bot traffic, account protection and operational visibility." } } },
          "hermes": { type: "dir", children: { "README.md": { type: "file", title: "Hermes / Remote Management", body: "# Hermes / Remote Management\n\nRemote command and get-data flows for device operations.\n\nStack: DynamoDB, Cognito, REST APIs, command templates\nStatus: Architecture\nLink: private\n\nCommand orchestration model for reboot, channel scan, reset, speed test, disaster recovery and device diagnostics." } } },
          "jira": { type: "dir", children: { "README.md": { type: "file", title: "Jira + Confluence AI Integration", body: "# Jira + Confluence AI Integration\n\nAutomation concept to reduce repeated support tickets.\n\nStack: Jira, Confluence, AWS, OpenSearch, Bedrock/RAG-ready architecture\nStatus: Architecture\nLink: private\n\nEvent-driven workflow to detect duplicates and answer tickets using knowledge base evidence." } } }
        }
      },
      "lab": { type: "dir", children: { "README.md": { type:"file", title:"Lab", body:"# Lab\n\nFuture home for technical notes, experiments and write-ups.\n\nPlanned entries:\n\n- Kubernetes scaling notes\n- AWS WAF patterns\n- AI router experiments\n- Linux automation snippets" } } }
    }
  }
};

let cwd = "/home/visitor";
let history = [];
let historyIndex = 0;

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
async function typeBootLine(text){ bootText.textContent=""; for(let i=0;i<=text.length;i++){ bootText.textContent=text.slice(0,i); await sleep(30+Math.random()*32); } }
async function eraseBootLine(){ let v=bootText.textContent; while(v.length){ v=v.slice(0,-1); bootText.textContent=v; await sleep(14+Math.random()*14); } }
async function runBoot(){
  for(let i=0;i<bootLines.length;i++){
    await typeBootLine(bootLines[i].text); await sleep(bootLines[i].hold);
    if(i<bootLines.length-1){ await eraseBootLine(); await sleep(120); }
  }
  await sleep(450);
  boot.classList.add("hidden");
  tui.classList.remove("hidden");
  renderTree();
  openPath("/home/visitor/README.md", false);
  print(`openroot.tech TUI shell

Type "help" to list commands.
Try: tree
Try: cd projects
Try: cat corly/README.md
Try: nonroot

`, "dim");
  input.focus();
}

function normalize(path){
  if(!path || path === "~") return "/home/visitor";
  let base = path.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
  for(const part of path.split("/")){
    if(!part || part === ".") continue;
    if(part === "..") base.pop();
    else if(part === "~") base = ["home","visitor"];
    else base.push(part);
  }
  return "/" + base.join("/");
}
function nodeAt(path){
  if(path === "/home/visitor") return FS["/home/visitor"];
  const parts = path.replace(/^\/home\/visitor\/?/, "").split("/").filter(Boolean);
  let node = FS["/home/visitor"];
  for(const part of parts){
    if(!node || node.type !== "dir" || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}
function dirname(path){ const p=path.split("/").filter(Boolean); p.pop(); return "/" + p.join("/"); }
function basename(path){ return path.split("/").filter(Boolean).pop() || "/"; }
function displayPath(path){ return path === "/home/visitor" ? "~" : "~" + path.replace("/home/visitor",""); }
function setCwd(path){ cwd = path; pathLabel.textContent = ":" + displayPath(cwd) + "$"; }

function renderTree(){
  const lines = ["~"];
  function walk(node, prefix=""){
    if(!node.children) return;
    const entries = Object.entries(node.children);
    entries.forEach(([name, child], idx)=>{
      const last = idx === entries.length-1;
      const marker = last ? "└── " : "├── ";
      lines.push(prefix + marker + name + (child.type === "dir" ? "/" : ""));
      if(child.type==="dir") walk(child, prefix + (last ? "    " : "│   "));
    });
  }
  walk(FS["/home/visitor"]);
  treeView.textContent = lines.join("\n");
}

function markdownToHTML(body){
  const escaped = body.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  const lines = escaped.split("\n");
  let html = "";
  let inList = false;
  for(const line of lines){
    if(line.startsWith("# ")){ if(inList){html+="</ul>"; inList=false;} html += `<h1>${line.slice(2)}</h1>`; }
    else if(line.startsWith("## ")){ if(inList){html+="</ul>"; inList=false;} html += `<h2>${line.slice(3)}</h2>`; }
    else if(line.startsWith("- ")){ if(!inList){html+="<ul>"; inList=true;} html += `<li>${line.slice(2)}</li>`; }
    else if(line.trim()===""){ if(inList){html+="</ul>"; inList=false;} html += "<br>"; }
    else { if(inList){html+="</ul>"; inList=false;} html += `<p>${line.replace(/`([^`]+)`/g, "<kbd>$1</kbd>")}</p>`; }
  }
  if(inList) html += "</ul>";
  return html;
}
function openPath(path, echo=true){
  const full = normalize(path);
  const node = nodeAt(full);
  if(!node) return `not found: ${path}`;
  if(node.type === "dir"){
    setCwd(full);
    const readme = node.children && node.children["README.md"];
    contentTitle.textContent = displayPath(full);
    contentCard.innerHTML = readme ? markdownToHTML(readme.body) : `<h1>${basename(full)}</h1><p>Directory opened.</p>`;
    return echo ? `entered ${displayPath(full)}` : "";
  }
  contentTitle.textContent = displayPath(full);
  contentCard.innerHTML = markdownToHTML(node.body);
  return echo ? `opened ${displayPath(full)}` : "";
}
function print(text, cls=""){
  const div=document.createElement("div"); div.className=`block ${cls}`.trim(); div.textContent=text; output.appendChild(div); output.scrollTop=output.scrollHeight;
}
function echo(cmd){ print(`visitor@openroot${displayPath(cwd)}$ ${cmd}`, "command"); }

function ls(arg=""){
  const path = normalize(arg || cwd);
  const node = nodeAt(path);
  if(!node) return `not found: ${arg}`;
  if(node.type !== "dir") return basename(path);
  return Object.entries(node.children).map(([n,v])=> n + (v.type==="dir"?"/":"")).join("  ");
}
function pwd(){ return cwd; }
function cd(arg=""){ const target = normalize(arg || "~"); const n=nodeAt(target); if(!n) return `cd: no such file or directory: ${arg}`; if(n.type!=="dir") return `cd: not a directory: ${arg}`; setCwd(target); openPath(target,false); return ""; }
function cat(arg=""){ if(!arg) return "cat: missing file operand"; const full=normalize(arg); const n=nodeAt(full); if(!n) return `cat: ${arg}: No such file`; if(n.type==="dir") return `cat: ${arg}: Is a directory`; openPath(full,false); return n.body; }
function tree(){ return treeView.textContent; }
function help(){
return `Commands

Navigation:
pwd                 print current directory
ls                  list files
ls projects         list another directory
cd projects         enter directory
cd ..               go back
cat README.md       open/read file
cat corly/README.md open nested file
tree                show filesystem map

Interface:
nonroot             friendly button view
theme white         switch theme
theme green
theme amber
theme blue
clear               clear terminal
help                show this message

Hotkeys:
Tab autocomplete
Ctrl+L clear
Ctrl+C cancel input
ArrowUp/Down history
Esc return from nonroot`;
}
function status(){ return `domain openroot.tech
mode static TUI
hosting GitHub Pages ready
navigation shell filesystem
backend none
state online`; }
function nonrootMode(){ tui.classList.add("hidden"); nonroot.classList.remove("hidden"); simpleOutput.textContent = "Pick a button above. No commands required."; return "nonroot mode opened"; }
function closeNonroot(){ nonroot.classList.add("hidden"); tui.classList.remove("hidden"); input.focus(); }
function theme(name=""){
  if(!name) return "themes: white, green, amber, blue";
  const allowed=["white","green","amber","blue"];
  if(!allowed.includes(name)) return `unknown theme: ${name}`;
  document.documentElement.dataset.theme = name === "white" ? "" : name;
  return `theme switched to ${name}`;
}
function matrix(){
  const layer=document.createElement("div"); layer.className="matrix-layer";
  const chars="01 openroot cloud linux aws kube root shell ";
  const cols=Math.floor(window.innerWidth/22);
  for(let i=0;i<cols;i++){ const col=document.createElement("div"); col.className="matrix-col"; col.style.left=`${i*22}px`; col.style.animationDuration=`${1.4+Math.random()*1.8}s`; let txt=""; for(let j=0;j<80;j++) txt+=chars[Math.floor(Math.random()*chars.length)]+"\n"; col.textContent=txt; layer.appendChild(col); }
  document.body.appendChild(layer); setTimeout(()=>layer.remove(),2400); return "matrix layer started";
}
function commandRouter(raw){
  const [cmd, ...rest] = raw.trim().split(/\s+/);
  const arg = rest.join(" ");
  if(!cmd) return "";
  if(cmd==="help") return help();
  if(cmd==="pwd") return pwd();
  if(cmd==="ls") return ls(arg);
  if(cmd==="cd") return cd(arg);
  if(cmd==="cat") return cat(arg);
  if(cmd==="open") return openPath(arg || "README.md");
  if(cmd==="tree") return tree();
  if(cmd==="clear"){ output.innerHTML=""; return ""; }
  if(cmd==="status") return status();
  if(cmd==="nonroot" || cmd==="simple") return nonrootMode();
  if(cmd==="theme") return theme(arg);
  if(cmd==="matrix") return matrix();
  if(cmd==="whoami") return "visitor";
  if(cmd==="github") return "GitHub placeholder: https://github.com/your-user";
  if(cmd==="linkedin") return "LinkedIn placeholder: https://linkedin.com/in/your-user";
  if(cmd==="resume") return "Resume placeholder: /assets/resume.pdf";
  if(raw.trim()==="sudo su") return "permission denied: root access is earned, not assumed.";
  if(raw.trim()==="rm -rf /") return "nice try. filesystem protected.";
  return `command not found: ${raw}\nType "help" or use "nonroot".`;
}

function submit(value){
  echo(value);
  if(value.trim()){ history.push(value); historyIndex=history.length; }
  const result = commandRouter(value);
  if(result) print(result);
  input.value="";
}
form.addEventListener("submit", e=>{ e.preventDefault(); submit(input.value); });

function completions(){
  const base = ["help","pwd","ls","cd ","cat ","tree","status","nonroot","theme white","theme green","theme amber","theme blue","clear","whoami","github","linkedin","resume","matrix"];
  const n = nodeAt(cwd);
  if(n && n.type==="dir"){
    for(const [name, child] of Object.entries(n.children)){
      base.push("cd " + name + (child.type==="dir" ? "" : ""));
      base.push("cat " + name);
      if(child.type==="dir" && child.children && child.children["README.md"]) base.push("cat " + name + "/README.md");
    }
  }
  return base;
}
input.addEventListener("keydown", e=>{
  if(e.key==="ArrowUp"){ e.preventDefault(); if(history.length && historyIndex>0){ historyIndex--; input.value=history[historyIndex]; } }
  if(e.key==="ArrowDown"){ e.preventDefault(); if(historyIndex<history.length-1){ historyIndex++; input.value=history[historyIndex]; } else { historyIndex=history.length; input.value=""; } }
  if(e.key==="Tab"){ e.preventDefault(); const cur=input.value.toLowerCase(); const matches=completions().filter(c=>c.startsWith(cur)); if(matches.length===1) input.value=matches[0]; else if(matches.length>1) print(matches.join("  "), "dim"); }
});
document.addEventListener("keydown", e=>{
  if(e.ctrlKey && e.key.toLowerCase()==="l"){ e.preventDefault(); output.innerHTML=""; input.value=""; input.focus(); }
  if(e.ctrlKey && e.key.toLowerCase()==="c"){ e.preventDefault(); if(!tui.classList.contains("hidden")){ print("^C","command"); input.value=""; input.focus(); } }
  if(e.key==="Escape" && !nonroot.classList.contains("hidden")) closeNonroot();
});
document.addEventListener("click", ()=>{ if(!tui.classList.contains("hidden")) input.focus(); });

document.querySelectorAll("[data-shortcut]").forEach(btn=>btn.addEventListener("click",()=>submit(btn.dataset.shortcut)));
document.querySelectorAll("[data-open]").forEach(btn=>btn.addEventListener("click",()=>{
  const path = btn.dataset.open;
  const n = nodeAt(path);
  if(!n){ simpleOutput.textContent = "Content not found yet."; return; }
  if(n.type==="dir"){
    const readme = n.children && n.children["README.md"];
    simpleOutput.textContent = readme ? readme.body.replace(/^# /gm,"") : "Directory opened.";
  } else simpleOutput.textContent = n.body.replace(/^# /gm,"");
}));
$("backToTerminal").addEventListener("click", closeNonroot);

function updateClock(){ clock.textContent = new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false}); }
updateClock(); setInterval(updateClock, 20000);
runBoot();
