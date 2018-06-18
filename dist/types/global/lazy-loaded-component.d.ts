export declare abstract class LazyLoadedComponent {
    protected io: IntersectionObserver;
    protected lazyLoad(host: HTMLStencilElement): Promise<void>;
    protected removeLazyLoad(): void;
}
