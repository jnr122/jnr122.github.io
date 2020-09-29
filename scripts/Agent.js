/**
 * Parent for hider and seeker agents
 */
function Agent(species, reproductionRate, deathRate, starveTime) {
    this.species = species;
    this.reproductionRate = reproductionRate;
    this.deathRate = deathRate;
    this.starveTime = starveTime;

    this.timeSinceFeed = 0;
    this.x = 0;
    this.y = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.movementRange = 3;

    if (species === 0) {
        this.r = 100;
        this.g = 255;
        this.b = 255;
    } else if (species === 1)  {
        this.r = 255;
        this.g = 255;
        this.b = 100;
    }

    // this.getBtnDistance = function(btn) {
    //     return (coordDistance(this.moveX + this.x, this.moveY + this.y, (btn.x+btn.height/2), (btn.y+btn.width/2)));
    // };

    // this.buttonDist = this.getBtnDistance(world.buttons[0]);

    this.spawn = function() {
        this.x = random(agentR,width-agentR);
        this.y = random(agentR,height-agentR);
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
        // potential next move
        this.moveX = random(-this.movementRange,this.movementRange);
        this.moveY = random(-this.movementRange,this.movementRange);

        // newDist = this.getBtnDistance(world.buttons[0]);
        // displacement = this.buttonDist-newDist;
        // this.buttonDist = newDist;

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

        // make sure agents agents aren't overlapping
        let distY, distX, distance, oldDistY,
            oldDistX, oldDistance, closestRival = [-1, width];

        if (this.species === 1) {
            for (let j = 0; j < world.food.length; j++) {
                if (circleIntersectingRect(nextX, nextY, world.food[j])) {
                    if (Math.random() < this.reproductionRate) {
                        agents.push(newSpec1());
                        world.food.splice(j, 1);
                        console.log("Species 1 feeds and reproduces");
                    }
                }
            }
        }

        for (let i = 0; i < agents.length; i++) {

            if (this !== agents[i]) {

                // get distance between the circle's centers
                distX = nextX - agents[i].x;
                distY = nextY - agents[i].y;
                distance = sqrt((distX * distX) + (distY * distY));

                if (this.species !== agents[i].species) {

                    if (closestRival[1] > distance) {
                        closestRival[0] = i;
                        closestRival[1] = distance;
                    }
                }

                if (distance <= agentR * 2) {
                    if (this.species === 0 && agents[i].species === 1 && Math.random() < this.reproductionRate) {
                        agents[i] = newSpec0();
                        this.timeSinceFeed = 0;
                        console.log("Species 0 feeds and reproduces");
                        if (Math.random() < foodProductionRate)
                            world.addFood();
                    }
                    return false
                }

            }
        }


        if (closestRival[0] > 0) {

            oldDistX = this.x - agents[closestRival[0]].x;
            oldDistY = this.y - agents[closestRival[0]].y;
            oldDistance = sqrt((oldDistX * oldDistX) + (oldDistY * oldDistY));

            distX = nextX - agents[closestRival[0]].x;
            distY = nextY - agents[closestRival[0]].y;
            distance = sqrt((distX * distX) + (distY * distY));

            // you are a predator near prey
            if (this.species === 0 && agents[closestRival[0]].species === 1) {
                if (oldDistance < distance) {
                    return false;
                }

                // you are a prey near a predator
            } else if (this.species === 1 && agents[closestRival[0]].species === 0) {
                if (oldDistance > distance) {
                    return false;
                }
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
