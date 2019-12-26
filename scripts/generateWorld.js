let backgroundColor = 20;
let movementRange = 3;
let agentR = 10;

let agents = [];
let obstacles = [];

setup = function() {
    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    for (let i = 0; i < 20; i++) {
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
};


