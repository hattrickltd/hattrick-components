import '../../stencil.core';
export declare class Tooltip {
    host: HTMLStencilElement;
    dir: string;
    private readonly ltr;
    private readonly rtl;
    /**
     * The position of the arrow. Will be ignored if `position` is not set.
     * `start` will put the arrow to the left or top.
     * `middle` will put the arrow to the middle or center.
     * `end` will put the arrow to the right or bottom.
     */
    arrow: "start" | "middle" | "end" | "none";
    /** The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip. */
    content: string;
    /**
     * Which side of the element the tooltip should be shown.
     * `cursor` will put it approximately below the cursor. Using `cursor` will also disable animations.
     */
    position: "top" | "bottom" | "start" | "end" | "cursor";
    showTooltip: boolean;
    cssPos: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    win: Window;
    componentWillLoad(): void;
    onMouseOver(ev: MouseEvent): void;
    onMouseLeave(): void;
    calculatePosition(ev: MouseEvent | FocusEvent): {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    private calculateVerticalPosition;
    private calculateHorizontalPosition;
    hostData(): {
        "role": string;
        "aria-describedby": string;
        "aria-controls": string;
        "aria-expanded": boolean;
    };
    render(): JSX.Element[];
}
