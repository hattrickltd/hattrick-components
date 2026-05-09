import { NgModule } from "@angular/core";
import { defineCustomElements } from "@hattrickltd/hattrick-components/dist/loader";

import { DIRECTIVES } from "./stencil-generated";
import { HattrickReaction } from "./hattrick-reaction.component";

let customElementsDefined = false;

export function defineHattrickCustomElements(): void {
  if (!customElementsDefined && typeof window !== "undefined") {
    defineCustomElements(window);
    customElementsDefined = true;
  }
}

@NgModule({
  declarations: [...DIRECTIVES, HattrickReaction],
  exports: [...DIRECTIVES, HattrickReaction],
})
export class HattrickComponentsModule {
  constructor() {
    defineHattrickCustomElements();
  }
}
