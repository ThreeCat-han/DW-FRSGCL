// 简易烟花特效
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Firework {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = canvas.height;
        this.radius = 2;
        this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
        this.speed = random(3, 5);
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y < random(100, 300)) {
                this.exploded = true;
                for (let i = 0; i < 50; i++) {
                    this.particles.push(new Particle(this.x, this.y, this.color));
                }
            }
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.color = color;
        this.speedX = random(-3, 3);
        this.speedY = random(-3, 3);
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let fireworks = [];

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) fireworks.push(new Firework());

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.exploded) {
            fw.particles.forEach(p => {
                p.update();
                p.draw();
            });
            fw.particles = fw.particles.filter(p => p.life > 0);
            if (fw.particles.length === 0) fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}
animate();

function toggleMusic() {
    const music = document.getElementById('bg-music');
    music.paused ? music.play() : music.pause();
}

// 蛋糕蜡烛小游戏
const cakeCanvas = document.getElementById("cakeCanvas");
const cakeCtx = cakeCanvas.getContext("2d");

let candleLit = true;

// function drawCake() {
//     cakeCtx.clearRect(0, 0, 300, 400);
//     cakeCtx.fillStyle = "#8B4513";
//     cakeCtx.fillRect(100, 300, 100, 40);
//     cakeCtx.fillStyle = "#FFD700";
//     if (candleLit) {
//         cakeCtx.beginPath();
//         cakeCtx.moveTo(150, 300);
//         cakeCtx.lineTo(150, 250);
//         cakeCtx.strokeStyle = "#FFD700";
//         cakeCtx.lineWidth = 5;
//         cakeCtx.stroke();
//         cakeCtx.beginPath();
//         cakeCtx.arc(150, 245, 7, 0, Math.PI * 2);
//         cakeCtx.fillStyle = "orange";
//         cakeCtx.fill();
//     }
// }
let flameOffset = 0;

function drawCake() {
    cakeCtx.clearRect(0, 0, 300, 400);

    // 蛋糕底座 - 巧克力层
    cakeCtx.fillStyle = "#8B4513";
    cakeCtx.fillRect(90, 280, 120, 40);

    // 中间层 - 草莓层
    cakeCtx.fillStyle = "#FF69B4";
    cakeCtx.fillRect(95, 240, 110, 40);

    // 上层 - 香草层
    cakeCtx.fillStyle = "#FFF8DC";
    cakeCtx.fillRect(100, 200, 100, 40);

    // 蜡烛
    cakeCtx.fillStyle = "#FFC0CB";
    cakeCtx.fillRect(145, 160, 10, 40);

    if (candleLit) {
        // 抖动火焰：轻微随机上下左右偏移
        const offsetX = (Math.random() - 0.5) * 4;
        const offsetY = (Math.random() - 0.5) * 4;

        // 火焰
        cakeCtx.beginPath();
        cakeCtx.arc(150 + offsetX, 155 + offsetY, 7, 0, Math.PI * 2);
        cakeCtx.fillStyle = "orange";
        cakeCtx.fill();

        cakeCtx.beginPath();
        cakeCtx.arc(150 + offsetX, 155 + offsetY, 4, 0, Math.PI * 2);
        cakeCtx.fillStyle = "yellow";
        cakeCtx.fill();
    }
}
setInterval(() => {
    drawCake();
}, 100); // 每 100ms 重画一次

drawCake();

cakeCanvas.addEventListener("click", () => {
    candleLit = false;
    drawCake();

// 创建一个容器用于放小猫动图
const catGifContainer = document.createElement('div');
catGifContainer.style.position = 'fixed';
catGifContainer.style.top = '50%';
catGifContainer.style.left = '50%';
catGifContainer.style.transform = 'translate(-50%, -150%)'; // 居中并向上移一点
catGifContainer.style.zIndex = '10001'; // 比 sweetalert 弹窗高
catGifContainer.style.pointerEvents = 'none'; // 不影响弹窗交互

// 创建一个 img 标签装入小猫动图
const catGif = document.createElement('img');
catGif.src = 'https://sweetalert2.github.io/images/nyan-cat.gif';
catGif.style.width = '150px';  // 原图缩小约为1/4
catGif.style.height = 'auto';

// 添加到页面上
catGifContainer.appendChild(catGif);
document.body.appendChild(catGifContainer);
setTimeout(() => {
  bgGif.remove(); // 1 秒后移除这个背景
}, 5000);

// 弹窗
Swal.fire({
  title: '🎉 生日快乐婷宝！',
  text: '愿你开心快乐每一天～',
  // imageUrl: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/birthday-1232976_960_720.jpg',
  imageWidth: 200,
  imageHeight: 150,
  showConfirmButton: false,
  timer: 20000,
  background: '#fff0f5',
}).then(() => {
  // 弹窗关闭后移除背景图
  bgGif.remove();
});
});

// 麦克风检测吹气
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const mic = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    mic.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    function detectBlow() {
        analyser.getByteFrequencyData(data);
        const volume = data.reduce((a, b) => a + b) / data.length;
        if (volume > 50 && candleLit) {
            candleLit = false;
            drawCake();
            alert("💨 你成功吹灭了蜡烛，生日快乐！");
        }
        requestAnimationFrame(detectBlow);
    }
    detectBlow();
});
