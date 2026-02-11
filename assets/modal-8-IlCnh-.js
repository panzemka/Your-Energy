const s="your-energy-favorites";function n(){return JSON.parse(localStorage.getItem(s))||[]}function c(e){const t=n();t.some(a=>a._id===e._id)||(t.push(e),localStorage.setItem(s,JSON.stringify(t)))}function v(e){const t=n().filter(a=>a._id!==e);localStorage.setItem(s,JSON.stringify(t))}function r(e){return n().some(t=>t._id===e)}const f="https://your-energy.b.goit.study/api/exercises";async function _(e){const t=await fetch(`${f}/${e}`);if(!t.ok)throw new Error("Failed to fetch exercise details");return t.json()}const i=document.getElementById("exercise-modal"),d=document.getElementById("modal-body");function u(){i.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function l(){i.classList.add("is-hidden"),d.innerHTML="",document.body.style.overflow=""}i.addEventListener("click",e=>{e.target.hasAttribute("data-close")&&l()});document.addEventListener("keydown",e=>{e.key==="Escape"&&l()});function m(e){return Array.from({length:5},(t,a)=>`
    <span class="Modal__star ${a<Math.round(e)?"Modal__star--active":""}">
      ★
    </span>
  `).join("")}async function p(e){const t=await _(e),a=r(e);d.innerHTML=`
    <div class="Modal__wrapper">
      <div class="Modal__image-wrapper">
        <img src="${t.gifUrl}" alt="${t.name}" class="Modal__image" />
      </div>

      <div>
        <h2 class="Modal__title">${t.name}</h2>

        <div class="Modal__rating-block">
          <span class="Modal__rating-value">${t.rating.toFixed(1)}</span>
          <div class="Modal__stars">
            ${m(t.rating)}
          </div>
        </div>

        <ul class="Modal__stats">
          <li><span>Target</span>${t.target}</li>
          <li><span>Body Part</span>${t.bodyPart}</li>
          <li><span>Equipment</span>${t.equipment}</li>
          <li><span>Calories</span>${t.caloriesBurned}</li>
        </ul>

        <p class="Modal__description">
          ${t.description}
        </p>

        <div class="Modal__actions">
          <button class="Modal__btn Modal__btn--primary" id="favorite-btn">
            ${a?"Remove from favorites":"Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  `;const o=document.getElementById("favorite-btn");o.addEventListener("click",()=>{r(e)?(v(e),o.textContent="Add to favorites"):(c(t),o.textContent="Remove from favorites")}),u()}export{n as g,p as o};
//# sourceMappingURL=modal-8-IlCnh-.js.map
