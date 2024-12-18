const img_data = [
    { src: 'assets/luigi.png', width: 25, height: 31 },
    { src: 'assets/mario.png', width: 28, height: 31 },
    { src: 'assets/wario.png', width: 30, height: 32 },
    { src: 'assets/yoshi.png', width: 23, height: 32 },
    { src: 'assets/heart.png', width: 32, height: 32 }
];

const img_array = img_data.map(data => {
    const img = new Image();
    img.src = data.src;
    img.width = data.width;
    img.height = data.height;
    return img;
});

// Canvas initialization
const container = document.getElementById('container');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
canvas.height = container.offsetHeight;
canvas.width = container.offsetWidth;

// sound effects
const sfx = {
    hurt: new Audio('assets/hurt.mp3'),
    heal: new Audio('assets/heal.mp3')
};

function playsfx(sfx) { sfx.volume = 0.5; sfx.play(); }

// item constructor
class Box {
    constructor({ x, y, width, height, xv, yv, img, speed = 1 }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xv = xv;
        this.yv = yv;
        this.img = img;
        this.speed = speed;
    }

    draw(context) { context.drawImage(this.img, this.x, this.y, this.width, this.height) }
    update() { this.x += this.xv * this.speed; this.y += this.yv * this.speed; }
}

// player creation
let player = new Box({
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 24,
    height: 24,
    xv: 0,
    yv: 0,
    img: img_array[4],
    speed: 2,
});

player.health = 50;

// Array of all objects
let item_array = [];

function create_items() {
    for (let i = 0; i < 50; i++) {

        let rand_angle = getRandomAngle();

        //get random character
        let random_img = img_array[Math.floor(1 + Math.random() * (img_array.length - 2))];

        do {
            item_array[i] = new Box({
                x: Math.random() * (canvas.width - 35),
                y: Math.random() * (canvas.height - 35),
                width: random_img.width,
                height: random_img.height,
                
                xv: get_vector(rand_angle).x,
                yv: get_vector(rand_angle).y,
                img: random_img,
                speed: 1.5
            });
        } while (detectCollision(player, item_array[i]));
    }

    item_array[0].img = img_array[0];
    item_array[0].width = item_array[0].img.width;
    item_array[0].height = item_array[0].img.height
}

create_items();

function update_health() {document.getElementById('health').style.width = (player.health * 2) + '%'}

let iframes = false;

// Animation loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const item of item_array) {
        item.draw(context);
        item.update();
        bounce(item);

        if (detectCollision(player, item)) {
            if (item == item_array[0]) {
                item_array = [];
                create_items();
                iframes = false;
                player.health = 50;
                update_health();

                playsfx(sfx.heal);
            } else {
                if (!iframes) {
                    player.health -= 5;
                    update_health();

                    playsfx(sfx.hurt);

                    iframes = true;
                    setTimeout(function (params) {
                        iframes = false;
                    }, 500);
                }
            }
        }
    }

    player.draw(context);
    player.update();

    requestAnimationFrame(gameLoop);
}

gameLoop();


function get_vector(angle) {
    const angleInRad = angle * (Math.PI / 180);

    const x = Math.cos(angleInRad);
    const y = Math.sin(angleInRad);

    return {x, y}
}

function getRandomAngle() { return Math.floor(Math.random() * 361)}