
/* FEVER v6 (script.js) */
(function(){
  const qsa=(s,el=document)=>Array.from(el.querySelectorAll(s));
  qsa(".acc-item").forEach((item,idx)=>{
    const btn=item.querySelector(".acc-btn");
    const panel=item.querySelector(".acc-panel");
    let inner=panel.querySelector(".acc-inner");
    if(!inner){inner=document.createElement("div");inner.className="acc-inner";while(panel.firstChild) inner.appendChild(panel.firstChild);panel.appendChild(inner);}
    const panelId=`acc-panel-${idx}`, btnId=`acc-btn-${idx}`;
    btn.id=btnId; panel.id=panelId;
    btn.setAttribute("aria-controls",panelId);
    btn.setAttribute("aria-expanded","false");
    panel.setAttribute("role","region");
    panel.setAttribute("aria-labelledby",btnId);
    const open=()=>{
      qsa(".acc-item.open").forEach(other=>{
        if(other!==item){
          const oBtn=other.querySelector(".acc-btn");
          const oPanel=other.querySelector(".acc-panel");
          const oInner=other.querySelector(".acc-inner");
          oBtn.setAttribute("aria-expanded","false");
          other.classList.remove("open");
          if(oPanel.style.height==="auto"||oPanel.style.height===""){oPanel.style.height=oInner.scrollHeight+"px";}
          void oPanel.offsetHeight; oPanel.style.height="0px";
          const oCh=oBtn.querySelector(".acc-chevron"); if(oCh) oCh.style.transform="rotate(0deg)";
        }
      });
      item.classList.add("open"); btn.setAttribute("aria-expanded","true");
      panel.style.height=inner.scrollHeight+"px";
      const tidy=(e)=>{ if(e.propertyName==="height"){ panel.style.height="auto"; panel.removeEventListener("transitionend",tidy);} };
      panel.addEventListener("transitionend",tidy);
      const ch=btn.querySelector(".acc-chevron"); if(ch) ch.style.transform="rotate(90deg)";
    };
    const close=()=>{
      item.classList.remove("open"); btn.setAttribute("aria-expanded","false");
      if(panel.style.height==="auto"||panel.style.height===""){ panel.style.height=inner.scrollHeight+"px"; }
      void panel.offsetHeight; panel.style.height="0px";
      const ch=btn.querySelector(".acc-chevron"); if(ch) ch.style.transform="rotate(0deg)";
    };
    const toggle=()=>{ const expanded=btn.getAttribute("aria-expanded")==="true"; if(expanded) close(); else { panel.style.height="0px"; requestAnimationFrame(open);} };
    btn.addEventListener("click",toggle);
    btn.addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); toggle(); } });
  });
})();
