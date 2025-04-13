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

// Chart.js for fake data graph
let chart;
function initChart() {
  const ctx = document.getElementById("dataCanvas").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
      datasets: [
        {
          label: "Your Karma",
          data: [20, 60, 40, 80, 30, 50, 70],
          borderColor: "#9b59b6",
          backgroundColor: "rgba(155, 89, 182, 0.2)",
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: "Her Karma",
          data: [30, 50, 70, 40, 60, 80, 90],
          borderColor: "#00f4ff",
          backgroundColor: "rgba(0, 244, 255, 0.2)",
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      animation: { duration: 2000 },
      scales: { x: { display: false }, y: { display: false } },
      plugins: { legend: { display: false } }
    }
  });
}

// Warning toggle
function showWarning() {
  document.getElementById("warning").classList.remove("hidden");
}

function hideWarning() {
  document.getElementById("warning").classList.add("hidden");
}

// Navigation with glitchy transitions
function navigate(pageId) {
  const currentPage = document.querySelector(".container:not(.hidden)");
  const nextPage = document.getElementById(pageId);

  gsap.to(currentPage, {
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.6,
    onComplete: () => {
      currentPage.classList.add("hidden");
      nextPage.classList.remove("hidden");
      gsap.fromTo(nextPage, 
        { opacity: 0, filter: "blur(10px)" }, 
        { opacity: 1, filter: "blur(0px)", duration: 0.6 }
      );

      if (pageId === "processing") {
        startProcessing();
        initChart();
      }

      if (pageId === "result") {
        const nemesis = document.getElementById("nemesisInput").value || "she";
        document.getElementById("resultText").innerHTML = `අනේ ගෙදෙට්ට වෙලා පොතක් පතක් බලා ගනිං බං 🥴 <b>${nemesis}</b> ගැන හොයන්න එන්නෙ මෙතන`;
      }
    }
  });
}

// Processing simulation
function startProcessing() {
  const progress = document.getElementById("progress");
  const processingText = document.getElementById("processingText");
  const messages = [
    "Checking social vibes...",
    "Scanning rival stats...",
    "Crunching karma points...",
    "Comparing your power...",
    "Analyzing her mask...",
    "Checking her habits...",
    "Finalizing results..."
  ];

  let width = 0;
  let messageIndex = 0;

  const interval = setInterval(() => {
    width += 7;
    progress.style.width = `${width}%`;

    if (width % 15 === 0 && messageIndex < messages.length) {
      processingText.textContent = messages[messageIndex];
      messageIndex++;
      if (chart) {
        chart.data.datasets[0].data = chart.data.datasets[0].data.map(() => Math.random() * 100);
        chart.data.datasets[1].data = chart.data.datasets[1].data.map(() => Math.random() * 100);
        chart.update();
      }
    }

    if (width >= 100) {
      clearInterval(interval);
      navigate("result");
    }
  }, 600);
}