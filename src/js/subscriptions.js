const form = document.getElementById('subscribe-form');
const message = document.getElementById('subscribe-message');

const regex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

form?.addEventListener('submit', async e => {
  e.preventDefault();

  const email = form.elements.email.value.trim();

  if (!regex.test(email)) {
    message.textContent = 'Invalid email format';
    message.style.color = 'red';
    return;
  }

  try {
    const response = await fetch(
      'https://your-energy.b.goit.study/api/subscription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      message.textContent = 'Successfully subscribed!';
      message.style.color = 'lime';
      form.reset();
    } else {
      message.textContent = data.message || 'Subscription failed';
      message.style.color = 'red';
    }
  } catch {
    message.textContent = 'Server error';
    message.style.color = 'red';
  }
});
