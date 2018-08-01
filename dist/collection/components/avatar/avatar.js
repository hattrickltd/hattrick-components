var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LazyLoadedComponent } from "../../global/lazy-loaded-component";
const originalSize = { width: 92, height: 123 };
const facecardSize = { width: 110, height: 155 };
export class Avatar extends LazyLoadedComponent {
    constructor() {
        super(...arguments);
        this.avatarSize = facecardSize;
        this.silhouettePath = "silhouettes/sil[nr].png";
        this.facecardPath = "backgrounds/card1.png";
        this.avatarPath = "/Img/Avatar/";
        /** the base route to the avatars, can be either a relative or absolute url */
        this.base = "";
        /** Set whether or not the background should be shown. */
        this.background = true;
        /** Set whether or not the surrounding card should be shown. */
        this.facecard = true;
        /** Set this to false to remove the bandages on injured and bruised players. */
        this.injury = true;
        /** Set to true to generate a circular avatar by cutting off the bottom. */
        this.round = false;
        /** Set to true to generate a square avatar by cutting off the bottom. */
        this.square = false;
        /** Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport */
        this.lazy = true;
        /** This array contains the loaded images that will be printed */
        this.images = [];
        /**
         * This contains the images that are being loaded right now.
         * We keep this so that we can abort the download if the parts changes.
         */
        this.pendingImages = [];
    }
    componentDidLoad() {
        this.updateAvatar();
    }
    updateAvatar() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            this.images = [];
            this.pendingImages.forEach((img) => img.src = "");
            this.pendingImages = [];
            let options = {
                background: this.background,
                injury: this.injury,
                facecard: this.facecard,
            };
            this.avatarSize = Object.assign({}, (options.facecard) ? facecardSize : originalSize); // make a new copy so we can safely change it later without affecting other instances.
            if (this.round || this.square) {
                this.avatarSize.height = this.avatarSize.width;
            }
            yield (this.lazy
                ? _super("lazyLoad").call(this, this.host)
                : Promise.resolve());
            this.loadAvatar(this.parts, options);
        });
    }
    loadAvatar(parts, options) {
        options = Object.assign({ background: false, injury: false, facecard: false }, options);
        let promises = [];
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
                if (!this.shouldIncludePart(a, options))
                    return;
                let idx = insertIdx++;
                promises.push(this.loadAvatarPart(a, options).then((img) => {
                    this.addImage(img, idx);
                    return img;
                }));
            });
        }
        else if (typeof parts === "string" && parts.startsWith("data:")) {
            promises.push(this.loadDataUrl(this.parts).then((img) => {
                this.images = [img];
                return img;
            }));
        }
        else {
            promises.push(this.loadSilhouette(parts, options).then((img) => {
                this.addImage(img);
                return img;
            }));
        }
        return Promise.all(promises).then(() => {
            this.load.emit(this.images);
        });
    }
    addImage(img, atIdx = 0) {
        let temp = this.images.slice();
        temp[atIdx] = img;
        this.images = temp;
    }
    shouldIncludePart(part, options) {
        if (!part || !part.url)
            return false;
        if (!options.background && part.url.indexOf("background") > -1)
            return false;
        if (!options.injury && part.url.indexOf("injur") > -1)
            return false; // filenames are: fXinjury.png or injuredbutplaying
        return true;
    }
    loadAvatarPart(part, options) {
        return new Promise((resolve, reject) => {
            let img = this.createImage();
            this.pendingImages.push(img);
            let src = part.url;
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
    loadFacecard() {
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
    loadSilhouette(silhouetteId, options) {
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
    loadDataUrl(dataUrl) {
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
    _getSilhouetteUrl(seed) {
        let rnd = (seed) ? seed % 12 + 1 : Math.floor(Math.random() * 11) + 1;
        return this.base + this.avatarPath + this.silhouettePath.replace("[nr]", rnd.toString());
    }
    createImage() {
        let img = new Image();
        img.setAttribute("async", "true");
        img.setAttribute("crossOrigin", "anonymous");
        return img;
    }
    printToCanvas(images) {
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
                "ht-avatar-round": this.round,
                "ht-avatar-square": this.square,
                "ht-avatar-has-facecard": this.facecard,
            }
        };
    }
    render() {
        return (h("div", null, this.images.map((part) => h("img", { src: part.img.src, style: {
                "width": part.img.naturalWidth / this.avatarSize.width * 100 + "%",
                "height": part.img.naturalHeight / this.avatarSize.height * 100 + "%",
                "left": part.x / this.avatarSize.width * 100 + "%",
                "top": part.y / this.avatarSize.height * 100 + "%",
            } }))));
    }
    static get is() { return "ht-avatar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "background": {
            "type": Boolean,
            "attr": "background"
        },
        "base": {
            "type": String,
            "attr": "base"
        },
        "facecard": {
            "type": Boolean,
            "attr": "facecard"
        },
        "host": {
            "elementRef": true
        },
        "images": {
            "state": true
        },
        "injury": {
            "type": Boolean,
            "attr": "injury",
            "watchCallbacks": ["updateAvatar"]
        },
        "lazy": {
            "type": Boolean,
            "attr": "lazy"
        },
        "parts": {
            "type": "Any",
            "attr": "parts",
            "watchCallbacks": ["updateAvatar"]
        },
        "printToCanvas": {
            "method": true
        },
        "round": {
            "type": Boolean,
            "attr": "round"
        },
        "square": {
            "type": Boolean,
            "attr": "square"
        }
    }; }
    static get events() { return [{
            "name": "load",
            "method": "load",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ht-avatar:**/"; }
}
