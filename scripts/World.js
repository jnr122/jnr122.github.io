

/**
 * Hardcoded world
 */
function World() {

    this.walls = [];
    this.buttons = [];
    this.food = [];
    this.finishes = [];
    this.wallColor = 140;
    this.buttonColor = 200;

    this.foodColor = 200;
    this.foodWidth = 10;

    this.startFoodNum = 80;

    this.wallWidth = 15;
    this.buttonWidth = this.wallWidth*4;

    /**
     * generate world
     */
    this.generate = function() {

        // make enclosing rectangle
        this.walls.push(new Wall(this.wallColor, 0, 0, this.wallWidth, height));
        this.walls.push(new Wall(this.wallColor, width - this.wallWidth, 0, this.wallWidth, height));
        this.walls.push(new Wall(this.wallColor, 0, 0, width, this.wallWidth));
        this.walls.push(new Wall(this.wallColor, 0, height - this.wallWidth, width, this.wallWidth));

        this.startFood();

        // // additional obstacle
        // this.walls.push(new Door(this.wallColor, width/2, 0, this.wallWidth, height));

        // // buttons
        // this.buttons.push(new Button(this.buttonColor,
        //     random(this.buttonWidth,width/2-(this.buttonWidth)-this.wallWidth),
        //     random(this.buttonWidth, height-this.buttonWidth-this.wallWidth),
        //     this.buttonWidth, this.buttonWidth));
        // this.buttons.push(new Button(this.buttonColor,
        //     random(width/2 + this.buttonWidth,width-(this.buttonWidth)-this.wallWidth),
        //     random(this.buttonWidth, height-this.buttonWidth-this.wallWidth),
        //     this.buttonWidth, this.buttonWidth));
        //
        //
        // this.spawnFinish();


    };

    this.startFood = function() {
        for (let i = 0; i < this.startFoodNum; i++) {
            this.addFood();
        }

    };

    this.addFood = function() {
        this.food.push(new Button(this.foodColor,
            random(this.foodWidth,width-this.foodWidth-this.wallWidth),
            random(this.buttonWidth, height-this.foodWidth-this.wallWidth),
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
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].display();
        }
        for (let i = 0; i < this.food.length; i++) {
            this.food[i].display();
        }
        // for (let i = 0; i < this.buttons.length; i++) {
        //     this.buttons[i].display();
        // }
        // for (let i = 0; i < this.finishes.length; i++) {
        //     this.finishes[i].display();
        // }
    };
}