import { Component, Element, Prop, State, Watch, Event, EventEmitter, Method } from "@stencil/core";
import { LazyLoadedComponent } from "../../global/lazy-loaded-component";

const originalSize = { width: 92, height: 123 };
const facecardSize = { width: 110, height: 155 };

@Component({
  tag: "hattrick-avatar",
  styleUrl: "avatar.scss",
  shadow: true,
})
export class Avatar extends LazyLoadedComponent {

  @Element() private host: HTMLStencilElement;

  private avatarSize: { width: number, height: number } = facecardSize;

  private silhouettePath: string = "silhouettes/sil[nr].png";
  private facecardPath: string = "backgrounds/card1.png";

  private avatarPath: string = "/Img/Avatar/";

  /** the base route to the avatars, can be either a relative or absolute url */
  @Prop() base: string = "";

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

  /** Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport */
  @Prop() lazy?: boolean = true;

  /** This array contains the loaded images that will be printed */
  @State() private images: Array<IAvatarImage> = [];

  /**
   * This contains the images that are being loaded right now.
   * We keep this so that we can abort the download if the parts changes.
   */
  private pendingImages: Array<HTMLImageElement> = [];

  @Event() load: EventEmitter<Array<IAvatarImage>>;

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

    if (this.round || this.square) {
      this.avatarSize.height = this.avatarSize.width;
    }

    await (this.lazy
      ? super.lazyLoad(this.host)
      : Promise.resolve()
    );

    this.loadAvatar(this.parts, options);
  }

  private loadAvatar(parts: IAvatarPart[] | number | string, options: IAvatarOptions): Promise<any> {

    options = { background: false, injury: false, facecard: false, ...options };

    let promises: Promise<any>[] = [];

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
          this.addImage(img, 0);
          return img;
        }));
      }

      parts.forEach((a) => {
        if (!this.shouldIncludePart(a, options)) return;

        let idx = insertIdx++;

        promises.push(this.loadAvatarPart(a, options).then((img) => {
          this.addImage(img, idx);
          return img;
        }));
      });
    } else if (typeof parts === "string" && parts.startsWith("data:")) {
      promises.push(this.loadDataUrl(this.parts as string).then((img) => {
        this.images = [img];
        return img;
      }));
    } else {
      promises.push(this.loadSilhouette(parts as number, options).then((img) => {
        this.addImage(img);
        return img;
      }));
    }

    return Promise.all(promises).then(() => {
      this.load.emit(this.images);
    });
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
        : this.base + this.avatarPath + src;

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

      img.src = this.base + this.avatarPath + this.facecardPath;
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
          x: ((options.facecard) ? 0 : -9),
          y: ((options.facecard) ? 0 : -9),
        });
      };
      img.onerror = () => reject();

      img.src = this._getSilhouetteUrl(silhouetteId);
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

  private _getSilhouetteUrl(seed: number): string {
    let rnd = (seed) ? seed % 12 + 1 : Math.floor(Math.random() * 11) + 1;

    return this.base + this.avatarPath + this.silhouettePath.replace("[nr]", rnd.toString());
  }

  private createImage(): HTMLImageElement {
    let img = new Image();
    img.setAttribute("async", "true");
    img.setAttribute("crossOrigin", "anonymous");

    return img;
  }

  @Method()
  printToCanvas(images?: Array<IAvatarImage>): HTMLCanvasElement {

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = this.avatarSize.width;
    canvas.height = this.avatarSize.height;

    (images || this.images).forEach((a) => {
      context.drawImage(a.img, a.x, a.y);
    });

    return canvas;
  }

  hostData() {
    return {
      "role": "img",
      "class": {
        "round": this.round,
        "square": this.square,
        "has-facecard": this.facecard,
      }
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

export interface IAvatarImage {
  img: HTMLImageElement;
  x: number;
  y: number;
}

interface IAvatarOptions {
  background?: boolean;
  injury?: boolean;
  facecard?: boolean;
}
