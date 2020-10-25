let backgroundColor = 30;
let numAgents = 500;
let agents = [];
let predatorList = [];
let preyList = [];
let agentR = 6;
let world, menu;
let iters = 0;

let chancePredator = 0.45;
let reductionRate = 0.7;

let spec0deathRate = 0.00000000005;
let spec0reproductionRate = 0.4;
let spec0speed = 6;
let spec0StarveTime = 5;
let spec0FOV = 1;

let spec1reproductionRate = 0.75;
let spec1speed = 8;
let spec1deathRate = 0.00000000001;
let spec1StarveTime = 900;
let spec1FOV = 1;

let foodProductionRate = 0.8;

let ypop = 32 * 2;
let xpop = 59 * 2;

let totalPop = ypop * xpop;
let slider;
let stepXY = 15;

setup = function() {
    createCanvas(1440, 725);
    //    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World(stepXY, stepXY);
    menu = new Menu();
    start();

};

function start() {
    [ypop, xpop] = world.generate();
    totalPop = xpop * ypop;
    let chanceAgent = numAgents/totalPop;
    agents = [];
    background(5);
    // console.log(xpo, ypo);
    for (let r = 0; r < ypop; ++r) {
        let rowPop = [];
        for (let c = 0; c < xpop; ++c) {
            if (Math.random() < chanceAgent) {
                if (Math.random() < chancePredator) {
                    rowPop.push(newSpec0());
                } else {
                    rowPop.push(newSpec1());
                }
            } else {
                rowPop.push(null);
            }
        }
        agents.push(rowPop);
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
    iters++;
    world.display();
    updateGrid();
};

updateGrid = function() {

    let currAgent;
    let move;
    let ind;
    let numPred = 0;
    let numPrey = 0;

    for (let r = 0; r < ypop; ++r) {
        for (let c = 0; c < xpop; ++c) {

            let openSpots = [];
            let enemies = [];
            let friends = [];
            let checkMove;
            let checkCoords = [];
            let coords = [];

            currAgent = agents[r][c];
            if (currAgent !== null) {

                ind = Math.floor(Math.random() * currAgent.movesLeft.length);
                move = currAgent.movesLeft[ind];

                for (let i = 0; i < currAgent.validMoves.length; ++i) {
                    checkMove = currAgent.validMoves[i];
                    checkCoords = [mod(r + checkMove[0], ypop), mod(c + checkMove[1], xpop)];
                    if (agents[checkCoords[0]][checkCoords[1]] == null) {
                        openSpots.push(checkCoords);
                    } else {
                        if (agents[checkCoords[0]][checkCoords[1]].species === agents[r][c].species) {
                            friends.push(checkCoords);
                        } else {
                            enemies.push(checkCoords);
                        }
                    }
                }

                // if predator
                if (currAgent.species === 0) {
                    numPred++;
                    if (friends.length === 8 || currAgent.timeSinceFeed > spec0StarveTime) {
                        agents[r][c] = null;
                    } else {
                        if (friends.length > 0) {
                            // friends to reproduce
                            if (enemies.length > 0 && Math.random() < spec0reproductionRate) {
                                // enemies to eat, reproduce
                                coords = randElement(enemies);
                                agents[coords[0]][coords[1]] = newSpec0();
                                currAgent.timeSinceFeed = 0;
                            } else if (openSpots.length > 0) {
                                // no space to reproduce
                                coords = randElement(openSpots);
                                agents[coords[0]][coords[1]] = agents[r][c];
                                agents[r][c] = null;
                            }
                        } else if (openSpots.length > 0){
                            coords = randElement(openSpots);
                            agents[coords[0]][coords[1]] = agents[r][c];
                            agents[r][c] = null;

                        }
                    }
                    // prey
                } else {
                    numPrey++;
                    // friend to reproduce with
                    if (friends.length === 8) {
                        agents[r][c] = null;
                    } else {
                        if (friends.length > 0) {
                            // space to reproduce
                            if (openSpots.length > 0 && Math.random() < spec1reproductionRate) {
                                coords = randElement(openSpots);
                                agents[coords[0]][coords[1]] = newSpec1();
                            } else {
                                // no space to reproduce
                                agents[r][c] = null;
                            }
                        }
                    }
                }

                currAgent.movesLeft = currAgent.validMoves;
                currAgent.timeSinceFeed++;
            }
        }
    }
    // if (iters % 20 === 0) {
    //     predatorNumList.push(numPred);
    //     preyNumList.push(numPrey);
    //     iterList.push(iters);
    //     // updateChart();
    // }
};

function reduce() {
    for (let r = 0; r < ypop; ++r) {
        for (let c = 0; c < xpop; ++c) {
            if (Math.random() < reductionRate)
                agents[r][c] = null;
        }
    }

}

randElement = function(list) {
    return list[Math.floor(Math.random() * list.length)]
};