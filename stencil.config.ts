import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "hattrick-components",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www"
    }
  ],
  globalStyle: "src/global/variables.css",
  plugins: [
    sass({
      injectGlobalPaths: [
        "src/global/mixins.scss"
      ]
    })
  ]
};
