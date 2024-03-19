import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "hattrick-flag",
  styleUrl: "flag.css",
  shadow: true,
})
export class Flag {
  @Prop() leagueId: number;

  render() {
    return (
      <img
        part="image"
        src={`https://www.hattrick.org/Img/Flags/${this.leagueId}.png`}
      />
    );
  }
}
