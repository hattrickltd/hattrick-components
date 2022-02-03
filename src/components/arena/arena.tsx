import { Component, Element, h, Host, Prop } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import "./overlay";

declare const window: any;

@Component({
  tag: "hattrick-arena",
  styleUrl: "arena.css",
  scoped: true,
})
export class Arena {

  @Element() host: HTMLStencilElement;

  @Prop({ mutable: true }) arenaId!: number;
  @Prop() arenaImageType: ArenaImageType = "User220";
  @Prop() weather: number = -1;
  @Prop() capacity: number = 0;
  @Prop() resourceUrl: string = "https://res.hattrick.org"
  @Prop() forceUploadReload: string = "";

  render() {
    const { arenaId, weather } = this;

    let src = (arenaId > 0) ? this.getArenaImage(this.arenaImageType) : this.getDefaultImage(this.arenaImageType);

    return <Host>
      <div key={ `${ arenaId }_${ weather }` }>
        <img src={ src }
             onError={ _ => this.onError() }
             onLoad={ ({ target }) => this.onLoad(target as HTMLImageElement) }
        />
      </div>
    </Host>; 
  }

  private onLoad(img: HTMLImageElement) {
    if (this.weather > -1) {
      window.Weather.add(img, this.weather);
    }
  }

  private onError() {
    let parentLink = this.host.closest("a");
    if (parentLink) {
      parentLink.href = parentLink.href.replace(generateIdPath(this.arenaId), "default/" + this.getCapacityInterval());
    }
    
    this.arenaId = 0;
  }

  private getArenaImage(size: ArenaImageType): string {
    const { arenaId, resourceUrl, forceUploadReload } = this;

    let src = `${ resourceUrl }/arenas/${ generateIdPath(arenaId) }/${ this.getFileName(size) }`
    if (forceUploadReload) src += "?r=" + forceUploadReload;

    return src;
  }
  private getDefaultImage(size: ArenaImageType): string {
    return `${ this.resourceUrl }/arenas/default/${ this.getCapacityInterval() }/${ this.getFileName(size) }`;
  }

  private getCapacityInterval(): number {
    if (this.capacity >= 50_000) {
      return 50_000;
    } else if (this.capacity >= 28_000) {
      return 28_000;
    } else if (this.capacity >= 20_000) {
      return 20_000;
    } else {
      return 12_000;
    }
  }

  private getFileName(size: ArenaImageType): string {
    switch (size) {
      case "User220" : return "custom-220-100.jpg";
      case "User620" : return "custom-620-0.jpg";
    }
  }
}

export type ArenaImageType = "User220" | "User620";

function generateIdPath(id: number) {
  return [
    generateId(id, 100000),
    generateId(id, 10000),
    generateId(id, 1000),
    id,
  ].join("/");

  function generateId(id: number, range: number) {
    return Math.floor(id / range) + 1;
  }
}
