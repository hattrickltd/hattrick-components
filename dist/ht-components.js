/*!
 * Built with http://stenciljs.com
 * 2018-05-28T07:49:10
 */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "HtComponents","ht-components",0,"ht-components.core.js","es5-build-disabled.js","hydrated",[["ht-avatar","ht-avatar",1,[["background",1,0,1,3],["base",1,0,1,2],["facecard",1,0,1,3],["host",7],["images",5],["injury",1,0,1,3],["lazy",1,0,1,3],["parts",1,0,1,1],["printToCanvas",6],["round",1,0,1,3],["square",1,0,1,3]],1],["ht-bar","ht-bar",1,[["cap",1,0,1,4],["capWidth",5],["denomination",1,1,1,2],["didLoad",5],["forceLevelTextPosition",5],["hideContent",1,0,"hide-content",3],["host",7],["isCap",1,0,"is-cap",3],["label",1,0,1,2],["labelTextWidth",5],["lazy",1,0,1,3],["level",1,0,1,4],["levelText",5],["levelTextWidth",5],["max",1,0,1,4],["numberPadding",5],["showSkillInColumn",5],["skillWidth",5]],1],["ht-flip","ht-flip",1,[["direction",1,0,1,2],["flipped",2,1,1,3]],1],["ht-progress-arc","ht-progress-arc",1,[["complete",1,0,1,4],["counterClockwise",1,0,"counter-clockwise",3],["size",1,0,1,4],["strokeWidth",2,0,"stroke-width",4]],1],["ht-rating","ht-progress-arc",1,[["rating",1,0,1,4],["size",2,0,1,1],["stamina",1,0,1,4],["staminaLabel",1,0,"stamina-label",2]],1],["ht-timer","ht-timer",1,[["daysText",1,0,"days-text",2],["deadline",1,0,1,1],["keepCounting",1,0,"keep-counting",3],["maxHours",1,0,"max-hours",4],["seconds",5]],1],["ht-tooltip","ht-tooltip",1,[["arrow",1,1,1,2],["content",1,0,1,2],["cssPos",5],["dir",2,1,1,2],["host",7],["position",1,1,1,2],["showTooltip",5],["win",3,0,0,0,"window"]],1,[["mouseover","onMouseOver",0,1],["focus","onMouseOver",0,0,1],["mouseleave","onMouseLeave",0,1],["blur","onMouseLeave",0,0,1]]]],HTMLElement.prototype);