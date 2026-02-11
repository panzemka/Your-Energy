import{o as c,r as l,g as d}from"./modal-DQu2SKgR.js";/* empty css               */const r=document.getElementById("favorites-list");function a(){const t=d();if(!t.length){r.innerHTML="<p>Favorites list is empty</p>";return}r.innerHTML=t.map(({_id:e,name:s,bodyPart:i,target:o,caloriesBurned:n})=>`
      <li class="Exercises__card">
        <h3>${s}</h3>
        <p>Body part: ${i}</p>
        <p>Target: ${o}</p>
        <p>${n} calories</p>

        <button class="Exercises__start" data-id="${e}">
          Start
        </button>

        <button class="Exercises__remove" data-id="${e}">
          Remove
        </button>
      </li>
    `).join("")}r.addEventListener("click",t=>{const e=t.target.closest(".Exercises__start"),s=t.target.closest(".Exercises__remove");e&&c(e.dataset.id),s&&(l(s.dataset.id),a())});a();
//# sourceMappingURL=page-2-DokflBKI.js.map
