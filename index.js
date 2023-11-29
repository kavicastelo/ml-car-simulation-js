const canvas = document.getElementById('canvas');
canvas.width = 200;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(0),400,30,50);

addEventListener('resize',()=>{
    canvas.width = 200;
    canvas.height = window.innerHeight;
})

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    car.update(road.borders);

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);
    road.draw(ctx);
    car.draw(ctx);
    ctx.restore();
}

animate()