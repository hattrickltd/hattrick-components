import { EventEmitter } from "@stencil/core";
import { LazyLoadedComponent } from "../../global/lazy-loaded-component";
export declare class Avatar extends LazyLoadedComponent {
    private host;
    private avatarSize;
    private silhouettePath;
    private facecardPath;
    private avatarPath;
    /** the base route to the avatars, can be either a relative or absolute url */
    base: string;
    /** An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette. */
    parts: IAvatarPart[] | number | string;
    /** Set whether or not the background should be shown. */
    background?: boolean;
    /** Set whether or not the surrounding card should be shown. */
    facecard?: boolean;
    /** Set this to false to remove the bandages on injured and bruised players. */
    injury?: boolean;
    /** Set to true to generate a circular avatar by cutting off the bottom. */
    round?: boolean;
    /** Set to true to generate a square avatar by cutting off the bottom. */
    square?: boolean;
    /** Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport */
    lazy?: boolean;
    /** This array contains the loaded images that will be printed */
    private images;
    /**
     * This contains the images that are being loaded right now.
     * We keep this so that we can abort the download if the parts changes.
     */
    private pendingImages;
    load: EventEmitter<Array<IAvatarImage>>;
    componentDidLoad(): void;
    private updateAvatar;
    private loadAvatar;
    private addImage;
    private shouldIncludePart;
    private loadAvatarPart;
    private loadFacecard;
    private loadSilhouette;
    private loadDataUrl;
    private _getSilhouetteUrl;
    private createImage;
    printToCanvas(images?: Array<IAvatarImage>): HTMLCanvasElement;
    hostData(): {
        "role": string;
        "class": {
            "ht-avatar-round": boolean;
            "ht-avatar-square": boolean;
            "ht-avatar-has-facecard": boolean;
        };
    };
    render(): JSX.Element;
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
