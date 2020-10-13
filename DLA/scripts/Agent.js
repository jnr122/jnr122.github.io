let centerX = screen.width/2 + 102.5;
let centerY = screen.height/2.5;

/**
 * Parent for hider and seeker agents
 */
function Agent(species, reproductionRate, deathRate, starveTime, FOV, speed) {
    this.species = species;
    this.reproductionRate = reproductionRate;
    this.deathRate = deathRate;
    this.starveTime = starveTime;
    this.FOV = FOV;

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

    this.spawn = function() {

        if (this.species === 0) {

            let lim = Math.random() > 0.5 ? -1 : 1;

            // if ( (randomPos.position - centrePoint.position).sqrMagnitude <= radius*radius )


                if (Math.random() > 0.75) {
                // left side
                this.x = random(agentR, (width - agentR) / 5);
                this.y = random(agentR, (height - agentR));
            } else if (Math.random() > 0.5) {
                this.x = random(agentR, (width - agentR));
                this.y = random(agentR, (height - agentR) / 20);
            } else if (Math.random() > 0.25) {
                this.x = random(agentR, (width - agentR));
                this.y = random(height - (height/20 - agentR), agentR);
            } else {
                this.y = random(width - (width/5 - agentR), agentR);
                this.y = random(agentR, (height - agentR));
            }

        } else {
            this.x = centerX;
            this.y = centerY;
        }

    };

    this.spawn();

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

            // newDist = this.getBtnDistance(world.buttons[0]);
            // displacement = this.buttonDist-newDist;
            // this.buttonDist = newDist;

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
        let distY, distX, distance, oldDistY,
            oldDistX, oldDistance;

        // let closestRival = [-1, width];

        for (let i = 0; i < agents.length; i++) {

            if (this !== agents[i]) {

                // get distance between the circle's centers
                distX = nextX - agents[i].x;
                distY = nextY - agents[i].y;
                distance = sqrt((distX * distX) + (distY * distY));

                // if (this.species !== agents[i].species) {
                //
                //     if (closestRival[1] > distance) {
                //         closestRival[0] = i;
                //         closestRival[1] = distance;
                //     }
                // }

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


        if (this.species === 0) {

            oldDistX = this.x - centerX;
            oldDistY = this.y - centerY;
            oldDistance = sqrt((oldDistX * oldDistX) + (oldDistY * oldDistY));

            distX = nextX - centerX;
            distY = nextY - centerY;
            distance = sqrt((distX * distX) + (distY * distY));

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
