import { calculateDeveloperMetrics } from "../telemetry";

describe("Telemetry Engine (Multi-Domain)", () => {
  test("should produce stable default states", () => {
    const metrics = calculateDeveloperMetrics({
      hoursCoded: 2,
      stack: "Frontend",
    });

    expect(metrics.status.mental.severity).toBe("Low");
    expect(metrics.status.physical.severity).toBe("Low");
    expect(metrics.status.environmental.severity).toBe("Low");

    expect(metrics.mental.focusCapacity).toBeGreaterThan(70);
    expect(metrics.systemLoad.mental.sustainedAttention).toBeGreaterThan(60);
  });

  test("should trigger critical physical overload for high posture/circulation strain", () => {
    const metrics = calculateDeveloperMetrics({
      hoursCoded: 8,
      stack: "Full Stack",
    }, {
      physical: {
        postureLoad: 90,
        hydrationDeficit: 86,
        circulationRisk: 88,
      },
    });

    expect(metrics.status.physical.severity).toBe("Critical");
    expect(metrics.systemLoad.physical.bodyStrain).toBeGreaterThan(80);
    expect(metrics.systemLoad.physical.recoveryCapacity).toBeLessThan(40);
  });

  test("should elevate emotional status with stress + recovery debt", () => {
    const metrics = calculateDeveloperMetrics({
      hoursCoded: 14,
      stack: "Backend",
    }, {
      emotional: {
        stressIndex: 78,
        frustrationLevel: 64,
        recoveryDebt: 80,
      },
    });

    expect(metrics.status.emotional.severity).toBe("High");
    expect(metrics.emotional.stressIndex).toBeGreaterThan(70);
    expect(metrics.systemLoad.emotional.escalationRisk).toBeGreaterThan(65);
  });

  test("should increase environmental severity when noise and lighting worsen", () => {
    const metrics = calculateDeveloperMetrics(
      {
        hoursCoded: 5,
        stack: "Frontend",
      },
      {
        environmental: {
          noiseDistractionIndex: 82,
          lightingStrain: 78,
          workspaceErgonomics: 68,
        },
      }
    );

    expect(metrics.systemLoad.environmental.sensoryLoad).toBeGreaterThan(70);
    expect(metrics.systemLoad.environmental.focusSupport).toBeLessThan(50);
    expect(metrics.status.environmental.severity).toBe("High");
  });
});
