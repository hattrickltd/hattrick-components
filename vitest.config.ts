import { defineVitestConfig } from "@stencil/vitest/config";

export default defineVitestConfig({
  stencilConfig: "./stencil.config.ts",
  test: {
    projects: [
      // Unit tests - node environment for functions and logic
      {
        test: {
          name: "unit",
          include: ["src/**/*.unit.spec.ts"],
          environment: "node",
        },
      },
      // Spec tests - stencil environment for rendered component behaviour
      {
        test: {
          name: "spec",
          include: ["src/**/*.spec.{ts,tsx}"],
          environment: "stencil",
          setupFiles: ["./vitest-setup.ts"],
        },
      },
    ],
  },
});
