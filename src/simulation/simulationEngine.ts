export class SimulationEngine {
    simulationObjects: unknown[];

    constructor(simulationObjects: unknown[] = []) {
        this.simulationObjects = simulationObjects;
    }

    addSimulationObject(simulationObject: unknown) {
        this.simulationObjects.push(simulationObject);
    }

    simulate() {
        this.simulationObjects.forEach((simulationObject) => {
            simulationObject.simulate();
        });
    }
}
