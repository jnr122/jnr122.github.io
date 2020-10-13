let backgroundColor = 20;
let numAgents = 60;
let agents = [];
let predatorList = [];
let preyList = [];
let agentR = 2;
let world, menu;
let iters = 0;



let chancePredator = 0.15;
let reductionRate = 0.7;

let spec0deathRate = 0.000005;
let spec0reproductionRate = 1;
let spec0speed = 6;
let spec0StarveTime = 550;
let spec0FOV = screen.width;

let spec1reproductionRate = 0.95;
let spec1speed = 0;
let spec1deathRate = 0.000001;
let spec1StarveTime = 900;
let spec1FOV = screen.width/7;

let foodProductionRate = 0;


let slider;


setup = function() {
    createCanvas(1440, 725);
    //    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World();
    menu = new Menu();
    start();

};

function start() {
    agents = [];

    world.generate();

    for (let i = 0; i < numAgents; i++) {
        agents.push(newSpec0());
    }

    agents.push(newSpec1());
}

function reduce() {
    let numKill;

    agents = shuffle(agents);
    numKill = int(agents.length * reductionRate);

    for (let i = 0; i < numKill; i++)
        agents.pop();

}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
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
    background((Math.cos(iters/100) + 1) * 35);
    iters++;
    world.display();

    for (let i = 0; i < agents.length; i++) {
        agents[i].display();
        if (agents[i].species === 0)
            agents[i].step();
    }

    if (iters % 4 === 0) {
        agents.push(newSpec0());
    }
};


