(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const c="your-energy-favorites";function d(){return JSON.parse(localStorage.getItem(c))||[]}function p(t){const e=d();e.some(n=>n._id===t._id)||(e.push(t),localStorage.setItem(c,JSON.stringify(e)))}function y(t){const e=d().filter(n=>n._id!==t);localStorage.setItem(c,JSON.stringify(e))}function f(t){return d().some(e=>e._id===t)}const g="https://your-energy.b.goit.study/api/exercises";async function v(t){const e=await fetch(`${g}/${t}`);if(!e.ok)throw new Error("Failed to fetch exercise details");return e.json()}const l=document.getElementById("exercise-modal"),a=document.getElementById("modal-body");function h(){l.classList.remove("is-hidden"),document.addEventListener("keydown",m)}function u(){l.classList.add("is-hidden"),a.innerHTML="",document.removeEventListener("keydown",m)}function m(t){t.key==="Escape"&&u()}l.addEventListener("click",t=>{t.target.hasAttribute("data-close")&&u()});async function E(t){try{const e=await v(t),n=f(t);a.innerHTML=`
      <h2>${e.name}</h2>
      <p><strong>Body part:</strong> ${e.bodyPart}</p>
      <p><strong>Target:</strong> ${e.target}</p>
      <p><strong>Calories:</strong> ${e.caloriesBurned}</p>
      <p>${e.description}</p>

      <button
        class="Modal__favorite"
        type="button"
        data-id="${t}"
      >
        ${n?"Remove from favorites":"Add to favorites"}
      </button>
    `;const s=a.querySelector(".Modal__favorite");s.addEventListener("click",()=>{f(t)?(y(t),s.textContent="Add to favorites"):(p(e),s.textContent="Remove from favorites")}),h()}catch(e){console.error(e)}}export{d as g,E as o,y as r};
//# sourceMappingURL=modal-DQu2SKgR.js.map
