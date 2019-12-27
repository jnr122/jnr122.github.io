let backgroundColor = 20;
let numAgents = 2;
let agents = [];
let agentR = 10;
let world;

setup = function() {
    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World();
    world.generate();
    for (let i = 0; i < numAgents; i++) {
        agents.push(new Agent());
    }

};

/**
 * Main loop
 */
draw = function() {
    // reset the screen every draw loop
    background(backgroundColor);
    world.display();

    for (let i = 0; i < agents.length; i++) {
        agents[i].display();
        agents[i].move();
    }
};


