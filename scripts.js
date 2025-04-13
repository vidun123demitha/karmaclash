// Particles.js for neon sparks
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ["#9b59b6", "#00f4ff", "#ffd700"] },
    shape: { type: "circle" },
    opacity: { value: 0.8, random: true },
    size: { value: 4, random: true },
    line_linked: { enable: false },
    move: { enable: true, speed: 4, direction: "none", random: true }
  },
  interactivity: { detect_on: "canvas", events: { onclick: { enable: true, mode: "repulse" } } }
});

// Network visualization for FAQ
const networkCanvas = document.getElementById("networkCanvas");
if (networkCanvas) {
  const ctx = networkCanvas.getContext("2d");
  const nodes = Array(10).fill().map(() => ({
    x: Math.random() * networkCanvas.width,
    y: Math.random() * networkCanvas.height
  }));

  function animateNetwork() {
    ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
    ctx.strokeStyle = "#00f4ff";
    ctx.fillStyle = "#9b59b6";
    nodes.forEach((node, i) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    });
    requestAnimationFrame(animateNetwork);
  }
  animateNetwork();
}

// Karma wave for About
const waveCanvas = document.getElementById("karmaWave");
if (waveCanvas) {
  const ctx = waveCanvas.getContext("2d");
  let t = 0;

  function animateWave() {
    ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#9b59b6";
    ctx.lineWidth: 2;
    for (let x = 0; x < waveCanvas.width; x++) {
      const y = Math.sin(x * 0.02 + t) * 50 + waveCanvas.height / 2;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    t += 0.05;
    requestAnimationFrame(animateWave);
  }
  animateWave();
}

// GSAP for page load animation
gsap.from(".container", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
