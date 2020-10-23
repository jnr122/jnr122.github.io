

/**
 * Hardcoded world
 */
function World() {

    this.walls = [];
    this.buttons = [];
    this.food = [];
    this.finishes = [];
    this.wallColor = 40;
    this.buttonColor = 200;
    this.menuBuffer = 205;

    this.foodColor = 200;
    this.foodWidth = 10;

    this.startFoodNum = 0;

    this.wallWidth = 15;
    this.buttonWidth = this.wallWidth*4;

    /**
     * generate world
     */
    this.generate = function() {

        // make enclosing rectangle
        this.walls.push(new Wall(this.wallColor, 0, 0, this.wallWidth + this.menuBuffer, height));
        this.walls.push(new Wall(this.wallColor, width - this.wallWidth, 0, this.wallWidth, height));
        this.walls.push(new Wall(this.wallColor, 0, 0, width, this.wallWidth));
        this.walls.push(new Wall(this.wallColor, 0, height - this.wallWidth, width, this.wallWidth));

        this.startFood();

    };

    this.startFood = function() {
        this.food = [];
        for (let i = 0; i < this.startFoodNum; i++) {
            this.addFood();
        }

    };

    this.addFood = function() {
        this.food.push(new Button(this.foodColor,
            random(this.foodWidth * 2 + this.menuBuffer, width-this.foodWidth-this.wallWidth),
            random(this.foodWidth, height-this.foodWidth-this.wallWidth),
            this.foodWidth, this.foodWidth));
    };

    /**
     * Make the finish button
     */
    this.spawnFinish = function() {
        let finishX = random(width/2 + this.buttonWidth,width-(this.buttonWidth)-this.wallWidth);
        let finishY = random(this.buttonWidth, height-this.buttonWidth-this.wallWidth);

        let finish = new Finish(this.buttonColor, finishX, finishY, this.buttonWidth, this.buttonWidth);


        // don't let finish overlap with buttons
        for (let i = 0; i < this.buttons.length; i++) {
            while (rectIntersectingRect(finish, this.buttons[i])) {
                finishX = random(width/2 + this.buttonWidth,width-(this.buttonWidth)-this.wallWidth);
                finishY = random(this.buttonWidth, height-this.buttonWidth-this.wallWidth);

                finish = new Finish(this.buttonColor, finishX, finishY, this.buttonWidth, this.buttonWidth);
            }

        }

        // finish
        this.finishes.push(new Finish(this.buttonColor,
            finishX,
            finishY,
            this.buttonWidth, this.buttonWidth));
    };

    /**
     * Display world
     */
    this.display = function() {
        // maybre too small
        var stepX = 10;
        var stepY = 10;
        let row = 0;
        let col = 0;
        let currAgent;
        for (var gridY = this.wallWidth + 20; gridY < height - this.wallWidth * 4; gridY += stepY) {
            for (var gridX = this.menuBuffer + 10; gridX < width - this.wallWidth * 4; gridX += stepX) {
                currAgent = agents[row][col];
                var diameter = 60;
                if (gridX >= 240)
                    diameter = 60;
                strokeWeight(2);
                stroke(100, 100, 100);
                if (currAgent == null)
                    fill(0,0,0);
                else
                    fill(currAgent.r, currAgent.g, currAgent.b);
                rect(gridX, gridY, stepX, stepY);
                ++col;
            }
            col = 0;
            ++row;

        }
        stroke(10);
    };
}