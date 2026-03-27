// assets/js/bg-particles.js

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Style the canvas to sit behind everything
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0'; // Behind the content
canvas.style.pointerEvents = 'none'; // Click through it
canvas.style.opacity = '0.4'; // Subtle effect

let width, height;
let particles = [];

// Configuration
const particleCount = 150; // Fewer particles needed for Canvas to look full
const connectionDistance = 100;
const baseHue = 50; // Cyan/Blue (Helldivers Tech vibe)

// Resize handling
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// Particle Class
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5; // Slow drift velocity
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    // Vary hue slightly for depth
    this.hue = baseHue + (Math.random() * 40 - 20); 
    this.life = Math.random() * 100;
    this.maxLife = 100 + Math.random() * 100;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    // Wrap around screen
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Fade in/out cycle
    if (this.life > this.maxLife) {
      this.reset();
      this.life = 0;
    }
  }

  draw() {
    const opacity = Math.sin((this.life / this.maxLife) * Math.PI); // Smooth fade
    ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, width, height);
  
  // Draw particles
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Optional: Draw subtle connections (lines) between close particles
  // Only do this if performance allows (comment out if too slow)
  /*
  ctx.strokeStyle = `hsla(${baseHue}, 100%, 50%, 0.1)`;
  ctx.lineWidth = 0.5;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  */

  requestAnimationFrame(animate);
}

animate();