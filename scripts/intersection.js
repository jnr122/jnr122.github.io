/**
 * Agent intersects with rect
 * @param nextX
 * @param nextY
 * @param r
 * @returns {boolean}
 */
intersectingRect = function(nextX, nextY, r){
    // temporary variables to set edges for testing
    testX = nextX;
    testY = nextY;

    // which edge is closest?
    if (nextX < r.x)               testX = r.x;          // test left edge
    else if (nextX > r.x+r.width)  testX = r.x+r.width;  // right edge
    if (nextY < r.y)               testY = r.y;          // top edge
    else if (nextY > r.y+r.height) testY = r.y+r.height; // bottom edge

    // get distance from closest edges
    distX = nextX-testX;
    distY = nextY-testY;
    distance = sqrt( (distX*distX) + (distY*distY));

    // if the distance is less than the radius, collision!
    return distance <= agentR;
};