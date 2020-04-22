import { h, Component, Element, Prop, State, Watch, Event, EventEmitter, Method, Host } from "@stencil/core";
import { waitForIntersection } from "../../global/lazy-loading";
import { IAvatarPart, IAvatarImage } from "./avatar.interfaces";

const originalSize = { width: 92, height: 123 };
const facecardSize = { width: 110, height: 155 };
// const largeSize = { width: 208, height: 278 };

@Component({
  tag: "hattrick-avatar",
  styleUrl: "avatar.css",
  shadow: true,
})
export class Avatar {

  @Element() private host: HTMLHattrickAvatarElement;

  private avatarSize: { width: number, height: number } = facecardSize;

  private silhouettePath: string = "silhouettes/sil[nr].png";
  private facecardPath: string = "backgrounds/card1.png";

  /** the base route to the avatars, can be either a relative or absolute url. */
  @Prop() base: string = "/Img/Avatar/";

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

  /** Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport. */
  @Prop() lazy?: boolean = true;
  /** How soon before the avatar comes into view should we start loading it? Accepts CSS-like margin value. */
  @Prop() lazyMargin?: string = `250px`;

  /**
   * Set to true if you want all parts to finish loading before showing the avatar.
   * This will make the first paint much slower, but the avatar will never be just partially visible.
   * The time to when the full avatar is printed will not be affected by this setting however.
   */
  @Prop() composed?: boolean = false;

  /** This array contains the loaded images that will be printed */
  @State() private images: Array<IAvatarImage> = [];

  /**
   * This contains the images that are being loaded right now.
   * We keep this so that we can abort the download if the parts changes.
   */
  private pendingImages: Array<HTMLImageElement> = [];

  /**
   * Let you know when the avatar has finished loading.
   * An array of the images loaded will be provided in the `event.detail`.
   * Real type is `EventEmitter<Array<IAvatarImage>>`, but for TypeScript < 2.7 it needs to be generic.
   *
   * @example
   * ```
   * <hattrick-avatar onload="avatarLoaded.call(this, event.detail)"></ht-avatar>
   *
   * avatarLoaded(images) {
   *   console.log("dataUrl: ", this.printToCanvas(images).toDataURL());
   * }
   * ```
   */
  @Event() load: EventEmitter;

  componentDidLoad() {
    this.updateAvatar();
  }

  @Watch("parts")
  @Watch("injury")
  private async updateAvatar() {
    this.images = [];
    this.pendingImages.forEach((img) => img.src = "");
    this.pendingImages = [];

    let options: IAvatarOptions = {
      background: this.background,
      injury: this.injury,
      facecard: this.facecard,
    };

    this.avatarSize = {...(options.facecard) ? facecardSize : originalSize}; // make a new copy so we can safely change it later without affecting other instances.

    if (this.base.includes("AvatarNew")) {
      this.avatarSize.width = 208;
      this.avatarSize.height = 278;
    }

    if (this.round || this.square) {
      this.avatarSize.height = this.avatarSize.width;
    }

    await (this.lazy
      ? waitForIntersection(this.host)
      : Promise.resolve()
    );

    this.loadAvatar(this.parts, options);
  }

  private loadAvatar(parts: IAvatarPart[] | number | string, options: IAvatarOptions): Promise<any> {

    options = { background: false, injury: false, facecard: false, ...options };

    let promises: Promise<IAvatarImage>[] = [];

    if (typeof parts === "string" && !parts.startsWith("data:")) {
      parts = JSON.parse(parts);
    }

    // If avatar.parts doesn't contain an array, a number may be sent
    // instead which will act as a seed to generate the silhouette.
    if (parts instanceof Array && parts.length > 0) {
      let insertIdx = 0;

      if (options.facecard) {
        insertIdx++;
        promises.push(this.loadFacecard().then((img) => {
          if (!this.composed) this.addImage(img, 0);
          return img;
        }));
      }

      parts.forEach((a) => {
        if (!this.shouldIncludePart(a, options)) return;

        let idx = insertIdx++;

        promises.push(this.loadAvatarPart(a, options).then((img) => {
          if (!this.composed) this.addImage(img, idx);
          return img;
        }));
      });
    } else if (typeof parts === "string" && parts.startsWith("data:")) {
      promises.push(this.loadDataUrl(this.parts as string).then((img) => {
        if (!this.composed) this.images = [img];
        return img;
      }));
    } else {
      promises.push(this.loadSilhouette(parts as number, options).then((img) => {
        if (!this.composed) this.images = [img];
        return img;
      }));
    }

    return Promise.all(promises).then((images) => {
      if (this.composed) this.images = images;
      this.load.emit(images);
    }).catch(_ => {});
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
    return new Promise((resolve, reject) => {
      let img = this.createImage();
      this.pendingImages.push(img);

      let src: string = part.url;

      if (src.indexOf("silhouettes/") > -1) {
        // strip away everything before silhouettes, let the baseAvatarPartPath be used instead below
        src = src.substring(src.indexOf("silhouettes/"));
      }

      src = (src.indexOf("//") > -1)
        ? src.replace("//", "https://")
        : this.base + src;

      img.onload = () => {
        this.pendingImages.splice(this.pendingImages.indexOf(img), 1);
        resolve({
          img: img,
          x: part.x - ((options.facecard) ? 0 : 9),
          y: part.y - ((options.facecard) ? 0 : 10),
        });
      };
      img.onerror = () => reject();

      img.src = src;
    });
  }

  private loadFacecard(): Promise<IAvatarImage> {
    return new Promise((resolve, reject) => {
      let img = this.createImage();
      this.pendingImages.push(img);

      img.onload = () => {
        this.pendingImages.splice(this.pendingImages.indexOf(img), 1);
        resolve({
          img: img,
          x: 0,
          y: 0,
        });
      };
      img.onerror = () => reject();

      img.src = this.base.split("/").slice(0, -2).join("/") + "/Avatar/" + this.facecardPath;
    });
  }

  private loadSilhouette(silhouetteId: number, options: IAvatarOptions): Promise<IAvatarImage> {
    return new Promise((resolve, reject) => {
      let img = this.createImage();
      this.pendingImages.push(img);

      img.onload = () => {
        this.pendingImages.splice(this.pendingImages.indexOf(img), 1);
        resolve({
          img: img,
          x: 0,
          y: 0,
        });
      };
      img.onerror = () => reject();

      img.src = this._getSilhouetteUrl(silhouetteId, options.facecard);
    });
  }

  private loadDataUrl(dataUrl: string): Promise<IAvatarImage> {
    return new Promise((resolve) => {
      let img = this.createImage();

      img.onload = () => {
        resolve({
          img: img,
          x: 0,
          y: 0,
        });
      };

      img.src = dataUrl;
    });
  }

  private _getSilhouetteUrl(seed: number, facecard: boolean): string {
    let rnd = ((seed) ? seed % 12 + 1 : Math.floor(Math.random() * 11) + 1).toString();

    if (!facecard) rnd += "_3";

    return this.base + this.silhouettePath.replace("[nr]", rnd.toString());
  }

  private createImage(): HTMLImageElement {
    let img = new Image();
    img.setAttribute("async", "true");
    img.setAttribute("crossOrigin", "anonymous");

    return img;
  }

  /**
   * Prints the images to a canvas. Useful together with `.toDataURL()`.
   * This may be useful for faster loading at a later time.
   * @param images The avatar parts to print. Defaults to the images already loaded by the component.
   *
   * @example
     const avatar = document.createElement("hattrick-avatar");
     avatar.parts = avatarParts;
     avatar.onload = function (evt) {
       const dataUrl = avatar.printToCanvas().toDataURL();
       // store in cache for later use?
     };
     document.body.appendChild(avatar);
   *
   * @example
     <hattrick-avatar parts="..." onload="avatarLoaded.call(this, event.detail)"></hattrick-avatar>
     function avatarLoaded(images) {
       const dataUrl = this.printToCanvas(images).toDataURL();
     }
   */
  @Method()
  async printToCanvas(images: Array<IAvatarImage> = this.images): Promise<HTMLCanvasElement> {

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = this.avatarSize.width;
    canvas.height = this.avatarSize.height;

    images.forEach((a) => {
      context.drawImage(a.img, a.x, a.y);
    });

    return canvas;
  }

  render() {
    return (
      <Host role="img" class={{
        "round": this.round,
        "square": this.square,
        "has-facecard": this.facecard,
        "no-background": !this.background,
        "avatarnew": this.base.includes("AvatarNew"),
      }}>
        { this.images.map((part) =>
          this.renderImagePart(part)
        )}
        <slot />
      </Host>
    );
  }

  private renderImagePart(part: IAvatarImage) {
    let { width, height } = this.avatarSize;
    let multiplier = 1;
    let leftOffset = 0;

    if (this.base.includes("AvatarNew")) {
      // if (part.img.src.includes("res.hattrick.org")) {
      //   // console.log("body", part.x, part.y, part.img.naturalWidth, part.img.naturalHeight, width, height);
      //   width = (this.facecard ? facecardSize : originalSize).width * 1.26;
      //   height = (this.facecard ? facecardSize : originalSize).height * 1.26;
      // }

      if (part.img.src.includes("res.hattrick.org") || part.img.src.includes("card1")) {
        // console.log("body", part.x, part.y, part.img.naturalWidth, part.img.naturalHeight, width, height);
        width = (this.facecard ? facecardSize : originalSize).width;
        height = (this.facecard ? facecardSize : originalSize).height;
      } else if (!part.img.src.includes("background")) {
        if (!this.square && !this.round) {
          multiplier = 1.26;
          leftOffset = 13;
        }

        // width = (this.facecard ? facecardSize : originalSize).width;
        // height = (this.facecard ? facecardSize : originalSize).height;
        // width /= 1.3;
        // height /= 1.3;
      }
    }

    // if (part.img.src.includes("noses")) {
    //   // console.log("nose", part.x, part.y, part.img.naturalWidth, part.img.naturalHeight, width, height);
    // }
    // multiplier = 1;

    return (
      <img src={part.img.src} style={{
        "width": part.img.naturalWidth / width * multiplier * 100 + "%",
        "height": part.img.naturalHeight / height * multiplier * 100 + "%",
        "left": part.x / this.avatarSize.width * 100 - leftOffset + "%",
        "top": part.y / this.avatarSize.height * 100 + "%",
      }} />
    );
  }
}

interface IAvatarOptions {
  background?: boolean;
  injury?: boolean;
  facecard?: boolean;
}
