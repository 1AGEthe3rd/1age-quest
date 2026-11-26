// Local preview only. Never grants XP, Cash, ownership, repository rights or real assignments.
export const missions=Object.freeze([
 {id:'page-001',group:'adventure',title:'Level 001 — Discover your identity',city:'1AGE Page',objective:'Explore Page and learn how a 1AGE identity connects to the universe.',url:'https://1age.page/'},
 {id:'portland-explore',group:'world',title:'Explore the Soul District',city:'Portland · HQ1',objective:'Walk the existing district. Identify one public building or transit feature to research.',url:'https://1age.space/hq1/'},
 {id:'portland-verify',group:'world',title:'Verify a property',city:'Portland · HQ1',objective:'Prepare a sourced public address and exterior reference. Do not claim ownership or submit personal information.',url:'https://1age.space/hq1/'},
 {id:'dc-explore',group:'world',title:'Explore Historic Anacostia',city:'Washington, D.C. · HQ2',objective:'Inspect the existing virtual district and identify a public streetscape improvement.',url:'https://1age.space/hq2/'},
 {id:'dc-transit',group:'world',title:'Research transportation',city:'Washington, D.C. · HQ2',objective:'Find authoritative public transit references and note what needs verification.',url:'https://1age.space/hq2/'},
 {id:'creator-model',group:'creator',title:'Prepare a building model',city:'World development',objective:'Plan a licensed, optimized 3D asset with dimensions and source provenance. No files are uploaded here.'},
 {id:'creator-review',group:'creator',title:'Review a reconstruction',city:'World development',objective:'Prepare same-camera comparisons and document inaccuracies. No publishing permissions are granted.'}
]);
export function createPreviewProgress(){
 let selected=null;const explored=new Set();
 return {select(id){if(!missions.some(m=>m.id===id))return false;selected=id;return true;},markExplored(id){if(selected!==id||!missions.some(m=>m.id===id))return false;explored.add(id);return true;},snapshot(){return {selected,explored:[...explored]};},reset(){selected=null;explored.clear();}};
}
export function mountMissions(host,group,progress){
 const root=document.createElement('section');host.append(root);
 const make=(tag,text,parent=root)=>{const e=document.createElement(tag);e.textContent=text;parent.append(e);return e;};
 const button=(label,fn,parent=root)=>{const b=make('button',label,parent);b.type='button';b.addEventListener('click',fn);return b;};
 function render(){
 root.replaceChildren();const state=progress.snapshot();
 make('p','Exploration preview · progress lasts only while this page is open. No real assignment, reward or publication.');
 if(group==='achievement'){
 make('p',state.explored.length+' local exploration steps marked. This is not verified completion or earned XP.');
 for(const id of state.explored){const m=missions.find(x=>x.id===id);make('p',m.title+' · self-marked');}
 make('p','Cash rewards, builder reputation and Page identity linking require server-side review and approval.');
 button('Reset preview progress',()=>{progress.reset();render();});return;
 }
 for(const m of missions.filter(m=>m.group===group)){
 const card=make('article','',root);card.className='mission-card';
 make('strong',m.title,card);make('p',m.city,card);make('p',m.objective,card);
 if(state.explored.includes(m.id))make('p','Explored locally · not verified',card);
 if(state.selected===m.id){
 make('p','Selected in this preview',card);
 if(m.url){const a=make('a','Visit destination',card);a.href=m.url;a.target='_blank';a.rel='noopener noreferrer';}
 button('Mark explored (local only)',()=>{progress.markExplored(m.id);render();},card);
 }else button('Select mission',()=>{progress.select(m.id);render();},card);
 }
 if(group==='creator'){make('p','GitHub linking, submission, automated checks and review are planned. No account or repository connection is requested. Professional work contracts and hiring belong to 1AGE Work, not Quest.');}
 }
 render();
}
