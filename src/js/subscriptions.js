const form = document.getElementById('subscribe-form');
const message = document.getElementById('subscribe-message');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const email = form.elements.email.value;
    const regex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!regex.test(email)) {
      message.textContent = 'Invalid email';
      return;
    }

    try {
      const res = await fetch(
        'https://your-energy.b.goit.study/api/subscription',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) throw new Error();

      message.textContent = 'Successfully subscribed!';
      form.reset();
    } catch {
      message.textContent = 'Subscription failed';
    }
  });
}