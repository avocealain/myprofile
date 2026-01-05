/* Animation de particules pour évoquer données, cybersécurité, web */
const canvas = document.getElementById('bg-anim');
const ctx = canvas.getContext('2d');
let w, h, particles, locks, charts;

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
window.addEventListener('resize', resize);

function createParticles() {
  particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: 2 + Math.random() * 2,
      color: ['#00cfcf', '#0077b6', '#48cae4', '#fff'][Math.floor(Math.random()*4)]
    });
  }
}

// Cadenas fixes et gros
function createLocks() {
  locks = [
    { x: w*0.18, y: h*0.22, s: 60 },
    { x: w*0.8, y: h*0.18, s: 60 },
    { x: w*0.5, y: h*0.7, s: 70 }
  ];
}

// Graphes fixes et gros
function createCharts() {
  charts = [
    { x: w*0.25, y: h*0.7, s: 60, type: 0 },
    { x: w*0.75, y: h*0.75, s: 60, type: 1 },
    { x: w*0.5, y: h*0.35, s: 70, type: 0 }
  ];
}

// Dessine un cadenas stylisé
function drawLock(x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#0077b6";
  ctx.lineWidth = 3;
  // Corps du cadenas
  ctx.beginPath();
  ctx.rect(-s/4, 0, s/2, s/2.2, 4);
  ctx.fill();
  ctx.stroke();
  // Anse
  ctx.beginPath();
  ctx.arc(0, 0, s/4, Math.PI, 0, false);
  ctx.stroke();
  // Point serrure
  ctx.beginPath();
  ctx.arc(0, s/3.5, s/16, 0, 2*Math.PI);
  ctx.fillStyle = "#0077b6";
  ctx.fill();
  ctx.restore();
}

// Dessine un graphique en barres ou camembert stylisé
function drawChart(x, y, s, type) {
  ctx.save();
  ctx.translate(x, y);
  if (type === 0) {
    // Bar chart
    let bars = 4;
    for (let i = 0; i < bars; i++) {
      ctx.fillStyle = ["#00cfcf", "#0077b6", "#48cae4", "#fff"][i];
      let hBar = s/2 * (0.5 + 0.2*i); // hauteurs fixes pour stabilité
      ctx.fillRect(-s/2 + i*(s/bars), s/2-hBar, s/bars*0.7, hBar);
    }
  } else {
    // Pie chart
    let values = [Math.PI*0.8, Math.PI*0.7, Math.PI*0.6];
    let start = 0;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.arc(0,0,s/2,start,start+values[i]);
      ctx.closePath();
      ctx.fillStyle = ["#00cfcf", "#0077b6", "#48cae4"][i];
      ctx.fill();
      start += values[i];
    }
  }
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  // Dégradé dynamique
  let grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#0077b6");
  grad.addColorStop(0.5, "#48cae4");
  grad.addColorStop(1, "#00cfcf");
  ctx.fillStyle = grad;
  ctx.globalAlpha = 0.15;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;

  // Lignes entre particules proches
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = "#fff3";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  // Particules
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  // Cadenas fixes
  for (let l of locks) {
    drawLock(l.x, l.y, l.s);
  }
  // Graphiques fixes
  for (let c of charts) {
    drawChart(c.x, c.y, c.s, c.type);
  }
}

function animate() {
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  }
  draw();
  requestAnimationFrame(animate);
}

resize();
createParticles();
createLocks();
createCharts();
animate();

//CONTACT    
// // Formulaire contact : mailto
 document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const subject = encodeURIComponent("Message de " + name);
      const body = encodeURIComponent("Nom : " + name + "\nEmail : " + email + "\n\n" + message);
      window.location.href = `mailto:avocealain1@gmail.com?subject=${subject}&body=${body}`;
    });
    // Menu actif au scroll (optionnel)
    const links = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let fromTop = window.scrollY + 70;
      links.forEach(link => {
        let section = document.querySelector(link.hash);
        if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });
