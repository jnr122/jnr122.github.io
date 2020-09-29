let backgroundColor = 20;
let numAgents = 30;
let agents = [];
let agentR = 10;
let world;

let chancePredator = 0.5;

let spec0deathRate = 0.001;
let spec0reproductionRate = 0.6;
let spec0StarveTime = 600;

let spec1reproductionRate = 0.7;
let spec1deathRate = 0.0001;
let spec1StarveTime = 900;

let foodProductionRate = 0.8;


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

};

function newSpec0() {
    return (new Agent(0, spec0reproductionRate, spec0deathRate, spec0StarveTime));
}

function newSpec1() {
    return (new Agent(1, spec1reproductionRate, spec1deathRate, spec1StarveTime));
}

/**
 * Main loop, every iteration represents a timestep
 */
draw = function() {
    // reset the screen every draw loop
    background(backgroundColor);
    world.display();


    for (let i = 0; i < agents.length; i++) {
        agents[i].display();
        agents[i].step();
        agents[i].timeSinceFeed++;

        if (agents[i].timeSinceFeed > agents[i].starveTime) {
            console.log(agents[i].species + " " +  agents[i].timeSinceFeed);

            console.log(agents[i].species + " death");
            agents.splice(i, 1);
            if (Math.random() < foodProductionRate)
                world.addFood();
        }

    }
};


