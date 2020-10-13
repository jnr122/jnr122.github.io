

function Menu() {
    let predatorColor = '#9A1313';
    let preyColor = '#139A92';
    let genericColor = '#D8DDDD';
    let numGlobalSliders = 2;

    resetButton = createButton("Reset");
    resetButton.mouseReleased(start);
    resetButton.position(12,15);


    let numAgentsSlider = createSlider(0, 1000, numAgents);
    numAgentsSlider.position(10, 50);
    numAgentsSlider.style('width', '80px');
    numAgentsSlider.mouseReleased(updateNumAgents);

    myDiv = createDiv('Num Agents');
    myDiv.position(100, 48);
    myDiv.style('font-size', '19px');
    myDiv.style('color', genericColor);

    function updateNumAgents() {
        numAgents = numAgentsSlider.value();
    }


    let agentSizeSlider = createSlider(1, 10, agentR);
    agentSizeSlider.position(10, 75);
    agentSizeSlider.style('width', '80px');
    agentSizeSlider.mouseReleased(updateAgentSize);

    myDiv = createDiv('Agent Size');
    myDiv.position(100, 73);
    myDiv.style('font-size', '19px');
    myDiv.style('color', genericColor);

    function updateAgentSize() {
        agentR = agentSizeSlider.value();
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

}
