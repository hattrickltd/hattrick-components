var LazyLoadedComponent = /** @class */ (function () {
    function LazyLoadedComponent() {
    }
    LazyLoadedComponent.prototype.lazyLoad = function (host) {
        var _this = this;
        return new Promise(function (resolve) {
            if ("IntersectionObserver" in window) {
                _this.removeLazyLoad();
                _this.io = new IntersectionObserver(function (data) {
                    // because there will only ever be one instance
                    // of the element we are observing
                    // we can just use data[0]
                    if (data[0].isIntersecting) {
                        _this.removeLazyLoad();
                        resolve();
                    }
                });
                _this.io.observe(host);
            }
            else {
                // fall back to setTimeout for Safari and IE
                setTimeout(function () { return resolve(); }, 200);
            }
        });
    };
    LazyLoadedComponent.prototype.removeLazyLoad = function () {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    };
    return LazyLoadedComponent;
}());
export { LazyLoadedComponent as a };
