async function getQuote() {
  try {
    const res = await fetch('https://www.positive-api.online/phrase/esp');
    const data = await res.json();
    animateText(data.phrase);
  } catch (e) {
    animateText("Recuerda por qué empezaste.");
  }
}

function animateText(text) {
  const el = document.getElementById('message');
  el.style.opacity = 0;
  setTimeout(() => {
    el.innerText = text;
    el.style.opacity = 1;
  }, 200);
}

// Detectar movimiento + vibración
let lastX = null, lastY = null, lastZ = null;

window.addEventListener('devicemotion', function(event) {
  let acc = event.accelerationIncludingGravity;

  if (!lastX) {
    lastX = acc.x;
    lastY = acc.y;
    lastZ = acc.z;
    return;
  }

  let deltaX = Math.abs(lastX - acc.x);
  let deltaY = Math.abs(lastY - acc.y);
  let deltaZ = Math.abs(lastZ - acc.z);

  if (deltaX + deltaY + deltaZ > 30) {
    getQuote();
    if (navigator.vibrate) navigator.vibrate(100);
  }

  lastX = acc.x;
  lastY = acc.y;
  lastZ = acc.z;
});
