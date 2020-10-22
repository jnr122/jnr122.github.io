let backgroundColor = 20;
let numAgents = 170;
let agents = [];
let predatorList = [];
let preyList = [];
let agentR = 6;
let world, menu;
let iters = 0;

let chancePredator = 0.15;
let reductionRate = 0.7;

let spec0deathRate = 0.000000005;
let spec0reproductionRate = 0.35;
let spec0speed = 6;
let spec0StarveTime = 550;
let spec0FOV = screen.width/10;

let spec1reproductionRate = 0.95;
let spec1speed = 8;
let spec1deathRate = 0.000000001;
let spec1StarveTime = 900;
let spec1FOV = screen.width/7;

let foodProductionRate = 0.8;

let ypop = 32;
let xpop = 59;

let totalPop = ypop * xpop;
let slider;
let chanceAgent;

const mod = (x, n) => (x % n + n) % n;



setup = function() {
    createCanvas(1440, 725);
    //    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    world = new World();
    menu = new Menu();
    start();

};

function start() {
    let chanceAgent = numAgents/totalPop;
    agents = [];
    background(5);
    world.generate();
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
    // background(5);
    iters++;
    world.display();
    updateGrid();

};

updateGrid = function() {

    let newAgents = [];
    let newRows = [];
    let currAgent;
    let move;
    let newX, newY;
    let ind;

    for (let r = 0; r < ypop; ++r) {
        newRows = [];
        for (let c = 0; c < xpop; ++c) {
            newRows.push(null);
        }
        newAgents.push(newRows);
        newRows = [];
    }


    // for (let r = 0; r < ypop; ++r) {
    //     for (let c = 0; c < xpop; ++c) {
    for (let r = ypop-1; r >= 0; --r) {
        for (let c = xpop-1; c >= 0; --c) {
            currAgent = agents[r][c];
            if (currAgent !== null) {

                ind = Math.floor(Math.random() * currAgent.movesLeft.length);
                move = currAgent.movesLeft[ind];

                // // move is on the board
                // while (r+move[0] < 0 || r+move[0] >= ypop || c+move[1] < 0 || c+move[1] >= xpop) {
                //     // need to make sure place is empty too, remove possible new locations until none left
                //     currAgent.movesLeft.splice(ind, 1);
                //     ind = Math.floor(Math.random() * currAgent.movesLeft.length);
                //     move = currAgent.movesLeft[ind];
                // }

                // if predator
                if (currAgent.species === 0) {

                }
                newX = mod(r + move[0], ypop);
                newY = mod(c + move[1], xpop);

                // if (agents[newX][newY] == null && agents[newX][newY] == null) {
                //     agents[newX][newY] = currAgent;
                // } else {
                //     agents[r][c] = currAgent;
                // }

                if (newAgents[newX][newY] == null && agents[newX][newY] == null) {
                    newAgents[newX][newY] = currAgent;
                } else {
                    newAgents[r][c] = currAgent;
                }

                currAgent.movesLeft = currAgent.validMoves;
            }
        }
    }
    agents = newAgents;
};