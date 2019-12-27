/**
 * Parent for hider and seeker agents
 */
function Agent() {
    this.x = 0;
    this.y = 0;
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.moveX = 0;
    this.moveY = 0;

    this.spawn = function() {
        this.x = random(agentR,(width-agentR)/2);
        this.y = random(agentR,height-agentR);
    };

    this.spawn();

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
        let nextX = this.x + this.moveX;
        let nextY = this.y + this.moveY;

        // make sure agent doesn't move out of bounds
        if (!(agentR <= nextX && nextX <= width-agentR) ||
            !(agentR <= nextY && nextY <= height-agentR)) {
            return false;
        }

        // make sure agents agents aren't overlapping
        let distY, distX, distance;
        for (let i = 0; i < agents.length; i++) {
            if (this !== agents[i]) {

                // get distance between the circle's centers
                distX = nextX - agents[i].x;
                distY = nextY - agents[i].y;
                distance = sqrt((distX * distX) + (distY * distY));

                if (distance <= agentR * 2) {
                    return false
                }
            }
        }

        // make sure agents aren't moving through walls
        for (let i = 0; i < world.walls.length; i++) {
            r = world.walls[i];
            if (r.isActive) {
                if (intersectingRect(nextX, nextY, r)) {
                    return false;
                }
            }
        }

        return true;
    };


    // don't let agents generate in invalid locations
    while (!this.isValidMove()) {
        this.spawn();
    }

}
