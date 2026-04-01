async function getQuote() {
  try {
    const res = await fetch('https://www.positive-api.online/phrase/esp');
    const data = await res.json();
    document.getElementById('message').innerText = data.phrase;
  } catch (e) {
    document.getElementById('message').innerText = "Recuerda por qué empezaste.";
  }
}

// Detectar movimiento
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
}

  lastX = acc.x;
  lastY = acc.y;
  lastZ = acc.z;
});


