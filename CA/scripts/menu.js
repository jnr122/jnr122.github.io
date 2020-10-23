

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

        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 0) {

                agents[i].reproductionRate = predatorReproductionSlider.value() / 100;
            }
        }
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

        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 1)
                agents[i].reproductionRate = preyReproductionSlider.value()/100;
        }
    }



}
