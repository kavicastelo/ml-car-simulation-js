const canvas = document.getElementById('canvas');
canvas.width = 200;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const road = new Road(canvas.width/2,canvas.width);
const car = new Car(100,400,30,50);

addEventListener('resize',()=>{
    canvas.width = 200;
    canvas.height = window.innerHeight;
})

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    car.update();
    road.draw(ctx);
    car.draw(ctx);
}

animate()