

function Menu() {

    resetButton = createButton("Reset");
    resetButton.mouseReleased(start);
    resetButton.position(12,15);

    let predatorSpeedSlider = createSlider(0, 50, spec0speed);
    predatorSpeedSlider.position(10, 50);
    predatorSpeedSlider.style('width', '80px');

    predSpeedbutton = createButton("Predator Speed");
    predatorSpeedSlider.mouseReleased(updatePredSpeed);
    predSpeedbutton.position(100,50);

    function updatePredSpeed() {
        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 0)
                agents[i].movementRange = predatorSpeedSlider.value();
        }
    }

    let preySpeedSlider = createSlider(0, 50, spec1speed);
    preySpeedSlider.position(10, 75);
    preySpeedSlider.style('width', '80px');

    preySpeedButton = createButton("Prey Speed");
    preySpeedSlider.mouseReleased(updatePreySpeed);
    preySpeedButton.position(100,75);

    function updatePreySpeed() {
        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 1)
                agents[i].movementRange = preySpeedSlider.value();
        }
    }

    let predatorReproductionSlider = createSlider(0, 100, spec0reproductionRate * 100);
    predatorReproductionSlider.position(10, 105);
    predatorReproductionSlider.style('width', '80px');

    predReprodButton = createButton("Predator Reprod");
    predatorReproductionSlider.mouseReleased(updatePredReproduction);
    predReprodButton.position(100,105);

    function updatePredReproduction() {
        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 0)
                agents[i].reproductionRate = predatorReproductionSlider.value()/100;
        }
    }

    let preyReproductionSlider = createSlider(0, 100, spec1reproductionRate * 100);
    preyReproductionSlider.position(10, 130);
    preyReproductionSlider.style('width', '80px');

    preyReprodButton = createButton("Prey Reprod");
    preyReproductionSlider.mouseReleased(updatePreyReproduction);
    preyReprodButton.position(100,130);

    function updatePreyReproduction() {
        for (let i = 0; i < agents.length; i++) {
            if (agents[i].species === 1)
                agents[i].reproductionRate = preyReproductionSlider.value()/100;
        }
    }

}
