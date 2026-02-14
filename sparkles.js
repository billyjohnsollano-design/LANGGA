const sparklesCanvas = document.getElementById('sparkles');
const sparklesCtx = sparklesCanvas.getContext('2d');
sparklesCanvas.width = window.innerWidth;
sparklesCanvas.height = window.innerHeight;

let sparkles = [];

class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.01;
    this.color = ['#FFD700', '#FF69B4', '#FF1493', '#FFA500'][Math.floor(Math.random() * 4)];
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    this.size *= 0.97;
  }
  
  draw() {
    sparklesCtx.save();
    sparklesCtx.globalAlpha = this.life;
    sparklesCtx.fillStyle = this.color;
    sparklesCtx.beginPath();
    sparklesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    sparklesCtx.fill();
    
    // Star shape
    sparklesCtx.fillStyle = 'white';
    sparklesCtx.fillRect(this.x - this.size/2, this.y - 0.5, this.size, 1);
    sparklesCtx.fillRect(this.x - 0.5, this.y - this.size/2, 1, this.size);
    sparklesCtx.restore();
  }
  
  isDead() {
    return this.life <= 0;
  }
}

function createSparkle(x, y) {
  sparkles.push(new Sparkle(x, y));
}

function animateSparkles() {
  sparklesCtx.clearRect(0, 0, sparklesCanvas.width, sparklesCanvas.height);
  
  sparkles = sparkles.filter(sparkle => {
    sparkle.update();
    sparkle.draw();
    return !sparkle.isDead();
  });
  
  requestAnimationFrame(animateSparkles);
}

let lastSparkleTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkleTime > 30) {
    createSparkle(e.clientX, e.clientY);
    lastSparkleTime = now;
  }
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  createSparkle(touch.clientX, touch.clientY);
});

window.addEventListener('resize', () => {
  sparklesCanvas.width = window.innerWidth;
  sparklesCanvas.height = window.innerHeight;
});

animateSparkles();
