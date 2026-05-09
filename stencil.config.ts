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
    angularOutputTarget({
      componentCorePackage: "@hattrickltd/hattrick-components",
      outputType: "component",
      directivesProxyFile: "../Site.Hattrick.Angular/src/hattrick-common/stencil-generated/components.ts",
      directivesArrayFile: "../Site.Hattrick.Angular/src/hattrick-common/stencil-generated/index.ts",
    }),
  ],
};
