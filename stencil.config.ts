import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "hattrick-components",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www"
    }
  ]
};
