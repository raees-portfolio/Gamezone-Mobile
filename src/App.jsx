import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;}
body{background:#080a12;color:#eef0ff;font-family:'Syne',sans-serif;overflow-x:hidden;min-height:100dvh;}
button{font-family:'Syne',sans-serif;cursor:pointer;border:none;outline:none;-webkit-tap-highlight-color:transparent;}
button:focus-visible{outline:2px solid #38bdf8;outline-offset:2px;}
:root{
  --bg:#080a12;--s1:#0f1120;--s2:#161929;--s3:#1d2235;
  --b1:rgba(255,255,255,0.07);--b2:rgba(255,255,255,0.13);--b3:rgba(255,255,255,0.20);
  --txt:#eef0ff;--dim:#7880a0;--mut:#3d4260;
  --ttt:#38bdf8;--mem:#a78bfa;--snk:#34d399;--qiz:#fb923c;
  --fn-h:'Syne',sans-serif;--fn-m:'DM Mono',monospace;
}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.fu{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;}
.fi{animation:fadeIn .4s ease both;}
`;
function GS(){return <style dangerouslySetInnerHTML={{__html:CSS}}/>;}

/* ═══════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════ */
const useW = () => {
  const [w,setW]=useState(typeof window!=='undefined'?window.innerWidth:375);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);
  return w;
};
const isMob = w => w < 640;
const isTab = w => w >= 640 && w < 1024;

/* ═══════════════════════════════════════════════
   BACK BUTTON
═══════════════════════════════════════════════ */
function Back({onBack,label="← Lobby"}){
  const [h,setH]=useState(false);
  return(
    <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onBack}
      style={{position:'fixed',top:16,left:16,zIndex:300,display:'flex',alignItems:'center',gap:6,
        background:h?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.04)',
        border:'1px solid '+(h?'var(--b3)':'var(--b1)'),borderRadius:12,
        padding:'9px 16px',color:'var(--dim)',fontSize:13,fontFamily:'var(--fn-m)',
        letterSpacing:.4,transition:'all .2s',backdropFilter:'blur(12px)',
      }}>{label}</button>
  );
}

/* ═══════════════════════════════════════════════
   INTRO / SPLASH
═══════════════════════════════════════════════ */
function Intro({onEnter}){
  const w=useW(),mob=isMob(w);
  const [show,setShow]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),100);return()=>clearTimeout(t);},[]);

  const dots=[
    {cx:'15%',cy:'20%',r:180,c:'rgba(56,189,248,0.07)'},
    {cx:'85%',cy:'70%',r:200,c:'rgba(167,139,250,0.07)'},
    {cx:'50%',cy:'90%',r:140,c:'rgba(52,211,153,0.05)'},
  ];

  return(
    <div style={{minHeight:'100dvh',display:'flex',flexDirection:'column',alignItems:'center',
      justifyContent:'center',padding:mob?'24px 20px':'40px 24px',position:'relative',overflow:'hidden',textAlign:'center'}}>

      {/* bg orbs */}
      {dots.map((d,i)=>(
        <div key={i} style={{position:'absolute',left:d.cx,top:d.cy,width:d.r*2,height:d.r*2,
          borderRadius:'50%',background:`radial-gradient(circle,${d.c},transparent 70%)`,
          transform:'translate(-50%,-50%)',pointerEvents:'none'}}/>
      ))}

      {/* stars */}
      {Array.from({length:30},(_,i)=>(
        <div key={i} style={{position:'absolute',
          left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,
          width:Math.random()*2+1,height:Math.random()*2+1,borderRadius:'50%',
          background:'rgba(200,210,255,0.4)',
          animation:`pulse ${2+Math.random()*3}s ease-in-out infinite`,
          animationDelay:`${Math.random()*3}s`,pointerEvents:'none'}}/>
      ))}

      <div style={{position:'relative',zIndex:1,maxWidth:460,width:'100%'}}>

        {/* logo mark */}
        <div className="fu" style={{animationDelay:'.05s',display:'flex',justifyContent:'center',marginBottom:28}}>
          <div style={{width:mob?64:72,height:mob?64:72,borderRadius:20,
            background:'linear-gradient(135deg,#38bdf8 0%,#a78bfa 100%)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:mob?30:36,fontWeight:800,color:'#fff',
            boxShadow:'0 0 40px rgba(56,189,248,0.35)',
            animation:'float 3s ease-in-out infinite',
          }}>G</div>
        </div>

        {/* badge */}
        <div className="fu" style={{animationDelay:'.1s',display:'inline-flex',alignItems:'center',gap:6,
          border:'1px solid rgba(56,189,248,0.3)',borderRadius:999,padding:'5px 14px',marginBottom:20,
          background:'rgba(56,189,248,0.06)',fontSize:11,color:'#38bdf8',fontFamily:'var(--fn-m)',letterSpacing:1.2}}>
          ◉ 4 SPIELE · KI-QUIZ
        </div>

        {/* headline */}
        <h1 className="fu" style={{animationDelay:'.15s',
          fontSize:mob?'2.8rem':isTab(w)?'3.5rem':'4.2rem',
          fontWeight:800,lineHeight:.95,letterSpacing:-2,marginBottom:16,
          background:'linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.35) 100%)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
          Game<br/>Zone
        </h1>

        {/* subtitle */}
        <p className="fu" style={{animationDelay:'.2s',fontSize:mob?14:16,
          color:'var(--dim)',lineHeight:1.65,marginBottom:36,maxWidth:340,margin:'0 auto 36px'}}>
          Vier Klassiker. Endlose KI-Quizfragen.<br/>Kein Download. Einfach spielen.
        </p>

        {/* feature pills */}
        <div className="fu" style={{animationDelay:'.25s',
          display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:36}}>
          {[['🎮','4 Spiele'],['🤖','KI-Fragen'],['📱','Mobil'],['🏆','Highscores']].map(([ic,lb])=>(
            <div key={lb} style={{display:'flex',alignItems:'center',gap:6,
              background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:10,
              padding:'7px 14px',fontSize:12,color:'var(--dim)',fontFamily:'var(--fn-m)'}}>
              <span>{ic}</span><span>{lb}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="fu" style={{animationDelay:'.3s'}}>
          <button onClick={onEnter}
            style={{width:'100%',maxWidth:320,background:'linear-gradient(135deg,#38bdf8,#a78bfa)',
              border:'none',borderRadius:16,padding:mob?'16px 32px':'18px 40px',
              fontSize:mob?16:17,fontWeight:800,color:'#080a12',
              boxShadow:'0 12px 40px rgba(56,189,248,0.35)',
              transition:'all .2s',letterSpacing:-.2}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 16px 50px rgba(56,189,248,0.45)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 12px 40px rgba(56,189,248,0.35)';}}>
            Alle Spiele ansehen →
          </button>
        </div>

        <p className="fu" style={{animationDelay:'.35s',marginTop:20,fontSize:11,
          color:'var(--mut)',fontFamily:'var(--fn-m)'}}>Kostenlos · Kein Login · Kein Download</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LOBBY
═══════════════════════════════════════════════ */
const GAMES=[
  {id:'ttt',  label:'Tic Tac Toe',tag:'Strategie', color:'var(--ttt)',icon:'✕○',  desc:'3 in einer Reihe gewinnt.',players:'2 Spieler'},
  {id:'mem',  label:'Memory',     tag:'Gedächtnis',color:'var(--mem)',icon:'◈◈', desc:'Finde alle Paare.',       players:'1 Spieler'},
  {id:'snk',  label:'Snake',      tag:'Arcade',    color:'var(--snk)',icon:'◯→', desc:'Friss. Wachse. Überleb.',players:'1 Spieler'},
  {id:'qiz',  label:'Quiz',       tag:'KI-Fragen', color:'var(--qiz)',icon:'?!', desc:'KI-Fragen, dein Gebiet.',players:'1 Spieler'},
];

function GameCard({g,onSelect,idx}){
  const [h,setH]=useState(false);
  return(
    <button className="fu" onClick={()=>onSelect(g.id)}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{animationDelay:`${idx*.08}s`,background:h?`${g.color}0f`:'var(--s1)',
        border:`1px solid ${h?g.color+'44':'var(--b1)'}`,borderRadius:18,
        padding:'22px 20px',textAlign:'left',width:'100%',
        transition:'all .22s cubic-bezier(.22,1,.36,1)',
        transform:h?'translateY(-4px)':'none',
        boxShadow:h?`0 16px 48px ${g.color}18`:'none',
        position:'relative',overflow:'hidden',
      }}>
      <div style={{position:'absolute',top:-16,right:-16,width:64,height:64,borderRadius:'50%',
        background:`radial-gradient(circle,${g.color}30,transparent 70%)`,
        transform:h?'scale(2.5)':'scale(1)',transition:'transform .3s'}}/>
      <div style={{fontSize:10,color:g.color,fontFamily:'var(--fn-m)',letterSpacing:1.2,
        marginBottom:14,background:`${g.color}18`,border:`1px solid ${g.color}30`,
        borderRadius:6,display:'inline-block',padding:'3px 9px'}}>
        {g.tag.toUpperCase()}</div>
      <div style={{fontSize:28,fontWeight:800,color:g.color,marginBottom:10,
        textShadow:h?`0 0 20px ${g.color}`:'none',transition:'text-shadow .2s'}}>{g.icon}</div>
      <div style={{fontSize:18,fontWeight:800,marginBottom:6,color:'var(--txt)'}}>{g.label}</div>
      <div style={{fontSize:13,color:'var(--dim)',lineHeight:1.5,marginBottom:14}}>{g.desc}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
        borderTop:'1px solid var(--b1)',paddingTop:12}}>
        <span style={{fontSize:11,color:'var(--mut)',fontFamily:'var(--fn-m)'}}>{g.players}</span>
        <span style={{fontSize:12,color:g.color,fontFamily:'var(--fn-m)',
          opacity:h?1:0,transform:h?'none':'translateX(-6px)',transition:'all .2s'}}>SPIELEN →</span>
      </div>
    </button>
  );
}

function Lobby({onSelect,onBack}){
  const w=useW(),mob=isMob(w);
  const cols=mob?1:isTab(w)?2:4;
  return(
    <div style={{minHeight:'100dvh',background:'var(--bg)'}}>
      {/* header */}
      <div style={{padding:mob?'72px 20px 32px':'80px 32px 40px',textAlign:'center',
        borderBottom:'1px solid var(--b1)'}}>
        <button onClick={onBack} style={{position:'fixed',top:16,left:16,zIndex:300,
          display:'flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.04)',
          border:'1px solid var(--b1)',borderRadius:12,padding:'9px 16px',
          color:'var(--dim)',fontSize:13,fontFamily:'var(--fn-m)',backdropFilter:'blur(12px)'}}>
          ← Start
        </button>
        <div className="fu" style={{fontSize:11,color:'var(--mut)',fontFamily:'var(--fn-m)',
          letterSpacing:2,marginBottom:10}}>— SPIELESAMMLUNG —</div>
        <h2 className="fu" style={{animationDelay:'.05s',fontSize:mob?'2rem':'2.8rem',
          fontWeight:800,letterSpacing:-1,marginBottom:10}}>Wähle dein Spiel</h2>
        <p className="fu" style={{animationDelay:'.1s',fontSize:14,color:'var(--dim)'}}>
          4 Spiele · KI-Quiz mit Gebieten · Kein Login
        </p>
      </div>

      {/* grid */}
      <div style={{padding:mob?'24px 16px 60px':'32px',
        maxWidth:1100,margin:'0 auto',
        display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:14}}>
        {GAMES.map((g,i)=><GameCard key={g.id} g={g} onSelect={onSelect} idx={i}/>)}
      </div>

      {/* bottom info */}
      <div style={{textAlign:'center',padding:'0 20px 40px',
        fontSize:11,color:'var(--mut)',fontFamily:'var(--fn-m)'}}>
        Quiz powered by Claude AI · Fragen werden live generiert
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TIC TAC TOE
═══════════════════════════════════════════════ */
function checkW(sq){
  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(const[a,b,c]of lines)if(sq[a]&&sq[a]===sq[b]&&sq[a]===sq[c])return{w:sq[a],line:[a,b,c]};
  return null;
}

function TicTacToe({onBack}){
  const w=useW(),mob=isMob(w);
  const [board,setBoard]=useState(Array(9).fill(null));
  const [xNext,setX]=useState(true);
  const [scores,setScores]=useState({X:0,O:0});
  const res=checkW(board);
  const draw=!res&&board.every(Boolean);
  const C='var(--ttt)',C2='var(--mem)';
  const cs=mob?90:110;

  const click=i=>{
    if(board[i]||res)return;
    const b=[...board];b[i]=xNext?'X':'O';
    setBoard(b);setX(!xNext);
    const r=checkW(b);
    if(r)setScores(s=>({...s,[r.w]:s[r.w]+1}));
  };
  const reset=()=>{setBoard(Array(9).fill(null));setX(true);};

  return(
    <div style={{minHeight:'100dvh',background:'var(--bg)',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',padding:'80px 16px 40px'}}>
      <Back onBack={onBack}/>
      <div style={{textAlign:'center',marginBottom:28}}>
        <div style={{fontSize:10,color:'var(--mut)',fontFamily:'var(--fn-m)',letterSpacing:2,marginBottom:8}}>STRATEGIE</div>
        <h2 style={{fontSize:mob?'1.9rem':'2.4rem',fontWeight:800,letterSpacing:-1}}>Tic Tac Toe</h2>
      </div>

      {/* scores */}
      <div style={{display:'flex',gap:12,marginBottom:24}}>
        {[['X',C],['O',C2]].map(([p,c])=>(
          <div key={p} style={{background:(xNext&&p==='X'||!xNext&&p==='O')?`${c}12`:'var(--s1)',
            border:`1px solid ${(xNext&&p==='X'||!xNext&&p==='O')?c+'44':'var(--b1)'}`,
            borderRadius:14,padding:'14px 28px',textAlign:'center',transition:'all .2s',minWidth:90}}>
            <div style={{fontSize:22,fontWeight:800,color:c}}>{p}</div>
            <div style={{fontSize:26,fontWeight:800,marginTop:2}}>{scores[p]}</div>
            {((xNext&&p==='X')||(!xNext&&p==='O'))&&!res&&!draw&&
              <div style={{fontSize:9,color:c,fontFamily:'var(--fn-m)',marginTop:5,
                animation:'pulse 1s infinite'}}>AM ZUG</div>}
          </div>
        ))}
      </div>

      {/* status */}
      {(res||draw)&&(
        <div className="fi" style={{marginBottom:20,padding:'10px 22px',
          background:res?`${res.w==='X'?C:C2}12`:'rgba(255,255,255,0.04)',
          border:`1px solid ${res?(res.w==='X'?C:C2)+'40':'var(--b1)'}`,
          borderRadius:10,fontSize:14,color:res?(res.w==='X'?C:C2):'var(--dim)',fontFamily:'var(--fn-m)'}}>
          {res?`🏆 ${res.w} gewinnt!`:'🤝 Unentschieden!'}
        </div>
      )}

      {/* board */}
      <div style={{display:'grid',gridTemplateColumns:`repeat(3,${cs}px)`,gap:8,marginBottom:24}}>
        {board.map((v,i)=>{
          const inL=res?.line.includes(i);
          const col=v==='X'?C:v==='O'?C2:null;
          return(
            <button key={i} onClick={()=>click(i)} style={{
              width:cs,height:cs,borderRadius:14,
              background:inL?`${col}18`:'var(--s1)',
              border:`1px solid ${inL?col+'55':col?col+'28':'var(--b1)'}`,
              fontSize:cs*.36,fontWeight:800,color:col||'transparent',
              transition:'all .15s',
              textShadow:inL?`0 0 16px ${col}`:'none',
              cursor:v||res?'default':'pointer',
            }}>{v}</button>
          );
        })}
      </div>

      <button onClick={reset} style={{background:'transparent',border:'1px solid var(--b2)',
        borderRadius:12,padding:'12px 32px',fontSize:14,fontWeight:700,
        color:'var(--dim)',transition:'all .2s'}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--ttt)';e.currentTarget.style.color='var(--ttt)';}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--b2)';e.currentTarget.style.color='var(--dim)';}}>
        Neues Spiel
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MEMORY
═══════════════════════════════════════════════ */
const EM=['🦊','🐸','🦋','🌈','🍕','🎸','🚀','💎'];
function Memory({onBack}){
  const w=useW(),mob=isMob(w);
  const make=()=>[...EM,...EM].sort(()=>Math.random()-.5).map((e,i)=>({id:i,e,f:false,m:false}));
  const [cards,setCards]=useState(make);
  const [sel,setSel]=useState([]);
  const [moves,setMoves]=useState(0);
  const [locked,setLocked]=useState(false);
  const [time,setTime]=useState(0);
  const [started,setStarted]=useState(false);
  const won=cards.every(c=>c.m);
  const C='var(--mem)';
  const cs=mob?72:84;

  useEffect(()=>{
    if(!started||won)return;
    const t=setInterval(()=>setTime(x=>x+1),1000);
    return()=>clearInterval(t);
  },[started,won]);

  const flip=id=>{
    if(locked||sel.length===2)return;
    const card=cards.find(c=>c.id===id);
    if(!card||card.f||card.m)return;
    if(!started)setStarted(true);
    const nc=cards.map(c=>c.id===id?{...c,f:true}:c);
    const ns=[...sel,id];
    setCards(nc);setSel(ns);
    if(ns.length===2){
      setMoves(m=>m+1);setLocked(true);
      const[a,b]=ns.map(x=>nc.find(c=>c.id===x));
      setTimeout(()=>{
        setCards(p=>p.map(c=>{
          if(c.id===a.id||c.id===b.id)return a.e===b.e?{...c,m:true}:{...c,f:false};
          return c;
        }));
        setSel([]);setLocked(false);
      },750);
    }
  };

  const reset=()=>{setCards(make());setSel([]);setMoves(0);setLocked(false);setTime(0);setStarted(false);};
  const fmt=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;

  return(
    <div style={{minHeight:'100dvh',background:'var(--bg)',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',padding:'80px 12px 40px'}}>
      <Back onBack={onBack}/>
      <div style={{textAlign:'center',marginBottom:24}}>
        <div style={{fontSize:10,color:'var(--mut)',fontFamily:'var(--fn-m)',letterSpacing:2,marginBottom:8}}>GEDÄCHTNIS</div>
        <h2 style={{fontSize:mob?'1.9rem':'2.4rem',fontWeight:800,letterSpacing:-1}}>Memory</h2>
      </div>

      <div style={{display:'flex',gap:10,marginBottom:20}}>
        {[['ZÜGE',moves],['ZEIT',fmt(time)],['PAARE',`${cards.filter(c=>c.m).length/2|0}/8`]].map(([l,v])=>(
          <div key={l} style={{background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:12,
            padding:'10px 16px',textAlign:'center',minWidth:70}}>
            <div style={{fontSize:9,color:'var(--mut)',fontFamily:'var(--fn-m)',marginBottom:3}}>{l}</div>
            <div style={{fontSize:18,fontWeight:700}}>{v}</div>
          </div>
        ))}
      </div>

      {won&&<div className="fi" style={{marginBottom:16,padding:'10px 20px',
        background:'rgba(167,139,250,0.1)',border:'1px solid rgba(167,139,250,0.4)',
        borderRadius:10,color:C,fontSize:13,fontFamily:'var(--fn-m)',fontWeight:700}}>
        🏆 Gewonnen! {moves} Züge · {fmt(time)}</div>}

      <div style={{display:'grid',gridTemplateColumns:`repeat(4,${cs}px)`,gap:mob?8:10,marginBottom:22}}>
        {cards.map(card=>(
          <button key={card.id} onClick={()=>flip(card.id)} style={{
            width:cs,height:cs,borderRadius:12,
            background:card.m?`${C}15`:card.f?'var(--s2)':'var(--s1)',
            border:`1px solid ${card.m?C+'44':card.f?C+'28':'var(--b1)'}`,
            fontSize:card.f||card.m?cs*.38:cs*.28,
            transition:'all .18s cubic-bezier(.22,1,.36,1)',
            cursor:card.m||card.f?'default':'pointer',
          }}>
            {card.f||card.m?card.e:'◈'}
          </button>
        ))}
      </div>

      <button onClick={reset} style={{background:'transparent',border:'1px solid var(--b2)',
        borderRadius:12,padding:'12px 32px',fontSize:14,fontWeight:700,color:'var(--dim)',transition:'all .2s'}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--mem)';e.currentTarget.style.color='var(--mem)';}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--b2)';e.currentTarget.style.color='var(--dim)';}}>
        Neu starten
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SNAKE
═══════════════════════════════════════════════ */
function Snake({onBack}){
  const w=useW(),mob=isMob(w);
  const GW=18,GH=18;
  const CS=mob?Math.floor((Math.min(w,400)-32)/GW):24;
  const initS=[[9,9],[8,9],[7,9]];
  const[snake,setSnake]=useState(initS);
  const[food,setFood]=useState([14,9]);
  const[running,setRunning]=useState(false);
  const[dead,setDead]=useState(false);
  const[score,setScore]=useState(0);
  const[best,setBest]=useState(0);
  const dirRef=useRef([1,0]);
  const snakeRef=useRef(initS);
  const foodRef=useRef([14,9]);
  const C='var(--snk)';

  const rFood=s=>{let p;do{p=[Math.floor(Math.random()*GW),Math.floor(Math.random()*GH)];}
    while(s.some(x=>x[0]===p[0]&&x[1]===p[1]));return p;};

  useEffect(()=>{
    const h=e=>{
      const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
      if(!m[e.key])return;e.preventDefault();
      const[dx,dy]=m[e.key],[cx,cy]=dirRef.current;
      if(dx===-cx&&dy===-cy)return;
      dirRef.current=[dx,dy];
      if(!running&&!dead)setRunning(true);
    };
    window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);
  },[running,dead]);

  const moveDir=useRef(null);
  const touchDir=dir=>{
    const[dx,dy]=dir,[cx,cy]=dirRef.current;
    if(dx===-cx&&dy===-cy)return;
    dirRef.current=[dx,dy];
    if(!running&&!dead)setRunning(true);
  };

  useEffect(()=>{
    if(!running)return;
    const iv=setInterval(()=>{
      const[dx,dy]=dirRef.current,h=snakeRef.current[0];
      const nh=[h[0]+dx,h[1]+dy];
      if(nh[0]<0||nh[0]>=GW||nh[1]<0||nh[1]>=GH||snakeRef.current.some(s=>s[0]===nh[0]&&s[1]===nh[1])){
        setDead(true);setRunning(false);
        setScore(sc=>{setBest(b=>Math.max(b,sc));return sc;});return;
      }
      const ate=nh[0]===foodRef.current[0]&&nh[1]===foodRef.current[1];
      const ns=ate?[nh,...snakeRef.current]:[nh,...snakeRef.current.slice(0,-1)];
      snakeRef.current=ns;setSnake([...ns]);
      if(ate){const nf=rFood(ns);foodRef.current=nf;setFood(nf);setScore(s=>s+10);}
    },120);
    return()=>clearInterval(iv);
  },[running]);

  const reset=()=>{
    const s=[[9,9],[8,9],[7,9]],f=[14,9];
    setSnake(s);snakeRef.current=s;setFood(f);foodRef.current=f;
    dirRef.current=[1,0];setDead(false);setScore(0);setRunning(false);
  };

  const bw=GW*CS,bh=GH*CS;

  return(
    <div style={{minHeight:'100dvh',background:'var(--bg)',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',padding:'80px 16px 40px'}}>
      <Back onBack={onBack}/>
      <div style={{textAlign:'center',marginBottom:20}}>
        <div style={{fontSize:10,color:'var(--mut)',fontFamily:'var(--fn-m)',letterSpacing:2,marginBottom:8}}>ARCADE</div>
        <h2 style={{fontSize:mob?'1.9rem':'2.4rem',fontWeight:800,letterSpacing:-1}}>Snake</h2>
      </div>

      <div style={{display:'flex',gap:10,marginBottom:16}}>
        {[['SCORE',score],['BEST',best]].map(([l,v])=>(
          <div key={l} style={{background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:12,
            padding:'10px 20px',textAlign:'center',minWidth:80}}>
            <div style={{fontSize:9,color:'var(--mut)',fontFamily:'var(--fn-m)',marginBottom:3}}>{l}</div>
            <div style={{fontSize:20,fontWeight:700,color:l==='BEST'?C:'var(--txt)'}}>{v}</div>
          </div>
        ))}
      </div>

      {/* board */}
      <div style={{position:'relative',width:bw,height:bh,background:'var(--s1)',
        border:'1px solid var(--b1)',borderRadius:14,overflow:'hidden',
        boxShadow:running?`0 0 32px ${C}18`:'none',transition:'box-shadow .3s'}}>
        <div style={{position:'absolute',inset:0,
          backgroundImage:`linear-gradient(var(--b1) 1px,transparent 1px),linear-gradient(90deg,var(--b1) 1px,transparent 1px)`,
          backgroundSize:`${CS}px ${CS}px`}}/>
        <div style={{position:'absolute',left:food[0]*CS+3,top:food[1]*CS+3,
          width:CS-6,height:CS-6,borderRadius:'50%',
          background:'var(--qiz)',boxShadow:'0 0 10px var(--qiz)',animation:'pulse 1s infinite'}}/>
        {snake.map((s,i)=>(
          <div key={i} style={{position:'absolute',left:s[0]*CS+1,top:s[1]*CS+1,
            width:CS-2,height:CS-2,borderRadius:i===0?5:2,
            background:i===0?C:`rgba(52,211,153,${Math.max(0.15,0.8-i*.05)})`,
            boxShadow:i===0?`0 0 8px ${C}`:'none'}}/>
        ))}
        {!running&&!dead&&(
          <div onClick={()=>setRunning(true)} style={{position:'absolute',inset:0,display:'flex',
            flexDirection:'column',alignItems:'center',justifyContent:'center',
            background:'rgba(8,10,18,0.75)',backdropFilter:'blur(6px)',cursor:'pointer',borderRadius:14}}>
            <div style={{fontSize:36,marginBottom:8}}>▶</div>
            <div style={{fontSize:13,color:C,fontFamily:'var(--fn-m)'}}>Tippen zum Starten</div>
          </div>
        )}
        {dead&&(
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',
            background:'rgba(8,10,18,0.88)',backdropFilter:'blur(6px)',borderRadius:14}}>
            <div style={{fontSize:32,marginBottom:6}}>💀</div>
            <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>Game Over</div>
            <div style={{fontSize:13,color:'var(--dim)',fontFamily:'var(--fn-m)',marginBottom:20}}>Score: {score}</div>
            <button onClick={reset} style={{background:C,border:'none',borderRadius:10,
              padding:'10px 28px',fontSize:14,fontWeight:800,color:'#000'}}>Nochmal</button>
          </div>
        )}
      </div>

      {/* mobile d-pad */}
      {mob&&(
        <div style={{marginTop:20,display:'grid',gridTemplateColumns:'56px 56px 56px',
          gridTemplateRows:'56px 56px',gap:6,justifyContent:'center'}}>
          {[
            {label:'↑',dir:[0,-1],col:1,row:1},
            {label:'←',dir:[-1,0],col:0,row:2},
            {label:'↓',dir:[0,1],col:1,row:2},
            {label:'→',dir:[1,0],col:2,row:2},
          ].map(({label,dir,col,row})=>(
            <button key={label}
              onTouchStart={e=>{e.preventDefault();touchDir(dir);}}
              onClick={()=>touchDir(dir)}
              style={{gridColumn:col+1,gridRow:row,
                background:'var(--s2)',border:'1px solid var(--b2)',borderRadius:12,
                fontSize:20,color:'var(--dim)',display:'flex',alignItems:'center',justifyContent:'center',
                width:56,height:56,touchAction:'manipulation'}}>
              {label}
            </button>
          ))}
        </div>
      )}

      {!mob&&(
        <p style={{marginTop:12,fontSize:11,color:'var(--mut)',fontFamily:'var(--fn-m)'}}>Pfeiltasten zum Steuern</p>
      )}

      <div style={{display:'flex',gap:8,marginTop:14}}>
        {!dead&&running&&<button onClick={()=>setRunning(false)} style={{background:'transparent',
          border:'1px solid var(--b2)',borderRadius:10,padding:'8px 18px',fontSize:13,color:'var(--dim)'}}>Pause</button>}
        {!dead&&!running&&score>0&&<button onClick={()=>setRunning(true)} style={{background:`${C}18`,
          border:`1px solid ${C}44`,borderRadius:10,padding:'8px 18px',fontSize:13,color:C}}>Weiter</button>}
        <button onClick={reset} style={{background:'transparent',border:'1px solid var(--b2)',
          borderRadius:10,padding:'8px 18px',fontSize:13,color:'var(--dim)'}}>Reset</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   QUIZ — KATEGORIE + KI
═══════════════════════════════════════════════ */
const CATEGORIES=[
  {id:'bildung',   label:'Bildung',        icon:'📚', desc:'Schule, Wissen, Kultur'},
  {id:'auto',      label:'Autoindustrie',  icon:'🚗', desc:'Marken, Technik, Geschichte'},
  {id:'sport',     label:'Sport',          icon:'⚽', desc:'Fußball, Olympia & mehr'},
  {id:'tech',      label:'Technologie',    icon:'💻', desc:'IT, KI, Innovationen'},
  {id:'natur',     label:'Natur & Tiere',  icon:'🌿', desc:'Biologie, Ökologie, Tiere'},
  {id:'geschichte',label:'Geschichte',     icon:'🏛️', desc:'Weltgeschichte & Ereignisse'},
  {id:'kochen',    label:'Kochen & Essen', icon:'🍳', desc:'Rezepte, Zutaten, Küchen'},
  {id:'geographie',label:'Geographie',     icon:'🌍', desc:'Länder, Hauptstädte, Natur'},
  {id:'musik',     label:'Musik',          icon:'🎵', desc:'Bands, Genres, Hits'},
  {id:'film',      label:'Film & TV',      icon:'🎬', desc:'Kino, Serien, Regisseure'},
  {id:'wirtschaft',label:'Wirtschaft',     icon:'📈', desc:'Finanzen, Unternehmen, Märkte'},
  {id:'medizin',   label:'Medizin',        icon:'🏥', desc:'Gesundheit, Anatomie, Krankheiten'},
];

async function fetchQuiz(categoryLabel){
  const res=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      model:'claude-sonnet-4-20250514',
      max_tokens:1200,
      messages:[{role:'user',content:
        `Erstelle genau 6 Quiz-Fragen auf Deutsch zum Thema "${categoryLabel}".
Antworte NUR mit einem gültigen JSON-Array ohne Markdown oder Erklärungen.
Format: [{"q":"Frage?","opts":["A","B","C","D"],"a":0}]
"a" = Index der richtigen Antwort (0-3). Fragen sollen abwechslungsreich und mittelschwer sein.`
      }],
    }),
  });
  const data=await res.json();
  const raw=data.content?.find(b=>b.type==='text')?.text||'[]';
  return JSON.parse(raw.replace(/```json|```/g,'').trim());
}

function CategoryPicker({onPick,w}){
  const mob=isMob(w);
  const [hov,setHov]=useState(null);
  return(
    <div style={{width:'100%',maxWidth:600}}>
      <div style={{textAlign:'center',marginBottom:24}}>
        <p style={{fontSize:14,color:'var(--dim)',lineHeight:1.6}}>
          Wähle ein Gebiet — die KI generiert<br/>frische Fragen speziell dazu.
        </p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:mob?'1fr 1fr':'repeat(3,1fr)',gap:10}}>
        {CATEGORIES.map((cat,i)=>(
          <button key={cat.id} className="fu"
            style={{animationDelay:`${i*.04}s`,
              background:hov===cat.id?'rgba(251,146,60,0.08)':'var(--s1)',
              border:`1px solid ${hov===cat.id?'rgba(251,146,60,0.44)':'var(--b1)'}`,
              borderRadius:14,padding:'14px 12px',textAlign:'left',
              transition:'all .18s',cursor:'pointer',
              transform:hov===cat.id?'translateY(-2px)':'none',
            }}
            onMouseEnter={()=>setHov(cat.id)}
            onMouseLeave={()=>setHov(null)}
            onClick={()=>onPick(cat)}>
            <div style={{fontSize:24,marginBottom:8}}>{cat.icon}</div>
            <div style={{fontSize:13,fontWeight:800,marginBottom:3,color:'var(--txt)'}}>{cat.label}</div>
            <div style={{fontSize:11,color:'var(--dim)',fontFamily:'var(--fn-m)'}}>{cat.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Quiz({onBack}){
  const w=useW(),mob=isMob(w);
  const [phase,setPhase]=useState('pick'); // pick | load | play | done
  const [category,setCategory]=useState(null);
  const [questions,setQuestions]=useState([]);
  const [idx,setIdx]=useState(0);
  const [score,setScore]=useState(0);
  const [chosen,setChosen]=useState(null);
  const [error,setError]=useState(null);
  const C='var(--qiz)';

  const pickCat=async cat=>{
    setCategory(cat);setPhase('load');setError(null);
    try{
      const qs=await fetchQuiz(cat.label);
      if(!qs.length)throw new Error();
      setQuestions(qs);setIdx(0);setScore(0);setChosen(null);setPhase('play');
    }catch{setError('Fragen konnten nicht geladen werden.');setPhase('pick');}
  };

  const answer=i=>{
    if(chosen!==null)return;
    setChosen(i);
    if(i===questions[idx].a)setScore(s=>s+1);
    setTimeout(()=>{
      if(idx+1>=questions.length)setPhase('done');
      else{setIdx(idx+1);setChosen(null);}
    },1000);
  };

  const q=questions[idx];
  const pct=questions.length?Math.round((score/questions.length)*100):0;

  const oStyle=i=>{
    if(chosen===null)return{bg:'var(--s1)',border:'var(--b1)',color:'var(--txt)'};
    if(i===q.a)return{bg:'rgba(52,211,153,0.1)',border:'rgba(52,211,153,0.5)',color:'var(--snk)'};
    if(i===chosen)return{bg:'rgba(251,146,60,0.08)',border:'rgba(251,146,60,0.4)',color:C};
    return{bg:'var(--s1)',border:'var(--b1)',color:'var(--mut)'};
  };

  return(
    <div style={{minHeight:'100dvh',background:'var(--bg)',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',padding:'80px 16px 48px'}}>
      <Back onBack={onBack}/>

      <div style={{textAlign:'center',marginBottom:24}}>
        <div style={{fontSize:10,color:'var(--mut)',fontFamily:'var(--fn-m)',letterSpacing:2,marginBottom:8}}>KI-GENERIERT</div>
        <h2 style={{fontSize:mob?'1.9rem':'2.4rem',fontWeight:800,letterSpacing:-1}}>Quiz</h2>
        {category&&phase!=='pick'&&(
          <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:10,
            background:`${C}15`,border:`1px solid ${C}33`,borderRadius:20,
            padding:'5px 14px',fontSize:12,color:C,fontFamily:'var(--fn-m)'}}>
            {category.icon} {category.label}
          </div>
        )}
      </div>

      {/* PICK */}
      {phase==='pick'&&(
        <>
          {error&&<div style={{marginBottom:16,padding:'10px 20px',background:'rgba(251,146,60,0.1)',
            border:'1px solid rgba(251,146,60,0.4)',borderRadius:10,color:C,
            fontSize:13,fontFamily:'var(--fn-m)'}}>{error}</div>}
          <CategoryPicker onPick={pickCat} w={w}/>
        </>
      )}

      {/* LOAD */}
      {phase==='load'&&(
        <div style={{textAlign:'center',padding:48}}>
          <div style={{width:44,height:44,border:`2px solid ${C}33`,borderTop:`2px solid ${C}`,
            borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 20px'}}/>
          <div style={{fontSize:14,color:'var(--dim)',fontFamily:'var(--fn-m)'}}>
            KI generiert {category?.label}-Fragen…
          </div>
        </div>
      )}

      {/* PLAY */}
      {phase==='play'&&q&&(
        <div className="fi" style={{width:'100%',maxWidth:520}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <span style={{fontSize:12,color:'var(--mut)',fontFamily:'var(--fn-m)'}}>
              Frage {idx+1} / {questions.length}
            </span>
            <span style={{fontSize:12,color:C,fontFamily:'var(--fn-m)'}}>✓ {score}</span>
          </div>
          <div style={{height:3,background:'var(--s1)',borderRadius:4,marginBottom:24,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${(idx/questions.length)*100}%`,
              background:`linear-gradient(90deg,${C},#f59e0b)`,borderRadius:4,transition:'width .4s ease'}}/>
          </div>

          <div style={{background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:16,
            padding:'22px 20px',marginBottom:14,minHeight:90,
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <p style={{fontSize:mob?15:17,fontWeight:700,textAlign:'center',lineHeight:1.5}}>{q.q}</p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:mob?'1fr':'1fr 1fr',gap:9}}>
            {q.opts.map((opt,i)=>{
              const s=oStyle(i);
              return(
                <button key={i} onClick={()=>answer(i)} style={{
                  background:s.bg,border:`1px solid ${s.border}`,borderRadius:13,
                  padding:'13px 14px',textAlign:'left',fontSize:mob?14:14,fontWeight:600,
                  color:s.color,transition:'all .15s',cursor:chosen!==null?'default':'pointer',
                  display:'flex',alignItems:'center',gap:9,
                }}
                onMouseEnter={e=>{if(chosen===null)e.currentTarget.style.borderColor=`${C}44`;}}
                onMouseLeave={e=>{if(chosen===null)e.currentTarget.style.borderColor='var(--b1)';}}>
                  <span style={{width:22,height:22,borderRadius:6,background:`${s.border}22`,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:10,fontFamily:'var(--fn-m)',flexShrink:0}}>{['A','B','C','D'][i]}</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* DONE */}
      {phase==='done'&&(
        <div className="fu" style={{textAlign:'center',maxWidth:420,width:'100%'}}>
          <div style={{fontSize:56,marginBottom:14}}>
            {pct>=80?'🏆':pct>=50?'😊':'🧩'}
          </div>
          <h3 style={{fontSize:mob?'1.8rem':'2.2rem',fontWeight:800,marginBottom:8}}>
            {score} / {questions.length}
          </h3>
          <div style={{height:5,background:'var(--s1)',borderRadius:4,marginBottom:8,overflow:'hidden',maxWidth:300,margin:'0 auto 8px'}}>
            <div style={{height:'100%',width:`${pct}%`,
              background:`linear-gradient(90deg,${C},#f59e0b)`,borderRadius:4}}/>
          </div>
          <p style={{color:'var(--dim)',fontFamily:'var(--fn-m)',fontSize:12,marginBottom:4}}>{pct}% KORREKT</p>
          <p style={{color:'var(--dim)',fontSize:14,marginBottom:32,marginTop:8}}>
            {pct>=80?'Beeindruckend!':pct>=50?'Solide Leistung!':'Nochmal versuchen!'}
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:10,alignItems:'center'}}>
            <button onClick={()=>{setPhase('pick');setCategory(null);}}
              style={{width:'100%',maxWidth:280,background:`linear-gradient(135deg,${C},#f59e0b)`,
                border:'none',borderRadius:14,padding:'14px',fontSize:15,fontWeight:800,color:'#000',
                boxShadow:`0 8px 28px rgba(251,146,60,0.3)`}}>
              Anderes Gebiet wählen
            </button>
            <button onClick={()=>pickCat(category)}
              style={{width:'100%',maxWidth:280,background:'var(--s1)',border:'1px solid var(--b2)',
                borderRadius:14,padding:'14px',fontSize:14,fontWeight:700,color:'var(--dim)'}}>
              Nochmal: {category?.icon} {category?.label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   APP
═══════════════════════════════════════════════ */
export default function App(){
  const [screen,setScreen]=useState('intro');
  return(
    <>
      <GS/>
      {screen==='intro' &&<Intro  onEnter={()=>setScreen('lobby')}/>}
      {screen==='lobby' &&<Lobby  onSelect={setScreen} onBack={()=>setScreen('intro')}/>}
      {screen==='ttt'   &&<TicTacToe onBack={()=>setScreen('lobby')}/>}
      {screen==='mem'   &&<Memory    onBack={()=>setScreen('lobby')}/>}
      {screen==='snk'   &&<Snake     onBack={()=>setScreen('lobby')}/>}
      {screen==='qiz'   &&<Quiz      onBack={()=>setScreen('lobby')}/>}
    </>
  );
}
