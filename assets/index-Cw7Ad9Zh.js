import{o as S}from"./modal-DQu2SKgR.js";/* empty css               */const $="https://your-energy.b.goit.study/api/quote",y="dailyQuote",_=document.getElementById("quote-text"),E=document.getElementById("quote-author");function I(e){const t=new Date(e).toDateString(),n=new Date().toDateString();return t===n}async function T(){try{const e=await fetch($);if(!e.ok)throw new Error("Failed to fetch quote");const t=await e.json(),n={text:t.quote,author:t.author,date:new Date().toISOString()};localStorage.setItem(y,JSON.stringify(n)),h(n)}catch{_.textContent="Stay active and healthy every day",E.textContent=""}}function h({text:e,author:t}){_.textContent=e,E.textContent=t?`— ${t}`:""}function B(){const e=localStorage.getItem(y);if(e){const t=JSON.parse(e);if(I(t.date)){h(t);return}}T()}const q=document.getElementById("exercises-section"),F=document.getElementById("exercises-title"),c=document.getElementById("exercises-list");function M(){q.classList.remove("is-hidden")}function D(e=[],t=""){if(M(),F.textContent=`Exercises / ${t}`,!e.length){c.innerHTML="<p>No exercises found</p>";return}c.innerHTML=e.map(({_id:n,name:s,bodyPart:r,target:o,caloriesBurned:a,time:w,rating:L})=>`
      <li class="exercise-card">
        <div class="exercise-card__top">
          <span class="badge">WORKOUT</span>
          <span class="rating">${L.toFixed(1)} ⭐</span>
        </div>

        <h3 class="exercise-card__title">${s}</h3>

        <p class="meta">
          Burned calories: ${a} / ${w} min
        </p>
        <p class="meta">Body part: ${r}</p>
        <p class="meta">Target: ${o}</p>

        <button class="exercise-card__btn"
                data-id="${n}">
          Start →
        </button>
      </li>
    `).join(""),c.addEventListener("click",n=>{const s=n.target.closest(".exercise-card__btn");s&&S(s.dataset.id)})}const d=document.getElementById("exercises-pagination");function O(e,t){if(e<=1){d.innerHTML="";return}d.innerHTML=Array.from({length:e},(n,s)=>{const r=s+1;return`
      <button
        class="Exercises__page ${r===t?"Exercises__page--active":""}"
        type="button"
        data-page="${r}"
      >
        ${r}
      </button>
    `}).join("")}d.addEventListener("click",e=>{const t=e.target.closest(".Exercises__page");t&&j(Number(t.dataset.page))});const k="https://your-energy.b.goit.study/api/exercises";let p="",g="",f=1,x="";const R=10;async function m({category:e,filter:t,page:n=1,keyword:s=""}){p=e,g=t,f=n,x=s;const r=new URLSearchParams({page:n,limit:R});s&&r.append("keyword",s),t==="Muscles"&&r.append("muscles",e.toLowerCase()),t==="Body parts"&&r.append("bodypart",e.toLowerCase()),t==="Equipment"&&r.append("equipment",e.toLowerCase());try{const o=await fetch(`${k}?${r.toString()}`);if(!o.ok)throw new Error("Failed to fetch exercises");const a=await o.json();D(a.results,e),O(a.totalPages,f)}catch(o){console.error(o)}}function j(e){m({category:p,filter:g,page:e,keyword:x})}function A(e){m({category:p,filter:g,page:1,keyword:e})}const u=document.getElementById("categories-list");function N(e=[]){if(!e.length){u.innerHTML="<p>No categories found</p>";return}u.innerHTML=e.map(({name:t,filter:n})=>`
      <li class="Categories__item">
        <button class="Categories__card" type="button">
          <div class="Categories__thumb">
            <div class="Categories__placeholder">IMG</div>
          </div>
          <div class="Categories__info">
            <h3 class="Categories__name">${t}</h3>
            <p class="Categories__type">${n}</p>
          </div>
        </button>
      </li>
    `).join("")}u.addEventListener("click",e=>{const t=e.target.closest(".Categories__card");if(!t)return;const n=t.querySelector(".Categories__name").textContent,s=t.querySelector(".Categories__type").textContent;m({category:n,filter:s})});const H="https://your-energy.b.goit.study/api/filters",b=document.querySelectorAll(".Filters__btn");let v="Muscles";async function C(e){try{const n=await(await fetch(`${H}?filter=${e}`)).json();N(n)}catch(t){console.error(t)}}function U(e){b.forEach(t=>t.classList.remove("Filters__btn--active")),e.classList.add("Filters__btn--active")}b.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.filter;v=t,U(e),C(t)})});function P(){C(v)}const Q=document.getElementById("exercises-search");Q.addEventListener("submit",e=>{e.preventDefault();const t=e.currentTarget.elements.keyword.value.trim();A(t)});const i=document.getElementById("subscribe-form"),l=document.getElementById("subscribe-message");i&&i.addEventListener("submit",async e=>{e.preventDefault();const t=i.elements.email.value;if(!/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(t)){l.textContent="Invalid email";return}try{if(!(await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})})).ok)throw new Error;l.textContent="Successfully subscribed!",i.reset()}catch{l.textContent="Subscription failed"}});document.addEventListener("DOMContentLoaded",()=>{B(),P()});
//# sourceMappingURL=index-Cw7Ad9Zh.js.map
