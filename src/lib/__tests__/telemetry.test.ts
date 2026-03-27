import { calculateDeveloperMetrics } from "../telemetry"; // Adjust this path if your lib is elsewhere!

describe("Telemetry Engine Logic", () => {
  test("should calculate 'Low' risk for 2 hours of coding", () => {
    const metrics = calculateDeveloperMetrics(2, "Frontend");
    expect(metrics.burnoutRisk).toBe("Low");
    expect(metrics.focusCapacity).toBeGreaterThan(80);
  });

  test("should trigger 'High' ocular strain after 8 hours", () => {
    const metrics = calculateDeveloperMetrics(8, "Full Stack");
    expect(metrics.ocularStrain).toBeGreaterThan(60);
    expect(metrics.burnoutRisk).toBe("High");
  });

  test("should return 'Critical' status for 14+ hour shifts", () => {
    const metrics = calculateDeveloperMetrics(14, "Backend");
    expect(metrics.burnoutRisk).toBe("Critical");
    expect(metrics.focusCapacity).toBeLessThan(20);
  });
});
