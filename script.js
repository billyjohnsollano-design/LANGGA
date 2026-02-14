let currentPage = 1;
let flowerShown = false;

function nextPage(pageNum) {
  const current = document.getElementById(`page${currentPage}`);
  const next = document.getElementById(`page${pageNum}`);
  
  current.classList.add('exiting');
  setTimeout(() => {
    current.classList.remove('active', 'exiting');
  }, 800);
  
  next.classList.add('active');
  currentPage = pageNum;
  
  // Heart burst
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createHeart(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        true
      );
    }, i * 20);
  }
  
  // Show flower on page 5 with delay
  if (pageNum === 5 && !flowerShown) {
    flowerShown = true;
    setTimeout(showFlower, 1500);
  }
}

function showFlower() {
  const flowerContainer = document.getElementById('flowerContainer');
  const finalMessage = document.getElementById('finalMessage');
  
  flowerContainer.classList.add('show');
  
  // MASSIVE heart explosion
  for (let i = 0; i < 200; i++) {
    setTimeout(() => {
      createHeart(
        canvas.width / 2 + (Math.random() - 0.5) * 300,
        canvas.height / 2 + (Math.random() - 0.5) * 300,
        true
      );
    }, i * 20);
  }
  
  // Show final message
  setTimeout(() => {
    finalMessage.classList.add('show');
  }, 10000);
}

// Prevent right-click
document.addEventListener('contextmenu', e => e.preventDefault());

// Secret console message
console.log('%cI love you ❤️', 'font-size: 50px; color: #ff69b4; text-shadow: 0 0 10px #ff1493;');
console.log('%cThis website was made with love just for you 🌹', 'font-size: 20px; color: #ff69b4;');
