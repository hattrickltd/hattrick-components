/*! Built with http://stenciljs.com */
HtComponents.loadBundle("chunk-b846b972.js", ["exports"], function (e) { window.HtComponents.h, e.LazyLoadedComponent = /** @class */ (function () {
    function LazyLoadedComponent() {
    }
    LazyLoadedComponent.prototype.lazyLoad = function (e) {
        var _this = this;
        return new Promise(function (o) { "IntersectionObserver" in window ? (_this.removeLazyLoad(), _this.io = new IntersectionObserver(function (e) { e[0].isIntersecting && (_this.removeLazyLoad(), o()); }), _this.io.observe(e)) : setTimeout(function () { return o(); }, 200); });
    };
    LazyLoadedComponent.prototype.removeLazyLoad = function () { this.io && (this.io.disconnect(), this.io = void 0); };
    return LazyLoadedComponent;
}()); });
