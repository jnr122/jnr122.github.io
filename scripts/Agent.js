
/**
 * Parent for hider and seeker agents
 */
function Agent() {
    this.x = random(agentR,width-agentR);
    this.y = random(agentR,height-agentR);
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.moveX = 0;
    this.moveY = 0;

    /**
     * Get valid move
     */
    this.move = function() {
        this.getMove();
        this.x += this.moveX;
        this.y += this.moveY;
    };

    /**
     * Display agent
     */
    this.display = function() {
        stroke(this.r, this.g, this.b);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, agentR*2, agentR*2);
    };

    /**
     * Generate potential next movment
     * If making an invalid movement, set movement to 0
     */
    this.getMove = function() {
        // potential next move
        this.moveX = random(-movementRange,movementRange);
        this.moveY = random(-movementRange,movementRange);

        // make sure agent doesn't move out of bounds
        if (!this.isValidMove()) {
            this.moveX = 0;
            this.moveY = 0;
        }
    };

    /**
     * Checks potential next move for obstacles
     * @returns boolean true for valid move
     */
    this.isValidMove = function() {
        // make sure agent doesn't move out of bounds
        if (!(agentR <= this.x + this.moveX && this.x + this.moveX <= width-agentR) ||
            !(agentR <= this.y + this.moveY && this.y + this.moveY <= height-agentR)) {
            return false;
        }

        // make sure agents agents aren't overlapping
        let distY, distX, distance;
        for (let i = 0; i < agents.length; i++) {
            if (this !== agents[i]) {

                // get distance between the circle's centers
                distX = this.x + this.moveX - agents[i].x;
                distY = this.y + this.moveY - agents[i].y;
                distance = sqrt((distX * distX) + (distY * distY));

                if (distance <= agentR * 2) {
                    return false
                }
            }
        }

        return true;
    };

    // don't let agents generate in invalid locations
    while (!this.isValidMove()) {
        this.x = random(agentR,width-agentR);
        this.y = random(agentR,height-agentR);
    }

}
