import { h, Component, Prop, Host, Element } from "@stencil/core";
import { HattrickMlParser } from "./hattrick-ml-parser";
import { HattrickMlReplacer } from "./hattrick-ml-replacer";

@Component({
  tag: "hattrick-ml",
  shadow: false,
})
export class HattrickMl {

  @Element() host: HTMLHattrickMlElement;

  @Prop() text: string;
  @Prop() allowCustomContent: boolean = false;

  @Prop() base: string = "";
  @Prop() internalLinkTarget: string = "_self";

  private parser = new HattrickMlParser();

  constructor() {
    HattrickMlParser.replacer = new HattrickMlReplacer();
  }

  private parseHattrickMl(): string {
    HattrickMlParser.replacer.base = this.base;
    HattrickMlParser.replacer.internalLinkTarget = this.internalLinkTarget;

    return this.parser.replace(this.text, this.allowCustomContent);
  }

  render() {
    return <Host>
      <div innerHTML={ this.parseHattrickMl() }></div>
    </Host>;
  }
}
