import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "hattrick_components",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www"
    }
  ]
};
