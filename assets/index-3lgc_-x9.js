import{o as $}from"./modal-C5Vwo0G-.js";const T=document.querySelectorAll(".header__link"),_=window.location.pathname.split("/").pop();T.forEach(t=>{const e=t.getAttribute("href");(_===""&&e.includes("index")||_===e.replace("./",""))&&t.classList.add("header__link--active")});const I="https://your-energy.b.goit.study/api/quote",E="dailyQuote",v=document.getElementById("quote-text"),b=document.getElementById("quote-author");function B(t){const e=new Date(t).toDateString(),n=new Date().toDateString();return e===n}async function q(){try{const t=await fetch(I);if(!t.ok)throw new Error("Failed to fetch quote");const e=await t.json(),n={text:e.quote,author:e.author,date:new Date().toISOString()};localStorage.setItem(E,JSON.stringify(n)),C(n)}catch{v.textContent="Stay active and healthy every day",b.textContent=""}}function C({text:t,author:e}){v.textContent=t,b.textContent=e?`— ${e}`:""}function M(){const t=localStorage.getItem(E);if(t){const e=JSON.parse(t);if(B(e.date)){C(e);return}}q()}const k=document.getElementById("exercises-title"),l=document.getElementById("exercises-list");function A(t){k.textContent=t,window.scrollTo({top:0,behavior:"smooth"})}function D(t){return Array.from({length:5},(e,n)=>`
    <span class="Card__star ${n<Math.round(t)?"Card__star--active":""}">★</span>
  `).join("")}function F(t=[]){if(!t.length){l.innerHTML="<p>No exercises found</p>";return}l.innerHTML=t.map(({_id:e,name:n,bodyPart:s,target:a,caloriesBurned:i,time:c,rating:y})=>`
      <li class="Card">
        <div class="Card__top">
          <span class="Card__badge">WORKOUT</span>
          <div class="Card__rating">
            <span class="Card__rating-value">${y.toFixed(1)}</span>
            <div class="Card__stars">
              ${D(y)}
            </div>
          </div>
        </div>

        <h3 class="Card__title">${n}</h3>

        <ul class="Card__meta">
          <li><span>Burned calories:</span>${i} / ${c} min</li>
          <li><span>Body part:</span>${s}</li>
          <li><span>Target:</span>${a}</li>
        </ul>

        <button
          class="Card__btn"
          data-id="${e}">
          Start →
        </button>
      </li>
    `).join("")}l.addEventListener("click",t=>{const e=t.target.closest(".Card__btn");e&&$(e.dataset.id)});const d=document.getElementById("exercises-pagination");function O(t,e){if(!t||t<=1){d.innerHTML="";return}d.innerHTML=Array.from({length:t},(n,s)=>{const a=s+1;return`
        <button
          class="Pagination__btn ${a===e?"Pagination__btn--active":""}"
          data-page="${a}">
          ${a}
        </button>
      `}).join("")}d.addEventListener("click",t=>{const e=t.target.closest(".Pagination__btn");e&&P(Number(e.dataset.page))});const j="https://your-energy.b.goit.study/api/exercises";let f="",m="",w="";const R=12;async function g({category:t,filter:e,page:n=1,keyword:s=""}){f=t,m=e,w=s;const a=new URLSearchParams({page:n,limit:R});s&&a.append("keyword",s),e==="Muscles"&&a.append("muscles",t.toLowerCase()),e==="Body parts"&&a.append("bodypart",t.toLowerCase()),e==="Equipment"&&a.append("equipment",t.toLowerCase());try{const c=await(await fetch(`${j}?${a.toString()}`)).json();F(c.results,t),O(c.totalPages,n)}catch(i){console.error(i)}}function P(t){g({category:f,filter:m,page:t,keyword:w})}function N(t){g({category:f,filter:m,page:1,keyword:t})}const u=document.getElementById("categories-list");function U(t){if(!t||!t.length){u.innerHTML="<p>No categories found</p>";return}u.innerHTML=t.map(({name:e,imgURL:n,filter:s})=>`
      <li>
        <div
          class="Categories__card"
          data-name="${e}"
          data-filter="${s}">

          <img
            src="${n}"
            alt="${e}" />

          <span class="Categories__name">${e}</span>

        </div>
      </li>
    `).join("")}u.addEventListener("click",t=>{const e=t.target.closest(".Categories__card");if(!e)return;const n=e.dataset.name,s=e.dataset.filter;A(n),g({category:n,filter:s})});const H="https://your-energy.b.goit.study/api/filters",S=document.querySelectorAll(".Filters__btn");let x="Muscles",p=1;const Q=12;async function L(t,e=1){try{const n=new URLSearchParams({filter:t,page:e,limit:Q}),a=await(await fetch(`${H}?${n.toString()}`)).json();U(a.results)}catch(n){console.error(n)}}function J(t){S.forEach(e=>e.classList.remove("Filters__btn--active")),t.classList.add("Filters__btn--active")}S.forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.filter;x=e,p=1,J(t),L(e,p)})});function K(){L(x,p)}const h=document.getElementById("exercises-search");h&&h.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget.elements.keyword.value.trim();N(e)});const o=document.getElementById("subscribe-form"),r=document.getElementById("subscribe-message"),z=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;o==null||o.addEventListener("submit",async t=>{t.preventDefault();const e=o.elements.email.value.trim();if(!z.test(e)){r.textContent="Invalid email format",r.style.color="red";return}try{const n=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})}),s=await n.json();n.ok?(r.textContent="Successfully subscribed!",r.style.color="lime",o.reset()):(r.textContent=s.message||"Subscription failed",r.style.color="red")}catch{r.textContent="Server error",r.style.color="red"}});document.addEventListener("DOMContentLoaded",()=>{M(),K()});
//# sourceMappingURL=index-3lgc_-x9.js.map
