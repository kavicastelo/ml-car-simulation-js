const canvas = document.getElementById('canvas');
canvas.width = 200;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(0),400,30,50, 'AI');

const traffic = [
    new Car(road.getLaneCenter(2),400,30,50, 'DUMMY',3),
]

addEventListener('resize',()=>{
    canvas.width = 200;
    canvas.height = window.innerHeight;
})

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);
    road.draw(ctx);
    car.draw(ctx, "blue");
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "red");
    }
    ctx.restore();
}

animate()