import"./modal-DQu2SKgR.js";/* empty css               */const C="https://your-energy.b.goit.study/api/quote",_="dailyQuote",m=document.getElementById("quote-text"),y=document.getElementById("quote-author");function b(t){const e=new Date(t).toDateString(),n=new Date().toDateString();return e===n}async function v(){try{const t=await fetch(C);if(!t.ok)throw new Error("Failed to fetch quote");const e=await t.json(),n={text:e.quote,author:e.author,date:new Date().toISOString()};localStorage.setItem(_,JSON.stringify(n)),E(n)}catch{m.textContent="Stay active and healthy every day",y.textContent=""}}function E({text:t,author:e}){m.textContent=t,y.textContent=e?`— ${e}`:""}function w(){const t=localStorage.getItem(_);if(t){const e=JSON.parse(t);if(b(e.date)){E(e);return}}v()}document.getElementById("exercises-section");const L=document.getElementById("exercises-title"),f=document.getElementById("exercises-list");function S(t=[],e=""){if(L.textContent=e,!t.length){f.innerHTML="<p>No exercises found</p>";return}f.innerHTML=t.map(({name:n,bodyPart:r,target:s,caloriesBurned:o,time:i})=>`
      <li class="Exercises__card">
        <h3 class="Exercises__name">${n}</h3>
        <p class="Exercises__meta">Body part: ${r}</p>
        <p class="Exercises__meta">Target: ${s}</p>
        <p class="Exercises__meta">${o} calories / ${i} min</p>
        <button class="Exercises__start" type="button">Start</button>
      </li>
    `).join("")}const a=document.getElementById("exercises-pagination");function $(t,e){if(t<=1){a.innerHTML="";return}a.innerHTML=Array.from({length:t},(n,r)=>{const s=r+1;return`
      <button
        class="Exercises__page ${s===e?"Exercises__page--active":""}"
        type="button"
        data-page="${s}"
      >
        ${s}
      </button>
    `}).join("")}a.addEventListener("click",t=>{const e=t.target.closest(".Exercises__page");e&&F(Number(e.dataset.page))});const q="https://your-energy.b.goit.study/api/exercises";let u="",d="",g=1,h="";const I=10;async function p({category:t,filter:e,page:n=1,keyword:r=""}){u=t,d=e,g=n,h=r;const s=new URLSearchParams({page:n,limit:I});r&&s.append("keyword",r),e==="Muscles"&&s.append("muscles",t.toLowerCase()),e==="Body parts"&&s.append("bodypart",t.toLowerCase()),e==="Equipment"&&s.append("equipment",t.toLowerCase());try{const o=await fetch(`${q}?${s.toString()}`);if(!o.ok)throw new Error("Failed to fetch exercises");const i=await o.json();S(i.results,t),$(i.totalPages,g)}catch(o){console.error(o)}}function F(t){p({category:u,filter:d,page:t,keyword:h})}function T(t){p({category:u,filter:d,page:1,keyword:t})}const c=document.getElementById("categories-list");function B(t=[]){if(!t.length){c.innerHTML="<p>No categories found</p>";return}c.innerHTML=t.map(({name:e,filter:n})=>`
      <li class="Categories__item">
        <button class="Categories__card" type="button">
          <div class="Categories__thumb">
            <div class="Categories__placeholder">IMG</div>
          </div>
          <div class="Categories__info">
            <h3 class="Categories__name">${e}</h3>
            <p class="Categories__type">${n}</p>
          </div>
        </button>
      </li>
    `).join("")}c.addEventListener("click",t=>{const e=t.target.closest(".Categories__card");if(!e)return;const n=e.querySelector(".Categories__name").textContent,r=e.querySelector(".Categories__type").textContent;p({category:n,filter:r})});const M="https://your-energy.b.goit.study/api/filters",D=document.querySelector(".Filters__buttons"),k=document.querySelectorAll(".Filters__btn");let l="Muscles";function R(t){k.forEach(e=>e.classList.remove("Filters__btn--active")),t.classList.add("Filters__btn--active")}async function x(t){try{const e=await fetch(`${M}?filter=${t}`);if(!e.ok)throw new Error("Failed to fetch filters");const n=await e.json();B(n)}catch(e){console.error(e)}}D.addEventListener("click",t=>{const e=t.target.closest(".Filters__btn");if(!e)return;const n=e.dataset.filter;n!==l&&(l=n,R(e),x(n))});function j(){x(l)}const H=document.getElementById("exercises-search");H.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget.elements.keyword.value.trim();T(e)});document.addEventListener("DOMContentLoaded",()=>{w(),j()});
//# sourceMappingURL=index-B7cRsFBY.js.map
