import { Config } from "@stencil/core";
import { angularOutputTarget } from "@stencil/angular-output-target";

export const config: Config = {
  namespace: "hattrick-components",
  bundles: [
    { components: ["hattrick-avatar"] },
    { components: ["hattrick-bar"] },
    { components: ["hattrick-flip"] },
    { components: ["hattrick-ml"] },
    { components: ["hattrick-match-clock"] },
    { components: ["hattrick-picture"] },
    { components: ["hattrick-progress-arc", "hattrick-rating"] },
    { components: ["hattrick-timer"] },
    { components: ["hattrick-tooltip"] },
    { components: ["hattrick-range"] },
  ],
  outputTargets: [
    {
      type: "dist",
    },
    {
      type: "www",
    },
    {
      type: "docs-readme",
    },
    {
      type: "dist-custom-elements",
      customElementsExportBehavior: "single-export-module",
    },
    angularOutputTarget({
      componentCorePackage: "@hattrickltd/hattrick-components",
      excludeComponents: ["hattrick-reaction"],
      outputType: "scam",
      directivesProxyFile: "./packages/angular-workspace/src/lib/stencil-generated/components.ts",
      directivesArrayFile: "./packages/angular-workspace/src/lib/stencil-generated/index.ts",
    }),
  ],
};
