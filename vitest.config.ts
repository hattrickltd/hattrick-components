import { defineVitestConfig } from "@stencil/vitest/config";

export default defineVitestConfig({
  stencilConfig: "./stencil.config.ts",
  test: {
    projects: [
      // Unit tests - stencil environment for component logic
      {
        test: {
          name: "unit",
          include: ["src/**/*.spec.{ts,tsx}"],
          environment: "stencil",
        },
      },
    ],
  },
});
