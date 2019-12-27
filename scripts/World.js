/**
 * Hardcoded world
 */
function World() {

    this.walls = [];
    this.color = 140;
    this.wallWidth = 15;

    /**
     * generate world
     */
    this.generate = function() {

        // make enclosing rectangle
        this.walls.push(new Wall(this.color, 0, 0, this.wallWidth, height));
        this.walls.push(new Wall(this.color, width - this.wallWidth, 0, this.wallWidth, height));
        this.walls.push(new Wall(this.color, 0, 0, width, this.wallWidth));
        this.walls.push(new Wall(this.color, 0, height - this.wallWidth, width, this.wallWidth));

        // additional walls
        this.walls.push(new Wall(this.color, width/1.7, width/1.7, this.wallWidth, height));
        // this.walls.push(new Wall(this.color, width/1.7, 0, this.wallWidth, height));


    };

    /**
     * Display agent
     */
    this.display = function() {

        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].display();
        }

    };
}