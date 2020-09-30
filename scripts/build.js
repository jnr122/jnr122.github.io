let backgroundColor = 20;
let numAgents = 75;
let agents = [];
let agentR = 10;
let world;

let chancePredator = 0.35;

let spec0deathRate = 0.000005;
let spec0reproductionRate = 0.7;
let spec0speed = 5;
let spec0StarveTime = 500;
let spec0FOV = screen.width/15;
let size0 = 10;

let spec1reproductionRate = 0.85;
let spec1speed = 20;
let spec1deathRate = 0.000001;
let spec1StarveTime = 900;
let spec1FOV = screen.height/7;
let size1 = 5;


let foodProductionRate = 0.8;


let slider;


setup = function() {
    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World();
    world.generate();
    for (let i = 0; i < numAgents; i++) {
        if (Math.random() < chancePredator)
            agents.push(newSpec0());
        else
            agents.push(newSpec1());
    }

    // slider = createSlider(0, 255, 100);
    // slider.position(10, 10);
    // slider.style('width', '80px');



};

function newSpec0() {
    return (new Agent(0, spec0reproductionRate, spec0deathRate, spec0StarveTime, spec0FOV, spec0speed));
}

function newSpec1() {
    return (new Agent(1, spec1reproductionRate, spec1deathRate, spec1StarveTime, spec1FOV, spec1speed));
}

/**
 * Main loop, every iteration represents a timestep
 */
draw = function() {
    // reset the screen every draw loop
    background(backgroundColor);
    world.display();

    // let val = slider.value();
    // background(val);


    for (let i = 0; i < agents.length; i++) {
        if (Math.random() < agents[i].deathRate) {
            console.log(agents[i].species + " death");
            agents.splice(i, 1);
        } else {
            agents[i].display();
            agents[i].step();
            agents[i].timeSinceFeed++;

            // something starves and turns into food
            if (agents[i].timeSinceFeed > agents[i].starveTime) {
                console.log(agents[i].species + " " + agents[i].timeSinceFeed);

                console.log(agents[i].species + " death");
                agents.splice(i, 1);
                if (Math.random() < foodProductionRate)
                    world.addFood();
            }

        }
    }
};


