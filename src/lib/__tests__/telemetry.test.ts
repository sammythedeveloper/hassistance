import { calculateDeveloperMetrics } from "../telemetry";

describe("Telemetry Engine (Multi-Domain)", () => {
  test("should show low risk for light usage (2h)", () => {
    const metrics = calculateDeveloperMetrics(2, "Frontend");

    expect(metrics.burnoutRisk).toBe("Low");

    expect(metrics.mental.focusCapacity).toBeGreaterThan(70);
    expect(metrics.physical.ocularStrain).toBeLessThan(40);
  });

  test("should increase physical strain after long coding session", () => {
    const metrics = calculateDeveloperMetrics(8, "Full Stack");

    expect(metrics.physical.ocularStrain).toBeGreaterThan(80);
    expect(metrics.physical.postureLoad).toBeGreaterThan(50);
  });

  test("should trigger critical risk for extreme workloads", () => {
    const metrics = calculateDeveloperMetrics(14, "Backend");

    expect(metrics.burnoutRisk).toBe("Critical");

    expect(metrics.emotional.stressIndex).toBeGreaterThan(70);
    expect(metrics.mental.cognitiveLoad).toBeGreaterThan(60);
  });
});
