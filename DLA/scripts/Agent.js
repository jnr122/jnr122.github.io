let centerX = screen.width/2 + 102.5;
let centerY = screen.height/2.5;

/**
 * Parent for hider and seeker agents
 */
function Agent(species, speed) {
    this.species = species;

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

    this.spawn = function() {

        if (this.species === 0) {

            this.x = random(centerX - height/2, centerX + height/2);
            this.y = random(agentR, (height - agentR));

            while (coordDistance(this.x, this.y, centerX, centerY) > height/2) {
                this.x = random(centerX - height/2, centerX + height/2);
                this.y = random(agentR, (height - agentR));
            }


        } else {
            this.x = centerX;
            this.y = centerY;
        }

    };

    this.step = function() {
        this.move();
    };


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
        if (this.species === 0) {
            // potential next move
            this.moveX = random(-this.movementRange, this.movementRange);
            this.moveY = random(-this.movementRange, this.movementRange);

            // make sure agent doesn't move out of bounds
            if (!this.isValidMove()) {
                this.moveX = 0;
                this.moveY = 0;
            }
        } else {
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

        // make sure agents agents aren't overlapping
        let distance, oldDistance;

        for (let i = 0; i < agents.length; i++) {

            if (this !== agents[i]) {

                distance = coordDistance(nextX, nextY, agents[i].x, agents[i].y);

                if (distance <= agentR * 2) {
                    if (this.species === 0 && agents[i].species === 1) {
                        this.species = 1;
                        this.speed = 0;
                        this.r = 19;
                        this.g = 154;
                        this.b = 146;
                    }
                }
            }
        }


        if (this.species === 0 && Math.random() < accuracy) {
            oldDistance = coordDistance(this.x, this.y, centerX, centerY);
            distance = coordDistance(nextX, nextY, centerX, centerY);

            if (oldDistance < distance) {
                return false;
            }
        }


        // make sure agent doesn't move out of bounds
        if (!(agentR <= nextX && nextX <= width-agentR) ||
            !(agentR <= nextY && nextY <= height-agentR)) {
            return false;
        }

        // make sure agents aren't moving through walls
        let r;
        for (let i = 0; i < world.walls.length; i++) {
            r = world.walls[i];
            if (r.isActive) {
                if (circleIntersectingRect(nextX, nextY, r)) {
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
