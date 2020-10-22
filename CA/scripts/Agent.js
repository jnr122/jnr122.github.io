/**
 * Parent for hider and seeker agents
 */
function Agent(species, reproductionRate, deathRate, starveTime, FOV, speed) {
    this.species = species;
    this.reproductionRate = reproductionRate;
    this.deathRate = deathRate;
    this.starveTime = starveTime;
    this.FOV = FOV;
    this.validMoves = [[-1,-1], [-1,0], [0, -1], [0, 0], [1, 0], [0, 1], [1, 1], [-1, 1], [1, -1]];
    this.movesLeft = this.validMoves;
    this.timeSinceFeed = 0;
    this.x = 0;
    this.y = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.movementRange = speed;

    if (species === 0) {
        this.r = 154;
        this.g = 19;
        this.b = 19;
    } else if (species === 1)  {
        this.r = 19;
        this.g = 154;
        this.b = 146;
    }

    /**
     * Display agent
     */
    this.display = function() {
        stroke(this.r, this.g, this.b);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, agentR*2, agentR*2);
    };

}
