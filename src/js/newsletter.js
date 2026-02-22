import { submitSubscription } from './http.js';

const EMAIL_RE = /^\w+(\.\w+)?@[a-zA-Z_]+(\.[a-zA-Z_]+)*\.[a-zA-Z]{2,3}$/;

export function initNewsletter() {
  const form = document.querySelector('.footer-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const input = form.querySelector('.footer-input');
    const email = input.value.trim();
    const msgEl = getOrCreateMsg(form);

    if (!EMAIL_RE.test(email)) {
      showMsg(msgEl, 'Please enter a valid email address.', 'error');
      return;
    }

    try {
      const data = await submitSubscription(email);
      showMsg(msgEl, data.message || 'You have successfully subscribed!', 'success');
      input.value = '';
    } catch (err) {
      showMsg(msgEl, err.message || 'Subscription failed. Please try again.', 'error');
    }
  });
}

function getOrCreateMsg(form) {
  let el = form.querySelector('.footer-form-message');
  if (!el) {
    el = document.createElement('p');
    el.className = 'footer-form-message';
    form.appendChild(el);
  }
  return el;
}

function showMsg(el, text, type) {
  el.textContent = text;
  el.className = `footer-form-message footer-form-message--${type}`;
  el.hidden = false;
}