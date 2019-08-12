import { Config } from "@stencil/core";

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
  ],
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www"
    }
  ]
};
