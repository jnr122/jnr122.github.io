/**
 * Hardcoded world
 */
function World() {

    this.walls = [];
    this.buttons = [];

    this.wallColor = 140;
    this.buttonColor = 200;

    this.wallWidth = 15;
    this.buttonWidth = this.wallWidth*4

    /**
     * generate world
     */
    this.generate = function() {

        // make enclosing rectangle
        this.walls.push(new Wall(this.wallColor, 0, 0, this.wallWidth, height));
        this.walls.push(new Wall(this.wallColor, width - this.wallWidth, 0, this.wallWidth, height));
        this.walls.push(new Wall(this.wallColor, 0, 0, width, this.wallWidth));
        this.walls.push(new Wall(this.wallColor, 0, height - this.wallWidth, width, this.wallWidth));

        // additional walls
        this.walls.push(new Wall(this.wallColor, width/2, 0, this.wallWidth, height));


        // buttons
        this.buttons.push(new Button(this.buttonColor,
            random(this.wallWidth*4,width/2-(this.wallWidth*4)-this.wallWidth),
            random(this.wallWidth*4, height-this.wallWidth*4-this.wallWidth),
            this.wallWidth*4,  this.wallWidth*4));

        this.buttons.push(new Button(this.buttonColor,
            random(width/2 + this.wallWidth*4,width-(this.wallWidth*4)-this.wallWidth),
            random(this.wallWidth*4, height-this.wallWidth*4-this.wallWidth),
            this.wallWidth*4,  this.wallWidth*4));

    };

    /**
     * Display agent
     */
    this.display = function() {

        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].display();
        }
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].display();
        }

    };
}