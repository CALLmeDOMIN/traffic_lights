import { FixedTimeController } from "../fixedTimeController.js";
import { Intersection } from "../../core/intersection.js";

describe("FixedTimeController", () => {
  let controller: FixedTimeController;
  let intersection: Intersection;

  beforeEach(() => {
    controller = new FixedTimeController();
    intersection = new Intersection();
    jest.spyOn(intersection, "change");
  });

  test("should not change traffic light before STEPS_PER_CHANGE steps", () => {
    controller.handleTrafficLightChange(intersection);

    expect(intersection.change).not.toHaveBeenCalled();
  });

  test("should change traffic light after STEPS_PER_CHANGE steps", () => {
    controller.handleTrafficLightChange(intersection);
    controller.handleTrafficLightChange(intersection);

    expect(intersection.change).toHaveBeenCalledTimes(1);
  });

  test("should reset step count after changing lights", () => {
    controller.handleTrafficLightChange(intersection);
    controller.handleTrafficLightChange(intersection);

    controller.handleTrafficLightChange(intersection);

    expect(intersection.change).toHaveBeenCalledTimes(1);
  });
});
