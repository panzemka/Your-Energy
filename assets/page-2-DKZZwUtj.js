import"./styles-DxHr4Hhd.js";import{o as l,g as c}from"./modal-CiyxqEL6.js";const _=document.querySelectorAll(".header__link"),n=window.location.pathname.split("/").pop();_.forEach(a=>{const t=a.getAttribute("href");(n===""&&t.includes("index")||n===t.replace("./",""))&&a.classList.add("header__link--active")});const s=document.getElementById("favorites-list");function p(a=0){return Array.from({length:5},(t,e)=>`
    <span class="Card__star ${e<Math.round(a)?"Card__star--active":""}">★</span>
  `).join("")}function u(){const a=c();if(!a.length){s.innerHTML=`
      <p class="Favorites__empty">
        It appears that you haven't added any exercises to your favorites yet.
      </p>
    `;return}s.innerHTML=a.map(({_id:t,name:e,bodyPart:i,target:d,caloriesBurned:o,rating:r=0})=>`
      <li class="Card">
        <div class="Card__top">
          <span class="Card__badge">WORKOUT</span>
          <div class="Card__rating">
            <span class="Card__rating-value">${r.toFixed(1)}</span>
            <div class="Card__stars">
              ${p(r)}
            </div>
          </div>
        </div>

        <h3 class="Card__title">${e}</h3>

        <ul class="Card__meta">
          <li><span>Burned calories:</span>${o} cal</li>
          <li><span>Body part:</span>${i}</li>
          <li><span>Target:</span>${d}</li>
        </ul>

        <button
          class="Card__btn"
          data-id="${t}">
          Start →
        </button>
      </li>
    `).join("")}s.addEventListener("click",a=>{const t=a.target.closest(".Card__btn");t&&l(t.dataset.id)});document.addEventListener("DOMContentLoaded",u);
//# sourceMappingURL=page-2-DKZZwUtj.js.map
