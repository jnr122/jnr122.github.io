

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

    function back() {
        window.location.href = "../index.html";
    }

    let agentSizeSlider = createSlider(1, 10, agentR);
    agentSizeSlider.position(10, 50);
    agentSizeSlider.style('width', '80px');
    agentSizeSlider.mouseReleased(updateAgentSize);

    myDiv = createDiv('Agent Size');
    myDiv.position(100, 48);
    myDiv.style('font-size', '19px');
    myDiv.style('color', genericColor);

    function updateAgentSize() {
        agentR = agentSizeSlider.value();
    }

    let numAgentsSlider = createSlider(0, 1000, numAgents);
    numAgentsSlider.position(10, 75);
    numAgentsSlider.style('width', '80px');
    numAgentsSlider.mouseReleased(updateNumAgents);

    myDiv = createDiv('Num Agents');
    myDiv.position(100, 73);
    myDiv.style('font-size', '19px');
    myDiv.style('color', predatorColor);

    function updateNumAgents() {
        numAgents = numAgentsSlider.value();
    }


    let predatorSpeedSlider = createSlider(0, 50, spec0speed);
    predatorSpeedSlider.position(10, 50 + 25 * numGlobalSliders);
    predatorSpeedSlider.style('width', '80px');
    predatorSpeedSlider.mouseReleased(updatePredSpeed);

    myDiv = createDiv('Speed');
    myDiv.position(100, 48 + 25 * numGlobalSliders);
    myDiv.style('font-size', '19px');
    myDiv.style('color', predatorColor);

    function updatePredSpeed() {
        spec0speed = predatorSpeedSlider.value();
        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 0)
                agents[i].movementRange = predatorSpeedSlider.value();
        }
    }

    let rotationSlider = createSlider(-30, 30, rotationRate * 100);
    rotationSlider.position(10, 25 + 50 * numGlobalSliders);
    rotationSlider.style('width', '80px');
    rotationSlider.mouseReleased(updateRotationSlider);

    myDiv = createDiv('Rotation');
    myDiv.position(100, 73 + 25 * numGlobalSliders);
    myDiv.style('font-size', '19px');
    myDiv.style('color', preyColor);

    function updateRotationSlider() {
        rotationRate = rotationSlider.value() / 100;
    }

    let accuracySlider = createSlider(0, 100, accuracy * 100);
    accuracySlider.position(10, 50 + 50 * numGlobalSliders);
    accuracySlider.style('width', '80px');
    accuracySlider.mouseReleased(updateAccuracySlider);

    myDiv = createDiv('Accuracy');
    myDiv.position(100, 98 + 25 * numGlobalSliders);
    myDiv.style('font-size', '19px');
    myDiv.style('color', predatorColor);

    function updateAccuracySlider() {
        accuracy = accuracySlider.value() / 100;
    }


}
