import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import { LazyLoadedComponent } from "../../global/lazy-loaded-component";
export declare class Bar extends LazyLoadedComponent {
    /** The styling of the host. Used to calculate text widths. */
    private _hostStyle;
    /** The host (outer) element. E.g. <ht-bar> */
    private host;
    /** The level of the bar. */
    level: number;
    /** The maximum level the bar should show. */
    max: number;
    /** If there's a max before the end of the bar (e.g. maxed youth skill). */
    cap: number;
    /** If the sublevel is the same as the levelCap. */
    isCap: boolean;
    /** The label shown inside the bar */
    label: string;
    /** The denomination of the skill level */
    denomination: string;
    hideContent: boolean;
    /** Set to false to load the bar directly, as opposed to loading it when it's visible within the viewport */
    lazy?: boolean;
    /** The text for the level when denomination is not used */
    private levelText;
    /** Which column the skill level should be shown in. */
    private showSkillInColumn;
    /** The width of the skill level column. */
    private skillWidth;
    /** The width of the cap column. */
    private capWidth;
    /** How much padding the number need to not overlap with the label. */
    private numberPadding;
    /** The width of the label text */
    private labelTextWidth;
    /** The width of the level text */
    private levelTextWidth;
    /** If the level text doesn't fit anywhere, we need to force it in. */
    private forceLevelTextPosition;
    private didLoad;
    private readonly totalWidth;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    private setCalculations;
    /** Convert percentage width to actual width based on the component width */
    private percentageToPixels;
    /** Get the percentage width of the skill column */
    private getSkillWidth;
    /** Get the percentage width of the cap column */
    private getCapWidth;
    /** Get how much padding the skill text should have (in case skill label `name` is longer than skill column + cap column) */
    private getNumberPadding;
    private getLevelText;
    private getSkillNumberText;
    private hasCapBar;
    private hasMaxBar;
    private doesLevelTextFitInMaxColumn;
    private doesLevelTextFitInCapColumn;
    private doesLevelTextFitInLevelColumn;
    private getPadding;
    hostData(): {
        "aria-label": string;
    };
    render(): JSX.Element;
}
