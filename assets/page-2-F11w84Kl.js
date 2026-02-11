import{o,g as c}from"./modal-C5Vwo0G-.js";const _=document.querySelectorAll(".header__link"),r=window.location.pathname.split("/").pop();_.forEach(a=>{const t=a.getAttribute("href");(r===""&&t.includes("index")||r===t.replace("./",""))&&a.classList.add("header__link--active")});const s=document.getElementById("favorites-list");function p(a=0){return Array.from({length:5},(t,e)=>`
    <span class="Card__star ${e<Math.round(a)?"Card__star--active":""}">★</span>
  `).join("")}function u(){const a=c();if(!a.length){s.innerHTML=`
      <p class="Favorites__empty">
        It appears that you haven't added any exercises to your favorites yet.
      </p>
    `;return}s.innerHTML=a.map(({_id:t,name:e,bodyPart:i,target:d,caloriesBurned:l,rating:n=0})=>`
      <li class="Card">
        <div class="Card__top">
          <span class="Card__badge">WORKOUT</span>
          <div class="Card__rating">
            <span class="Card__rating-value">${n.toFixed(1)}</span>
            <div class="Card__stars">
              ${p(n)}
            </div>
          </div>
        </div>

        <h3 class="Card__title">${e}</h3>

        <ul class="Card__meta">
          <li><span>Burned calories:</span>${l} cal</li>
          <li><span>Body part:</span>${i}</li>
          <li><span>Target:</span>${d}</li>
        </ul>

        <button
          class="Card__btn"
          data-id="${t}">
          Start →
        </button>
      </li>
    `).join("")}s.addEventListener("click",a=>{const t=a.target.closest(".Card__btn");t&&o(t.dataset.id)});document.addEventListener("DOMContentLoaded",u);
//# sourceMappingURL=page-2-F11w84Kl.js.map
