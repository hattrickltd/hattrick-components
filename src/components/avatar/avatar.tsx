import { Component, Element, Prop, State } from '@stencil/core';

const originalSize = { width: 92, height: 123 };
const facecardSize = { width: 110, height: 155 };

@Component({
  tag: 'ht-avatar',
  styleUrl: 'avatar.scss',
  shadow: true
})
export class Avatar {
  @Element() private host: HTMLElement;

  private avatarSize: { width: number, height: number } = facecardSize;

  /** the base route to the avatars, can be either a relative or absolute url, but should end with trailing slash! */
  baseAvatarPartPath: string = "http://localhost/htweb/Img/Avatar/";

  private silhouettePath: string = "silhouettes/sil[nr].png";
  private facecardPath: string = "backgrounds/card1.png";

  /** The parts that builds up the avatar, or a number to display a silhouette. */
  @Prop() parts: IAvatarPart[] | number;

  /** Set whether or not the background should be shown. */
  @Prop() background?: boolean = true;

  /** Set whether or not the surrounding card should be shown. */
  @Prop() facecard: boolean = true;
  
  /** Set this to false to remove the bandages on injured and bruised players. */
  @Prop() injury?: boolean = true;

  /** Set to true to generate a circular avatar by cutting off the bottom. */
  @Prop() round: boolean = false;

  /** Set to true to generate a square avatar by cutting off the bottom. */
  @Prop() square: boolean = false;

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

    this.avatarSize = {...(options.facecard) ? facecardSize : originalSize};

    this.loadAvatar(this.parts, options);

    if (this.round || this.square) {
      this.avatarSize.height = this.avatarSize.width;
    }

    // console.log("--avatar-size", getComputedStyle(this.host).getPropertyValue("--avatar-size") || "-", this.host.style.getPropertyValue("--avatar-size") || "-");

    // this.host.style.setProperty("width", `calc(${this.avatarSize.width}px * var(--avatar-size, 1))`);
    // this.host.style.setProperty("height", `calc(${this.avatarSize.height}px * var(--avatar-size, 1))`);

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

  loadAvatar(parts: IAvatarPart[] | number, options: IAvatarOptions): Promise<any> {

    options = { background: false, injury: false, facecard: false, ...options };

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = this.avatarSize.width;
    canvas.height = this.avatarSize.height;

    let promises: Promise<any>[] = [];

    // If avatar.parts doesn't contain an array, a number maybe sent in
    // instead which will act as a seed to generate the silhouette.
    if (parts instanceof Array && parts.length > 0) {
      
      if (options.facecard) {
        promises.push(new Promise((resolve) => {
          let img = new Image();
          img.setAttribute("crossOrigin", "anonymous");

          let obj = {
            img: img,
            x: 0,
            y: 0,
          };

          img.onload = () => resolve(obj);

          img.src = this.baseAvatarPartPath + this.facecardPath;

          this.images = [...this.images, obj];
        }));
      }

      parts.forEach((a) => {
        if (!a || !a.url) return;
        if (!options.background && a.url.indexOf("background") > -1) return;
        if (!options.injury && a.url.indexOf("injur") > -1) return; // filenames are: fXinjury.png or injuredbutplaying

        promises.push(new Promise((resolve) => {
          let img = new Image();
          img.setAttribute("async", "true");
          img.setAttribute("crossOrigin", "anonymous");

          let obj = {
            img: img,
            x: a.x - ((options.facecard) ? 0 : 9),
            y: a.y - ((options.facecard) ? 0 : 10),
          };

          img.onload = () => resolve(obj);

          let src: string = a.url;

          if (src.indexOf("silhouettes/") > -1) {
            // strip away everything before silhouettes, let the baseAvatarPartPath be used instead below
            src = src.substring(src.indexOf("silhouettes/"));
          }

          src = (src.indexOf("//") > -1)
            ? src.replace("//", "https://")
            : this.baseAvatarPartPath + src;

          img.src = src;

          this.images = [...this.images, obj];
        }));
      });
    } else {

      promises.push(new Promise((resolve) => {
        let img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
          let obj = {
            img: img,
            x: ((options.facecard) ? 0 : -9),
            y: ((options.facecard) ? 0 : -9),
          };
          this.images = [...this.images, obj];
          resolve(obj);
        };

        img.src = this._getSilhouetteUrl(parts as number);
      }));
    }

    // return Promise.all(promises).then((imageInfos: any[]) => {
    //   // imageInfos.forEach((info) => {
    //   //   let img = info.img;
    //   //   img.style.top = `${info.top}px`;
    //   //   img.style.left = `${info.left}px`;
    //   //   this.host.shadowRoot.appendChild(img);
    //   // });
    //   // this.images = imageInfos.map((info) => {
    //   //   let img = info.img;
    //   //   img.style.top = `${info.top}px`;
    //   //   img.style.left = `${info.left}px`;
    //   //   return img;
    //   // });
    //   this.images = imageInfos;
    // });

    return Promise.all(promises).then((images) => {
      images.forEach((a) => {
        context.drawImage(a.img, a.x, a.y);
      });
      let canvasUrl = canvas.toDataURL();
      // let canvasUrl = this._avatars[this._getKey(key, options)] = canvas.toDataURL();

      let obj = {
        img: new Image(),
        x: 0,
        y: 0,
      };

      obj.img.src = canvasUrl;

      // this.images = [obj];
      this.images = images;

      return canvasUrl;
    });
  }
  
  private _getSilhouetteUrl(seed: number): string {
    let rnd = (seed) ? seed % 12 + 1 : Math.floor(Math.random() * 11) + 1;

    return this.baseAvatarPartPath + this.silhouettePath.replace("[nr]", rnd.toString());
  }

  render() {
    if (this.images) {
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
      )
    }
  }
}

interface IAvatarOptions {
  background?: boolean;
  injury?: boolean;
  facecard?: boolean;
}

export interface IAvatarPart {
  url: string;
  x: number;
  y: number;
}
