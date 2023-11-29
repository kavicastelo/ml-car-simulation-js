const canvas = document.getElementById('canvas');
canvas.width = 300;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const network_canvas = document.getElementById('networkCanvas');
network_canvas.width = 300;
network_canvas.height = window.innerHeight;

const network_ctx = network_canvas.getContext('2d');

const road = new Road(canvas.width/2,canvas.width*0.9);
// const car = new Car(road.getLaneCenter(0),400,30,50, 'AI');
const N=1;
const cars=generateCars(N);

const traffic = [
    new Car(road.getLaneCenter(2),-400,30,50, 'DUMMY',3),
    new Car(road.getLaneCenter(0),-500,30,50, 'DUMMY',3),
    new Car(road.getLaneCenter(0),-100,30,50, 'DUMMY',3),
    new Car(road.getLaneCenter(2),-100,30,50, 'DUMMY',3),
    new Car(road.getLaneCenter(1),-300,30,50, 'DUMMY',3),
]
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i>0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}

addEventListener('resize',()=>{
    canvas.width = 300;
    canvas.height = window.innerHeight;
    network_canvas.width = 300;
    network_canvas.height = window.innerHeight;
})

function animate(time) {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y===Math.min(
            ...cars.map(c=>c.y)
        ));

    ctx.save();
    ctx.translate(0,-bestCar.y+canvas.height*0.7);
    road.draw(ctx);
    ctx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(ctx, "blue");
    }
    ctx.globalAlpha=1;
    bestCar.draw(ctx,"blue",true);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "red");
    }
    ctx.restore();

    network_ctx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(network_ctx, bestCar.brain);
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

animate(  );