import '../../stencil.core';
export declare class ProgressArc {
    /** Size of element in pixels. */
    size: number;
    /** Width of progress arc stroke. */
    strokeWidth: number;
    /** Indicating if the progress should instead be counter clockwise */
    counterClockwise: boolean;
    /** Expression evaluating to float [0.0, 1.0] */
    complete: number;
    completeChanged(): void;
    private offset;
    private strokeWidthCapped;
    private radius;
    private circumference;
    private transformValue;
    componentWillLoad(): void;
    updateRadius(): void;
    render(): JSX.Element;
}
