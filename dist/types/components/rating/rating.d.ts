import '../../stencil.core';
export declare class ProgressArc {
    /** Size of element in pixels. */
    size: number | "small" | "large";
    /** The rating to show inside the stamina. */
    rating: number;
    /** Stamina in percentage between 0 and 1. */
    stamina: number;
    /** Label for the mouseover stamina */
    staminaLabel: string;
    private progressClass;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    private handleSize;
    private updateStaminaClass;
    hostData(): {
        style: {
            width: string;
            height: string;
        };
        title: string;
    };
    render(): JSX.Element[];
}
