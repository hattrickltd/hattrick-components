/*! Built with http://stenciljs.com */
const { h } = window.HtComponents;

class LazyLoadedComponent {
    lazyLoad(host) {
        return new Promise((resolve) => {
            if ("IntersectionObserver" in window) {
                this.removeLazyLoad();
                this.io = new IntersectionObserver((data) => {
                    // because there will only ever be one instance
                    // of the element we are observing
                    // we can just use data[0]
                    if (data[0].isIntersecting) {
                        this.removeLazyLoad();
                        resolve();
                    }
                });
                this.io.observe(host);
            }
            else {
                // fall back to setTimeout for Safari and IE
                setTimeout(() => resolve(), 200);
            }
        });
    }
    removeLazyLoad() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }
}

export { LazyLoadedComponent as a };
