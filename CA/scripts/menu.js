

function Menu() {
    let predatorColor = '#9A1313';
    let preyColor = '#139A92';
    let genericColor = '#D8DDDD';
    let numGlobalSliders = 2;

    resetButton = createButton("Reset");
    resetButton.mouseReleased(start);
    resetButton.position(12,15);

    backButton = createButton("Back");
    backButton.mouseReleased(back);
    backButton.position(70,15);

    reduceButton = createButton("Reduce");
    reduceButton.mouseReleased(reduce);
    reduceButton.position(125,15);

    function back() {
        window.location.href = "../index.html";
    }

    let numAgentsSlider = createSlider(0, 1000, numAgents);
    numAgentsSlider.position(10, 75);
    numAgentsSlider.style('width', '80px');
    numAgentsSlider.mouseReleased(updateNumAgents);

    myDiv = createDiv('Num Agents');
    myDiv.position(100, 73);
    myDiv.style('font-size', '19px');
    myDiv.style('color', genericColor);

    function updateNumAgents() {
        numAgents = numAgentsSlider.value();
    }

    let chancePredatorSlider = createSlider(0, 100, chancePredator * 100);
    chancePredatorSlider.position(10, 50);
    chancePredatorSlider.style('width', '80px');
    chancePredatorSlider.mouseReleased(updateChancePredator);

    myDiv = createDiv('% Predator');
    myDiv.position(100, 48);
    myDiv.style('font-size', '19px');
    myDiv.style('color', predatorColor);

    function updateChancePredator() {
        chancePredator = chancePredatorSlider.value()/100;
    }

    let predatorReproductionSlider = createSlider(0, 100, spec0reproductionRate * 100);
    predatorReproductionSlider.position(10, 75 + 25 * numGlobalSliders);
    predatorReproductionSlider.style('width', '80px');
    predatorReproductionSlider.mouseReleased(updatePredReproduction);

    myDiv = createDiv('Reproduction');
    myDiv.position(100, 73 + 25 * numGlobalSliders);
    myDiv.style('font-size', '19px');
    myDiv.style('color', predatorColor);

    function updatePredReproduction() {
        spec0reproductionRate = predatorReproductionSlider.value();
    }

    let preyReproductionSlider = createSlider(0, 100, spec1reproductionRate * 100);
    preyReproductionSlider.position(10, 50 + 25 * numGlobalSliders);
    preyReproductionSlider.style('width', '80px');
    preyReproductionSlider.mouseReleased(updatePreyReproduction);

    myDiv = createDiv('Reproduction');
    myDiv.position(100, 48 + 25 * numGlobalSliders);
    myDiv.style('font-size', '19px');
    myDiv.style('color', preyColor);

    function updatePreyReproduction() {
        spec1reproductionRate = preyReproductionSlider.value();
    }

    let predatorStarveTimeSlider = createSlider(0, 30, spec0StarveTime);
    predatorStarveTimeSlider.position(10, 100 + 25 * numGlobalSliders);
    predatorStarveTimeSlider.style('width', '80px');
    predatorStarveTimeSlider.mouseReleased(updatePredStarveTime);

    myDiv = createDiv('Time to Starve');
    myDiv.position(100, 98 + 25 * numGlobalSliders);
    myDiv.style('font-size', '19px');
    myDiv.style('color', predatorColor);

    function updatePredStarveTime() {
        spec0StarveTime = predatorStarveTimeSlider.value();
    }

    let cellSizeSlider = createSlider(5, 20, cellSize);
    cellSizeSlider.position(10, 125 + 25 * numGlobalSliders);
    cellSizeSlider.style('width', '80px');
    cellSizeSlider.mouseReleased(updatePredStarveTime);

    myDiv = createDiv('Cell Size');
    myDiv.position(100, 123 + 25 * numGlobalSliders);
    myDiv.style('font-size', '19px');
    myDiv.style('color', genericColor);

    function updatePredStarveTime() {
        cellSize = cellSizeSlider.value();
    }
}
