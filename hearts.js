const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
  constructor(x, y, burst = false) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || canvas.height + 50;
    this.size = Math.random() * 25 + 20;
    this.speed = burst ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1;
    this.opacity = Math.random() * 0.6 + 0.4;
    this.sway = (Math.random() - 0.5) * 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 2;
    this.burst = burst;
    
    if (burst) {
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10 - 5;
    }
  }
  
  update() {
    if (this.burst) {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.2;
      this.vx *= 0.98;
    } else {
      this.y -= this.speed;
      this.x += this.sway;
    }
    
    this.rotation += this.rotationSpeed;
    this.opacity -= 0.003;
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.font = `${this.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❤️', 0, 0);
    ctx.restore();
  }
  
  isDead() {
    return this.y < -50 || this.opacity <= 0 || this.y > canvas.height + 50;
  }
}

function createHeart(x, y, burst = false) {
  hearts.push(new Heart(x, y, burst));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  hearts = hearts.filter(heart => {
    heart.update();
    heart.draw();
    return !heart.isDead();
  });
  
  requestAnimationFrame(animate);
}

setInterval(() => createHeart(), 400);

document.addEventListener('click', (e) => {
  for (let i = 0; i < 15; i++) {
    createHeart(e.clientX, e.clientY, true);
  }
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();
