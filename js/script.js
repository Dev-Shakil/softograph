

// Slider 1
const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex1 = 0;

function updateSliderPosition1() {
  sliderWrapper.style.transform = `translateX(${-currentIndex1 * 320}px)`;
}

prevBtn.addEventListener('click', () => {
  if (currentIndex1 > 0) {
    currentIndex1--;
    updateSliderPosition1();
  }
});
nextBtn.addEventListener('click', () => {
  if (currentIndex1 < sliderWrapper.children.length - 2) {
    currentIndex1++;
    updateSliderPosition1();
  }
});

// Slider 2
const sliderWrapperInsights = document.getElementById('sliderWrapperInsights');
const prevBtnInsights = document.getElementById('prevBtnInsights');
const nextBtnInsights = document.getElementById('nextBtnInsights');
let currentIndex2 = 0;

function updateSliderPosition2() {
  sliderWrapperInsights.style.transform = `translateX(${-currentIndex2 * 380}px)`;
}

prevBtnInsights.addEventListener('click', () => {
  if (currentIndex2 > 0) {
    currentIndex2--;
    updateSliderPosition2();
  }
});
nextBtnInsights.addEventListener('click', () => {
  if (currentIndex2 < sliderWrapperInsights.children.length - 3) {
    currentIndex2++;
    updateSliderPosition2();
  }
});

// Slider 3
const sliderWrapperRoadmap = document.getElementById('sliderWrapperRoadmap');
const prevBtnRoadmap = document.getElementById('prevBtnRoadmap');
const nextBtnRoadmap = document.getElementById('nextBtnRoadmap');
let currentIndex3 = 0;

function updateSliderPosition3() {
  sliderWrapperRoadmap.style.transform = `translateX(${-currentIndex3 * 530}px)`;
}

prevBtnRoadmap.addEventListener('click', () => {
  if (currentIndex3 > 0) {
    currentIndex3--;
    updateSliderPosition3();
  }
});
nextBtnRoadmap.addEventListener('click', () => {
  if (currentIndex3 < sliderWrapperRoadmap.children.length - 3) {
    currentIndex3++;
    updateSliderPosition3();
  }
});

const sliderWrapperSolution = document.getElementById("sliderWrapperSolution");
const prevBtnSolution = document.getElementById("prevBtnSolution");
const nextBtnSolution = document.getElementById("nextBtnSolution");

let currentIndex4 = 0;

function updateSlider() {
  const sliderWidth = sliderWrapperSolution.children[0].offsetWidth; // Width of each slider item
  sliderWrapperSolution.style.transform = `translateX(${-currentIndex4 * sliderWidth}px)`;
}

prevBtnSolution.addEventListener("click", () => {
  if (currentIndex4 > 0) {
    currentIndex4--;
    updateSlider();
  }
});

nextBtnSolution.addEventListener("click", () => {
  if (currentIndex4 < sliderWrapperSolution.children.length - 1) {
    currentIndex4++;
    updateSlider();
  }
});

const hamburger = document.getElementById('hamburger');


hamburger.addEventListener('click', () => {
  menu.style.display='block';
});
function showMenu(){
	const menu = document.getElementById('mobile-menu');
	menu.style.display='block';
}
function closeMenu(){
	const menu = document.getElementById('mobile-menu');
	menu.style.display='none';
}



// DOM Elements
const canvas = document.getElementById('ambientCanvas');
const ctx = canvas.getContext('2d');

// Canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Parameters
const particles = [];
const numParticles = 200; // Number of particles
const noiseScale = 0.005; // Scale for Perlin noise
let time = 0;

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Random size
        this.alpha = Math.random() * 0.5 + 0.5; // Random transparency
        this.color = `rgba(255, 255, 255, ${this.alpha})`; // White particles
    }

    update() {
        // Use Perlin noise to influence movement
        const angle = noise.perlin3(this.x * noiseScale, this.y * noiseScale, time) * Math.PI * 2;
        this.x += Math.cos(angle) * 2;
        this.y += Math.sin(angle) * 2;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly transparent black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    time += 0.01; // Increment time for Perlin noise
    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});