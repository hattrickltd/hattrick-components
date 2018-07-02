/*!
 * HtComponents: Core, ES5
 * Built with http://stenciljs.com
 */
function n(n){return{n:n[0],t:n[1],e:!!n[2],r:!!n[3],i:!!n[4]}}function t(n,t){if(_(t)&&"object"!=typeof t&&"function"!=typeof t){if(n===Boolean||3===n)return"false"!==t&&(""===t||!!t);if(n===Number||4===n)return parseFloat(t);if(n===String||2===n)return t.toString()}return t}function e(n,t,e,r){var i=n.o.get(t);i&&((r=i["s-ld"]||i.$activeLoading)&&((e=r.indexOf(t))>-1&&r.splice(e,1),r.length||(i["s-init"]&&i["s-init"](),i.$initLoad&&i.$initLoad())),n.o.delete(t))}function r(n,t,e){for(var r,i,o=null,u=!1,f=!1,c=arguments.length;c-- >2;)W.push(arguments[c]);for(;W.length>0;)if((e=W.pop())&&void 0!==e.pop)for(c=e.length;c--;)W.push(e[c]);else"boolean"==typeof e&&(e=null),(f="function"!=typeof n)&&(null==e?e="":"number"==typeof e?e=String(e):"string"!=typeof e&&(f=!1)),f&&u?o[o.length-1].u+=e:null===o?o=[f?{u:e}:e]:o.push(f?{u:e}:e),u=f;if(null!=t){if(t.className&&(t.class=t.className),"object"==typeof t.class){for(c in t.class)t.class[c]&&W.push(c);t.class=W.join(" "),W.length=0}null!=t.key&&(r=t.key),null!=t.name&&(i=t.name)}return"function"==typeof n?n(Object.assign({},t,{children:o}),L):{f:n,c:o,u:void 0,a:t,s:r,l:i,v:void 0,d:!1}}function i(n,t,e,r){t.split(" ").forEach(function(t){n[t]=!0,e&&(n[t+"-"+e]=!0,r&&(n[t+"-"+e+"-"+r]=n[t+"-"+r]=!0))})}function o(n,t){n.p.has(t)||(n.p.set(t,!0),n.y?n.queue.write(function(){return u(n,t)}):n.queue.tick(function(){return u(n,t)}))}function u(n,t,e,r,i,o){if(n.p.delete(t),!n.m.has(t)){if(r=n.b.get(t),e=!r){if((i=n.o.get(t))&&i.$rendered&&(i["s-rn"]=!0),i&&!i["s-rn"])return(i["s-rc"]=i["s-rc"]||[]).push(function(){u(n,t)}),void(i.$onRender=i["s-rc"]);r=function a(n,t,e,r,i,o,u){try{(function f(n,t,e,r,i,o,u){for(u in n.w.set(r,e),n.g.has(e)||n.g.set(e,{}),(o=Object.assign({color:{type:String}},t.properties)).mode={type:String},o)c(n,o[u],e,r,u,i)})(n,i=n.j(t).M,t,r=new i,e),function a(n,t,e){if(t){var r=n.w.get(e);t.forEach(function(t){e[t.method]={emit:function(e){n.k(r,t.name,{bubbles:t.bubbles,composed:t.composed,cancelable:t.cancelable,detail:e})}}})}}(n,i.events,r);try{if(o=n.A.get(t)){for(u=0;u<o.length;u+=2)r[o[u]](o[u+1]);n.A.delete(t)}}catch(e){n.O(e,2,t)}}catch(e){r={},n.O(e,7,t,!0)}return n.b.set(t,r),r}(n,t,n.P.get(t));try{r.componentWillLoad&&(o=r.componentWillLoad())}catch(e){n.O(e,3,t)}}else try{r.componentWillUpdate&&(o=r.componentWillUpdate())}catch(e){n.O(e,5,t)}o&&o.then?o.then(function(){return f(n,t,r,e)}):f(n,t,r,e)}}function f(n,t,e,o){(function u(n,t,e,o){try{var u,f,c=t.M.host,a=t.M.encapsulation,s="shadow"===a&&n.T.C;if(u=function l(n,t,e){return n&&Object.keys(n).forEach(function(r){n[r].reflectToAttr&&((e=e||{})[r]=t[r])}),e}(t.M.properties,o),f=s?e.shadowRoot:e,!e["s-rn"]){n._(n,n.T,t,e);var v=e["s-sc"];v&&(n.T.S(e,function d(n){return n+"-host"}(v),""),o.render||n.T.S(e,function p(n){return n+"-slot"}(v),""))}if(o.render||o.hostData||c||u){n.x=!0;var h=o.render&&o.render(),y=void 0;if((y=o.hostData&&o.hostData())&&t.N){var m=Object.keys(y).reduce(function(n,e){return t.N[e]?n.concat(e):t.N[x(e)]?n.concat(x(e)):n},[]);if(m.length>0)throw new Error("The following keys were attempted to be set with hostData() from the "+t.W+" component: "+m.join(", ")+". If you would like to modify these please set @Prop({ mutable: true, reflectToAttr: true}) on the @Prop() decorator.")}u&&(y=y?Object.assign(y,u):u),n.x=!1,c&&(y=function b(n,t,e){return n=n||{},Object.keys(t).forEach(function(r){"theme"===r?i(n.class=n.class||{},t[r],e.mode,e.color):"class"===r?i(n[r]=n[r]||{},t[r]):n[r]=t[r]}),n}(y,c,o));var w=n.L.get(e)||{};w.v=f;var g=r(null,y,h);g.d=!0,n.L.set(e,n.render(e,w,g,s,a))}n.R&&n.R.D(e),e["s-rn"]=!0,e.$onRender&&(e["s-rc"]=e.$onRender),e["s-rc"]&&(e["s-rc"].forEach(function(n){return n()}),e["s-rc"]=null)}catch(t){n.x=!1,n.O(t,8,e,!0)}})(n,n.j(t),t,e);try{o?t["s-init"]():(e.componentDidUpdate&&e.componentDidUpdate(),m(n.L.get(t)))}catch(e){n.O(e,6,t,!0)}}function c(n,e,r,i,o,u,f,c){if(e.type||e.state){var v=n.g.get(r);e.state||(!e.attr||void 0!==v[o]&&""!==v[o]||(f=u&&u.F)&&_(c=f[e.attr])&&(v[o]=t(e.type,c)),r.hasOwnProperty(o)&&(void 0===v[o]&&(v[o]=t(e.type,r[o])),"mode"!==o&&delete r[o])),i.hasOwnProperty(o)&&void 0===v[o]&&(v[o]=i[o]),e.watchCallbacks&&(v[R+o]=e.watchCallbacks.slice()),l(i,o,function d(t){return(t=n.g.get(n.w.get(this)))&&t[o]},function p(t,r){(r=n.w.get(this))&&(e.state||e.mutable)&&a(n,r,o,t)})}else if(e.elementRef)s(i,o,r);else if(e.method)s(r,o,i[o].bind(i));else if(e.context){var h=n.H(e.context);void 0!==h&&s(i,o,h.q&&h.q(r)||h)}else e.connect&&s(i,o,n.I(e.connect))}function a(n,t,e,r,i,u,f){(i=n.g.get(t))||n.g.set(t,i={});var c=i[e];if(r!==c&&(i[e]=r,u=n.b.get(t))){if(f=i[R+e])for(var a=0;a<f.length;a++)try{u[f[a]].call(u,r,c,e)}catch(n){}!n.x&&t["s-rn"]&&o(n,t)}}function s(n,t,e){Object.defineProperty(n,t,{configurable:!0,value:e})}function l(n,t,e,r){Object.defineProperty(n,t,{configurable:!0,get:e,set:r})}function v(n,t,e,r,i){var o=t!==(t=t.replace(/^xlink\:?/,"")),u=D[t]||r;u&&(!e||"false"===e)||i?o?n.removeAttributeNS(F,S(t)):n.removeAttribute(t):"function"!=typeof e&&(u&&(e=""),o?n.setAttributeNS(F,S(t),e):n.setAttribute(t,e))}function d(n,t,e,r,i,o,u,f,c,a){if("class"!==e||o)if("style"===e){for(f in r=r||P,i=i||P,r)i[f]||(t.style[f]="");for(f in i)i[f]!==r[f]&&(t.style[f]=i[f])}else"o"!==e[0]||"n"!==e[1]||!/[A-Z]/.test(e[2])||e in t?"list"!==e&&"type"!==e&&!o&&(e in t||-1!==["object","function"].indexOf(typeof i)&&null!==i)?(a=n.j(t))&&a.N&&a.N[e]?(p(t,e,i),u&&a.N[e].B&&v(t,a.N[e].U,i,3===a.N[e].z,null==i)):"ref"!==e&&(p(t,e,null==i?"":i),null!=i&&!1!==i||t.removeAttribute(e)):null!=i&&"key"!==e?v(t,e,i):(o||n.T.Q(t,e)&&(null==i||!1===i))&&n.T.Y(t,e):(e=S(e)in t?S(e.substring(2)):S(e[2])+e.substring(3),i?i!==r&&n.T.Z(t,e,i):n.T.G(t,e));else if(r!==i){var s=null==r||""===r?C:r.trim().split(/\s+/),l=null==i||""===i?C:i.trim().split(/\s+/),d=null==t.className||""===t.className?C:t.className.trim().split(/\s+/);for(f=0,c=s.length;f<c;f++)-1===l.indexOf(s[f])&&(d=d.filter(function(n){return n!==s[f]}));for(f=0,c=l.length;f<c;f++)-1===s.indexOf(l[f])&&(d=d.concat([l[f]]));t.className=d.join(" ")}}function p(n,t,e){try{n[t]=e}catch(n){}}function h(n,t,e,r,i){var o=11===e.v.nodeType&&e.v.host?e.v.host:e.v,u=t&&t.a||P,f=e.a||P;for(i in u)f&&null!=f[i]||null==u[i]||d(n,o,i,u[i],void 0,r,e.d);for(i in f)i in u&&f[i]===("value"===i||"checked"===i?o[i]:u[i])||d(n,o,i,u[i],f[i],r,e.d)}function y(n,t){function e(i,o,u,f,c,v,m,b,w){if(b=o.c[u],a||(d=!0,"slot"===b.f&&(l&&t.S(f,l+"-slot",""),b.c?b.J=!0:b.K=!0)),_(b.u))b.v=t.V(b.u);else if(b.K)b.v=t.V("");else{if(v=b.v=H||"svg"===b.f?t.X("http://www.w3.org/2000/svg",b.f):t.nn(b.J?"slot-fb":b.f),H="svg"===b.f||"foreignObject"!==b.f&&H,h(n,null,b,H),_(l)&&v["s-si"]!==l&&t.S(v,v["s-si"]=l,""),_(s)&&t.S(v,E,s+"."+u+(function n(t){if(t)for(var e=0;e<t.length;e++)if("slot"!==t[e].f||n(t[e].c))return!0;return!1}(b.c)?"":".")),b.c)for(c=0;c<b.c.length;++c)(m=e(i,b,c,v))&&(_(s)&&3===m.nodeType&&!m["s-cr"]&&t.tn(v,t.en("s."+s+"."+c)),t.tn(v,m),_(s)&&3===m.nodeType&&!m["s-cr"]&&(t.tn(v,t.en("/")),t.tn(v,t.V(" "))));"svg"===b.f&&(H=!1)}return b.v["s-hn"]=p,(b.J||b.K)&&(b.v["s-sr"]=!0,b.v["s-cr"]=y,b.v["s-sn"]=b.l||"",(w=i&&i.c&&i.c[u])&&w.f===b.f&&i.v&&r(i.v)),b.v}function r(e,i,o,u){n.rn=!0;var a=t.in(e);for(o=a.length-1;o>=0;o--)(u=a[o])["s-hn"]!==p&&u["s-ol"]&&(t.on(u),t.un(c(u),u,f(u)),t.on(u["s-ol"]),u["s-ol"]=null,d=!0),i&&r(u,i);n.rn=!1}function i(n,r,i,o,u,c,a,s){var l=n["s-cr"]||n.$defaultHolder;for((a=l&&t.fn(l)||n).shadowRoot&&t.cn(a)===p&&(a=a.shadowRoot);u<=c;++u)o[u]&&(s=_(o[u].u)?t.V(o[u].u):e(null,i,u,n))&&(o[u].v=s,t.un(a,s,f(r)))}function o(n,e,i,o){for(;e<=i;++e)_(n[e])&&(o=n[e].v,v=!0,o["s-ol"]?t.on(o["s-ol"]):r(o,!0),t.on(o))}function u(n,t){return n.f===t.f&&n.s===t.s&&("slot"!==n.f||n.l===t.l)}function f(n){return n&&n["s-ol"]?n["s-ol"]:n}function c(n){return t.fn(n["s-ol"]?n["s-ol"]:n)}var a,s,l,v,d,p,y,m=[];return function b(w,g,M,j,k,A,E,O,P,C,T,S){if(p=t.cn(w),y=w["s-cr"],a=j,s="shadow"!==k?A:null,l=w["s-sc"],d=v=!1,function a(s,l,v){var d=l.v=s.v,p=s.c,y=l.c;H=l.v&&_(t.an(l.v))&&void 0!==l.v.ownerSVGElement,H="svg"===l.f||"foreignObject"!==l.f&&H,_(l.u)?(v=d["s-cr"]||d.$defaultHolder)?t.sn(t.fn(v),l.u):s.u!==l.u&&t.sn(d,l.u):("slot"!==l.f&&h(n,s,l,H),_(p)&&_(y)?function m(n,s,l,v,d,p,h,y){for(var m=0,b=0,w=s.length-1,g=s[0],M=s[w],j=v.length-1,k=v[0],A=v[j];m<=w&&b<=j;)if(null==g)g=s[++m];else if(null==M)M=s[--w];else if(null==k)k=v[++b];else if(null==A)A=v[--j];else if(u(g,k))a(g,k),g=s[++m],k=v[++b];else if(u(M,A))a(M,A),M=s[--w],A=v[--j];else if(u(g,A))"slot"!==g.f&&"slot"!==A.f||r(t.fn(g.v)),a(g,A),t.un(n,g.v,t.ln(M.v)),g=s[++m],A=v[--j];else if(u(M,k))"slot"!==g.f&&"slot"!==A.f||r(t.fn(M.v)),a(M,k),t.un(n,M.v,g.v),M=s[--w],k=v[++b];else{for(d=null,p=m;p<=w;++p)if(s[p]&&_(s[p].s)&&s[p].s===k.s){d=p;break}_(d)?((y=s[d]).f!==k.f?h=e(s&&s[b],l,d,n):(a(y,k),s[d]=void 0,h=y.v),k=v[++b]):(h=e(s&&s[b],l,b,n),k=v[++b]),h&&t.un(c(g.v),h,f(g.v))}m>w?i(n,null==v[j+1]?null:v[j+1].v,l,v,b,j):b>j&&o(s,m,w)}(d,p,l,y):_(y)?(_(s.u)&&t.sn(d,""),i(d,null,l,y,0,y.length-1)):_(p)&&o(p,0,p.length-1)),H&&"svg"===l.f&&(H=!1)}(g,M),_(s)&&t.S(g.v,$,s),d){for(function n(e,r,i,o,u,f,c,a,s,l){for(u=0,f=(r=t.in(e)).length;u<f;u++){if((i=r[u])["s-sr"]&&(o=i["s-cr"]))for(a=t.in(t.fn(o)),s=i["s-sn"],c=a.length-1;c>=0;c--)(o=a[c])["s-cn"]||o["s-nr"]||o["s-hn"]===i["s-hn"]||((3===(l=t.vn(o))||8===l)&&""===s||1===l&&null===t.dn(o,"slot")&&""===s||1===l&&t.dn(o,"slot")===s)&&(m.some(function(n){return n.pn===o})||(v=!0,o["s-sn"]=s,m.push({hn:i,pn:o})));1===t.vn(i)&&n(i)}}(M.v),E=0;E<m.length;E++)(O=m[E]).pn["s-ol"]||((P=t.V(""))["s-nr"]=O.pn,t.un(t.fn(O.pn),O.pn["s-ol"]=P,O.pn));for(n.rn=!0,E=0;E<m.length;E++){for(O=m[E],T=t.fn(O.hn),S=t.ln(O.hn),P=O.pn["s-ol"];P=t.yn(P);)if((C=P["s-nr"])&&C&&C["s-sn"]===O.pn["s-sn"]&&T===t.fn(C)&&(C=t.ln(C))&&C&&!C["s-nr"]){S=C;break}(!S&&T!==t.fn(O.pn)||t.ln(O.pn)!==S)&&O.pn!==S&&(t.on(O.pn),t.un(T,O.pn,S))}n.rn=!1}return v&&function n(e,r,i,o,u,f,c,a){for(o=0,u=(i=t.in(e)).length;o<u;o++)if(r=i[o],1===t.vn(r)){if(r["s-sr"])for(c=r["s-sn"],r.hidden=!1,f=0;f<u;f++)if(i[f]["s-hn"]!==r["s-hn"])if(a=t.vn(i[f]),""!==c){if(1===a&&c===t.dn(i[f],"slot")){r.hidden=!0;break}}else if(1===a||3===a&&""!==t.mn(i[f]).trim()){r.hidden=!0;break}n(r)}}(M.v),m.length=0,M}}function m(n,t){n&&(n.a&&n.a.ref&&n.a.ref(t?null:n.v),n.c&&n.c.forEach(function(n){m(n,t)}))}function b(n,t){var e={nodeName:t},r=n.j(e);if(!r||!r.M)return Promise.resolve(null);var i=r.M,o=function u(n){return Object.keys(n).reduce(function(t,e){var r,i=n[e],o={name:e};if(i.state)r="states",o.bn=i.watchCallbacks||[];else if(i.elementRef)r="elements";else if(i.method)r="methods";else{r="props";var u="any";i.type&&(u=i.type,"function"==typeof i.type&&(u=i.type.name)),o.type=u.toLowerCase(),o.mutable=i.mutable||!1,o.connect=i.connect||"-",o.context=i.connect||"-",o.bn=i.watchCallbacks||[]}return t[r].push(o),t},{wn:[],gn:[],Mn:[],jn:[]})}(i.properties||{}),f=(r.kn||[]).map(function(n){return{An:n.n,capture:n.i,disabled:n.e,passive:n.r,method:n.t}}),c=i.events||[],a=Object.assign({$n:i.is,En:r.On||"unknown",encapsulation:i.encapsulation||"none"},o,{events:{Pn:c,listeners:f}});return Promise.resolve(a)}function w(n,t,e,r,i){return e.mode||(e.mode=n.Cn(e)),e["s-cr"]||n.dn(e,$)||n.C&&1===t.encapsulation||(e["s-cr"]=n.V(""),e["s-cr"]["s-cn"]=!0,n.un(e,e["s-cr"],n.in(e)[0])),n.C||1!==t.encapsulation||"shadowRoot"in HTMLElement.prototype||(e.shadowRoot=e),1===t.encapsulation&&n.C&&!e.shadowRoot&&n.Tn(e,{mode:"open"}),r={_n:e["s-id"],F:{}},t.N&&Object.keys(t.N).forEach(function(o){(i=t.N[o].U)&&(r.F[i]=n.dn(e,i))}),r}function g(n,r,i,u){i.connectedCallback=function(){(function t(n,e,r){n.Sn.has(r)||(n.Sn.set(r,!0),function i(n,t){var e=n.j(t);e.kn&&e.kn.forEach(function(e){e.e||n.T.Z(t,e.n,function r(n,t,e,i){return function(r){(i=n.b.get(t))?i[e](r):((i=n.A.get(t)||[]).push(e,r),n.A.set(t,i))}}(n,t,e.t),e.i,e.r)})}(n,r)),n.m.delete(r),n.xn.has(r)||(n.xn.set(r,!0),r["s-id"]||(r["s-id"]=n.Nn()),function o(n,t,e){for(e=t;e=n.T.an(e);)if(n.Wn(e)){n.Ln.has(t)||(n.o.set(t,e),e.$activeLoading&&(e["s-ld"]=e.$activeLoading),(e["s-ld"]=e["s-ld"]||[]).push(t));break}}(n,r),n.queue.tick(function(){n.P.set(r,w(n.T,e,r)),n.Rn(e,r)}))})(n,r,this)},i.attributeChangedCallback=function(n,e,i){(function o(n,e,r,i,u,f,c){if(n&&i!==u)for(f in n)if((c=n[f]).U&&S(c.U)===S(r)){e[f]=t(c.z,u);break}})(r.N,this,n,e,i)},i.disconnectedCallback=function(){(function t(n,r){if(!n.rn&&function i(n,t){for(;t;){if(!n.fn(t))return 9!==n.vn(t);t=n.fn(t)}}(n.T,r)){n.m.set(r,!0),e(n,r),m(n.L.get(r),!0),n.T.G(r),n.Sn.delete(r);var o=n.b.get(r);o&&o.componentDidUnload&&o.componentDidUnload(),n.R&&n.R.Dn(r),[n.o,n.Fn,n.P].forEach(function(n){return n.delete(r)})}})(n,this)},i["s-init"]=function(){(function t(n,r,i,o,u){if(!n.Ln.has(r)&&(o=n.b.get(r))&&!n.m.has(r)&&(!r["s-ld"]||!r["s-ld"].length)){delete r["s-ld"],n.Ln.set(r,!0);try{m(n.L.get(r)),(u=n.Fn.get(r))&&(u.forEach(function(n){return n(r)}),n.Fn.delete(r)),o.componentDidLoad&&o.componentDidLoad()}catch(t){n.O(t,4,r)}r.classList.add(i),e(n,r)}})(n,this,u)},i["s-hmr"]=function(t){(function e(n,t,r,i){t.M=null;var o=n.b.get(r);o&&(n.w.delete(o),n.b.delete(r)),n.P.set(r,w(n.T,t,r)),n.Rn(t,r,i)})(n,r,this,t)},i.forceUpdate=function(){o(n,this)},function f(n,e,r){e&&Object.keys(e).forEach(function(i){var o=e[i],u=o.Hn;1===u||2===u?l(r,i,function t(){return(n.g.get(this)||{})[i]},function e(r){a(n,this,i,t(o.z,r))}):6===u&&s(r,i,N)})}(n,r.N,i)}function M(n,t,e,r){return function(){var i=arguments;return function o(n,t,e){var r=t[e],i=n.qn.body;return i?(r||(r=i.querySelector(e)),r||(r=t[e]=n.nn(e),n.tn(i,r)),r.componentOnReady()):Promise.resolve()}(n,t,e).then(function(n){return n[r].apply(n,i)})}}function j(n,t,e,i,u,f){var c={html:{}},a={},s=e[n]=e[n]||{},l=function v(n,t,e){n.In||(n.In=function(n,t,e,r){return n.addEventListener(t,e,r)},n.Bn=function(n,t,e,r){return n.removeEventListener(t,e,r)});var r=new WeakMap,i={qn:e,Un:!1,vn:function(n){return n.nodeType},nn:function(n){return e.createElement(n)},X:function(n,t){return e.createElementNS(n,t)},V:function(n){return e.createTextNode(n)},en:function(n){return e.createComment(n)},un:function(n,t,e){return n.insertBefore(t,e)},on:function(n){return n.remove()},tn:function(n,t){return n.appendChild(t)},in:function(n){return n.childNodes},fn:function(n){return n.parentNode},ln:function(n){return n.nextSibling},yn:function(n){return n.previousSibling},cn:function(n){return S(n.nodeName)},mn:function(n){return n.textContent},sn:function(n,t){return n.textContent=t},dn:function(n,t){return n.getAttribute(t)},S:function(n,t,e){return n.setAttribute(t,e)},zn:function(n,t,e,r){return n.setAttributeNS(t,e,r)},Y:function(n,t){return n.removeAttribute(t)},Q:function(n,t){return n.hasAttribute(t)},Cn:function(t){return t.getAttribute("mode")||(n.Context||{}).mode},Qn:function(n,r){return"child"===r?n.firstElementChild:"parent"===r?i.an(n):"body"===r?e.body:"document"===r?e:"window"===r?t:n},Z:function(t,e,o,u,f,c,a,s){var l=e,v=t,d=r.get(t);if(d&&d[l]&&d[l](),"string"==typeof c?v=i.Qn(t,c):"object"==typeof c?v=c:(s=e.split(":")).length>1&&(v=i.Qn(t,s[0]),e=s[1]),v){var p=o;(s=e.split(".")).length>1&&(e=s[0],p=function(n){n.keyCode===T[s[1]]&&o(n)}),a=i.Un?{capture:!!u,passive:!!f}:!!u,n.In(v,e,p,a),d||r.set(t,d={}),d[l]=function(){v&&n.Bn(v,e,p,a),d[l]=null}}},G:function(n,t){var e=r.get(n);e&&(t?e[t]&&e[t]():Object.keys(e).forEach(function(n){e[n]&&e[n]()}))},Tn:function(n,t){return n.attachShadow(t)}};i.C=!!i.qn.documentElement.attachShadow,t.location.search.indexOf("shadow=false")>0&&(i.C=!1),"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(n,t,r){return(r=e.createEvent("CustomEvent")).initCustomEvent(n,t.bubbles,t.cancelable,t.detail),r},t.CustomEvent.prototype=t.Event.prototype),i.Yn=function(n,e,r){return n&&n.dispatchEvent(new t.CustomEvent(e,r))};try{t.addEventListener("e",null,Object.defineProperty({},"passive",{get:function(){return i.Un=!0}}))}catch(n){}return i.an=function(n,t){return(t=i.fn(n))&&11===i.vn(t)?t.host:t},i}(s,e,i);t.isServer=t.isPrerender=!(t.isClient=!0),t.window=e,t.location=e.location,t.document=i,t.resourcesUrl=t.publicPath=u,t.enableListener=function(n,t,e,r,i){return function o(n,t,e,r,i,u){if(t){var f=n.w.get(t),c=n.j(f);if(c&&c.kn)if(r){var a=c.kn.find(function(n){return n.n===e});a&&n.T.Z(f,e,function(n){return t[a.t](n)},a.i,void 0===u?a.r:!!u,i)}else n.T.G(f,e)}}(h,n,t,e,r,i)},t.emit=function(n,e,r){return l.Yn(n,t.eventNameFn?t.eventNameFn(e):e,r)},s.h=r,s.Context=t;var d=e["s-defined"]=e.$definedCmps=e["s-defined"]||e.$definedCmps||{},p=0,h={T:l,Zn:function m(n,t){if(!e.customElements.get(n.W)){g(h,c[n.W]=n,t.prototype,f);var r=t.observedAttributes=[];for(var i in n.N)n.N[i].U&&r.push(n.N[i].U);e.customElements.define(n.W,t)}},k:t.emit,j:function(n){return c[l.cn(n)]},H:function(n){return t[n]},isClient:!0,Wn:function(n){return!(!d[l.cn(n)]&&!h.j(n))},Nn:function(){return n+p++},O:function(n,t,e){},I:function(n){return function t(n,e,r){return{create:M(n,e,r,"create"),componentOnReady:M(n,e,r,"componentOnReady")}}(l,a,n)},queue:t.queue=function w(n,t){function e(n){for(var t=0;t<n.length;t++)try{n[t]()}catch(n){}n.length=0}function r(n,t){for(var e=0;e<n.length&&o()<t;)try{n[e++]()}catch(n){}e===n.length?n.length=0:0!==e&&n.splice(0,e)}function i(){l++,e(c);var t=o()+7*Math.ceil(l*(1/22));r(a,t),r(s,t),a.length>0&&(s.push.apply(s,a),a.length=0),(v=c.length+a.length+s.length>0)?n.raf(i):l=0}var o=function(){return t.performance.now()},u=Promise.resolve(),f=[],c=[],a=[],s=[],l=0,v=!1;return n.raf||(n.raf=t.requestAnimationFrame.bind(t)),{tick:function(n){f.push(n),1===f.length&&u.then(function(){return e(f)})},read:function(t){c.push(t),v||(v=!0,n.raf(i))},write:function(t){a.push(t),v||(v=!0,n.raf(i))}}}(s,e),Rn:function j(n,t,e){if(n.M)o(h,t);else{var r={mode:t.mode,scoped:2===n.encapsulation||1===n.encapsulation&&!l.C};n.On(r).then(function(e){try{n.M=e,function r(n,t,e,i,o){if(i){var u=t.W+(o||O);t[u]||(t[u]=i)}}(0,n,n.encapsulation,e.style,e.styleMode)}catch(t){n.M=function i(){}}o(h,t)})}},o:new WeakMap,Gn:new WeakMap,xn:new WeakMap,Sn:new WeakMap,Ln:new WeakMap,w:new WeakMap,P:new WeakMap,b:new WeakMap,m:new WeakMap,p:new WeakMap,Fn:new WeakMap,A:new WeakMap,L:new WeakMap,g:new WeakMap};h.render=y(h,l);var k=l.qn.documentElement;return k["s-ld"]=[],k["s-rn"]=!0,k["s-init"]=function(){h.Ln.set(k,s.loaded=h.y=!0),l.Yn(e,"appload",{detail:{namespace:n}})},h._=function(n,t,e,r){(function i(n,t,e,r){var i=e.encapsulation;(2===i||1===i&&!n.T.C)&&(r["s-sc"]=function o(n,t){var e="data-"+n.W;return t&&t!==O?e+"-"+t:e}(e,r.mode));var u=e.W+r.mode,f=e[u];if(f||(f=e[u=e.W+O]),f){var c=t.qn.head;if(t.C)if(1===i)c=r.shadowRoot;else for(var a=r;a=t.fn(a);)if(a.host&&a.host.shadowRoot){c=a.host.shadowRoot;break}var s=n.Gn.get(c);if(s||n.Gn.set(c,s={}),!s[u]){var l=void 0;if(n.R?l=n.R.Jn(r,u,f):((l=t.nn("style")).innerHTML=f,s[u]=!0),l){t.S(l,"data-style-tag",e.W),r.mode&&t.S(l,"data-style-mode",e.W),r["s-sc"]&&t.S(l,"data-style-scoped","true");var v=c.querySelectorAll("[data-styles]");t.un(c,l,v.length&&v[v.length-1].nextSibling||c.firstChild)}}}})(n,t,e,r)},function A(n,t,e,r){var i=e.Kn=e.Kn||{};return i.Vn=i.Vn||[],i.Vn.push(function o(n,t,e){return{namespace:t,Xn:function(n){return n&&n.tagName?Promise.all([b(e,n.tagName),function t(n,e){return Promise.resolve(n.b.get(e))}(e,n)]).then(function(n){return n[0]&&n[1]?{nt:n[0],tt:n[1]}:null}):Promise.resolve(null)},et:function(n){return b(e,n)},rt:function(){return Promise.all(n.components.map(function(n){return b(e,n[0])})).then(function(n){return n.filter(function(n){return n})})}}}(n,t,r)),i.Xn||(i.Xn=function(n){return Promise.all(i.Vn.map(function(t){return t.Xn(n)})).then(function(n){return n.find(function(n){return!!n})})}),i.rt||(i.rt=function(){var n=[];return i.Vn.forEach(function(t){n.push(t.rt())}),Promise.all(n).then(function(n){var t=[];return n.forEach(function(n){n.forEach(function(n){t.push(n)})}),t})}),i}(s,n,e,h),function $(n,t,e,r,i,o){if(t.componentOnReady=function(t,e){if(!t.nodeName.includes("-"))return e(null),!1;var r=n.j(t);if(r)if(n.Ln.has(t))e(t);else{var i=n.Fn.get(t)||[];i.push(e),n.Fn.set(t,i)}return!!r},i){for(o=i.length-1;o>=0;o--)t.componentOnReady(i[o][0],i[o][1])&&i.splice(o,1);for(o=0;o<r.length;o++)if(!e[r[o]].componentOnReady)return;for(o=0;o<i.length;o++)i[o][1](null);i.length=0}}(h,s,e,e["s-apps"],e["s-cr"]),s.initialized=!0,h}function k(t,e,r){void 0===r&&(r={}),e=Array.isArray(e)?e:[e];var i=t.document,o=r.hydratedCssClass||"hydrated",u=e.filter(function(n){return n[2]}).map(function(n){return n[0]});if(u.length){var f=i.createElement("style");f.innerHTML=u.join()+"{visibility:hidden}."+o+"{visibility:inherit}",f.setAttribute("data-styles",""),i.head.insertBefore(f,i.head.firstChild)}var c=r.namespace||"HtComponents";I||(I=!0,function a(n,t,e){(n["s-apps"]=n["s-apps"]||[]).push(t),e.componentOnReady||(e.componentOnReady=function t(){function e(t){if(r.nodeName.indexOf("-")>0){for(var e=n["s-apps"],i=0,o=0;o<e.length;o++)if(n[e[o]].componentOnReady){if(n[e[o]].componentOnReady(r,t))return;i++}if(i<e.length)return void(n["s-cr"]=n["s-cr"]||[]).push([r,t])}t(null)}var r=this;return n.Promise?new n.Promise(e):{then:e}})}(t,c,t.HTMLElement.prototype)),applyPolyfills(t,function(){if(!q[c]){var u={},f=r.resourcesUrl||"./";A(c,u,t,i,f,o),q[c]=j(c,u,t,i,f,o)}e.forEach(function(e){var r;!function i(n){return/\{\s*\[native code\]\s*\}/.test(""+n)}(t.customElements.define)?(r=function(n){return t.HTMLElement.call(this,n)}).prototype=Object.create(t.HTMLElement.prototype,{constructor:{value:r,configurable:!0}}):r=new Function("w","return class extends w.HTMLElement{}")(t),q[c].Zn(function o(t,e,r){var i={W:t[0],N:{color:{U:"color"}}};i.On=t[1];var o=t[3];if(o)for(e=0;e<o.length;e++)r=o[e],i.N[r[0]]={Hn:r[1],B:!!r[2],U:"string"==typeof r[3]?r[3]:r[3]?r[0]:0,z:r[4]};return i.encapsulation=t[4],t[5]&&(i.kn=t[5].map(n)),i}(e),r)})})}this&&this.it||(Object.setPrototypeOf||Array);var A=function(){};function applyPolyfills(n,t){n.ot=function(){function t(){var n=setTimeout;return function(){return n(e,1)}}function e(){for(var n=0;n<b;n+=2)(0,P[n])(P[n+1]),P[n]=void 0,P[n+1]=void 0;b=0}function r(n,t){var e=this,r=new this.constructor(o);void 0===r[T]&&h(r);var i=e.ut;if(i){var u=arguments[i-1];M(function(){return p(i,r,u,e.ft)})}else v(e,r,n,t);return r}function i(n){if(n&&"object"==typeof n&&n.constructor===this)return n;var t=new this(o);return c(t,n),t}function o(){}function u(n){try{return n.then}catch(n){return N.error=n,N}}function f(n,t,e){t.constructor===n.constructor&&e===r&&t.constructor.resolve===i?function(n,t){t.ut===S?s(n,t.ft):t.ut===x?l(n,t.ft):v(t,void 0,function(t){return c(n,t)},function(t){return l(n,t)})}(n,t):e===N?(l(n,N.error),N.error=null):void 0===e?s(n,t):"function"==typeof e?function(n,t,e){M(function(n){var r=!1,i=function(n,t,e,r){try{n.call(t,e,r)}catch(n){return n}}(e,t,function(e){r||(r=!0,t!==e?c(n,e):s(n,e))},function(t){r||(r=!0,l(n,t))},n.ct);!r&&i&&(r=!0,l(n,i))},n)}(n,t,e):s(n,t)}function c(n,t){if(n===t)l(n,new TypeError("cannot resolve promise w/ itself"));else{var e=typeof t;null===t||"object"!==e&&"function"!==e?s(n,t):f(n,t,u(t))}}function a(n){n.at&&n.at(n.ft),d(n)}function s(n,t){n.ut===_&&(n.ft=t,n.ut=S,0!==n.st.length&&M(d,n))}function l(n,t){n.ut===_&&(n.ut=x,n.ft=t,M(a,n))}function v(n,t,e,r){var i=n.st,o=i.length;n.at=null,i[o]=t,i[o+S]=e,i[o+x]=r,0===o&&n.ut&&M(d,n)}function d(n){var t=n.st,e=n.ut;if(0!==t.length){for(var r,i,o=n.ft,u=0;u<t.length;u+=3)r=t[u],i=t[u+e],r?p(e,r,i,o):i(o);n.st.length=0}}function p(n,t,e,r){var i="function"==typeof e,o=void 0,u=void 0,f=void 0,a=void 0;if(i){try{o=e(r)}catch(n){N.error=n,o=N}if(o===N?(a=!0,u=o.error,o.error=null):f=!0,t===o)return void l(t,new TypeError("Cannot return same promise"))}else o=r,f=!0;t.ut===_&&(i&&f?c(t,o):a?l(t,u):n===S?s(t,o):n===x&&l(t,o))}function h(n){n[T]=W++,n.ut=void 0,n.ft=void 0,n.st=[]}var y,m=Array.isArray?Array.isArray:function(n){return"[object Array]"===Object.prototype.toString.call(n)},b=0,w=void 0,g=void 0,M=function(n,t){P[b]=n,P[b+1]=t,2===(b+=2)&&(g?g(e):C())},j=(y=void 0!==n?n:void 0)||{},k=j.lt||j.vt;j="undefined"==typeof self;var A,$,E,O="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,P=Array(1e3),C=void 0;C=k?(A=0,$=new k(e),E=document.createTextNode(""),$.observe(E,{characterData:!0}),function(){E.data=A=++A%2}):O?function(){var n=new MessageChannel;return n.dt.onmessage=e,function(){return n.pt.postMessage(0)}}():void 0===y&&"function"==typeof require?function(){try{var n=Function("return this")().ht("vertx");return void 0!==(w=n.yt||n.mt)?function(){w(e)}:t()}catch(n){return t()}}():t();var T=Math.random().toString(36).substring(2),_=void 0,S=1,x=2,N={error:null},W=0,L=function(){function n(n,t){this.bt=n,this.wt=new n(o),this.wt[T]||h(this.wt),m(t)?(this.gt=this.length=t.length,this.ft=Array(this.length),0===this.length?s(this.wt,this.ft):(this.length=this.length||0,this.Mt(t),0===this.gt&&s(this.wt,this.ft))):l(this.wt,Error("Array Methods must be provided an Array"))}return n.prototype.Mt=function(n){for(var t=0;this.ut===_&&t<n.length;t++)this.jt(n[t],t)},n.prototype.jt=function(n,t){var e=this.bt,c=e.resolve;c===i?(c=u(n))===r&&n.ut!==_?this.kt(n.ut,t,n.ft):"function"!=typeof c?(this.gt--,this.ft[t]=n):e===R?(f(e=new e(o),n,c),this.At(e,t)):this.At(new e(function(t){return t(n)}),t):this.At(c(n),t)},n.prototype.kt=function(n,t,e){var r=this.wt;r.ut===_&&(this.gt--,n===x?l(r,e):this.ft[t]=e),0===this.gt&&s(r,this.ft)},n.prototype.At=function(n,t){var e=this;v(n,void 0,function(n){return e.kt(S,t,n)},function(n){return e.kt(x,t,n)})},n}(),R=function(){function n(t){if(this[T]=W++,this.ft=this.ut=void 0,this.st=[],o!==t){if("function"!=typeof t)throw new TypeError("Must pass a resolver fn as 1st arg");if(!(this instanceof n))throw new TypeError("Failed to construct 'Promise': Use the 'new' operator.");!function(n,t){try{t(function(t){c(n,t)},function(t){l(n,t)})}catch(t){l(n,t)}}(this,t)}}return n.prototype.catch=function(n){return this.then(null,n)},n.prototype.$t=function(n){var t=this.constructor;return this.then(function(e){return t.resolve(n()).then(function(){return e})},function(e){return t.resolve(n()).then(function(){throw e})})},n}();return R.prototype.then=r,R.all=function(n){return new L(this,n).wt},R.race=function(n){var t=this;return m(n)?new t(function(e,r){for(var i=n.length,o=0;o<i;o++)t.resolve(n[o]).then(e,r)}):new t(function(n,t){return t(new TypeError("Must pass array to race"))})},R.resolve=i,R.reject=function(n){var t=new this(o);return l(t,n),t},R.Et=function(n){g=n},R.Ot=function(n){M=n},R.Pt=M,R.Ct=function(){var n=void 0;if("undefined"!=typeof global)n=global;else if("undefined"!=typeof self)n=self;else try{n=Function("return this")()}catch(n){throw Error("polyfill failed")}var t=n.Promise;if(t){var e=null;try{e=Object.prototype.toString.call(t.resolve())}catch(n){}if("[object Promise]"===e&&!t.Tt)return}n.Promise=R},R.Promise=R,R.Ct(),R}();var e=[];n.customElements&&(!n.Element||n.Element.prototype.closest&&n.Element.prototype.matches&&n.Element.prototype.remove)||e.push(import("./polyfills/dom.js")),"function"==typeof Object.assign&&Object.entries||e.push(import("./polyfills/object.js")),Array.prototype.find&&Array.prototype.includes||e.push(import("./polyfills/array.js")),String.prototype.startsWith&&String.prototype.endsWith||e.push(import("./polyfills/string.js")),n.fetch||e.push(import("./polyfills/fetch.js")),Promise.all(e).then(function(e){e.forEach(function(t){t.applyPolyfill(n,n.document)}),t()})};var $="data-ssrv",E="data-ssrc",O="$",P={},C=[],T={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},_=function(n){return null!=n},S=function(n){return n.toLowerCase()},x=function(n){return S(n).split("-").map(function(n){return n.charAt(0).toUpperCase()+n.slice(1)}).join("")},N=function(){},W=[],L={getAttributes:function(n){return n.a},replaceAttributes:function(n,t){return n.a=t}},R="wc-",D={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},F="http://www.w3.org/1999/xlink",H=!1,q={},I=!1;export{k as defineCustomElement,r as h};