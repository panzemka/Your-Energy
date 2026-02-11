(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const a="your-energy-favorites";function d(){return JSON.parse(localStorage.getItem(a))||[]}function m(t){const e=d();e.some(r=>r._id===t._id)||(e.push(t),localStorage.setItem(a,JSON.stringify(e)))}function p(t){const e=d().filter(r=>r._id!==t);localStorage.setItem(a,JSON.stringify(e))}function c(t){return d().some(e=>e._id===t)}const v="https://your-energy.b.goit.study/api/exercises";async function _(t){const e=await fetch(`${v}/${t}`);if(!e.ok)throw new Error("Failed to fetch exercise details");return e.json()}const l=document.getElementById("exercise-modal"),f=document.getElementById("modal-body");function g(){l.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function u(){l.classList.add("is-hidden"),f.innerHTML="",document.body.style.overflow=""}l.addEventListener("click",t=>{t.target.hasAttribute("data-close")&&u()});document.addEventListener("keydown",t=>{t.key==="Escape"&&u()});function y(t){return Array.from({length:5},(e,r)=>`
    <span class="Modal__star ${r<Math.round(t)?"Modal__star--active":""}">
      ★
    </span>
  `).join("")}async function h(t){const e=await _(t),r=c(t);f.innerHTML=`
    <div class="Modal__wrapper">
      <div class="Modal__image-wrapper">
        <img src="${e.gifUrl}" alt="${e.name}" class="Modal__image" />
      </div>

      <div>
        <h2 class="Modal__title">${e.name}</h2>

        <div class="Modal__rating-block">
          <span class="Modal__rating-value">${e.rating.toFixed(1)}</span>
          <div class="Modal__stars">
            ${y(e.rating)}
          </div>
        </div>

        <ul class="Modal__stats">
          <li><span>Target</span>${e.target}</li>
          <li><span>Body Part</span>${e.bodyPart}</li>
          <li><span>Equipment</span>${e.equipment}</li>
          <li><span>Calories</span>${e.burnedCalories||e.caloriesBurned||0} / ${e.time} min</li>
        </ul>

        <p class="Modal__description">
          ${e.description}
        </p>

        <div class="Modal__actions">
          <button class="Modal__btn Modal__btn--primary" id="favorite-btn">
            ${r?"Remove from favorites":"Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  `;const i=document.getElementById("favorite-btn");i.addEventListener("click",()=>{c(t)?(p(t),i.textContent="Add to favorites"):(m(e),i.textContent="Remove from favorites")}),g()}export{d as g,h as o};
//# sourceMappingURL=modal-C5Vwo0G-.js.map
