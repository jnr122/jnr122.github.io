let backgroundColor = 20;
let numAgents = 75;
let agents = [];
let predatorList = [];
let preyList = [];
let agentR = 10;
let world, menu;

let chancePredator = 0.35;

let spec0deathRate = 0.000005;
let spec0reproductionRate = 0.25;
let spec0speed = 6;
let spec0StarveTime = 350;
let spec0FOV = screen.width/15;

let spec1reproductionRate = 0.45;
let spec1speed = 8;
let spec1deathRate = 0.000001;
let spec1StarveTime = 900;
let spec1FOV = screen.width/7;


let foodProductionRate = 0.58;


let slider;


setup = function() {
    createCanvas(1440, 725);
    //    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World();
    menu = new Menu();
    world.generate();
    start();

};

function start() {
    agents = [];

    // spec1reproductionRate = menu

    for (let i = 0; i < numAgents; i++) {
        if (Math.random() < chancePredator) {
            agents.push(newSpec0());
        } else {
            agents.push(newSpec1());
        }
    }

}

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


