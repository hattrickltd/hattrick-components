var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
import { h } from './ht-components.core.js';
import { a as LazyLoadedComponent } from './chunk-b197b654.js';
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var originalSize = { width: 92, height: 123 };
var facecardSize = { width: 110, height: 155 };
var Avatar = /** @class */ (function (_super_1) {
    __extends(Avatar, _super_1);
    function Avatar() {
        var _this = _super_1.apply(this, arguments) || this;
        _this.avatarSize = facecardSize;
        _this.silhouettePath = "silhouettes/sil[nr].png";
        _this.facecardPath = "backgrounds/card1.png";
        _this.avatarPath = "/Img/Avatar/";
        /** the base route to the avatars, can be either a relative or absolute url */
        _this.base = "";
        /** Set whether or not the background should be shown. */
        _this.background = true;
        /** Set whether or not the surrounding card should be shown. */
        _this.facecard = true;
        /** Set this to false to remove the bandages on injured and bruised players. */
        _this.injury = true;
        /** Set to true to generate a circular avatar by cutting off the bottom. */
        _this.round = false;
        /** Set to true to generate a square avatar by cutting off the bottom. */
        _this.square = false;
        /** Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport */
        _this.lazy = true;
        _this.images = [];
        _this.pendingImages = [];
        return _this;
    }
    Avatar.prototype.componentDidLoad = function () {
        this.updateAvatar();
    };
    Avatar.prototype.updateAvatar = function () {
        var _super = function (name) { return _super_1.prototype[name]; };
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.images = [];
                        this.pendingImages.forEach(function (img) { return img.src = ""; });
                        this.pendingImages = [];
                        options = {
                            background: this.background,
                            injury: this.injury,
                            facecard: this.facecard,
                        };
                        this.avatarSize = Object.assign({}, (options.facecard) ? facecardSize : originalSize); // make a new copy so we can safely change it later without affecting other instances.
                        if (this.round || this.square) {
                            this.avatarSize.height = this.avatarSize.width;
                        }
                        return [4 /*yield*/, (this.lazy)];
                    case 1:
                        (_a.sent()) ? _super("lazyLoad").call(this, this.host) : Promise.resolve();
                        this.loadAvatar(this.parts, options);
                        return [2 /*return*/];
                }
            });
        });
    };
    Avatar.prototype.loadAvatar = function (parts, options) {
        var _this = this;
        options = Object.assign({ background: false, injury: false, facecard: false }, options);
        var promises = [];
        if (typeof parts === "string" && !parts.startsWith("data:")) {
            parts = JSON.parse(parts);
        }
        // If avatar.parts doesn't contain an array, a number may be sent
        // instead which will act as a seed to generate the silhouette.
        if (parts instanceof Array && parts.length > 0) {
            var insertIdx_1 = 0;
            if (options.facecard) {
                insertIdx_1++;
                promises.push(this.loadFacecard().then(function (img) {
                    _this.addImage(img, 0);
                    return img;
                }));
            }
            parts.forEach(function (a) {
                if (!_this.shouldIncludePart(a, options))
                    return;
                var idx = insertIdx_1++;
                promises.push(_this.loadAvatarPart(a, options).then(function (img) {
                    _this.addImage(img, idx);
                    return img;
                }));
            });
        }
        else if (typeof parts === "string" && parts.startsWith("data:")) {
            promises.push(this.loadDataUrl(this.parts).then(function (img) {
                _this.images = [img];
                return img;
            }));
        }
        else {
            promises.push(this.loadSilhouette(parts, options).then(function (img) {
                _this.addImage(img);
                return img;
            }));
        }
        return Promise.all(promises).then(function () {
            _this.load.emit(_this.images);
        });
    };
    Avatar.prototype.addImage = function (img, atIdx) {
        if (atIdx === void 0) { atIdx = 0; }
        var temp = this.images.slice();
        temp[atIdx] = img;
        this.images = temp;
    };
    Avatar.prototype.shouldIncludePart = function (part, options) {
        if (!part || !part.url)
            return false;
        if (!options.background && part.url.indexOf("background") > -1)
            return false;
        if (!options.injury && part.url.indexOf("injur") > -1)
            return false; // filenames are: fXinjury.png or injuredbutplaying
        return true;
    };
    Avatar.prototype.loadAvatarPart = function (part, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var img = _this.createImage();
            _this.pendingImages.push(img);
            var src = part.url;
            if (src.indexOf("silhouettes/") > -1) {
                // strip away everything before silhouettes, let the baseAvatarPartPath be used instead below
                src = src.substring(src.indexOf("silhouettes/"));
            }
            src = (src.indexOf("//") > -1)
                ? src.replace("//", "https://")
                : _this.base + _this.avatarPath + src;
            img.onload = function () {
                _this.pendingImages.splice(_this.pendingImages.indexOf(img), 1);
                resolve({
                    img: img,
                    x: part.x - ((options.facecard) ? 0 : 9),
                    y: part.y - ((options.facecard) ? 0 : 10),
                });
            };
            img.onerror = function () { return reject(); };
            img.src = src;
        });
    };
    Avatar.prototype.loadFacecard = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var img = _this.createImage();
            _this.pendingImages.push(img);
            img.onload = function () {
                _this.pendingImages.splice(_this.pendingImages.indexOf(img), 1);
                resolve({
                    img: img,
                    x: 0,
                    y: 0,
                });
            };
            img.onerror = function () { return reject(); };
            img.src = _this.base + _this.avatarPath + _this.facecardPath;
        });
    };
    Avatar.prototype.loadSilhouette = function (silhouetteId, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var img = _this.createImage();
            _this.pendingImages.push(img);
            img.onload = function () {
                _this.pendingImages.splice(_this.pendingImages.indexOf(img), 1);
                resolve({
                    img: img,
                    x: ((options.facecard) ? 0 : -9),
                    y: ((options.facecard) ? 0 : -9),
                });
            };
            img.onerror = function () { return reject(); };
            img.src = _this._getSilhouetteUrl(silhouetteId);
        });
    };
    Avatar.prototype.loadDataUrl = function (dataUrl) {
        var _this = this;
        return new Promise(function (resolve) {
            var img = _this.createImage();
            img.onload = function () {
                resolve({
                    img: img,
                    x: 0,
                    y: 0,
                });
            };
            img.src = dataUrl;
        });
    };
    Avatar.prototype._getSilhouetteUrl = function (seed) {
        var rnd = (seed) ? seed % 12 + 1 : Math.floor(Math.random() * 11) + 1;
        return this.base + this.avatarPath + this.silhouettePath.replace("[nr]", rnd.toString());
    };
    Avatar.prototype.createImage = function () {
        var img = new Image();
        img.setAttribute("async", "true");
        img.setAttribute("crossOrigin", "anonymous");
        return img;
    };
    Avatar.prototype.printToCanvas = function (images) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = this.avatarSize.width;
        canvas.height = this.avatarSize.height;
        (images || this.images).forEach(function (a) {
            context.drawImage(a.img, a.x, a.y);
        });
        return canvas;
    };
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
    Avatar.prototype.hostData = function () {
        return {
            "role": "img",
            "class": {
                "ht-avatar-round": this.round,
                "ht-avatar-square": this.square,
                "ht-avatar-has-facecard": this.facecard,
            }
        };
    };
    Avatar.prototype.render = function () {
        var _this = this;
        return (h("div", null, this.images.map(function (part) { return h("img", { src: part.img.src, style: {
                "width": part.img.naturalWidth / _this.avatarSize.width * 100 + "%",
                "height": part.img.naturalHeight / _this.avatarSize.height * 100 + "%",
                "left": part.x / _this.avatarSize.width * 100 + "%",
                "top": part.y / _this.avatarSize.height * 100 + "%",
            } }); })));
    };
    Object.defineProperty(Avatar, "is", {
        get: function () { return "ht-avatar"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Avatar, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Avatar, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Avatar, "events", {
        get: function () {
            return [{
                    "name": "load",
                    "method": "load",
                    "bubbles": true,
                    "cancelable": true,
                    "composed": true
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Avatar, "style", {
        get: function () { return ":host {\n  position: relative;\n  display: inline-block;\n  width: calc(92px * var(--avatar-size, 1));\n  height: calc(123px * var(--avatar-size, 1)); }\n\n:host(.ht-avatar-has-facecard) {\n  width: calc(110px * var(--avatar-size, 1));\n  height: calc(155px * var(--avatar-size, 1)); }\n\n:host(.ht-avatar-round),\n:host(.ht-avatar-square) {\n  height: calc(92px * var(--avatar-size, 1)); }\n\n:host(.ht-avatar-has-facecard.ht-avatar-round),\n:host(.ht-avatar-has-facecard.ht-avatar-square) {\n  height: calc(110px * var(--avatar-size, 1)); }\n\ndiv {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  height: 100%; }\n  :host(.ht-avatar-round) div {\n    border-radius: 100%; }\n\nimg {\n  position: absolute; }"; },
        enumerable: true,
        configurable: true
    });
    return Avatar;
}(LazyLoadedComponent));
export { Avatar as HtAvatar };
