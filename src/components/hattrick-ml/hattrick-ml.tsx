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
  @Prop() spoilerText: string = "Possible spoiler. Click here to show";

  @Prop() currencyRate: number = 0.1;
  @Prop() currencyName: string = "€";

  private parser = new HattrickMlParser();

  constructor() {
    HattrickMlParser.replacer = new HattrickMlReplacer();
  }

  private parseHattrickMl(): string {
    HattrickMlParser.replacer.base = this.base;
    HattrickMlParser.replacer.internalLinkTarget = this.internalLinkTarget;

    this.parser.spoilerText = this.spoilerText;
    this.parser.currencyRate = this.currencyRate;
    this.parser.currencyName = this.currencyName;

    return this.parser.replace(this.text, this.allowCustomContent);
  }

  render() {
    return (
      <Host>
        <div innerHTML={this.parseHattrickMl()}></div>
      </Host>
    );
  }
}
