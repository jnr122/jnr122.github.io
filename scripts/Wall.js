/**
 * Wall class
 * @param color
 * @param x
 * @param y
 * @param height
 * @param width
 */
function Wall(color, x, y, width, height) {

    this.color = color;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    /**
     * Display wall
     */
    this.display = function() {
        stroke(this.color);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    };
}