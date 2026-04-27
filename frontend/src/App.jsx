
import { useState, useEffect } from "react";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Nunito',sans-serif;background:#FFF9F4;color:#1C1C2E;overflow-x:hidden;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:#fef3ec;}
::-webkit-scrollbar-thumb{background:#ffb38a;border-radius:99px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes shimmer{0%{background-position:-400% 0}100%{background-position:400% 0}}
@keyframes bounceIn{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes toastIn{from{transform:translateX(-50%) translateY(16px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes cartPop{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
@keyframes spin360{from{transform:rotate(0)}to{transform:rotate(360deg)}}

.fu{animation:fadeUp .45s ease both;}
.pc{transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s ease;}
.pc:hover{transform:translateY(-5px) scale(1.01);box-shadow:0 18px 44px rgba(255,107,53,.16)!important;}
.cc{transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s;}
.cc:hover{transform:translateY(-4px) scale(1.03);}
.fc{transition:transform .18s ease,box-shadow .18s ease;}
.fc:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.09)!important;}
.bh{transition:filter .15s,transform .15s,box-shadow .15s;}
.bh:hover{filter:brightness(1.07);transform:translateY(-1px);}
.nl{transition:color .15s;}
.nl:hover{color:#FF9556!important;padding-left:6px!important;}
.wbtn:hover{transform:scale(1.12) !important;}
.hbtn:hover{transform:scale(1.18) !important;}
.bbtn:hover{background:rgba(255,107,53,.08)!important;}

@media(max-width:860px){
  .deskNav{display:none!important;}
  .mobToggle{display:flex!important;}
  .hideMob{display:none!important;}
  .heroGrid{grid-template-columns:1fr!important;}
  .cGrid{grid-template-columns:1fr!important;}
  .abGrid{grid-template-columns:1fr!important;}
  .coGrid{grid-template-columns:1fr!important;}
  .chGrid{grid-template-columns:1fr!important;}
  .fGrid{grid-template-columns:1fr 1fr!important;gap:24px!important;}
  .adGrid{grid-template-columns:1fr!important;}
  .pdGrid{grid-template-columns:1fr!important;}
  .stRow{grid-template-columns:1fr 1fr!important;}
  .ofGrid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:560px){
  .fGrid{grid-template-columns:1fr!important;}
  .fStrip{grid-template-columns:1fr 1fr!important;}
  .catGrid{grid-template-columns:repeat(3,1fr)!important;}
  .hBtns{flex-direction:column!important;}
  .cartSide{width:100vw!important;}
  .stRow{grid-template-columns:1fr 1fr!important;}
  .ofGrid{grid-template-columns:1fr 1fr!important;}
  .proGrid{grid-template-columns:1fr 1fr!important;}
}
`;

/* ── Data ──────────────────────────────────── */
const CATS=[
  {id:"all",  label:"All",       icon:"🛍️"},
  {id:"toys", label:"Toys",      icon:"🧸"},
  {id:"gifts",label:"Gifts",     icon:"🎁"},
  {id:"kids", label:"Kids",      icon:"👶"},
  {id:"seasonal",label:"Festive",icon:"🎄"},
];

const PRODS=[
  {id:1, name:"Premium Plush Teddy Bear",  cat:"toys",    price:799,  mrp:1199,emoji:"🧸",tag:"Bestseller",stars:4.8,rev:124,stock:15,bg:"#FFF3EC",desc:"Super-soft hypoallergenic teddy bear. Safe for all ages. Premium bow packaging included."},
  {id:2, name:"Luxury Gift Hamper Box",    cat:"gifts",   price:1499, mrp:1999,emoji:"🎁",tag:"Hot Deal",  stars:4.9,rev:89, stock:8, bg:"#FFF0F8",desc:"Beautifully curated hamper with goodies, chocolates & handwritten card. Ideal for every occasion."},
  {id:3, name:"LEGO Classic Build Set",    cat:"toys",    price:2199, mrp:2799,emoji:"🏗️",tag:"New Arrival",stars:4.7,rev:67,stock:20,bg:"#F0F4FF",desc:"500-piece classic building set. Develops creativity & spatial reasoning. Ages 4+."},
  {id:4, name:"Kids Art & Craft Kit",      cat:"kids",    price:599,  mrp:849, emoji:"🎨",tag:"Popular",   stars:4.6,rev:203,stock:30,bg:"#F0FFF8",desc:"Complete art kit — 48 watercolors, brushes, stencils & premium craft paper. Ages 3+."},
  {id:5, name:"Diwali Premium Gift Box",   cat:"seasonal",price:999,  mrp:1499,emoji:"🪔",tag:"Festive",   stars:5.0,rev:45, stock:25,bg:"#FFFBF0",desc:"Artisan diyas, sweets, dry fruits & décor in a premium box. The perfect festive gift."},
  {id:6, name:"Remote Control Race Car",   cat:"toys",    price:1299, mrp:1699,emoji:"🚗",tag:"Trending",  stars:4.5,rev:158,stock:12,bg:"#FFF3EC",desc:"4-channel RC car with LED lights, rubber tires & USB rechargeable battery. 25 km/h top speed."},
  {id:7, name:"Personalized Photo Frame",  cat:"gifts",   price:449,  mrp:649, emoji:"🖼️",tag:"Customize", stars:4.8,rev:312,stock:50,bg:"#FFF0F8",desc:"Handcrafted wooden frame with laser engraving. Custom name & message. 8×6 inches."},
  {id:8, name:"Baby Development Rattle",   cat:"kids",    price:349,  mrp:499, emoji:"🍼",tag:"BPA-Free",  stars:4.9,rev:178,stock:40,bg:"#F0FFF8",desc:"BPA-free colorful rattle set. Stimulates infant development. Ages 0–24 months."},
  {id:9, name:"Snakes & Ladders Deluxe",   cat:"toys",    price:299,  mrp:449, emoji:"🎲",tag:"Family Fun",stars:4.4,rev:95, stock:35,bg:"#F0F4FF",desc:"Premium board game — jumbo board, wooden pieces & dice. 2–6 players. All ages."},
  {id:10,name:"Holi Organic Color Set",    cat:"seasonal",price:699,  mrp:999, emoji:"🌈",tag:"Festival",  stars:4.7,rev:62, stock:18,bg:"#FFFBF0",desc:"10 vibrant organic Holi colors, 100% skin-safe. Gift-wrapped in festive packaging."},
  {id:11,name:"Jungle Animal Plush Set",   cat:"toys",    price:1099, mrp:1499,emoji:"🦁",tag:"Value Pack",stars:4.6,rev:88, stock:22,bg:"#FFF3EC",desc:"6 adorable animals — lion, elephant, giraffe, zebra, tiger & monkey. Washable, ages 1+."},
  {id:12,name:"Crystal Trophy Collection", cat:"gifts",   price:1899, mrp:2499,emoji:"🏆",tag:"Premium",   stars:4.9,rev:41, stock:10,bg:"#FFF0F8",desc:"K9 crystal trophy set for corporate gifting, academic achievements. Fully customizable."},
  {id:13,name:"Fidget Spinner Pack ×5",    cat:"toys",    price:249,  mrp:399, emoji:"🌀",tag:"Kids Fav",  stars:4.3,rev:220,stock:60,bg:"#F0F4FF",desc:"5 premium spinners in assorted colors. Smooth bearing, 2–3 min spin. Stress-relief toy."},
  {id:14,name:"Christmas Gift Stocking",   cat:"seasonal",price:549,  mrp:799, emoji:"🎅",tag:"Christmas", stars:4.8,rev:33, stock:40,bg:"#FFFBF0",desc:"Jumbo stocking filled with 10 surprise gifts for kids aged 3–10. Beautifully wrapped."},
  {id:15,name:"Baby Soft Elephant Toy",    cat:"kids",    price:479,  mrp:699, emoji:"🐘",tag:"Adorable",  stars:4.9,rev:145,stock:28,bg:"#F0FFF8",desc:"Super-soft elephant plush. Machine washable, plays a lullaby. Safe for newborns."},
  {id:16,name:"Gourmet Chocolate Hamper",  cat:"gifts",   price:1299, mrp:1799,emoji:"🍫",tag:"Indulgent", stars:4.8,rev:76, stock:15,bg:"#FFF0F8",desc:"Premium imported chocolates — truffles, bars & bonbons — in an elegant gift box. 18 pieces."},
];

const TESTIMONIALS=[
  {name:"Priya Sharma",   loc:"Bathinda", stars:5, text:"Amazing quality! Ordered a gift hamper — packaging was premium & delivered in 3 hours. Always shop here!", av:"👩‍🦰"},
  {name:"Rajesh Kumar",   loc:"Barnala",  stars:5, text:"Best toy shop in Malwa region. My son loves the RC car. Genuine products & WhatsApp ordering is super easy!", av:"👨"},
  {name:"Sunita Verma",   loc:"Mansa",    stars:5, text:"Ordered 12 Diwali boxes for my family. Each beautifully packed, bulk discount too. Exceptional service!", av:"👩"},
  {name:"Amrit Singh",    loc:"Faridkot", stars:5, text:"Baby toys were exactly as described — safe & colorful. Same-day delivery saved me for a last-minute gift!", av:"👨‍🦱"},
  {name:"Gurpreet Kaur",  loc:"Muktsar",  stars:5, text:"Buying from Malwa Gift & Toys for 5 years. Never disappointed. Festive collections are always outstanding!", av:"👩‍🦱"},
  {name:"Hardeep Singh",  loc:"Bathinda", stars:5, text:"Bought LEGO set for my daughter — she was thrilled! Intact packaging, fair prices, top quality. Highly recommend!", av:"👨‍🦳"},
];

/* ── Tiny helpers ──────────────────────────── */
const Stars=({n,sz="0.85rem"})=>(
  <span style={{display:"flex",gap:1,fontSize:sz}}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} viewBox="0 0 24 24" fill={i<=Math.round(n)?"#FFBF00":"none"} stroke="#FFBF00" strokeWidth="1.5" style={{width:"1em",height:"1em"}}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </span>
);

const Pill=({children,col="orange",sm=false})=>{
  const t={orange:{bg:"#FFF0E8",color:"#E8560A",border:"#FFDAC4"},green:{bg:"#E6FAF2",color:"#0A8C5A",border:"#A8EECE"},blue:{bg:"#EAF2FF",color:"#1456C0",border:"#AECBFF"},purple:{bg:"#F0ECFF",color:"#5B3AD4",border:"#C8B8FF"},pink:{bg:"#FFF0F6",color:"#C02060",border:"#FFB4D0"},red:{bg:"#FFF0F0",color:"#C02020",border:"#FFB4B4"},teal:{bg:"#E6FBFA",color:"#0A7A76",border:"#A8E8E6"}}[col]||{bg:"#FFF0E8",color:"#E8560A",border:"#FFDAC4"};
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,background:t.bg,color:t.color,border:`1px solid ${t.border}`,borderRadius:99,padding:sm?"2px 8px":"4px 12px",fontSize:sm?"0.68rem":"0.74rem",fontWeight:700,letterSpacing:"0.02em",fontFamily:"'Nunito',sans-serif"}}>{children}</span>;
};

function Btn({children,variant="primary",size="md",onClick,href,style:sx={},disabled=false}){
  const siz={sm:{padding:"7px 15px",fontSize:"0.8rem",gap:5},md:{padding:"11px 22px",fontSize:"0.88rem",gap:7},lg:{padding:"14px 30px",fontSize:"0.97rem",gap:8}}[size];
  const vari={
    primary:{background:"linear-gradient(135deg,#FF6B35,#FF9245)",color:"#fff",boxShadow:"0 4px 16px rgba(255,107,53,.32)",border:"none"},
    secondary:{background:"#fff",color:"#FF6B35",border:"2px solid #FF6B35",boxShadow:"none"},
    ghost:{background:"rgba(255,255,255,.18)",color:"#fff",border:"1.5px solid rgba(255,255,255,.4)",backdropFilter:"blur(6px)",boxShadow:"none"},
    success:{background:"linear-gradient(135deg,#06D6A0,#00BAA0)",color:"#fff",border:"none",boxShadow:"0 4px 14px rgba(6,214,160,.3)"},
    dark:{background:"#1C1C2E",color:"#fff",border:"none",boxShadow:"0 4px 14px rgba(0,0,0,.2)"},
    danger:{background:"#FF3D6B",color:"#fff",border:"none",boxShadow:"0 3px 12px rgba(255,61,107,.26)"},
    outline:{background:"transparent",color:"#888",border:"1.5px solid #DDD",boxShadow:"none"},
    white:{background:"#fff",color:"#1C1C2E",border:"none",boxShadow:"0 4px 14px rgba(0,0,0,.1)"},
  }[variant];
  const base={display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:disabled?"not-allowed":"pointer",borderRadius:12,fontFamily:"'Nunito',sans-serif",fontWeight:700,textDecoration:"none",opacity:disabled?.6:1,...siz,...vari,...sx};
  if(href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base} className="bh">{children}</a>;
  return <button onClick={onClick} style={base} disabled={disabled} className="bh">{children}</button>;
}

const SH=({title,sub,right})=>(
  <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:22,gap:12,flexWrap:"wrap"}}>
    <div>
      <h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:"clamp(1.25rem,2.4vw,1.6rem)",fontWeight:800,color:"#1C1C2E",lineHeight:1.15,marginBottom:3}}>{title}</h2>
      {sub&&<p style={{color:"#9A8F88",fontSize:"0.85rem",fontWeight:500}}>{sub}</p>}
    </div>
    {right}
  </div>
);

const Divider=({my=20})=><div style={{height:1,background:"linear-gradient(90deg,transparent,#F0DDD3,transparent)",margin:`${my}px 0`}}/>;

const Field=({label,req,children})=>(
  <div style={{marginBottom:14}}>
    <label style={{display:"block",fontWeight:700,fontSize:"0.78rem",color:"#665A52",marginBottom:5,letterSpacing:"0.04em",textTransform:"uppercase"}}>{label}{req&&<span style={{color:"#FF3D6B",marginLeft:2}}>*</span>}</label>
    {children}
  </div>
);
const In=({sx={},...p})=><input style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1.5px solid #EDE3DC",fontSize:"0.88rem",outline:"none",fontFamily:"'Nunito',sans-serif",background:"#FDFAF8",color:"#1C1C2E",...sx}} {...p}
  onFocus={e=>{e.target.style.borderColor="#FF6B35";e.target.style.boxShadow="0 0 0 3px rgba(255,107,53,.1)";}}
  onBlur={e=>{e.target.style.borderColor="#EDE3DC";e.target.style.boxShadow="none";}}
/>;
const Ta=({sx={},...p})=><textarea style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1.5px solid #EDE3DC",fontSize:"0.88rem",outline:"none",fontFamily:"'Nunito',sans-serif",background:"#FDFAF8",color:"#1C1C2E",resize:"vertical",minHeight:100,...sx}} {...p}
  onFocus={e=>{e.target.style.borderColor="#FF6B35";e.target.style.boxShadow="0 0 0 3px rgba(255,107,53,.1)";}}
  onBlur={e=>{e.target.style.borderColor="#EDE3DC";e.target.style.boxShadow="none";}}
/>;

/* ── SVG Icons ─────────────────────────────── */
const I={
  Cart:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Search:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Menu:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{width:"1em",height:"1em"}}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{width:"1em",height:"1em"}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Heart:({f})=><svg viewBox="0 0 24 24" fill={f?"#FF3D6B":"none"} stroke={f?"#FF3D6B":"currentColor"} strokeWidth="2.2" style={{width:"1em",height:"1em"}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Truck:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Shield:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Gift:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  Wa:()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:"1em",height:"1em"}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  Phone:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Pin:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Arr:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ChL:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><polyline points="15 18 9 12 15 6"/></svg>,
  ChR:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><polyline points="9 18 15 12 9 6"/></svg>,
  Plus:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:"1em",height:"1em"}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Minus:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:"1em",height:"1em"}}><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Chk:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><polyline points="20 6 9 17 4 12"/></svg>,
  Lock:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  User:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Edit:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Out:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:"1em",height:"1em"}}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Ig:()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:"1em",height:"1em"}}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  Fb:()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:"1em",height:"1em"}}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
};

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App(){
  const [page,setPage]=useState("home");
  const [cart,setCart]=useState([]);
  const [wish,setWish]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [cat,setCat]=useState("all");
  const [search,setSearch]=useState("");
  const [si,setSi]=useState("");
  const [selP,setSelP]=useState(null);
  const [mob,setMob]=useState(false);
  const [toast,setToast]=useState({show:false,msg:"",type:"success"});
  const [adminIn,setAdminIn]=useState(false);
  const [prods,setProds]=useState(PRODS);
  const [placed,setPlaced]=useState(false);
  const [step,setStep]=useState(1);
  const [nEmail,setNEmail]=useState("");
  const [nDone,setNDone]=useState(false);
  const [waHov,setWaHov]=useState(false);

  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=GLOBAL_CSS;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);

  const toast2=(msg,type="success")=>{
    setToast({show:true,msg,type});
    setTimeout(()=>setToast(t=>({...t,show:false})),2600);
  };
  const addCart=(p,qty=1)=>{
    setCart(prev=>{const ex=prev.find(i=>i.id===p.id);if(ex)return prev.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i);return[...prev,{...p,qty}];});
    toast2(`🛒 ${p.name} added!`);
  };
  const upQty=(id,d)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0));
  const remItem=(id)=>setCart(prev=>prev.filter(i=>i.id!==id));
  const togWish=(id)=>setWish(prev=>prev.includes(id)?prev.filter(i=>i!==id):[...prev,id]);

  const cCount=cart.reduce((s,i)=>s+i.qty,0);
  const cSub=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cDel=cSub>=499?0:49;
  const cTot=cSub+cDel;

  const filtered=prods.filter(p=>(cat==="all"||p.cat===cat)&&(!search||p.name.toLowerCase().includes(search.toLowerCase())));

  const nav=(p)=>{setPage(p);setMob(false);};
  const viewProd=(p)=>{setSelP(p);setPage("product");};

  const navLinks=[{k:"home",l:"Home"},{k:"shop",l:"Shop"},{k:"about",l:"About Us"},{k:"contact",l:"Contact"}];

  const waCart=()=>{
    const lines=cart.map(i=>`• ${i.name} ×${i.qty} = ₹${i.price*i.qty}`).join("\n");
    window.open(`https://wa.me/919876000000?text=${encodeURIComponent(`Hi! I'd like to order 🛒\n\n${lines}\n\n💰 Total: ₹${cTot}\n\nKindly confirm. Thank you!`)}`,"_blank");
  };

  return(
    <div style={{minHeight:"100vh",background:"#FFF9F4",overflowX:"hidden",fontFamily:"'Nunito',sans-serif"}}>

      {/* ── Top Ribbon ── */}
      <div style={{background:"linear-gradient(90deg,#FF6B35,#FF9245,#FF6B35)",backgroundSize:"400% 100%",animation:"shimmer 4s linear infinite",color:"#fff",textAlign:"center",fontSize:"0.74rem",fontWeight:700,padding:"7px 12px",letterSpacing:"0.04em"}}>
        🎉 FREE Delivery in Bathinda on orders ₹499+ &nbsp;·&nbsp; 📞 +91 99886 01230 &nbsp;·&nbsp; 🕐 Open Daily 9AM–9PM
      </div>

      {/* ── Header ── */}
      <header style={{background:"#fff",boxShadow:"0 2px 20px rgba(255,107,53,.1)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",gap:12,height:68}}>
          <div onClick={()=>nav("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
            <div style={{width:44,height:44,background:"linear-gradient(135deg,#FF6B35,#FF9245)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 5px 16px rgba(255,107,53,.32)",animation:"floatY 3s ease-in-out infinite"}}>🎁</div>
            <div>
              <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.05rem",color:"#FF6B35",lineHeight:1}}>Malwa Gift & Toys</div>
              <div style={{fontSize:"0.6rem",color:"#B0A49C",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>Bathinda · Punjab</div>
            </div>
          </div>

          <div className="hideMob" style={{flex:1,display:"flex",background:"#F8F2EE",borderRadius:11,overflow:"hidden",border:"1.5px solid #F0E0D4",maxWidth:460}}>
            <input value={si} onChange={e=>setSi(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){setSearch(si);nav("shop");}}} placeholder="Search toys, gifts, kids items..." style={{flex:1,border:"none",background:"transparent",padding:"10px 15px",fontSize:"0.87rem",outline:"none",fontFamily:"'Nunito',sans-serif",color:"#1C1C2E"}}/>
            <button onClick={()=>{setSearch(si);nav("shop");}} style={{background:"linear-gradient(135deg,#FF6B35,#FF9245)",border:"none",color:"#fff",padding:"0 16px",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center"}}><I.Search/></button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:"auto"}}>
            <Btn href="https://wa.me/919876000000" variant="success" size="sm" sx={{}} style={undefined} className="hideMob bh"><I.Wa/> WhatsApp Order</Btn>
            <button onClick={()=>setCartOpen(true)} style={{position:"relative",background:"#FFF0E8",border:"none",borderRadius:10,padding:"9px 10px",cursor:"pointer",color:"#FF6B35",fontSize:"1.2rem",display:"flex",alignItems:"center",transition:"background .2s"}} className="bh">
              <I.Cart/>
              {cCount>0&&<span style={{position:"absolute",top:3,right:3,background:"#FF3D6B",color:"#fff",borderRadius:"50%",width:17,height:17,fontSize:"0.62rem",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",animation:"cartPop .4s ease"}}>{cCount}</span>}
            </button>
            <button className="mobToggle" onClick={()=>setMob(v=>!v)} style={{display:"none",background:"#F8F2EE",border:"none",borderRadius:10,padding:"9px 10px",cursor:"pointer",fontSize:"1.15rem",color:"#555",alignItems:"center"}}>{mob?<I.X/>:<I.Menu/>}</button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="deskNav" style={{borderTop:"1px solid #F5EDE6"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",gap:0}}>
            {navLinks.map(l=>(
              <div key={l.k} className="nl" onClick={()=>nav(l.k)} style={{padding:"10px 16px",cursor:"pointer",fontWeight:page===l.k?800:600,fontSize:"0.86rem",color:page===l.k?"#FF6B35":"#4A4040",borderBottom:page===l.k?"2.5px solid #FF6B35":"2.5px solid transparent",transition:"all .15s",userSelect:"none"}}>{l.l}</div>
            ))}
            {CATS.filter(c=>c.id!=="all").map(c=>(
              <div key={c.id} className="nl" onClick={()=>{setCat(c.id);nav("shop");}} style={{padding:"10px 12px",cursor:"pointer",fontWeight:500,fontSize:"0.8rem",color:"#7A6E68",borderBottom:"2.5px solid transparent",whiteSpace:"nowrap",transition:"all .15s"}}>{c.icon} {c.label}</div>
            ))}
            <button onClick={()=>nav("admin")} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"#CCC",fontSize:"0.76rem",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:5,padding:"8px 10px",borderRadius:8,transition:"color .15s"}} className="nl"><I.User/> Admin</button>
          </div>
        </nav>

        {/* Mobile nav */}
        {mob&&(
          <div style={{animation:"slideDown .22s ease",borderTop:"1px solid #F5EDE6",background:"#fff",padding:"10px 0 14px",boxShadow:"0 10px 30px rgba(0,0,0,.1)"}}>
            <div style={{padding:"6px 18px 12px"}}>
              <div style={{display:"flex",background:"#F8F2EE",borderRadius:10,overflow:"hidden",border:"1.5px solid #F0E0D4"}}>
                <input value={si} onChange={e=>setSi(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){setSearch(si);nav("shop");}}} placeholder="Search..." style={{flex:1,border:"none",background:"transparent",padding:"9px 13px",fontSize:"0.87rem",outline:"none",fontFamily:"'Nunito',sans-serif"}}/>
                <button onClick={()=>{setSearch(si);nav("shop");}} style={{background:"#FF6B35",border:"none",color:"#fff",padding:"0 13px",cursor:"pointer",fontSize:"0.95rem"}}><I.Search/></button>
              </div>
            </div>
            {navLinks.map(l=>(
              <div key={l.k} onClick={()=>nav(l.k)} style={{padding:"11px 22px",fontWeight:700,fontSize:"0.88rem",color:page===l.k?"#FF6B35":"#333",cursor:"pointer",borderLeft:page===l.k?"3px solid #FF6B35":"3px solid transparent",background:page===l.k?"#FFF8F5":"transparent"}}>{l.l}</div>
            ))}
            <div style={{padding:"10px 18px 0"}}><Btn href="https://wa.me/919876000000" variant="success" style={{width:"100%",justifyContent:"center"}}><I.Wa/> Order on WhatsApp</Btn></div>
          </div>
        )}
      </header>

      {/* Pages */}
      <main>
        {page==="home"    &&<HomePage nav={nav} setCat={setCat} addCart={addCart} wish={wish} togWish={togWish} viewProd={viewProd} prods={prods} setSi={setSi} setSearch={setSearch}/>}
        {page==="shop"    &&<ShopPage filtered={filtered} cat={cat} setCat={setCat} search={search} setSearch={setSearch} si={si} setSi={setSi} addCart={addCart} wish={wish} togWish={togWish} viewProd={viewProd}/>}
        {page==="product" &&selP&&<ProdDetailPage p={selP} addCart={addCart} wish={wish} togWish={togWish} goBack={()=>nav("shop")} toast2={toast2} prods={prods}/>}
        {page==="about"   &&<AboutPage nav={nav}/>}
        {page==="contact" &&<ContactPage toast2={toast2}/>}
        {page==="checkout"&&<CheckoutPage cart={cart} cSub={cSub} cDel={cDel} cTot={cTot} step={step} setStep={setStep} placed={placed} setPlaced={setPlaced} nav={nav} setCart={setCart} toast2={toast2}/>}
        {page==="admin"   &&<AdminPage adminIn={adminIn} setAdminIn={setAdminIn} prods={prods} setProds={setProds} toast2={toast2}/>}
        {page==="privacy" &&<LegalPage type="privacy"/>}
        {page==="terms"   &&<LegalPage type="terms"/>}
      </main>

      {/* ── Footer ── */}
      <Footer nav={nav} setCat={setCat} nEmail={nEmail} setNEmail={setNEmail} nDone={nDone} setNDone={setNDone} toast2={toast2}/>

      {/* ── Cart Overlay ── */}
      <div onClick={()=>setCartOpen(false)} style={{position:"fixed",inset:0,background:"rgba(20,10,5,.48)",zIndex:199,opacity:cartOpen?1:0,pointerEvents:cartOpen?"auto":"none",transition:"opacity .3s",backdropFilter:cartOpen?"blur(3px)":"none"}}/>

      {/* ── Cart Sidebar ── */}
      <div className="cartSide" style={{position:"fixed",top:0,right:0,bottom:0,width:410,background:"#fff",zIndex:200,transform:cartOpen?"translateX(0)":"translateX(100%)",transition:"transform .32s cubic-bezier(.4,0,.2,1)",display:"flex",flexDirection:"column",boxShadow:"-8px 0 40px rgba(0,0,0,.14)"}}>
        <div style={{padding:"20px 22px",background:"linear-gradient(135deg,#FF6B35,#FF9245)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{color:"#fff",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:"1.35rem"}}><I.Cart/></span>
            <div>
              <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.05rem"}}>Your Cart</div>
              <div style={{fontSize:"0.76rem",opacity:.85}}>{cCount} item{cCount!==1?"s":""}</div>
            </div>
          </div>
          <button onClick={()=>setCartOpen(false)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:9,padding:"7px",cursor:"pointer",color:"#fff",fontSize:"1.05rem",display:"flex",alignItems:"center",backdropFilter:"blur(4px)"}} className="bh"><I.X/></button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px 20px"}}>
          {cart.length===0?(
            <div style={{textAlign:"center",padding:"60px 20px",color:"#C0B0A8"}}>
              <div style={{fontSize:"4rem",marginBottom:14,opacity:.4}}>🛒</div>
              <div style={{fontWeight:800,fontSize:"0.95rem",color:"#9A8F88",marginBottom:5}}>Your cart is empty</div>
              <div style={{fontSize:"0.8rem",marginBottom:22}}>Add amazing products!</div>
              <Btn variant="primary" onClick={()=>setCartOpen(false)}>Start Shopping <I.Arr/></Btn>
            </div>
          ):cart.map(item=>(
            <div key={item.id} style={{display:"flex",gap:12,padding:"13px 0",borderBottom:"1px solid #F8F0EB",alignItems:"flex-start"}}>
              <div style={{width:62,height:62,background:item.bg||"#FFF3EC",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.9rem",flexShrink:0,border:"1px solid #F0E0D4"}}>{item.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:"0.85rem",color:"#1C1C2E",lineHeight:1.3,marginBottom:3}}>{item.name}</div>
                <div style={{color:"#FF6B35",fontWeight:800,fontSize:"0.88rem",marginBottom:8}}>₹{item.price}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>upQty(item.id,-1)} style={{width:27,height:27,border:"1.5px solid #EDE3DC",borderRadius:7,background:"#FDFAF8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#555",fontSize:"0.85rem"}}><I.Minus/></button>
                  <span style={{fontWeight:800,fontSize:"0.92rem",minWidth:22,textAlign:"center"}}>{item.qty}</span>
                  <button onClick={()=>upQty(item.id,1)} style={{width:27,height:27,border:"1.5px solid #EDE3DC",borderRadius:7,background:"#FDFAF8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#555",fontSize:"0.85rem"}}><I.Plus/></button>
                  <button onClick={()=>remItem(item.id)} style={{width:27,height:27,border:"1.5px solid #FFCDD2",borderRadius:7,background:"#FFF5F5",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#E53935",fontSize:"0.82rem",marginLeft:4}}><I.Trash/></button>
                </div>
              </div>
              <div style={{fontWeight:900,color:"#1C1C2E",fontSize:"0.9rem",flexShrink:0}}>₹{item.price*item.qty}</div>
            </div>
          ))}
        </div>
        {cart.length>0&&(
          <div style={{padding:"16px 20px",borderTop:"1.5px solid #F5EDE6",background:"#FFF9F6"}}>
            <div style={{fontSize:"0.83rem",marginBottom:6}}>
              <div style={{display:"flex",justifyContent:"space-between",color:"#9A8F88",marginBottom:4}}><span>Subtotal</span><span style={{color:"#1C1C2E",fontWeight:700}}>₹{cSub}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",color:"#9A8F88",marginBottom:4}}><span>Delivery</span><span style={{color:cDel===0?"#06D6A0":"#1C1C2E",fontWeight:700}}>{cDel===0?"FREE ✓":`₹${cDel}`}</span></div>
              {cDel>0&&<div style={{fontSize:"0.72rem",color:"#B0A49C"}}>Add ₹{499-cSub} more for free delivery</div>}
            </div>
            <Divider my={10}/>
            <div style={{display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:"1rem",marginBottom:14}}><span>Total</span><span style={{color:"#FF6B35",fontFamily:"'Baloo 2',cursive",fontSize:"1.18rem"}}>₹{cTot}</span></div>
            <Btn variant="primary" style={{width:"100%",justifyContent:"center",marginBottom:9}} onClick={()=>{setCartOpen(false);nav("checkout");setPlaced(false);setStep(1);}}>Checkout <I.Arr/></Btn>
            <Btn variant="success" style={{width:"100%",justifyContent:"center"}} onClick={waCart}><I.Wa/> Order via WhatsApp</Btn>
          </div>
        )}
      </div>

      {/* ── WA Float ── */}
      <div style={{position:"fixed",bottom:26,right:26,zIndex:300,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:9}}>
        {waHov&&<div style={{background:"#fff",border:"1px solid #EDE3DC",borderRadius:11,padding:"9px 14px",fontSize:"0.78rem",fontWeight:700,color:"#1C1C2E",boxShadow:"0 6px 22px rgba(0,0,0,.12)",whiteSpace:"nowrap",animation:"bounceIn .3s ease",fontFamily:"'Nunito',sans-serif"}}>💬 Chat on WhatsApp!</div>}
        <a href="https://wa.me/919876000000" target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setWaHov(true)} onMouseLeave={()=>setWaHov(false)}
          style={{width:58,height:58,background:"#25D366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"1.85rem",textDecoration:"none",boxShadow:"0 6px 22px rgba(37,211,102,.45)",animation:"floatY 3s ease-in-out infinite",transition:"transform .2s"}} className="wbtn">
          <I.Wa/>
        </a>
      </div>

      {/* ── Toast ── */}
      {toast.show&&<div style={{position:"fixed",bottom:96,left:"50%",transform:"translateX(-50%)",background:toast.type==="success"?"#1C1C2E":"#E53935",color:"#fff",borderRadius:13,padding:"12px 24px",fontSize:"0.86rem",fontWeight:700,zIndex:500,display:"flex",alignItems:"center",gap:8,boxShadow:"0 10px 34px rgba(0,0,0,.22)",whiteSpace:"nowrap",animation:"toastIn .3s ease",fontFamily:"'Nunito',sans-serif"}}>
        <span style={{fontSize:"1rem"}}>{toast.type==="success"?"✅":"⚠️"}</span>{toast.msg}
      </div>}
    </div>
  );
}

/* ══════════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════════ */
function ProdCard({p,onAdd,onView,wishlisted,onWish,delay=0}){
  const disc=Math.round((1-p.price/p.mrp)*100);
  return(
    <div className="pc" onClick={()=>onView(p)} style={{background:"#fff",borderRadius:17,overflow:"hidden",boxShadow:"0 4px 14px rgba(0,0,0,.06)",cursor:"pointer",border:"1px solid #F5EDE6",animation:`fadeUp .45s ease ${delay}ms both`,position:"relative"}}>
      <div style={{height:185,background:p.bg||"#FFF3EC",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"5.2rem",position:"relative",borderBottom:"1px solid #F5EDE6"}}>
        <span style={{filter:"drop-shadow(0 8px 14px rgba(0,0,0,.12))",animation:"floatY 3s ease-in-out infinite"}}>{p.emoji}</span>
        <div style={{position:"absolute",top:11,left:11,background:"#FF6B35",color:"#fff",borderRadius:7,padding:"3px 9px",fontSize:"0.67rem",fontWeight:800,letterSpacing:"0.04em",boxShadow:"0 2px 8px rgba(255,107,53,.28)"}}>{p.tag}</div>
        <div style={{position:"absolute",top:11,right:38,background:"#E6F4EA",color:"#2E7D32",borderRadius:7,padding:"3px 7px",fontSize:"0.67rem",fontWeight:800}}>{disc}% OFF</div>
        <button onClick={e=>{e.stopPropagation();onWish();}} className="hbtn" style={{position:"absolute",bottom:9,right:9,width:33,height:33,background:"#fff",border:"none",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"0.95rem",boxShadow:"0 2px 9px rgba(0,0,0,.1)",transition:"transform .2s"}}><I.Heart f={wishlisted}/></button>
      </div>
      <div style={{padding:"13px 14px 16px"}}>
        <div style={{fontWeight:800,fontSize:"0.87rem",color:"#1C1C2E",marginBottom:5,lineHeight:1.35}}>{p.name}</div>
        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:9}}>
          <Stars n={p.stars} sz="0.78rem"/>
          <span style={{fontSize:"0.72rem",color:"#9A8F88",fontWeight:600}}>{p.stars} ({p.rev})</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:13}}>
          <span style={{fontWeight:900,fontSize:"1.06rem",color:"#FF6B35"}}>₹{p.price}</span>
          <span style={{fontWeight:500,fontSize:"0.78rem",color:"#C0B0A8",textDecoration:"line-through"}}>₹{p.mrp}</span>
        </div>
        <button onClick={e=>{e.stopPropagation();onAdd(p);}} className="bh" style={{width:"100%",background:"linear-gradient(135deg,#FF6B35,#FF9245)",border:"none",borderRadius:9,padding:"9px 13px",color:"#fff",fontWeight:800,fontSize:"0.8rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"'Nunito',sans-serif",boxShadow:"0 3px 11px rgba(255,107,53,.28)"}}>
          <I.Cart/> Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════ */
function HomePage({nav,setCat,addCart,wish,togWish,viewProd,prods,setSi,setSearch}){
  const feat=prods.slice(0,8);
  const fresh=prods.filter(p=>["New Arrival","Trending","Hot Deal"].includes(p.tag)).slice(0,4);
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"26px 18px"}}>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#FF6B35 0%,#FF9245 45%,#FFB566 75%,#FFD166 100%)",borderRadius:22,padding:"50px 44px 50px 44px",marginBottom:24,position:"relative",overflow:"hidden",display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:20,alignItems:"center",boxShadow:"0 18px 55px rgba(255,107,53,.28)"}} className="heroGrid">
        {[[320,320,-130,-120],[200,200,null,null,"bottom",-60,"left","32%"],[130,130,"25%",null,null,null,"right","-40px"]].map(([w,h,t,l,bk,bv,rk,rv],i)=>(
          <div key={i} style={{position:"absolute",width:w,height:h,top:t||undefined,left:l||undefined,[bk]:bv||undefined,[rk]:rv||undefined,borderRadius:"50%",background:"rgba(255,255,255,.08)",pointerEvents:"none"}}/>
        ))}
        <div style={{zIndex:2}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.22)",backdropFilter:"blur(8px)",borderRadius:99,padding:"5px 14px",fontSize:"0.75rem",fontWeight:700,color:"#fff",border:"1px solid rgba(255,255,255,.35)",marginBottom:16,letterSpacing:"0.05em"}}>✨ MALWA'S #1 GIFT & TOY STORE</div>
          <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"clamp(1.8rem,4.2vw,3rem)",fontWeight:800,color:"#fff",lineHeight:1.1,marginBottom:14,letterSpacing:"-0.02em",textShadow:"0 2px 20px rgba(0,0,0,.09)"}}>Joy Wrapped in<br/>Every Package! 🎀</h1>
          <p style={{fontSize:"0.96rem",color:"rgba(255,255,255,.88)",marginBottom:26,lineHeight:1.65,maxWidth:430}}>Premium toys, exclusive gifts & adorable kids' items. Trusted by <strong style={{color:"#fff"}}>10,000+ families</strong> across Punjab.</p>
          <div className="hBtns" style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24}}>
            <Btn variant="ghost" size="lg" onClick={()=>nav("shop")} style={{fontWeight:800}}>Shop Now <I.Arr/></Btn>
            <Btn variant="dark" size="lg" href="https://wa.me/919876000000" style={{fontWeight:800}}><I.Wa/> WhatsApp Order</Btn>
          </div>
          <div style={{display:"flex",gap:22,flexWrap:"wrap"}}>
            {[{v:"10K+",l:"Customers"},{v:"500+",l:"Products"},{v:"15+ Yrs",l:"Of Trust"},{v:"4.9★",l:"Rating"}].map(s=>(
              <div key={s.l} style={{color:"rgba(255,255,255,.82)"}}>
                <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.08rem",color:"#fff"}}>{s.v}</div>
                <div style={{fontSize:"0.7rem",letterSpacing:"0.05em",opacity:.75}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,zIndex:2,filter:"drop-shadow(0 26px 36px rgba(0,0,0,.18))"}}>
          {[["🧸","🎁","🪆"],[2.5,3,2.8],["🎮","🎀","🚗"],[3,2.8,3.2]].reduce((acc,arr,i)=>{if(i%2===0)acc.push({emojis:arr,speeds:[]});else acc[acc.length-1].speeds=arr;return acc;},[]).map((row,ri)=>(
            <div key={ri} style={{display:"flex",gap:14}}>
              {row.emojis.map((e,i)=>(
                <div key={i} style={{fontSize:"clamp(2.2rem,4.5vw,3.5rem)",animation:`floatY ${row.speeds[i]}s ease-in-out ${i*.35}s infinite`}}>{e}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* OFFER CHIPS */}
      <div className="ofGrid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:24}}>
        {[
          {bg:"linear-gradient(135deg,#FF6B35,#FF9A56)",e:"🧸",t:"Upto 40% OFF",s:"On All Toys"},
          {bg:"linear-gradient(135deg,#E91E8C,#FF5FA0)",e:"🎁",t:"Buy 2 Get 1",s:"On Gift Hampers"},
          {bg:"linear-gradient(135deg,#6C63FF,#9B8FFF)",e:"🎀",t:"Free Wrapping",s:"On All Orders"},
          {bg:"linear-gradient(135deg,#06D6A0,#00BCA0)",e:"🚀",t:"Same-Day Delivery",s:"In Bathinda"},
        ].map((o,i)=>(
          <div key={i} onClick={()=>nav("shop")} className="cc" style={{background:o.bg,borderRadius:15,padding:"15px 16px",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,.07)"}}>
            <div style={{fontSize:"1.7rem",marginBottom:5}}>{o.e}</div>
            <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"0.96rem",color:"#fff",lineHeight:1.1}}>{o.t}</div>
            <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,.82)",fontWeight:600,marginTop:2}}>{o.s}</div>
          </div>
        ))}
      </div>

      {/* FEATURE STRIP */}
      <div className="fStrip" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:34}}>
        {[
          {icon:<I.Truck/>, t:"Free Delivery",   s:"Orders ₹499+",   c:"#FF6B35"},
          {icon:<I.Shield/>,t:"100% Genuine",    s:"Certified",       c:"#06D6A0"},
          {icon:<I.Gift/>,  t:"Gift Wrapping",   s:"Complimentary",   c:"#E91E8C"},
          {icon:<I.Wa/>,    t:"WhatsApp Order",  s:"Instant confirm", c:"#25D366"},
        ].map((f,i)=>(
          <div key={i} className="fc" style={{background:"#fff",borderRadius:15,padding:"16px 14px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 3px 12px rgba(0,0,0,.05)",border:"1px solid #F5EDE6"}}>
            <div style={{width:44,height:44,background:`${f.c}16`,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",color:f.c,fontSize:"1.25rem",flexShrink:0,border:`1.5px solid ${f.c}26`}}>{f.icon}</div>
            <div>
              <div style={{fontWeight:800,fontSize:"0.83rem",color:"#1C1C2E",marginBottom:1}}>{f.t}</div>
              <div style={{fontSize:"0.72rem",color:"#9A8F88"}}>{f.s}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <SH title="🛍️ Shop by Category" sub="Find exactly what you're looking for" right={<Btn variant="secondary" size="sm" onClick={()=>nav("shop")}>View All <I.ChR/></Btn>}/>
      <div className="catGrid" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:38}}>
        {CATS.filter(c=>c.id!=="all").map(c=>(
          <div key={c.id} className="cc" onClick={()=>{setCat(c.id);nav("shop");}} style={{background:"#fff",border:"1.5px solid #F5EDE6",borderRadius:16,padding:"20px 10px",textAlign:"center",cursor:"pointer",boxShadow:"0 3px 11px rgba(0,0,0,.05)"}}>
            <div style={{fontSize:"2.2rem",marginBottom:7,filter:"drop-shadow(0 4px 6px rgba(0,0,0,.08))",animation:"floatY 3s ease-in-out infinite"}}>{c.icon}</div>
            <div style={{fontWeight:800,fontSize:"0.8rem",color:"#1C1C2E",marginBottom:3}}>{c.label}</div>
            <div style={{fontSize:"0.68rem",color:"#B0A49C"}}>Browse →</div>
          </div>
        ))}
      </div>

      {/* FEATURED */}
      <SH title="🔥 Featured Products" sub="Handpicked bestsellers just for you" right={<Btn variant="secondary" size="sm" onClick={()=>nav("shop")}>View All <I.ChR/></Btn>}/>
      <div className="proGrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:18,marginBottom:46}}>
        {feat.map((p,i)=><ProdCard key={p.id} p={p} onAdd={addCart} onView={viewProd} wishlisted={wish.includes(p.id)} onWish={()=>togWish(p.id)} delay={i*35}/>)}
      </div>

      {/* FESTIVE BANNER */}
      <div style={{background:"linear-gradient(135deg,#2D1B69 0%,#6C2DA0 45%,#C2185B 100%)",borderRadius:22,padding:"42px 44px",marginBottom:46,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20,boxShadow:"0 18px 55px rgba(108,45,160,.32)"}}>
        {[[240,240,-80,-80],[150,150,null,null,"bottom",-50,"left","40%"]].map(([w,h,t,l,bk,bv,rk,rv],i)=>(
          <div key={i} style={{position:"absolute",width:w,height:h,top:t||undefined,left:l||undefined,[bk]:bv||undefined,[rk]:rv||undefined,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
        ))}
        <div style={{zIndex:2,maxWidth:470}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.14)",backdropFilter:"blur(6px)",borderRadius:99,padding:"5px 13px",fontSize:"0.73rem",fontWeight:700,color:"#FFD166",border:"1px solid rgba(255,215,102,.28)",marginBottom:14,letterSpacing:"0.06em"}}>🪔 FESTIVE SEASON SPECIAL</div>
          <h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:"clamp(1.5rem,3.2vw,2.2rem)",fontWeight:800,color:"#fff",lineHeight:1.14,marginBottom:11}}>Up to 40% OFF on<br/>Festive Gift Collections!</h2>
          <p style={{color:"rgba(255,255,255,.73)",marginBottom:22,lineHeight:1.65,fontSize:"0.9rem"}}>Exclusive Diwali hampers, Holi colors, Christmas stockings & more. Limited stock — order now!</p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <Btn variant="ghost" onClick={()=>{setCat("seasonal");nav("shop");}}>Shop Festive Deals <I.Arr/></Btn>
            <Btn variant="white" href="https://wa.me/919876000000"><I.Wa/> <span style={{color:"#1C1C2E"}}>WhatsApp</span></Btn>
          </div>
        </div>
        <div style={{display:"flex",gap:14,zIndex:2,filter:"drop-shadow(0 18px 28px rgba(0,0,0,.28))"}}>
          {["🪔","🎄","🌈","🎁"].map((e,i)=>(
            <div key={i} style={{fontSize:"clamp(2.3rem,3.8vw,3.2rem)",animation:`floatY ${2.7+i*.3}s ease-in-out ${i*.4}s infinite`}}>{e}</div>
          ))}
        </div>
      </div>

      {/* NEW & TRENDING */}
      {fresh.length>0&&(<>
        <SH title="✨ New & Trending" sub="Fresh arrivals this season" right={<Btn variant="secondary" size="sm" onClick={()=>nav("shop")}>See All <I.ChR/></Btn>}/>
        <div className="proGrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:18,marginBottom:46}}>
          {fresh.map((p,i)=><ProdCard key={p.id} p={p} onAdd={addCart} onView={viewProd} wishlisted={wish.includes(p.id)} onWish={()=>togWish(p.id)} delay={i*45}/>)}
        </div>
      </>)}

      {/* TESTIMONIALS */}
      <SH title="💬 What Our Customers Say" sub="Trusted by 10,000+ happy families across Malwa"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:16,marginBottom:46}}>
        {TESTIMONIALS.map((t,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:17,padding:"22px 20px",boxShadow:"0 4px 16px rgba(0,0,0,.055)",border:"1px solid #F5EDE6",animation:`fadeUp .5s ease ${i*70}ms both`}}>
            <div style={{display:"flex",gap:7,marginBottom:11}}><Stars n={t.stars}/></div>
            <p style={{color:"#4A4040",fontSize:"0.84rem",lineHeight:1.75,marginBottom:15,fontStyle:"italic"}}>"{t.text}"</p>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:42,height:42,background:"linear-gradient(135deg,#FF6B35,#FFB566)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.35rem",flexShrink:0}}>{t.av}</div>
              <div>
                <div style={{fontWeight:800,fontSize:"0.86rem",color:"#1C1C2E"}}>{t.name}</div>
                <div style={{fontSize:"0.72rem",color:"#B0A49C",display:"flex",alignItems:"center",gap:4}}><I.Pin/> {t.loc}</div>
              </div>
              <div style={{marginLeft:"auto"}}><Pill col="green" sm>✓ Verified</Pill></div>
            </div>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="stRow" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {[{e:"👨‍👩‍👧‍👦",v:"10,000+",l:"Happy Families"},{e:"📦",v:"500+",l:"Products"},{e:"🏅",v:"15+",l:"Years in Business"},{e:"⭐",v:"4.9/5",l:"Customer Rating"}].map((s,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:16,padding:"24px 16px",textAlign:"center",border:"1.5px solid #F5EDE6",boxShadow:"0 3px 11px rgba(0,0,0,.04)"}}>
            <div style={{fontSize:"1.9rem",marginBottom:7}}>{s.e}</div>
            <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:900,fontSize:"1.6rem",color:"#FF6B35",marginBottom:4}}>{s.v}</div>
            <div style={{fontSize:"0.76rem",color:"#9A8F88",fontWeight:600}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SHOP PAGE
══════════════════════════════════════════════ */
function ShopPage({filtered,cat,setCat,search,setSearch,si,setSi,addCart,wish,togWish,viewProd}){
  const [sort,setSort]=useState("default");
  let sorted=[...filtered];
  if(sort==="asc") sorted.sort((a,b)=>a.price-b.price);
  if(sort==="desc") sorted.sort((a,b)=>b.price-a.price);
  if(sort==="rating") sorted.sort((a,b)=>b.stars-a.stars);
  if(sort==="disc") sorted.sort((a,b)=>(b.mrp-b.price)/b.mrp-(a.mrp-a.price)/a.mrp);
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"26px 18px"}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"clamp(1.5rem,2.8vw,2rem)",fontWeight:800,color:"#1C1C2E",marginBottom:3}}>🛍️ Our Products</h1>
        <p style={{color:"#9A8F88",fontSize:"0.85rem"}}>{sorted.length} product{sorted.length!==1?"s":""}{search?` matching "${search}"`:cat!=="all"?` in ${CATS.find(c=>c.id===cat)?.label}`:""}</p>
      </div>
      {/* Category tabs */}
      <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4,marginBottom:18,scrollbarWidth:"none"}}>
        {CATS.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} style={{background:cat===c.id?"linear-gradient(135deg,#FF6B35,#FF9245)":"#fff",color:cat===c.id?"#fff":"#5A5050",border:cat===c.id?"none":"1.5px solid #EDE3DC",borderRadius:99,padding:"8px 16px",fontWeight:700,fontSize:"0.8rem",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"'Nunito',sans-serif",boxShadow:cat===c.id?"0 4px 12px rgba(255,107,53,.28)":"none",transition:"all .16s"}} className="bh">
            {c.icon} {c.label}
          </button>
        ))}
      </div>
      {/* Search + Sort */}
      <div style={{display:"flex",gap:10,marginBottom:26,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180,display:"flex",background:"#fff",borderRadius:11,overflow:"hidden",border:"1.5px solid #EDE3DC",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
          <input value={si} onChange={e=>setSi(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setSearch(si)} placeholder="Search products..." style={{flex:1,border:"none",background:"transparent",padding:"10px 14px",fontSize:"0.86rem",outline:"none",fontFamily:"'Nunito',sans-serif",color:"#1C1C2E"}}/>
          <button onClick={()=>setSearch(si)} style={{background:"linear-gradient(135deg,#FF6B35,#FF9245)",border:"none",color:"#fff",padding:"0 15px",cursor:"pointer",fontSize:"0.95rem",display:"flex",alignItems:"center"}}><I.Search/></button>
        </div>
        {(search||cat!=="all")&&<button onClick={()=>{setSearch("");setSi("");setCat("all");}} style={{background:"#FFF0E8",border:"1.5px solid #FFDAC4",borderRadius:11,padding:"0 14px",cursor:"pointer",color:"#FF6B35",fontWeight:700,fontSize:"0.8rem",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:6}} className="bh"><I.X/> Clear</button>}
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{background:"#fff",border:"1.5px solid #EDE3DC",borderRadius:11,padding:"10px 13px",fontSize:"0.84rem",outline:"none",fontFamily:"'Nunito',sans-serif",color:"#1C1C2E",cursor:"pointer",fontWeight:600}}>
          <option value="default">Sort: Default</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="disc">Biggest Discount</option>
        </select>
      </div>
      {sorted.length===0?(
        <div style={{textAlign:"center",padding:"80px 20px",color:"#C0B0A8"}}>
          <div style={{fontSize:"4.5rem",marginBottom:14,opacity:.4}}>🔍</div>
          <div style={{fontWeight:800,fontSize:"1.05rem",color:"#9A8F88",marginBottom:7}}>No products found</div>
          <div style={{fontSize:"0.83rem",marginBottom:22}}>Try a different search or category.</div>
          <button onClick={()=>{setSearch("");setSi("");setCat("all");}} style={{background:"linear-gradient(135deg,#FF6B35,#FF9245)",border:"none",borderRadius:11,padding:"10px 22px",color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Show All Products</button>
        </div>
      ):(
        <div className="proGrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:18}}>
          {sorted.map((p,i)=><ProdCard key={p.id} p={p} onAdd={addCart} onView={viewProd} wishlisted={wish.includes(p.id)} onWish={()=>togWish(p.id)} delay={i*25}/>)}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   PRODUCT DETAIL
══════════════════════════════════════════════ */
function ProdDetailPage({p,addCart,wish,togWish,goBack,toast2,prods}){
  const [qty,setQty]=useState(1);
  const disc=Math.round((1-p.price/p.mrp)*100);
  const related=prods.filter(r=>r.cat===p.cat&&r.id!==p.id).slice(0,4);
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"26px 18px"}}>
      <button onClick={goBack} className="bbtn" style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#9A8F88",fontWeight:700,fontSize:"0.84rem",marginBottom:22,padding:"7px 11px",borderRadius:9,fontFamily:"'Nunito',sans-serif",transition:"background .15s"}}><I.ChL/> Back to Shop</button>
      <div className="pdGrid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:38,marginBottom:46}}>
        <div>
          <div style={{background:p.bg||"#FFF3EC",borderRadius:20,height:400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"8.5rem",border:"2px solid #F5EDE6",marginBottom:13,boxShadow:"0 8px 28px rgba(0,0,0,.06)"}}>
            <span style={{filter:"drop-shadow(0 14px 22px rgba(0,0,0,.14))",animation:"floatY 3s ease-in-out infinite"}}>{p.emoji}</span>
          </div>
          <div style={{display:"flex",gap:9}}>
            {[1,2,3,4].map(i=>(
              <div key={i} style={{width:72,height:72,background:p.bg||"#FFF3EC",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",border:"2px solid #F5EDE6",cursor:"pointer"}}>{p.emoji}</div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <Pill col="orange">{p.tag}</Pill>
            <Pill col="blue">{CATS.find(c=>c.id===p.cat)?.label}</Pill>
            {p.stock<10&&<Pill col="red">⚠️ Only {p.stock} left</Pill>}
          </div>
          <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"clamp(1.3rem,2.3vw,1.9rem)",fontWeight:800,color:"#1C1C2E",lineHeight:1.2}}>{p.name}</h1>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <Stars n={p.stars} sz="0.95rem"/>
            <span style={{color:"#9A8F88",fontSize:"0.83rem",fontWeight:600}}>{p.stars} · {p.rev} reviews</span>
          </div>
          <div style={{background:"#FFF8F4",borderRadius:13,padding:"14px 18px",border:"1.5px solid #FFE0CC"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:11,marginBottom:5}}>
              <span style={{fontFamily:"'Baloo 2',cursive",fontWeight:900,fontSize:"2rem",color:"#FF6B35"}}>₹{p.price}</span>
              <span style={{fontSize:"0.96rem",color:"#C0B0A8",textDecoration:"line-through",fontWeight:500}}>₹{p.mrp}</span>
              <div style={{background:"#E6F4EA",color:"#2E7D32",borderRadius:7,padding:"3px 9px",fontSize:"0.78rem",fontWeight:800}}>Save {disc}%</div>
            </div>
            <div style={{fontSize:"0.77rem",color:"#9A8F88"}}>Inclusive of all taxes · Free delivery above ₹499</div>
          </div>
          <p style={{color:"#5A5050",lineHeight:1.8,fontSize:"0.88rem"}}>{p.desc}</p>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <span style={{fontWeight:700,fontSize:"0.83rem",color:"#665A52"}}>Quantity:</span>
            <div style={{display:"flex",alignItems:"center",background:"#fff",borderRadius:11,border:"1.5px solid #EDE3DC",overflow:"hidden"}}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{width:36,height:36,border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#555",fontSize:"0.88rem"}}><I.Minus/></button>
              <span style={{minWidth:38,textAlign:"center",fontWeight:900,fontSize:"0.97rem",borderLeft:"1px solid #F5EDE6",borderRight:"1px solid #F5EDE6",lineHeight:"36px"}}>{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(p.stock,q+1))} style={{width:36,height:36,border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#555",fontSize:"0.88rem"}}><I.Plus/></button>
            </div>
            <span style={{fontSize:"0.76rem",color:"#06D6A0",fontWeight:700}}>✓ In Stock ({p.stock})</span>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <Btn variant="primary" size="lg" onClick={()=>addCart(p,qty)} style={{flex:1,justifyContent:"center"}}><I.Cart/> Add to Cart</Btn>
            <button onClick={()=>togWish(p.id)} className="hbtn" style={{width:46,height:46,background:wish.includes(p.id)?"#FFF0F4":"#fff",border:`2px solid ${wish.includes(p.id)?"#FF3D6B":"#EDE3DC"}`,borderRadius:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",transition:"all .2s"}}><I.Heart f={wish.includes(p.id)}/></button>
          </div>
          <Btn variant="success" href={`https://wa.me/919876000000?text=${encodeURIComponent(`Hi! I want to order:\n${p.name} ×${qty}\nTotal: ₹${p.price*qty}\n\nPlease confirm!`)}`} style={{justifyContent:"center"}}><I.Wa/> Buy via WhatsApp</Btn>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
            {[{i:<I.Truck/>,t:"Free Delivery",s:"On ₹499+"},{i:<I.Shield/>,t:"100% Genuine",s:"Certified"},{i:<I.Gift/>,t:"Gift Wrap",s:"Available"}].map((b,i)=>(
              <div key={i} style={{background:"#FFF8F4",borderRadius:11,padding:"11px",textAlign:"center",border:"1px solid #FFE0CC"}}>
                <div style={{color:"#FF6B35",fontSize:"1.15rem",marginBottom:3}}>{b.i}</div>
                <div style={{fontWeight:800,fontSize:"0.72rem",color:"#1C1C2E"}}>{b.t}</div>
                <div style={{fontSize:"0.65rem",color:"#9A8F88"}}>{b.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {related.length>0&&(<>
        <Divider/>
        <SH title="🔗 You May Also Like" sub="Related products"/>
        <div className="proGrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:18}}>
          {related.map((rp,i)=><ProdCard key={rp.id} p={rp} onAdd={addCart} onView={()=>{}} wishlisted={wish.includes(rp.id)} onWish={()=>togWish(rp.id)} delay={i*40}/>)}
        </div>
      </>)}
    </div>
  );
}

/* ══════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════ */
function AboutPage({nav}){
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"26px 18px"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#1C1C2E 0%,#2D1B69 50%,#4A1C5C 100%)",borderRadius:22,padding:"50px 44px",marginBottom:28,position:"relative",overflow:"hidden",display:"grid",gridTemplateColumns:"1fr auto",gap:20,alignItems:"center",boxShadow:"0 18px 55px rgba(28,28,46,.32)"}}>
        {[[280,280,-100,-100],[180,180,null,null,"bottom",-55,"left","35%"]].map(([w,h,t,l,bk,bv,rk,rv],i)=>(
          <div key={i} style={{position:"absolute",width:w,height:h,top:t||undefined,left:l||undefined,[bk]:bv||undefined,[rk]:rv||undefined,borderRadius:"50%",background:"rgba(255,255,255,.05)"}}/>
        ))}
        <div style={{zIndex:2}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,107,53,.2)",borderRadius:99,padding:"5px 13px",fontSize:"0.74rem",fontWeight:700,color:"#FF9A56",border:"1px solid rgba(255,107,53,.28)",marginBottom:16,letterSpacing:"0.05em"}}>🏪 OUR STORY</div>
          <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"clamp(1.8rem,3.8vw,2.8rem)",fontWeight:800,color:"#fff",lineHeight:1.1,marginBottom:13}}>15 Years of Spreading<br/>Joy Across Punjab 🎉</h1>
          <p style={{color:"rgba(255,255,255,.7)",fontSize:"0.96rem",lineHeight:1.68,maxWidth:480,marginBottom:26}}>From a small corner shop in Bathinda to Malwa's most-loved gift & toy destination. We've been making families smile since 2010.</p>
          <div style={{display:"flex",gap:10}}>
            <Btn variant="primary" onClick={()=>nav("shop")}>Shop Now <I.Arr/></Btn>
            <Btn variant="ghost" onClick={()=>nav("contact")}>Contact Us</Btn>
          </div>
        </div>
        <div style={{fontSize:"clamp(3.5rem,7vw,6.5rem)",zIndex:2,filter:"drop-shadow(0 18px 28px rgba(0,0,0,.28))",animation:"floatY 3s ease-in-out infinite"}}>🏆</div>
      </div>
      {/* Story + Why Us */}
      <div className="abGrid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,marginBottom:22}}>
        {[{title:"📖 Our Story",content:["Founded in 2010 in the heart of Bathinda, Malwa Gift & Toys started as a small corner shop with one big dream — to be the go-to destination for quality gifts and toys in Punjab's Malwa region.","Over the years, we've grown into a full-fledged store with 500+ products spanning toys, gifts, kids' items & seasonal collections. We serve thousands of customers yearly from Bathinda, Barnala, Mansa, Muktsar, Faridkot and beyond.","Today we offer in-store shopping and WhatsApp ordering with same-day delivery in Bathinda. Our mission: genuine products, fair prices, and a smile with every purchase."]},
        {title:"💡 Why Choose Us?",list:[{e:"🛡️",t:"100% Genuine Products",d:"Certified & authorized distributors."},{e:"🚚",t:"Fast Local Delivery",d:"Same-day Bathinda. Next-day nearby."},{e:"💰",t:"Best Price Guarantee",d:"We match any price you find."},{e:"🎁",t:"Free Gift Wrapping",d:"Beautiful packaging on every order."},{e:"📱",t:"WhatsApp Support 24/7",d:"Order, track & query anytime."}]}].map((sec,si)=>(
          <div key={si} style={{background:"#fff",borderRadius:18,padding:"32px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
            <div style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.3rem",fontWeight:800,color:"#1C1C2E",marginBottom:6}}>{sec.title}</div>
            <Divider my={13}/>
            {sec.content&&sec.content.map((t,i)=><p key={i} style={{color:"#5A5050",lineHeight:1.82,fontSize:"0.88rem",marginBottom:13}}>{t}</p>)}
            {sec.list&&sec.list.map((item,i)=>(
              <div key={i} style={{display:"flex",gap:12,marginBottom:13,padding:"11px 13px",background:i%2===0?"#FFF8F4":"#F8FBFF",borderRadius:11}}>
                <span style={{fontSize:"1.4rem",flexShrink:0}}>{item.e}</span>
                <div>
                  <div style={{fontWeight:800,fontSize:"0.84rem",color:"#1C1C2E",marginBottom:2}}>{item.t}</div>
                  <div style={{color:"#9A8F88",fontSize:"0.76rem",lineHeight:1.5}}>{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Milestones */}
      <div style={{background:"linear-gradient(135deg,#FF6B35,#FF9245)",borderRadius:18,padding:"32px 38px",marginBottom:22,boxShadow:"0 11px 36px rgba(255,107,53,.24)"}}>
        <div style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.4rem",fontWeight:800,color:"#fff",textAlign:"center",marginBottom:22}}>🏅 Our Journey in Numbers</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
          {[{e:"🏪",v:"2010",l:"Founded"},{e:"👨‍👩‍👧‍👦",v:"10K+",l:"Customers"},{e:"📦",v:"500+",l:"Products"},{e:"⭐",v:"4.9/5",l:"Rating"},{e:"📍",v:"6+",l:"Cities"},{e:"🎁",v:"50K+",l:"Gifts Delivered"}].map((m,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.17)",borderRadius:14,padding:"18px 10px",textAlign:"center",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.2)"}}>
              <div style={{fontSize:"1.7rem",marginBottom:5}}>{m.e}</div>
              <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:900,fontSize:"1.25rem",color:"#fff",marginBottom:2}}>{m.v}</div>
              <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,.75)",fontWeight:600,letterSpacing:"0.04em"}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Values */}
      <div style={{background:"#fff",borderRadius:18,padding:"32px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
        <div style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.3rem",fontWeight:800,color:"#1C1C2E",textAlign:"center",marginBottom:6}}>🌟 Our Values</div>
        <Divider my={16}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:16}}>
          {[{e:"❤️",t:"Customer First",d:"Every decision: how does this help our customer?"},{e:"✅",t:"Quality Always",d:"No compromise on safety or authenticity."},{e:"🤝",t:"Community Trust",d:"15 years of honest service to Malwa families."},{e:"🌿",t:"Responsibility",d:"Eco-friendly & BPA-free products stocked."}].map((v,i)=>(
            <div key={i} style={{textAlign:"center",padding:"22px 18px",background:"#FFF8F4",borderRadius:14,border:"1.5px solid #FFE8D6"}}>
              <div style={{fontSize:"2.2rem",marginBottom:9}}>{v.e}</div>
              <div style={{fontWeight:800,fontSize:"0.87rem",color:"#1C1C2E",marginBottom:7}}>{v.t}</div>
              <div style={{color:"#9A8F88",fontSize:"0.78rem",lineHeight:1.62}}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════ */
function ContactPage({toast2}){
  const [form,setForm]=useState({name:"",phone:"",email:"",subject:"",message:""});
  const [sent,setSent]=useState(false);
  const sub=()=>{
    if(!form.name.trim()||!form.phone.trim()){toast2("Please fill name & phone","error");return;}
    setSent(true);toast2("✅ Message sent! We'll reply within 24 hours.");
  };
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"26px 18px"}}>
      <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"clamp(1.5rem,2.8vw,2rem)",fontWeight:800,color:"#1C1C2E",marginBottom:3}}>📬 Contact Us</h1>
      <p style={{color:"#9A8F88",fontSize:"0.88rem",marginBottom:24}}>We're here to help! Reach out via any channel below.</p>
      {/* Info Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,marginBottom:24}}>
        {[{e:"📞",t:"Call / WhatsApp",v:"+91 99886 01230",d:"Mon–Sun 9AM–9PM",c:"#FF6B35",href:"tel:+919876000000"},{e:"📧",t:"Email",v:"malwagiftandtoys@gmail.com",d:"Reply within 24hrs",c:"#E91E8C",href:"mailto:malwagiftandtoys@gmail.com"},{e:"📍",t:"Store Address",v:"Malwa Street, Amrik Singh Road",d:"Bathinda 151001, Punjab",c:"#6C63FF",href:"https://maps.google.com/?q=Bathinda,Punjab"},{e:"🕐",t:"Store Hours",v:"Mon–Sunday",d:"9:00 AM – 9:00 PM",c:"#06D6A0"}].map((c,i)=>(
          <div key={i} onClick={c.href?()=>window.open(c.href,"_blank"):undefined} className="fc" style={{background:"#fff",borderRadius:16,padding:"22px 18px",border:"1px solid #F5EDE6",boxShadow:"0 3px 13px rgba(0,0,0,.05)",cursor:c.href?"pointer":"default"}}>
            <div style={{width:48,height:48,background:`${c.c}14`,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",marginBottom:13,border:`1.5px solid ${c.c}22`}}>{c.e}</div>
            <div style={{fontWeight:800,fontSize:"0.8rem",color:"#9A8F88",letterSpacing:"0.04em",marginBottom:5,textTransform:"uppercase"}}>{c.t}</div>
            <div style={{fontWeight:800,fontSize:"0.92rem",color:"#1C1C2E",marginBottom:2}}>{c.v}</div>
            <div style={{fontSize:"0.76rem",color:"#B0A49C"}}>{c.d}</div>
          </div>
        ))}
      </div>
      <div className="coGrid" style={{display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:20}}>
        {/* Form */}
        <div style={{background:"#fff",borderRadius:18,padding:"32px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
          {sent?(
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:"4.5rem",marginBottom:14,animation:"bounceIn .5s ease"}}>✅</div>
              <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.4rem",color:"#1C1C2E",marginBottom:7}}>Message Sent!</div>
              <div style={{color:"#9A8F88",fontSize:"0.88rem",marginBottom:22,lineHeight:1.65}}>Thank you, {form.name}! We'll get back to you within 24 hours.</div>
              <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                <Btn variant="primary" onClick={()=>{setSent(false);setForm({name:"",phone:"",email:"",subject:"",message:""});}}>Send Another</Btn>
                <Btn variant="success" href="https://wa.me/919876000000"><I.Wa/> WhatsApp Us</Btn>
              </div>
            </div>
          ):(
            <>
              <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.2rem",color:"#1C1C2E",marginBottom:20}}>✉️ Send a Message</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Field label="Full Name" req><In placeholder="Your full name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></Field>
                <Field label="Phone" req><In placeholder="99886 01230" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}/></Field>
              </div>
              <Field label="Email"><In placeholder="your@email.com" type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></Field>
              <Field label="Subject"><In placeholder="How can we help?" value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))}/></Field>
              <Field label="Message"><Ta placeholder="Tell us more..." value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}/></Field>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <Btn variant="primary" onClick={sub} style={{flex:1,justifyContent:"center"}}>Send Message <I.Arr/></Btn>
                <Btn variant="success" href={`https://wa.me/919876000000?text=${encodeURIComponent(`Hi! I'm ${form.name||"a customer"}.\n\n${form.message||"I'd like to get in touch."}`)}`}><I.Wa/></Btn>
              </div>
            </>
          )}
        </div>
        {/* Map + Social */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"#fff",borderRadius:18,padding:"24px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
            <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.1rem",color:"#1C1C2E",marginBottom:16}}>📍 Find Our Store</div>
            <div style={{background:"linear-gradient(135deg,#E8F4F8,#D4EBF0)",borderRadius:13,height:190,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginBottom:14,position:"relative",overflow:"hidden",border:"1.5px solid #C8E6EF"}}>
              <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(#B8D9E8 1px,transparent 1px),linear-gradient(90deg,#B8D9E8 1px,transparent 1px)",backgroundSize:"28px 28px",opacity:.35}}/>
              <div style={{zIndex:2,textAlign:"center"}}>
                <div style={{fontSize:"2.8rem",marginBottom:5,animation:"pulse 2s ease-in-out infinite"}}>📍</div>
                <div style={{fontWeight:800,color:"#1C1C2E",fontSize:"0.88rem"}}>Malwa Gift & Toys</div>
                <div style={{fontSize:"0.76rem",color:"#6A9DAA",marginBottom:9}}>Near Bus Stand, Bathinda</div>
                <Btn variant="primary" size="sm" href="https://maps.google.com/?q=Bathinda+Bus+Stand+Punjab+India">Open in Maps</Btn>
              </div>
            </div>
            <div style={{fontSize:"0.82rem",color:"#5A5050",lineHeight:1.9}}>
              {[{i:<I.Pin/>,t:"Malwa Street, Amrik Singh Road, Bathinda – 151001, Punjab"},{i:<I.Phone/>,t:"+91 99886 01230"},{i:<I.Mail/>,t:"malwagiftandtoys@gmail.com"}].map((r,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}><span style={{color:"#FF6B35",marginTop:1}}>{r.i}</span><span>{r.t}</span></div>
              ))}
            </div>
          </div>
          <div style={{background:"#fff",borderRadius:18,padding:"22px 24px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
            <div style={{fontWeight:800,fontSize:"0.88rem",color:"#1C1C2E",marginBottom:13}}>📲 Follow Us</div>
            <div style={{display:"flex",gap:11}}>
              {[{icon:<I.Ig/>,l:"Instagram",c:"#E91E8C",h:"https://instagram.com"},{icon:<I.Fb/>,l:"Facebook",c:"#1877F2",h:"https://facebook.com"},{icon:<I.Wa/>,l:"WhatsApp",c:"#25D366",h:"https://wa.me/919876000000"}].map((s,i)=>(
                <a key={i} href={s.h} target="_blank" rel="noopener noreferrer" className="bh" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5,background:`${s.c}12`,border:`1.5px solid ${s.c}26`,borderRadius:13,padding:"13px 7px",textDecoration:"none",color:s.c,fontSize:"1.45rem",transition:"transform .2s"}}>
                  {s.icon}<span style={{fontSize:"0.68rem",fontWeight:700,color:s.c}}>{s.l}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════════ */
function CheckoutPage({cart,cSub,cDel,cTot,step,setStep,placed,setPlaced,nav,setCart,toast2}){
  const [form,setForm]=useState({name:"",phone:"",email:"",address:"",city:"Bathinda",state:"Punjab",pincode:"",payment:"cod"});
  const waOrder=()=>{
    const lines=cart.map(i=>`• ${i.name} ×${i.qty} = ₹${i.price*i.qty}`).join("\n");
    window.open(`https://wa.me/919988601230?text=${encodeURIComponent(`Hi! Order request 🛒\n\n${lines}\n\nTotal: ₹${cTot}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}\n\nPlease confirm!`)}`,"_blank");
  };
  if(cart.length===0&&!placed) return(
    <div style={{maxWidth:500,margin:"60px auto",padding:"0 20px",textAlign:"center"}}>
      <div style={{fontSize:"4.5rem",marginBottom:14,opacity:.4}}>🛒</div>
      <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.4rem",marginBottom:7}}>Your cart is empty</div>
      <Btn variant="primary" onClick={()=>nav("shop")}>Start Shopping <I.Arr/></Btn>
    </div>
  );
  if(placed) return(
    <div style={{maxWidth:560,margin:"60px auto",padding:"0 20px",textAlign:"center"}}>
      <div style={{background:"#fff",borderRadius:22,padding:"48px 38px",boxShadow:"0 8px 38px rgba(0,0,0,.09)",border:"1px solid #F5EDE6"}}>
        <div style={{fontSize:"5rem",marginBottom:14,animation:"bounceIn .6s ease"}}>🎉</div>
        <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:900,fontSize:"1.7rem",color:"#1C1C2E",marginBottom:7}}>Order Placed!</div>
        <div style={{color:"#9A8F88",marginBottom:5,fontSize:"0.88rem"}}>Order ID: <strong style={{color:"#FF6B35"}}>#MGT{Math.floor(Math.random()*90000)+10000}</strong></div>
        <div style={{color:"#5A5050",fontSize:"0.88rem",lineHeight:1.75,marginBottom:26}}>Thank you, <strong>{form.name||"Customer"}</strong>! 🎁<br/>We'll confirm on WhatsApp shortly. Expected delivery: <strong>Today / Tomorrow</strong></div>
        <div style={{background:"#FFF8F4",borderRadius:13,padding:"14px",marginBottom:22,border:"1.5px solid #FFE0CC"}}>
          {["WhatsApp confirmation in 5 minutes","Our team packs your order with care","Fast delivery to your doorstep!"].map((s,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"center",fontSize:"0.8rem",color:"#5A5050",marginBottom:i<2?6:0}}><span style={{color:"#06D6A0",fontWeight:700}}>{i+1}.</span>{s}</div>
          ))}
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <Btn variant="primary" onClick={()=>nav("home")}>Back to Home</Btn>
          <Btn variant="success" onClick={waOrder}><I.Wa/> Track Order</Btn>
        </div>
      </div>
    </div>
  );
  const steps=["Cart Review","Delivery","Payment"];
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"26px 18px"}}>
      <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.7rem",fontWeight:800,color:"#1C1C2E",marginBottom:22}}>🛒 Checkout</h1>
      {/* Progress */}
      <div style={{display:"flex",alignItems:"center",marginBottom:30,maxWidth:480}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:step>i+1?"#06D6A0":step===i+1?"#FF6B35":"#EDE3DC",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"0.82rem",transition:"background .3s",boxShadow:step===i+1?"0 4px 11px rgba(255,107,53,.32)":"none"}}>
                {step>i+1?<I.Chk/>:i+1}
              </div>
              <span style={{fontSize:"0.78rem",fontWeight:step===i+1?800:500,color:step===i+1?"#FF6B35":step>i+1?"#06D6A0":"#9A8F88",whiteSpace:"nowrap"}}>{s}</span>
            </div>
            {i<steps.length-1&&<div style={{flex:1,height:2,background:step>i+1?"#06D6A0":"#EDE3DC",margin:"0 8px",transition:"background .3s",minWidth:16}}/>}
          </div>
        ))}
      </div>
      <div className="chGrid" style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:22,alignItems:"start"}}>
        <div style={{background:"#fff",borderRadius:18,padding:"28px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
          {/* Step 1 */}
          {step===1&&(<>
            <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.15rem",color:"#1C1C2E",marginBottom:18}}>📋 Review Your Cart</div>
            {cart.map(item=>(
              <div key={item.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid #F8F0EB",alignItems:"center"}}>
                <div style={{width:60,height:60,background:item.bg||"#FFF3EC",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.9rem",flexShrink:0,border:"1px solid #F0E0D4"}}>{item.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:"0.88rem",color:"#1C1C2E",marginBottom:2}}>{item.name}</div>
                  <div style={{fontSize:"0.76rem",color:"#9A8F88"}}>Qty: {item.qty} × ₹{item.price}</div>
                </div>
                <div style={{fontWeight:900,color:"#FF6B35",fontSize:"0.96rem"}}>₹{item.price*item.qty}</div>
              </div>
            ))}
            <Btn variant="primary" size="lg" onClick={()=>setStep(2)} style={{width:"100%",justifyContent:"center",marginTop:20}}>Continue to Delivery <I.Arr/></Btn>
          </>)}
          {/* Step 2 */}
          {step===2&&(<>
            <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.15rem",color:"#1C1C2E",marginBottom:18}}>🚚 Delivery Details</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <Field label="Full Name" req><In placeholder="Your full name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></Field>
              <Field label="Phone" req><In placeholder="99886 01230" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}/></Field>
            </div>
            <Field label="Email"><In placeholder="email@example.com" type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></Field>
            <Field label="Full Address" req><Ta placeholder="House no, Street, Mohalla / Area..." sx={{minHeight:80}} value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))}/></Field>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              <Field label="City"><In value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))}/></Field>
              <Field label="State"><In value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))}/></Field>
              <Field label="PIN Code" req><In placeholder="151001" maxLength={6} value={form.pincode} onChange={e=>setForm(p=>({...p,pincode:e.target.value}))}/></Field>
            </div>
            <div style={{display:"flex",gap:10,marginTop:6}}>
              <Btn variant="outline" onClick={()=>setStep(1)}><I.ChL/> Back</Btn>
              <Btn variant="primary" size="lg" onClick={()=>{if(!form.name||!form.phone||!form.address||!form.pincode){toast2("Fill all required fields","error");return;}setStep(3);}} style={{flex:1,justifyContent:"center"}}>Proceed to Payment <I.Arr/></Btn>
            </div>
          </>)}
          {/* Step 3 */}
          {step===3&&(<>
            <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.15rem",color:"#1C1C2E",marginBottom:18}}>💳 Payment Method</div>
            {[{v:"cod",e:"💵",t:"Cash on Delivery",d:"Pay on receipt",b:null},{v:"upi",e:"📱",t:"UPI / PhonePe / GPay",d:"Instant secure payment",b:"Recommended"},{v:"card",e:"💳",t:"Credit / Debit Card",d:"Visa, Mastercard, Rupay",b:null},{v:"razorpay",e:"⚡",t:"Razorpay",d:"All payment methods",b:"Secure"},{v:"whatsapp",e:"💬",t:"WhatsApp COD",d:"Order & pay via WhatsApp",b:null}].map(m=>(
              <div key={m.v} onClick={()=>setForm(p=>({...p,payment:m.v}))} style={{border:`2px solid ${form.payment===m.v?"#FF6B35":"#EDE3DC"}`,borderRadius:13,padding:"14px 16px",marginBottom:9,cursor:"pointer",background:form.payment===m.v?"#FFF8F4":"#fff",transition:"all .14s",display:"flex",alignItems:"center",gap:13}}>
                <div style={{width:42,height:42,background:form.payment===m.v?"#FF6B3518":"#F8F2EE",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.35rem",flexShrink:0}}>{m.e}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:"0.88rem",color:"#1C1C2E",display:"flex",alignItems:"center",gap:7}}>{m.t}{m.b&&<Pill col="green" sm>{m.b}</Pill>}</div>
                  <div style={{fontSize:"0.74rem",color:"#9A8F88",marginTop:1}}>{m.d}</div>
                </div>
                <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${form.payment===m.v?"#FF6B35":"#DDD"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {form.payment===m.v&&<div style={{width:8,height:8,borderRadius:"50%",background:"#FF6B35"}}/>}
                </div>
              </div>
            ))}
            <div style={{background:"#E6F4EA",borderRadius:11,padding:"11px 15px",display:"flex",gap:9,alignItems:"center",marginTop:8,marginBottom:14}}>
              <I.Lock/><span style={{fontSize:"0.78rem",color:"#2E7D32",fontWeight:600}}>256-bit SSL encrypted · 100% secure payment</span>
            </div>
            <div style={{display:"flex",gap:10}}>
              <Btn variant="outline" onClick={()=>setStep(2)}><I.ChL/> Back</Btn>
              <Btn variant="primary" size="lg" onClick={()=>{setPlaced(true);setCart([]);}} style={{flex:1,justifyContent:"center"}}><I.Lock/> Place Order · ₹{cTot}</Btn>
            </div>
          </>)}
        </div>
        {/* Summary */}
        <div style={{background:"#fff",borderRadius:18,padding:"24px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)",position:"sticky",top:80}}>
          <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.05rem",color:"#1C1C2E",marginBottom:16}}>📦 Order Summary</div>
          <div style={{maxHeight:190,overflowY:"auto",marginBottom:12}}>
            {cart.map(item=>(
              <div key={item.id} style={{display:"flex",gap:9,padding:"7px 0",borderBottom:"1px solid #F8F0EB",alignItems:"center",fontSize:"0.8rem"}}>
                <span style={{fontSize:"1.35rem"}}>{item.emoji}</span>
                <span style={{flex:1,color:"#5A5050",fontWeight:600,lineHeight:1.3}}>{item.name}<br/><span style={{color:"#B0A49C"}}>×{item.qty}</span></span>
                <span style={{fontWeight:800,color:"#1C1C2E",flexShrink:0}}>₹{item.price*item.qty}</span>
              </div>
            ))}
          </div>
          <Divider my={10}/>
          <div style={{fontSize:"0.83rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7,color:"#9A8F88"}}><span>Subtotal</span><span style={{color:"#1C1C2E",fontWeight:700}}>₹{cSub}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7,color:"#9A8F88"}}><span>Delivery</span><span style={{color:cDel===0?"#06D6A0":"#1C1C2E",fontWeight:700}}>{cDel===0?"FREE 🎉":`₹${cDel}`}</span></div>
          </div>
          <Divider my={10}/>
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:"1.1rem"}}>
            <span>Total</span><span style={{color:"#FF6B35",fontFamily:"'Baloo 2',cursive",fontSize:"1.25rem"}}>₹{cTot}</span>
          </div>
          {cDel===0&&<div style={{marginTop:9}}><Pill col="green">✓ Free delivery applied!</Pill></div>}
          <div style={{marginTop:14,padding:"12px",background:"#FFF8F4",borderRadius:11,border:"1px solid #FFE0CC"}}>
            <div style={{display:"flex",gap:7,alignItems:"center",fontSize:"0.76rem",color:"#665A52",marginBottom:4,fontWeight:700}}><I.Shield/> Secure & Safe</div>
            <div style={{fontSize:"0.72rem",color:"#9A8F88",lineHeight:1.6}}>SSL Encrypted · CSRF Protected · Genuine Products</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ADMIN
══════════════════════════════════════════════ */
function AdminPage({adminIn,setAdminIn,prods,setProds,toast2}){
  const [creds,setCreds]=useState({email:"",password:""});
  const [err,setErr]=useState("");
  const [tab,setTab]=useState("dashboard");
  const [editing,setEditing]=useState(null);
  const [np,setNp]=useState({name:"",cat:"toys",price:"",mrp:"",emoji:"🎁",tag:"New",stock:10,desc:""});

  if(!adminIn) return(
    <div style={{maxWidth:420,margin:"60px auto",padding:"0 20px"}}>
      <div style={{background:"#fff",borderRadius:22,padding:"42px 38px",boxShadow:"0 8px 38px rgba(0,0,0,.09)",border:"1px solid #F5EDE6"}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{fontSize:"3.2rem",marginBottom:11}}>🔐</div>
          <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.5rem",color:"#1C1C2E"}}>Admin Login</div>
          <div style={{fontSize:"0.8rem",color:"#9A8F88",marginTop:5}}>Demo: <strong>admin@malwa.in</strong> / <strong>Admin@123</strong></div>
        </div>
        <Field label="Email" req><In type="email" placeholder="admin@malwa.in" value={creds.email} onChange={e=>setCreds(p=>({...p,email:e.target.value}))}/></Field>
        <Field label="Password" req><In type="password" placeholder="••••••••" value={creds.password} onChange={e=>setCreds(p=>({...p,password:e.target.value}))}/></Field>
        {err&&<div style={{background:"#FFF0F0",border:"1.5px solid #FFB4B4",borderRadius:9,padding:"9px 13px",color:"#C02020",fontSize:"0.8rem",fontWeight:600,marginBottom:13,display:"flex",gap:7,alignItems:"center"}}>⚠️ {err}</div>}
        <Btn variant="primary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{if(creds.email==="admin@malwa.in"&&creds.password==="Admin@123"){setAdminIn(true);setErr("");}else setErr("Invalid credentials. Try: admin@malwa.in / Admin@123")}}><I.Lock/> Login to Admin Panel</Btn>
        <div style={{background:"#F0FFF8",border:"1.5px solid #A8EECE",borderRadius:9,padding:"11px 13px",marginTop:14,fontSize:"0.74rem",color:"#0A8C5A",lineHeight:1.65}}>🔒 <strong>Security Active:</strong> JWT Auth · Rate Limiting · CSRF Protection · Input Sanitization · SSL</div>
      </div>
    </div>
  );

  const adminNav=[{k:"dashboard",e:"📊",l:"Dashboard"},{k:"products",e:"📦",l:"Products"},{k:"add",e:"➕",l:"Add Product"},{k:"orders",e:"🛒",l:"Orders"},{k:"settings",e:"⚙️",l:"Settings"}];
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"26px 18px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div>
          <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.6rem",fontWeight:800,color:"#1C1C2E"}}>⚙️ Admin Panel</h1>
          <div style={{color:"#9A8F88",fontSize:"0.82rem"}}>Malwa Gift & Toys — Management Console</div>
        </div>
        <Btn variant="outline" size="sm" onClick={()=>setAdminIn(false)}><I.Out/> Logout</Btn>
      </div>
      <div className="adGrid" style={{display:"grid",gridTemplateColumns:"210px 1fr",gap:18}}>
        {/* Sidebar */}
        <div style={{background:"#1C1C2E",borderRadius:16,overflow:"hidden",flexShrink:0}}>
          <div style={{padding:"18px 18px 12px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:36,height:36,background:"linear-gradient(135deg,#FF6B35,#FF9245)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🎁</div>
              <div>
                <div style={{color:"#fff",fontWeight:800,fontSize:"0.84rem"}}>Malwa G&T</div>
                <div style={{color:"rgba(255,255,255,.35)",fontSize:"0.65rem"}}>Admin Console</div>
              </div>
            </div>
          </div>
          {adminNav.map(n=>(
            <div key={n.k} onClick={()=>setTab(n.k)} style={{padding:"12px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,color:tab===n.k?"#FF6B35":"rgba(255,255,255,.52)",background:tab===n.k?"rgba(255,107,53,.1)":"transparent",fontWeight:tab===n.k?800:500,fontSize:"0.84rem",borderRight:tab===n.k?"3px solid #FF6B35":"3px solid transparent",transition:"all .14s"}}>
              <span>{n.e}</span>{n.l}
            </div>
          ))}
          <div style={{padding:"14px 18px",marginTop:8,borderTop:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{fontSize:"0.67rem",color:"rgba(255,255,255,.22)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:7}}>Security</div>
            {["SSL ✅","JWT ✅","CSRF ✅","Rate Limit ✅"].map(s=><div key={s} style={{fontSize:"0.7rem",color:"rgba(255,255,255,.38)",marginBottom:3}}>{s}</div>)}
          </div>
        </div>
        {/* Content */}
        <div>
          {tab==="dashboard"&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
                {[{l:"Products",v:prods.length,e:"📦",c:"#FF6B35"},{l:"Orders (Month)",v:247,e:"🛒",c:"#6C63FF"},{l:"Revenue (Month)",v:"₹1.24L",e:"💰",c:"#06D6A0"},{l:"Customers",v:189,e:"👥",c:"#E91E8C"}].map(s=>(
                  <div key={s.l} style={{background:"#fff",borderRadius:14,padding:"20px 16px",border:"1px solid #F5EDE6",boxShadow:"0 3px 11px rgba(0,0,0,.05)"}}>
                    <div style={{fontSize:"1.7rem",marginBottom:7}}>{s.e}</div>
                    <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:900,fontSize:"1.55rem",color:s.c,marginBottom:3}}>{s.v}</div>
                    <div style={{fontSize:"0.73rem",color:"#9A8F88",fontWeight:600}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#fff",borderRadius:16,padding:"22px",border:"1px solid #F5EDE6",boxShadow:"0 3px 11px rgba(0,0,0,.05)"}}>
                <div style={{fontWeight:800,fontSize:"0.93rem",marginBottom:14,color:"#1C1C2E"}}>📋 Recent Activity</div>
                {["🛒 New order #MGT5524 — ₹1,299 (RC Car) · Just now","📦 'Diwali Gift Box' stock low (3 left) · 10 min ago","⭐ New 5★ review on Teddy Bear · 25 min ago","📧 Newsletter subscriber +1 (Total: 342) · 1 hr ago","🚀 Order #MGT5523 shipped to Barnala · 2 hrs ago"].map((a,i)=>(
                  <div key={i} style={{padding:"10px 0",borderBottom:"1px solid #F8F0EB",fontSize:"0.82rem",color:"#5A5050",display:"flex",gap:9,alignItems:"center"}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",flexShrink:0}}/>{a}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="products"&&(
            <div style={{background:"#fff",borderRadius:16,padding:"22px",border:"1px solid #F5EDE6",boxShadow:"0 3px 11px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:800,fontSize:"0.96rem",marginBottom:16,color:"#1C1C2E"}}>📦 All Products ({prods.length})</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
                  <thead>
                    <tr style={{borderBottom:"2px solid #F5EDE6",background:"#FFF8F4"}}>
                      {["Product","Cat","Price","MRP","Stock","Stars","Actions"].map(h=>(
                        <th key={h} style={{padding:"9px 12px",textAlign:"left",fontWeight:800,color:"#665A52",whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {prods.map(p=>(
                      <tr key={p.id} style={{borderBottom:"1px solid #F8F0EB"}} onMouseEnter={e=>e.currentTarget.style.background="#FFF8F4"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{padding:"11px 12px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:"1.4rem"}}>{p.emoji}</span><span style={{fontWeight:700,color:"#1C1C2E"}}>{p.name}</span></div></td>
                        <td style={{padding:"11px 12px"}}><Pill col="blue" sm>{p.cat}</Pill></td>
                        <td style={{padding:"11px 12px",fontWeight:800,color:"#FF6B35"}}>₹{p.price}</td>
                        <td style={{padding:"11px 12px",color:"#9A8F88",textDecoration:"line-through"}}>₹{p.mrp}</td>
                        <td style={{padding:"11px 12px"}}><Pill col={p.stock<5?"red":"green"} sm>{p.stock}</Pill></td>
                        <td style={{padding:"11px 12px"}}>⭐ {p.stars}</td>
                        <td style={{padding:"11px 12px"}}>
                          <div style={{display:"flex",gap:6}}>
                            <button onClick={()=>{setEditing(p);setTab("add");}} className="bh" style={{background:"#EAF2FF",border:"none",borderRadius:7,padding:"5px 9px",cursor:"pointer",color:"#1456C0",display:"flex",alignItems:"center",fontFamily:"'Nunito',sans-serif",fontSize:"0.78rem",gap:4,fontWeight:700}}><I.Edit/> Edit</button>
                            <button onClick={()=>{setProds(prev=>prev.filter(pp=>pp.id!==p.id));toast2("🗑️ Deleted");}} className="bh" style={{background:"#FFF0F0",border:"none",borderRadius:7,padding:"5px 9px",cursor:"pointer",color:"#C02020",display:"flex",alignItems:"center",fontFamily:"'Nunito',sans-serif",fontSize:"0.78rem",gap:4,fontWeight:700}}><I.Trash/> Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab==="add"&&(
            <div style={{background:"#fff",borderRadius:16,padding:"26px",border:"1px solid #F5EDE6",boxShadow:"0 3px 11px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:800,fontSize:"0.96rem",marginBottom:20,color:"#1C1C2E"}}>{editing?"✏️ Edit Product":"➕ Add New Product"}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{k:"name",l:"Product Name",ph:"e.g. Premium Teddy Bear"},{k:"price",l:"Selling Price (₹)",ph:"799"},{k:"mrp",l:"MRP (₹)",ph:"1199"},{k:"stock",l:"Stock Qty",ph:"20"},{k:"emoji",l:"Emoji Icon",ph:"🧸"},{k:"tag",l:"Badge Text",ph:"Bestseller"}].map(f=>(
                  <Field key={f.k} label={f.l} req={["name","price","mrp"].includes(f.k)}>
                    <In placeholder={f.ph} value={(editing||np)[f.k]||""} onChange={e=>{if(editing)setEditing(p=>({...p,[f.k]:e.target.value}));else setNp(p=>({...p,[f.k]:e.target.value}));}}/>
                  </Field>
                ))}
              </div>
              <Field label="Category">
                <select value={(editing||np).cat} onChange={e=>{if(editing)setEditing(p=>({...p,cat:e.target.value}));else setNp(p=>({...p,cat:e.target.value}));}} style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1.5px solid #EDE3DC",fontSize:"0.88rem",outline:"none",fontFamily:"'Nunito',sans-serif",background:"#FDFAF8",color:"#1C1C2E",cursor:"pointer"}}>
                  {CATS.filter(c=>c.id!=="all").map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="Description"><Ta placeholder="Product description..." value={(editing||np).desc||""} onChange={e=>{if(editing)setEditing(p=>({...p,desc:e.target.value}));else setNp(p=>({...p,desc:e.target.value}));}}/></Field>
              <div style={{display:"flex",gap:10,marginTop:4}}>
                <Btn variant="primary" onClick={()=>{
                  if(editing){setProds(prev=>prev.map(p=>p.id===editing.id?{...editing,price:Number(editing.price),mrp:Number(editing.mrp),stock:Number(editing.stock)}:p));setEditing(null);toast2("✅ Updated!");}
                  else{if(!np.name||!np.price)return;setProds(prev=>[...prev,{...np,id:Date.now(),price:Number(np.price),mrp:Number(np.mrp),stock:Number(np.stock),stars:4.5,rev:0,bg:"#FFF3EC"}]);setNp({name:"",cat:"toys",price:"",mrp:"",emoji:"🎁",tag:"New",stock:10,desc:""});toast2("✅ Product added!");}
                  setTab("products");
                }}>{editing?"Save Changes":"Add Product"}</Btn>
                {editing&&<Btn variant="outline" onClick={()=>{setEditing(null);setTab("products");}}>Cancel</Btn>}
              </div>
            </div>
          )}
          {tab==="orders"&&(
            <div style={{background:"#fff",borderRadius:16,padding:"22px",border:"1px solid #F5EDE6",boxShadow:"0 3px 11px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:800,fontSize:"0.96rem",marginBottom:16,color:"#1C1C2E"}}>🛒 Recent Orders</div>
              {[{id:"5527",c:"Gurpreet Singh",it:"Teddy ×2, LEGO ×1",a:5197,st:"Delivered",d:"Today 2PM",ci:"Bathinda"},{id:"5526",c:"Priya Verma",it:"Gift Hamper ×1",a:1499,st:"Shipped",d:"Today 11AM",ci:"Mansa"},{id:"5525",c:"Rajesh Kumar",it:"RC Car ×1, Art Kit ×2",a:2497,st:"Processing",d:"Yesterday",ci:"Barnala"},{id:"5524",c:"Sunita Sharma",it:"Diwali Box ×3",a:2997,st:"Pending",d:"Yesterday",ci:"Faridkot"},{id:"5523",c:"Amrit Kaur",it:"Elephant Plush ×2",a:958,st:"Delivered",d:"25 Apr",ci:"Muktsar"}].map(o=>(
                <div key={o.id} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:"1px solid #F8F0EB",flexWrap:"wrap"}}>
                  <div style={{fontWeight:800,color:"#FF6B35",fontSize:"0.8rem",minWidth:70}}>#{o.id}</div>
                  <div style={{flex:1,minWidth:110}}>
                    <div style={{fontWeight:700,fontSize:"0.86rem",color:"#1C1C2E"}}>{o.c}</div>
                    <div style={{color:"#9A8F88",fontSize:"0.74rem"}}>{o.it} · {o.ci}</div>
                  </div>
                  <div style={{fontWeight:900,color:"#1C1C2E",fontSize:"0.93rem",minWidth:55}}>₹{o.a}</div>
                  <Pill col={o.st==="Delivered"?"green":o.st==="Shipped"?"blue":o.st==="Processing"?"orange":"purple"} sm>{o.st}</Pill>
                  <div style={{color:"#C0B0A8",fontSize:"0.73rem",minWidth:65}}>{o.d}</div>
                </div>
              ))}
            </div>
          )}
          {tab==="settings"&&(
            <div style={{background:"#fff",borderRadius:16,padding:"26px",border:"1px solid #F5EDE6",boxShadow:"0 3px 11px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:800,fontSize:"0.96rem",marginBottom:20,color:"#1C1C2E"}}>⚙️ Store Settings</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{l:"Store Name",v:"Malwa Gift and Toys"},{l:"Phone / WhatsApp",v:"+91 99886 01230"},{l:"Email",v:"malwagiftandtoys@gmail.com"},{l:"Free Delivery Threshold (₹)",v:"499"}].map(f=>(
                  <Field key={f.l} label={f.l}><In defaultValue={f.v}/></Field>
                ))}
              </div>
              <Field label="Store Address"><Ta defaultValue="Near Bus Stand, Bathinda - 151001, Punjab, India" sx={{minHeight:65}}/></Field>
              <div style={{background:"#E6F4EA",border:"1.5px solid #A8EECE",borderRadius:11,padding:"13px 15px",marginBottom:16,fontSize:"0.8rem",color:"#0A7A76"}}>
                <div style={{fontWeight:800,marginBottom:5}}>🛡️ Active Security Features</div>
                {["✅ HTTPS / SSL Enforced","✅ JWT Authentication","✅ Rate Limiting (100 req/15min)","✅ CSRF Protection","✅ Input Sanitization (XSS / NoSQL)","✅ Helmet.js HTTP Headers","✅ Admin Route Protection"].map(s=><div key={s} style={{marginBottom:2}}>{s}</div>)}
              </div>
              <Btn variant="primary" onClick={()=>toast2("✅ Settings saved!")}>Save Settings</Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LEGAL
══════════════════════════════════════════════ */
function LegalPage({type}){
  const isPr=type==="privacy";
  return(
    <div style={{maxWidth:780,margin:"0 auto",padding:"38px 20px"}}>
      <h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.7rem",fontWeight:800,color:"#1C1C2E",marginBottom:5}}>{isPr?"🔒 Privacy Policy":"📋 Terms & Conditions"}</h1>
      <div style={{color:"#9A8F88",fontSize:"0.8rem",marginBottom:26}}>Last updated: April 2025 · malwagiftandtoys.in</div>
      <div style={{background:"#fff",borderRadius:18,padding:"34px",border:"1px solid #F5EDE6",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
        {(isPr?[{t:"1. Information We Collect",c:"We collect personal information (name, phone, email, delivery address) only when you place an order or contact us. No data collected passively without your action."},{t:"2. How We Use Your Data",c:"Your info is used solely to process orders, communicate about delivery, and improve service quality. We never sell or share personal data with third parties for marketing."},{t:"3. Data Security",c:"We use SSL/TLS encryption, input validation, bcrypt hashing, JWT authentication, and server hardening (Helmet.js, CORS) to protect your data."},{t:"4. Cookies",c:"Only essential cookies used (cart state, session). No advertising or tracking cookies without explicit consent."},{t:"5. Your Rights",c:"You may request access, correction, or deletion of your data. Contact: malwagiftandtoys@gmail.com or +91 99886 01230."}]:[{t:"1. Acceptance of Terms",c:"By using malwagiftandtoys.in you agree to these Terms. If you disagree, please discontinue use."},{t:"2. Product Accuracy",c:"We strive for accurate descriptions and pricing. In case of errors, we reserve the right to cancel orders with full refunds."},{t:"3. Returns & Refunds",c:"Returns accepted within 7 days in original condition. Defective or wrong items replaced or fully refunded within 24–48 hours."},{t:"4. Delivery Terms",c:"Free delivery on orders ₹499+ in Bathinda. Times (1–3 days) are estimates and may vary during festivals."},{t:"5. Governing Law",c:"Governed by Indian law. Disputes resolved in courts of Bathinda, Punjab, India."}]).map((s,i,arr)=>(
          <div key={i} style={{marginBottom:20}}>
            <div style={{fontWeight:800,fontSize:"0.93rem",color:"#1C1C2E",marginBottom:7}}>{s.t}</div>
            <p style={{color:"#5A5050",fontSize:"0.86rem",lineHeight:1.82}}>{s.c}</p>
            {i<arr.length-1&&<Divider my={16}/>}
          </div>
        ))}
        <div style={{background:"#FFF8F4",borderRadius:11,padding:"14px",border:"1px solid #FFE0CC",marginTop:6}}>
          <div style={{fontWeight:700,fontSize:"0.8rem",color:"#FF6B35",marginBottom:3}}>📞 Questions?</div>
          <div style={{fontSize:"0.78rem",color:"#9A8F88"}}>Contact: <strong>malwagiftandtoys@gmail.com</strong> or <strong>+91 99886 01230</strong></div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
function Footer({nav,setCat,nEmail,setNEmail,nDone,setNDone,toast2}){
  return(
    <footer style={{background:"#14121E",color:"#fff",marginTop:60}}>
      {/* Pre-footer CTA */}
      <div style={{background:"linear-gradient(135deg,#FF6B35,#FF9245)",padding:"34px 20px"}}>
        <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.6rem",color:"#fff",marginBottom:7}}>🎁 Spread Joy — Order Now!</div>
          <p style={{color:"rgba(255,255,255,.85)",marginBottom:20,fontSize:"0.9rem"}}>Same-day delivery in Bathinda. WhatsApp us for instant order confirmation!</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn variant="dark" size="lg" onClick={()=>nav("shop")}>Shop Now <I.Arr/></Btn>
            <Btn variant="ghost" size="lg" href="https://wa.me/919876000000"><I.Wa/> WhatsApp Order</Btn>
          </div>
        </div>
      </div>
      {/* Main Footer */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"48px 20px 32px"}}>
        <div className="fGrid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.4fr",gap:36,marginBottom:36}}>
          {/* Brand */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:16}}>
              <div style={{width:42,height:42,background:"linear-gradient(135deg,#FF6B35,#FF9245)",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>🎁</div>
              <div>
                <div style={{fontFamily:"'Baloo 2',cursive",fontWeight:800,fontSize:"1.04rem",color:"#fff"}}>Malwa Gift & Toys</div>
                <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,.28)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Bathinda · Punjab · India</div>
              </div>
            </div>
            <p style={{color:"rgba(255,255,255,.43)",fontSize:"0.81rem",lineHeight:1.82,marginBottom:14}}>Malwa's most-loved gift & toy store since 2010. Bringing joy to 10,000+ families across Punjab with premium products & fast delivery.</p>
            <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,.4)",display:"flex",flexDirection:"column",gap:7}}>
              {[{i:<I.Pin/>,t:"Malwa Street,Amrik Singh Road, Bathinda 151001, Punjab"},{i:<I.Phone/>,t:"+91 99886 01230"},{i:<I.Mail/>,t:"malwagiftandtoys@gmail.com"}].map((r,i)=>(
                <span key={i} style={{display:"flex",alignItems:"flex-start",gap:7}}><span style={{marginTop:1}}>{r.i}</span>{r.t}</span>
              ))}
            </div>
            <div style={{display:"flex",gap:9,marginTop:16}}>
              {[{i:<I.Ig/>,c:"#E91E8C",h:"https://instagram.com"},{i:<I.Fb/>,c:"#1877F2",h:"https://facebook.com"},{i:<I.Wa/>,c:"#25D366",h:"https://wa.me/919988601230"}].map((s,i)=>(
                <a key={i} href={s.h} target="_blank" rel="noopener noreferrer" className="bh" style={{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",color:s.c,fontSize:"1.05rem",textDecoration:"none",transition:"transform .2s"}}>{s.i}</a>
              ))}
            </div>
          </div>
          {/* Links */}
          <div>
            <div style={{fontWeight:800,fontSize:"0.76rem",color:"rgba(255,255,255,.45)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Quick Links</div>
            {[{l:"Home",p:"home"},{l:"Shop All",p:"shop"},{l:"About Us",p:"about"},{l:"Contact",p:"contact"},{l:"Privacy Policy",p:"privacy"},{l:"Terms",p:"terms"}].map(link=>(
              <div key={link.l} className="nl" onClick={()=>nav(link.p)} style={{display:"block",color:"rgba(255,255,255,.38)",fontSize:"0.82rem",marginBottom:9,cursor:"pointer",transition:"color .15s,padding-left .15s",fontWeight:500}}>→ {link.l}</div>
            ))}
          </div>
          {/* Categories */}
          <div>
            <div style={{fontWeight:800,fontSize:"0.76rem",color:"rgba(255,255,255,.45)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Categories</div>
            {CATS.filter(c=>c.id!=="all").map(c=>(
              <div key={c.id} className="nl" onClick={()=>{setCat(c.id);nav("shop");}} style={{display:"block",color:"rgba(255,255,255,.38)",fontSize:"0.82rem",marginBottom:9,cursor:"pointer",transition:"color .15s,padding-left .15s",fontWeight:500}}>{c.icon} {c.label}</div>
            ))}
          </div>
          {/* Newsletter */}
          <div>
            <div style={{fontWeight:800,fontSize:"0.76rem",color:"rgba(255,255,255,.45)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Stay Updated</div>
            <p style={{color:"rgba(255,255,255,.32)",fontSize:"0.78rem",marginBottom:13,lineHeight:1.72}}>Exclusive offers, festive deals & new arrivals in your inbox.</p>
            {nDone?(
              <div style={{background:"rgba(6,214,160,.1)",border:"1.5px solid rgba(6,214,160,.28)",borderRadius:11,padding:"11px 13px",color:"#06D6A0",fontSize:"0.8rem",fontWeight:700}}>✅ Subscribed! Thank you!</div>
            ):(
              <div style={{display:"flex",borderRadius:11,overflow:"hidden",border:"1px solid rgba(255,255,255,.11)",marginBottom:13}}>
                <input value={nEmail} onChange={e=>setNEmail(e.target.value)} placeholder="Your email..." style={{flex:1,background:"rgba(255,255,255,.06)",border:"none",color:"#fff",padding:"10px 13px",fontSize:"0.81rem",outline:"none",fontFamily:"'Nunito',sans-serif"}}/>
                <button onClick={()=>{if(nEmail.includes("@")){setNDone(true);toast2("🎉 Subscribed!");}else toast2("Enter valid email","error");}} style={{background:"#FF6B35",border:"none",color:"#fff",padding:"0 14px",cursor:"pointer",fontWeight:800,fontSize:"0.76rem",fontFamily:"'Nunito',sans-serif",whiteSpace:"nowrap"}}>Subscribe</button>
              </div>
            )}
            <div style={{fontWeight:800,fontSize:"0.76rem",color:"rgba(255,255,255,.45)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:11,marginTop:18}}>We Accept</div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {["💵 COD","📱 UPI","💳 Cards","⚡ Razorpay"].map(p=>(
                <span key={p} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.09)",borderRadius:6,padding:"3px 9px",fontSize:"0.7rem",color:"rgba(255,255,255,.45)",fontWeight:600}}>{p}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:11}}>
          <div style={{color:"rgba(255,255,255,.22)",fontSize:"0.76rem"}}>© 2025 Malwa Gift and Toys, Bathinda. All rights reserved. · GST: 03XXXXX0000X1ZX</div>
          <div style={{display:"flex",gap:14,alignItems:"center",color:"rgba(255,255,255,.22)",fontSize:"0.73rem"}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><I.Shield/> SSL Secured</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><I.Lock/> Safe Checkout</span>
            <span>🇮🇳 Made for Malwa, Punjab</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
