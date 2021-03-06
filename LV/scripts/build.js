let backgroundColor = 20;
let numAgents = 250;
let agents = [];
let predCounter = 0;
let preyCounter = 0;
let agentR = 6;
let world, menu;
let iters = 0;
let chancePredator = 0.15;
let reductionRate = 0.7;

let spec0deathRate = 0.000005;
let spec0reproductionRate = 0.35;
let spec0speed = 6;
let spec0StarveTime = 550;
let spec0FOV = screen.width/10;

let spec1reproductionRate = 0.95;
let spec1speed = 8;
let spec1deathRate = 0.000001;
let spec1StarveTime = 900;
let spec1FOV = screen.width/7;


let foodProductionRate = 0.8;
let foodDecayRate = 0.0000001;


let slider;
let cannibalismConst = 0.3;


const cannibalismFunc = {
    NONE:  "NONE",
    CONST: "CONST:" + cannibalismConst,
    OMNI:  "OMNI",
    HGRY:  "HGRY"
};

let cannibalismType;


setup = function() {
    cannibalismType = cannibalismFunc.NONE;
    createCanvas(1440, 725);
    //    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World();
    menu = new Menu();
    start();

};

function start() {
    // console.log(cannibalismType, chancePredator, spec0StarveTime, spec0reproductionRate, spec1reproductionRate, numAgents);

    agents = [];
    background(5);
    world.generate();

    for (let i = 0; i < numAgents; i++) {
        if (Math.random() < chancePredator) {
            agents.push(newSpec0());
        } else {
            agents.push(newSpec1());
        }
    }
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
//     background((Math.cos(iters / 100) + 1) * 35);
    background(5);
    iters++;
    world.display();

    // console.log(iters, predCounter, preyCounter);

    predCounter = 0;
    preyCounter = 0;
    try {

        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 0)
                ++predCounter;
            else
                ++preyCounter;

            if (Math.random() < agents[i].deathRate) {
                // console.log(agents[i].species + " death");
                agents.splice(i, 1);
            } else {
                agents[i].display();
                agents[i].step();
                agents[i].timeSinceFeed++;

                // something starves and turns into food
                if (agents[i].timeSinceFeed > agents[i].starveTime) {
                    // console.log(agents[i].species + " " + agents[i].timeSinceFeed);

                    // console.log(agents[i].species + " death");
                    agents.splice(i, 1);
                    if (Math.random() < foodProductionRate)
                        world.addFood();
                }

            }

        }
    } catch {
        // console.log("build err");
    }
};


