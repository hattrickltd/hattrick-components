import { Component, Element, Prop, State } from "@stencil/core";

const originalSize = { width: 92, height: 123 };
const facecardSize = { width: 110, height: 155 };

@Component({
  tag: "ht-avatar",
  styleUrl: "avatar.scss",
  shadow: true,
})
export class Avatar {
  @Element() private host: HTMLElement;

  private avatarSize: { width: number, height: number } = facecardSize;

  /** the base route to the avatars, can be either a relative or absolute url, but should end with trailing slash! */
  baseAvatarPartPath: string = "http://localhost/htweb/Img/Avatar/";

  private silhouettePath: string = "silhouettes/sil[nr].png";
  private facecardPath: string = "backgrounds/card1.png";

  /** An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette. */
  @Prop() parts: IAvatarPart[] | number | string;

  /** Set whether or not the background should be shown. */
  @Prop() background?: boolean = true;

  /** Set whether or not the surrounding card should be shown. */
  @Prop() facecard?: boolean = true;

  /** Set this to false to remove the bandages on injured and bruised players. */
  @Prop() injury?: boolean = true;

  /** Set to true to generate a circular avatar by cutting off the bottom. */
  @Prop() round?: boolean = false;

  /** Set to true to generate a square avatar by cutting off the bottom. */
  @Prop() square?: boolean = false;

  @State() private images: any[] = [];

  componentDidLoad() {
    if (typeof this.facecard === "undefined") this.facecard = true;

    if (this.round) this.host.classList.add("ht-avatar-round");
    if (this.square) this.host.classList.add("ht-avatar-square");
    if (this.facecard) this.host.classList.add("ht-avatar-has-facecard");

    this.updateAvatar();
    this.updateSize();
  }

  private updateAvatar() {
    let options: IAvatarOptions = {
      background: this.background,
      injury: this.injury,
      facecard: this.facecard,
    };

    this.avatarSize = {...(options.facecard) ? facecardSize : originalSize}; // make a new copy so we can safely change it later without affecting other instances.

    this.loadAvatar(this.parts, options);

    if (this.round || this.square) {
      this.avatarSize.height = this.avatarSize.width;
    }

    // this.host.style.width = `calc(${this.avatarSize.width}px * var(--avatar-size, 1))`;
    // this.host.style.height = `calc(${this.avatarSize.height}px * var(--avatar-size, 1))`;
  }

  private updateSize() {
    // this.size = parseInt(this.host.style.getPropertyValue("--avatar-size")) || 1;

    // this.host.style.width = (this.avatarSize.width * this.size) + "px";
    // this.host.style.height = ((this.round || this.square
    //   ? this.avatarSize.width
    //   : this.avatarSize.height
    // ) * this.size) + "px";
  }

  loadAvatar(parts: IAvatarPart[] | number | string, options: IAvatarOptions): Promise<any> {

    options = { background: false, injury: false, facecard: false, ...options };

    let promises: Promise<any>[] = [];

    if (typeof parts === "string") {
      parts = JSON.parse(parts);
    }

    // If avatar.parts doesn't contain an array, a number may be sent
    // instead which will act as a seed to generate the silhouette.
    if (parts instanceof Array && parts.length > 0) {
      let insertIdx = 0;

      if (options.facecard) {
        insertIdx++;
        promises.push(this.loadFacecard().then((img) => {
          // this.images = [...this.images, img];
          this.addImage(img, 0);
          return img;
        }));
      }

      parts.forEach((a) => {
        if (!this.shouldIncludePart(a, options)) return;

        let idx = insertIdx++;

        promises.push(this.loadAvatarPart(a, options).then((img) => {
          // this.images = [...this.images, img];
          this.addImage(img, idx);
          return img;
        }));
      });
    } else {
      promises.push(this.loadSilhouette(parts as number, options).then((img) => {
        this.addImage(img);
        return img;
      }));
    }

    return Promise.all(promises);
  }

  private addImage(img: IAvatarImage, atIdx: number = 0) {
    let temp = this.images.slice();
    temp[atIdx] = img;
    this.images = temp;
  }

  private shouldIncludePart(part: IAvatarPart, options: IAvatarOptions): boolean {
    if (!part || !part.url) return false;
    if (!options.background && part.url.indexOf("background") > -1) return false;
    if (!options.injury && part.url.indexOf("injur") > -1) return false; // filenames are: fXinjury.png or injuredbutplaying

    return true;
  }

  private loadAvatarPart(part: IAvatarPart, options: IAvatarOptions): Promise<IAvatarImage> {
    return new Promise((resolve) => {
      let img = this.createImage();

      let src: string = part.url;

      if (src.indexOf("silhouettes/") > -1) {
        // strip away everything before silhouettes, let the baseAvatarPartPath be used instead below
        src = src.substring(src.indexOf("silhouettes/"));
      }

      src = (src.indexOf("//") > -1)
        ? src.replace("//", "https://")
        : this.baseAvatarPartPath + src;

      img.onload = () => {
        resolve({
          img: img,
          x: part.x - ((options.facecard) ? 0 : 9),
          y: part.y - ((options.facecard) ? 0 : 10),
        });
      };

      img.src = src;
    });
  }

  private loadFacecard(): Promise<IAvatarImage> {
    return new Promise((resolve) => {
      let img = this.createImage();

      img.onload = () => {
        resolve({
          img: img,
          x: 0,
          y: 0,
        });
      };

      img.src = this.baseAvatarPartPath + this.facecardPath;
    });
  }

  private loadSilhouette(silhouetteId: number, options: IAvatarOptions): Promise<IAvatarImage> {
    return new Promise((resolve) => {
      let img = this.createImage();

      img.onload = () => {
        resolve({
          img: img,
          x: ((options.facecard) ? 0 : -9),
          y: ((options.facecard) ? 0 : -9),
        });
      };

      img.src = this._getSilhouetteUrl(silhouetteId);
    });
  }

  private _getSilhouetteUrl(seed: number): string {
    let rnd = (seed) ? seed % 12 + 1 : Math.floor(Math.random() * 11) + 1;

    return this.baseAvatarPartPath + this.silhouettePath.replace("[nr]", rnd.toString());
  }

  private createImage(): HTMLImageElement {
    let img = new Image();
    img.setAttribute("async", "true");
    img.setAttribute("crossOrigin", "anonymous");

    return img;
  }

  // printToCanvas(images: IAvatarImage[]): HTMLCanvasElement {

  //   let canvas = document.createElement("canvas");
  //   let context = canvas.getContext("2d");

  //   canvas.width = this.avatarSize.width;
  //   canvas.height = this.avatarSize.height;

  //   images.forEach((a) => {
  //     context.drawImage(a.img, a.x, a.y);
  //   });

  //   return canvas;
  // }

  // private replaceWithCanvas(canvas: HTMLCanvasElement): Promise<IAvatarImage> {
  //   return new Promise((resolve) => {

  //     let obj = {
  //       img: new Image(),
  //       x: 0,
  //       y: 0,
  //     };

  //     obj.img.onload = () => {
  //       this.images = [obj];
  //       resolve(obj);
  //     };

  //     obj.img.src = canvas.toDataURL();
  //   });
  // }

  hostData() {
    return {
      "role": "img",
    };
  }

  render() {
    return (
      <div>
        {this.images.map((part) =>
          <img src={part.img.src} style={{
            "width": part.img.naturalWidth / this.avatarSize.width * 100 + "%",
            "height": part.img.naturalHeight / this.avatarSize.height * 100 + "%",
            "left": part.x / this.avatarSize.width * 100 + "%",
            "top": part.y / this.avatarSize.height * 100 + "%",
            // "width": `calc(${part.img.naturalWidth}px * var(--avatar-size, 1))`,
            // "height": `calc(${part.img.naturalHeight}px * var(--avatar-size, 1))`,
            // "top": `calc(${part.y}px * var(--avatar-size, 1))`,
            // "left": `calc(${part.x}px * var(--avatar-size, 1))`,
          }} />
        )}
      </div>
    );
  }
}

export interface IAvatarPart {
  url: string;
  x: number;
  y: number;
}

interface IAvatarOptions {
  background?: boolean;
  injury?: boolean;
  facecard?: boolean;
}

interface IAvatarImage {
  img: HTMLImageElement;
  x: number;
  y: number;
}