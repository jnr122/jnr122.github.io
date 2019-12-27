let backgroundColor = 20;
let movementRange = 3;
let agentR = 10;
let agents = [];
let world;


setup = function() {
    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World();
    world.generate();
    for (let i = 0; i < 2; i++) {
        agents.push(new Agent());
    }

};

/**
 * Main loop
 */
draw = function() {
    // reset the screen every draw loop
    background(backgroundColor);

    for (let i = 0; i < agents.length; i++) {
        agents[i].display();
        agents[i].move();
    }
    world.display();
};


