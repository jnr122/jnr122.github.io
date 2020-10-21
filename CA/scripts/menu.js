

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


}