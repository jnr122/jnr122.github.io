let backgroundColor = 20;
let numAgents = 500;
let agents = [];
let agentR = 4;
let world, menu;
let spec0speed = 6;
let spec1speed = 0;
let slider;
let iters = 0;
let rotationRate = 0;
let accuracy = 0.5;

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
    agents.push(newSpec1());


    for (let i = 0; i < numAgents; i++) {
        agents.push(newSpec0());
    }

}

function newSpec0() {
    return (new Agent(0, spec0speed));
}

function newSpec1() {
    return (new Agent(1, spec1speed));
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
        else {
            let rotCoords = rotateCoord(agents[i].x, agents[i].y, rotationRate);
            agents[i].x = rotCoords[0];
            agents[i].y = rotCoords[1];
        }
    }

    if (agents.length < 2000) {
        agents.push(newSpec0());
    }

};
