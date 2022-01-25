import { Component, Element, h, Host, Prop } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import { generateIdPath } from "../../global/utils";
import "./spec";

declare const window: any;

@Component({
  tag: "hattrick-match-arena",
  styleUrl: "match-arena.css",
  scoped: true,
})
export class MatchArena {

  @Element() host: HTMLStencilElement;

  @Prop({ mutable: true }) arenaId!: number;
  @Prop() amount: number = 0;
  @Prop() homeColor: string = "#6ecdea";
  @Prop() awayColor: string = "#d15e5e";

  @Prop() resourceUrl: string = "https://res.hattrick.org"
  @Prop() forceUploadReload: string = "";
  
  private matchArena: HTMLImageElement;
  private mask: HTMLImageElement;
  private canvas: HTMLCanvasElement;

  componentWillRender() {
    this.loadMask();
  }

  render() {
    const { arenaId } = this;

    let src = (arenaId > 0) ? this.getArenaImage("arena") : this.getDefaultImage("arena");

    return <Host>
      <canvas ref={ el => this.canvas = el }></canvas>
      <div key={ `${ arenaId }` }>
        <img src={ src }
             onError={ _ => this.onError() }
             onLoad={ ev => {
               this.matchArena = ev.target as HTMLImageElement;
               this.onLoad();
             }}
        />
      </div>
    </Host>; 
  }

  private onLoad() {
    const { matchArena, mask, canvas, amount, homeColor, awayColor } = this;

    if (matchArena && mask) {
      let spec = new window.SpecGen();
      spec.drawSpectators(matchArena, mask, canvas, amount, homeColor, awayColor);
    }
  }

  private onError() {
    this.matchArena = undefined;
    this.mask = undefined;
    this.arenaId = 0;
    this.loadMask();
  }

  private loadMask() {
    let mask = new Image();
    mask.src = (this.arenaId > 0) ? this.getArenaImage("mask") : this.getDefaultImage("mask");
    mask.crossOrigin = "Anonymous";
    mask.onload = () => {
      this.mask = mask;
      this.onLoad();
    }
  }

  private getArenaImage(type: MatchArenaImageType): string {
    const { arenaId, resourceUrl, forceUploadReload } = this;

    let src = `${ resourceUrl }/arenas/${ generateIdPath(arenaId) }/${ this.getFileName(type) }`
    if (forceUploadReload) src += "?r=" + forceUploadReload;

    return src;
  }
  private getDefaultImage(type: MatchArenaImageType): string {
    const { resourceUrl } = this;

    return `${ resourceUrl }/arenas/default/${ this.getFileName(type) }`;
  }

  private getFileName(type: MatchArenaImageType): string {
    switch (type) {
      case "arena" : return "closeup.png";
      case "mask" : return "closeup_mask.png";
    }
  }
}

export type MatchArenaImageType = "arena" | "mask";
