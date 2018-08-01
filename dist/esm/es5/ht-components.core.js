/*!
 * HtComponents: Core, ES5
 * Built with http://stenciljs.com
 */
function n(n,t){return"sc-"+n.n+(t&&t!==x?"-"+t:"")}function t(n,t){return n+(t?"-h":"-s")}function e(n){return{t:n[0],e:n[1],r:!!n[2],i:!!n[3],o:!!n[4]}}function r(n,t){if(W(t)&&"object"!=typeof t&&"function"!=typeof t){if(n===Boolean||3===n)return"false"!==t&&(""===t||!!t);if(n===Number||4===n)return parseFloat(t);if(n===String||2===n)return t.toString()}return t}function i(n,t,e,r){var i=n.u.get(t);i&&((r=i["s-ld"]||i.$activeLoading)&&((e=r.indexOf(t))>-1&&r.splice(e,1),r.length||(i["s-init"]&&i["s-init"](),i.$initLoad&&i.$initLoad())),n.u.delete(t))}function o(n,t){for(var e,r,i=null,o=!1,u=!1,f=arguments.length;f-- >2;)F.push(arguments[f]);for(;F.length>0;){var c=F.pop();if(c&&void 0!==c.pop)for(f=c.length;f--;)F.push(c[f]);else"boolean"==typeof c&&(c=null),(u="function"!=typeof n)&&(null==c?c="":"number"==typeof c?c=String(c):"string"!=typeof c&&(u=!1)),u&&o?i[i.length-1].vtext+=c:null===i?i=[u?{vtext:c}:c]:i.push(u?{vtext:c}:c),o=u}if(null!=t){if(t.className&&(t.class=t.className),"object"==typeof t.class){for(f in t.class)t.class[f]&&F.push(f);t.class=F.join(" "),F.length=0}null!=t.key&&(e=t.key),null!=t.name&&(r=t.name)}return"function"==typeof n?n(Object.assign({},t,{children:i}),H):{vtag:n,vchildren:i,vtext:void 0,vattrs:t,vkey:e,vname:r,f:void 0,c:!1}}function u(n){return{vtag:n.vtag,vchildren:n.vchildren,vtext:n.vtext,vattrs:n.vattrs,vkey:n.vkey,vname:n.vname}}function f(n,t,e,r){t.split(" ").forEach(function(t){n[t]=!0,e&&(n[t+"-"+e]=!0,r&&(n[t+"-"+e+"-"+r]=n[t+"-"+r]=!0))})}function c(n,t){n.a.has(t)||(n.a.set(t,!0),n.s?n.queue.write(function(){return a(n,t)}):n.queue.tick(function(){return a(n,t)}))}function a(n,t,e,r,i,o){if(n.a.delete(t),!n.l.has(t)){if(r=n.v.get(t),e=!r){if((i=n.u.get(t))&&i.$rendered&&(i["s-rn"]=!0),i&&!i["s-rn"])return(i["s-rc"]=i["s-rc"]||[]).push(function(){a(n,t)}),void(i.$onRender=i["s-rc"]);r=function u(n,t,e,r,i,o,f){try{r=new(i=n.d(t).p),function c(n,t,e,r,i,o,u){for(u in n.y.set(r,e),n.m.has(e)||n.m.set(e,{}),(o=Object.assign({color:{type:String}},t.properties)).mode={type:String},o)l(n,o[u],e,r,u,i)}(n,i,t,r,e),function a(n,t,e){if(t){var r=n.y.get(e);t.forEach(function(t){e[t.method]={emit:function(e){n.b(r,t.name,{bubbles:t.bubbles,composed:t.composed,cancelable:t.cancelable,detail:e})}}})}}(n,i.events,r);try{if(o=n.w.get(t)){for(f=0;f<o.length;f+=2)r[o[f]](o[f+1]);n.w.delete(t)}}catch(e){n.g(e,2,t)}}catch(e){r={},n.g(e,7,t,!0)}return n.v.set(t,r),r}(n,t,n.M.get(t));try{r.componentWillLoad&&(o=r.componentWillLoad())}catch(e){n.g(e,3,t)}}else try{r.componentWillUpdate&&(o=r.componentWillUpdate())}catch(e){n.g(e,5,t)}o&&o.then?o.then(function(){return s(n,t,r,e)}):s(n,t,r,e)}}function s(n,e,r,i){(function u(n,e,r,i){try{var u,c,a=e.p.host,s=e.p.encapsulation,l="shadow"===s&&n.k.j;if(u=function v(n,t,e){return n&&Object.keys(n).forEach(function(r){n[r].reflectToAttr&&((e=e||{})[r]=t[r])}),e}(e.p.properties,i),c=l?r.shadowRoot:r,!r["s-rn"]){n.A(n,n.k,e,r);var p=r["s-sc"];p&&(n.k.O(r,t(p,!0)),i.render||n.k.O(r,t(p)))}if(i.render||i.hostData||a||u){n.C=!0;var d=i.render&&i.render(),h=void 0;if((h=i.hostData&&i.hostData())&&e.P){var y=Object.keys(h).reduce(function(n,t){return e.P[t]?n.concat(t):e.P[L(t)]?n.concat(L(t)):n},[]);if(y.length>0)throw new Error("The following keys were attempted to be set with hostData() from the "+e.n+" component: "+y.join(", ")+". If you would like to modify these please set @Prop({ mutable: true, reflectToAttr: true}) on the @Prop() decorator.")}u&&(h=h?Object.assign(h,u):u),n.C=!1,a&&(h=function m(n,t,e){return n=n||{},Object.keys(t).forEach(function(r){"theme"===r?f(n.class=n.class||{},t[r],e.mode,e.color):"class"===r?f(n[r]=n[r]||{},t[r]):n[r]=t[r]}),n}(h,a,i));var b=n.T.get(r)||{};b.f=c;var w=o(null,h,d);w.c=!0,n.T.set(r,n.render(r,b,w,l,s))}n._&&n._.x(r),r["s-rn"]=!0,r.$onRender&&(r["s-rc"]=r.$onRender),r["s-rc"]&&(r["s-rc"].forEach(function(n){return n()}),r["s-rc"]=null)}catch(t){n.C=!1,n.g(t,8,r,!0)}})(n,n.d(e),e,r);try{i?e["s-init"]():(r.componentDidUpdate&&r.componentDidUpdate(),M(n.T.get(e))),e["s-hmr-load"]&&e["s-hmr-load"]()}catch(t){n.g(t,6,e,!0)}}function l(n,t,e,i,o,u,f,c){if(t.type||t.state){var a=n.m.get(e);t.state||(!t.attr||void 0!==a[o]&&""!==a[o]||(f=u&&u.N)&&W(c=f[t.attr])&&(a[o]=r(t.type,c)),e.hasOwnProperty(o)&&(void 0===a[o]&&(a[o]=r(t.type,e[o])),"mode"!==o&&delete e[o])),i.hasOwnProperty(o)&&void 0===a[o]&&(a[o]=i[o]),t.watchCallbacks&&(a[q+o]=t.watchCallbacks.slice()),d(i,o,function s(t){return(t=n.m.get(n.y.get(this)))&&t[o]},function l(e,r){(r=n.y.get(this))&&(t.state||t.mutable)&&v(n,r,o,e)})}else if(t.elementRef)p(i,o,e);else if(t.method)p(e,o,i[o].bind(i));else if(t.context){var h=n.S(t.context);void 0!==h&&p(i,o,h.W&&h.W(e)||h)}else t.connect&&p(i,o,n.D(t.connect))}function v(n,t,e,r,i,o,u){(i=n.m.get(t))||n.m.set(t,i={});var f=i[e];if(r!==f&&(i[e]=r,o=n.v.get(t))){if(u=i[q+e])for(var a=0;a<u.length;a++)try{o[u[a]].call(o,r,f,e)}catch(n){}!n.C&&t["s-rn"]&&c(n,t)}}function p(n,t,e){Object.defineProperty(n,t,{configurable:!0,value:e})}function d(n,t,e,r){Object.defineProperty(n,t,{configurable:!0,get:e,set:r})}function h(n,t,e,r){void 0===r&&(r="boolean"==typeof e);var i=t!==(t=t.replace(/^xlink\:?/,""));null==e||r&&(!e||"false"===e)?i?n.removeAttributeNS(I,D(t)):n.removeAttribute(t):"function"!=typeof e&&(e=r?"":e.toString(),i?n.setAttributeNS(I,D(t),e):n.setAttribute(t,e))}function y(n,t,e,r,i,o,u){if("class"!==e||o)if("style"===e){for(var f in r)i&&null!=i[f]||(/-/.test(f)?t.style.L(f):t.style[f]="");for(var f in i)r&&i[f]===r[f]||(/-/.test(f)?t.style.setProperty(f,i[f]):t.style[f]=i[f])}else if("o"!==e[0]||"n"!==e[1]||!/[A-Z]/.test(e[2])||e in t)if("list"!==e&&"type"!==e&&!o&&(e in t||-1!==["object","function"].indexOf(typeof i)&&null!==i)){var c=n.d(t);c&&c.P&&c.P[e]?(b(t,e,i),u&&c.P[e].R&&h(t,c.P[e].F,i,3===c.P[e].H)):"ref"!==e&&(b(t,e,null==i?"":i),null!=i&&!1!==i||n.k.q(t,e))}else null!=i&&"key"!==e?h(t,e,i):(o||n.k.I(t,e)&&(null==i||!1===i))&&n.k.q(t,e);else e=D(e)in t?D(e.substring(2)):D(e[2])+e.substring(3),i?i!==r&&n.k.B(t,e,i):n.k.U(t,e);else if(r!==i){var a=m(r),s=m(i),l=a.filter(function(n){return!s.includes(n)}),v=m(t.className).filter(function(n){return!l.includes(n)}),p=s.filter(function(n){return!a.includes(n)&&!v.includes(n)});v.push.apply(v,p),t.className=v.join(" ")}}function m(n){return null==n||""===n?[]:n.trim().split(/\s+/)}function b(n,t,e){try{n[t]=e}catch(n){}}function w(n,t,e,r,i){var o=11===e.f.nodeType&&e.f.host?e.f.host:e.f,u=t&&t.vattrs||N,f=e.vattrs||N;for(i in u)f&&null!=f[i]||null==u[i]||y(n,o,i,u[i],void 0,r,e.c);for(i in f)i in u&&f[i]===("value"===i||"checked"===i?o[i]:u[i])||y(n,o,i,u[i],f[i],r,e.c)}function g(n,t){function e(i,o,u,f,c,v,y,m,b){if(m=o.vchildren[u],a||(p=!0,"slot"===m.vtag&&(l&&t.O(f,l+"-s"),m.vchildren?m.Q=!0:m.Y=!0)),W(m.vtext))m.f=t.Z(m.vtext);else if(m.Y)m.f=t.Z("");else{if(v=m.f=B||"svg"===m.vtag?t.z("http://www.w3.org/2000/svg",m.vtag):t.G(m.Q?"slot-fb":m.vtag),B="svg"===m.vtag||"foreignObject"!==m.vtag&&B,w(n,null,m,B),W(l)&&v["s-si"]!==l&&t.O(v,v["s-si"]=l),W(s)&&t.J(v,_,s+"."+u+(function n(t){if(t)for(var e=0;e<t.length;e++)if("slot"!==t[e].vtag||n(t[e].vchildren))return!0;return!1}(m.vchildren)?"":".")),m.vchildren)for(c=0;c<m.vchildren.length;++c)(y=e(i,m,c,v))&&(W(s)&&3===y.nodeType&&!y["s-cr"]&&t.K(v,t.V("s."+s+"."+c)),t.K(v,y),W(s)&&3===y.nodeType&&!y["s-cr"]&&(t.K(v,t.V("/")),t.K(v,t.Z(" "))));"svg"===m.vtag&&(B=!1)}return m.f["s-hn"]=d,(m.Q||m.Y)&&(m.f["s-sr"]=!0,m.f["s-cr"]=h,m.f["s-sn"]=m.vname||"",(b=i&&i.vchildren&&i.vchildren[u])&&b.vtag===m.vtag&&i.f&&r(i.f)),m.f}function r(e,i,o,u){n.X=!0;var a=t.nn(e);for(o=a.length-1;o>=0;o--)(u=a[o])["s-hn"]!==d&&u["s-ol"]&&(t.tn(u),t.en(c(u),u,f(u)),t.tn(u["s-ol"]),u["s-ol"]=null,p=!0),i&&r(u,i);n.X=!1}function i(n,r,i,o,u,c,a,s){var l=n["s-cr"]||n.$defaultHolder;for((a=l&&t.rn(l)||n).shadowRoot&&t.in(a)===d&&(a=a.shadowRoot);u<=c;++u)o[u]&&(s=W(o[u].vtext)?t.Z(o[u].vtext):e(null,i,u,n))&&(o[u].f=s,t.en(a,s,f(r)))}function o(n,e,i,o){for(;e<=i;++e)W(n[e])&&(o=n[e].f,v=!0,o["s-ol"]?t.tn(o["s-ol"]):r(o,!0),t.tn(o))}function u(n,t){return n.vtag===t.vtag&&n.vkey===t.vkey&&("slot"!==n.vtag||n.vname===t.vname)}function f(n){return n&&n["s-ol"]?n["s-ol"]:n}function c(n){return t.rn(n["s-ol"]?n["s-ol"]:n)}var a,s,l,v,p,d,h,y=[];return function m(b,g,M,j,k,$,A,E,O,C,P,_){if(d=t.in(b),h=b["s-cr"],a=j,s="shadow"!==k?$:null,l=b["s-sc"],p=v=!1,function a(s,l,v){var p=l.f=s.f,d=s.vchildren,h=l.vchildren;B=l.f&&W(t.on(l.f))&&void 0!==l.f.ownerSVGElement,B="svg"===l.vtag||"foreignObject"!==l.vtag&&B,W(l.vtext)?(v=p["s-cr"]||p.$defaultHolder)?t.un(t.rn(v),l.vtext):s.vtext!==l.vtext&&t.un(p,l.vtext):("slot"!==l.vtag&&w(n,s,l,B),W(d)&&W(h)?function y(n,s,l,v,p,d,h,m){for(var b=0,w=0,g=s.length-1,M=s[0],j=s[g],k=v.length-1,$=v[0],A=v[k];b<=g&&w<=k;)if(null==M)M=s[++b];else if(null==j)j=s[--g];else if(null==$)$=v[++w];else if(null==A)A=v[--k];else if(u(M,$))a(M,$),M=s[++b],$=v[++w];else if(u(j,A))a(j,A),j=s[--g],A=v[--k];else if(u(M,A))"slot"!==M.vtag&&"slot"!==A.vtag||r(t.rn(M.f)),a(M,A),t.en(n,M.f,t.fn(j.f)),M=s[++b],A=v[--k];else if(u(j,$))"slot"!==M.vtag&&"slot"!==A.vtag||r(t.rn(j.f)),a(j,$),t.en(n,j.f,M.f),j=s[--g],$=v[++w];else{for(p=null,d=b;d<=g;++d)if(s[d]&&W(s[d].vkey)&&s[d].vkey===$.vkey){p=d;break}W(p)?((m=s[p]).vtag!==$.vtag?h=e(s&&s[w],l,p,n):(a(m,$),s[p]=void 0,h=m.f),$=v[++w]):(h=e(s&&s[w],l,w,n),$=v[++w]),h&&t.en(c(M.f),h,f(M.f))}b>g?i(n,null==v[k+1]?null:v[k+1].f,l,v,w,k):w>k&&o(s,b,g)}(p,d,l,h):W(h)?(W(s.vtext)&&t.un(p,""),i(p,null,l,h,0,h.length-1)):W(d)&&o(d,0,d.length-1)),B&&"svg"===l.vtag&&(B=!1)}(g,M),W(s)&&t.J(g.f,T,s),p){for(function n(e,r,i,o,u,f,c,a,s,l){for(u=0,f=(r=t.nn(e)).length;u<f;u++){if((i=r[u])["s-sr"]&&(o=i["s-cr"]))for(a=t.nn(t.rn(o)),s=i["s-sn"],c=a.length-1;c>=0;c--)(o=a[c])["s-cn"]||o["s-nr"]||o["s-hn"]===i["s-hn"]||((3===(l=t.cn(o))||8===l)&&""===s||1===l&&null===t.an(o,"slot")&&""===s||1===l&&t.an(o,"slot")===s)&&(y.some(function(n){return n.sn===o})||(v=!0,o["s-sn"]=s,y.push({ln:i,sn:o})));1===t.cn(i)&&n(i)}}(M.f),A=0;A<y.length;A++)(E=y[A]).sn["s-ol"]||((O=t.Z(""))["s-nr"]=E.sn,t.en(t.rn(E.sn),E.sn["s-ol"]=O,E.sn));for(n.X=!0,A=0;A<y.length;A++){for(E=y[A],P=t.rn(E.ln),_=t.fn(E.ln),O=E.sn["s-ol"];O=t.vn(O);)if((C=O["s-nr"])&&C&&C["s-sn"]===E.sn["s-sn"]&&P===t.rn(C)&&(C=t.fn(C))&&C&&!C["s-nr"]){_=C;break}(!_&&P!==t.rn(E.sn)||t.fn(E.sn)!==_)&&E.sn!==_&&(t.tn(E.sn),t.en(P,E.sn,_))}n.X=!1}return v&&function n(e,r,i,o,u,f,c,a){for(o=0,u=(i=t.nn(e)).length;o<u;o++)if(r=i[o],1===t.cn(r)){if(r["s-sr"])for(c=r["s-sn"],r.hidden=!1,f=0;f<u;f++)if(i[f]["s-hn"]!==r["s-hn"])if(a=t.cn(i[f]),""!==c){if(1===a&&c===t.an(i[f],"slot")){r.hidden=!0;break}}else if(1===a||3===a&&""!==t.pn(i[f]).trim()){r.hidden=!0;break}n(r)}}(M.f),y.length=0,M}}function M(n,t){n&&(n.vattrs&&n.vattrs.ref&&n.vattrs.ref(t?null:n.f),n.vchildren&&n.vchildren.forEach(function(n){M(n,t)}))}function j(n,t){var e=n.d(t);e.dn&&e.dn.forEach(function(e){e.r||n.k.B(t,e.t,function r(n,t,e,i){return function(r){(i=n.v.get(t))?i[e](r):((i=n.w.get(t)||[]).push(e,r),n.w.set(t,i))}}(n,t,e.e),e.o,e.i)})}function k(n,t){var e={nodeName:t},r=n.d(e);if(!r||!r.p)return Promise.resolve(null);var i=r.p,o=function u(n){return Object.keys(n).reduce(function(t,e){var r,i=n[e],o={name:e};if(i.state)r="states",o.hn=i.watchCallbacks||[];else if(i.elementRef)r="elements";else if(i.method)r="methods";else{r="props";var u="any";i.type&&(u=i.type,"function"==typeof i.type&&(u=i.type.name)),o.type=u.toLowerCase(),o.mutable=i.mutable||!1,o.connect=i.connect||"-",o.context=i.connect||"-",o.hn=i.watchCallbacks||[]}return t[r].push(o),t},{yn:[],mn:[],bn:[],wn:[]})}(i.properties||{}),f=(r.dn||[]).map(function(n){return{gn:n.t,capture:n.o,disabled:n.r,passive:n.i,method:n.e}}),c=i.events||[],a=Object.assign({Mn:i.is,jn:r.kn||"unknown",encapsulation:i.encapsulation||"none"},o,{events:{$n:c,listeners:f}});return Promise.resolve(a)}function $(n,t,e,r,i){return e.mode||(e.mode=n.An(e)),e["s-cr"]||n.an(e,T)||n.j&&1===t.En||(e["s-cr"]=n.Z(""),e["s-cr"]["s-cn"]=!0,n.en(e,e["s-cr"],n.nn(e)[0])),n.j||1!==t.En||"shadowRoot"in HTMLElement.prototype||(e.shadowRoot=e),1===t.En&&n.j&&!e.shadowRoot&&n.On(e,{mode:"open"}),r={Cn:e["s-id"],N:{}},t.P&&Object.keys(t.P).forEach(function(o){(i=t.P[o].F)&&(r.N[i]=n.an(e,i))}),r}function A(n,t,e,o){e.connectedCallback=function(){(function e(n,t,r){n.Pn.has(r)||(n.Pn.set(r,!0),j(n,r)),n.l.delete(r),n.Tn.has(r)||(n.Tn.set(r,!0),r["s-id"]||(r["s-id"]=n._n()),function i(n,t,e){for(e=t;e=n.k.on(e);)if(n.xn(e)){n.Nn.has(t)||(n.u.set(t,e),e.$activeLoading&&(e["s-ld"]=e.$activeLoading),(e["s-ld"]=e["s-ld"]||[]).push(t));break}}(n,r),n.queue.tick(function(){n.M.set(r,$(n.k,t,r)),n.Sn(t,r)}))})(n,t,this)},e.attributeChangedCallback=function(n,e,i){(function o(n,t,e,i,u,f,c){if(n&&i!==u)for(f in n)if((c=n[f]).F&&D(c.F)===D(e)){t[f]=r(c.H,u);break}})(t.P,this,n,e,i)},e.disconnectedCallback=function(){(function t(n,e){if(!n.X&&function r(n,t){for(;t;){if(!n.rn(t))return 9!==n.cn(t);t=n.rn(t)}}(n.k,e)){n.l.set(e,!0),i(n,e),M(n.T.get(e),!0),n.k.U(e),n.Pn.delete(e);var o=n.v.get(e);o&&o.componentDidUnload&&o.componentDidUnload(),n._&&n._.Wn(e),[n.u,n.Dn,n.M].forEach(function(n){return n.delete(e)})}})(n,this)},e["s-init"]=function(){(function t(n,e,r,o,u){if(!n.Nn.has(e)&&(o=n.v.get(e))&&!n.l.has(e)&&(!e["s-ld"]||!e["s-ld"].length)){delete e["s-ld"],n.Nn.set(e,!0);try{M(n.T.get(e)),(u=n.Dn.get(e))&&(u.forEach(function(n){return n(e)}),n.Dn.delete(e)),o.componentDidLoad&&o.componentDidLoad()}catch(t){n.g(t,4,e)}n.k.O(e,r),i(n,e)}})(n,this,o)},e["s-hmr"]=function(e){(function r(n,t,e,i){t.p=null,n.Nn.delete(e);var o=n.v.get(e);o&&(n.y.delete(o),n.v.delete(e)),n.k.U(e),n.Pn.delete(e),t.dn=null,e["s-hmr-load"]=function(){delete e["s-hmr-load"],function r(n,t,e){n.Pn.has(e)||(n.Pn.set(e,!0),t.p&&t.p.listeners&&(t.dn=t.p.listeners.map(function(n){return{e:n.method,t:n.name,o:!!n.capture,i:!!n.passive,r:!!n.disabled}}),j(n,e)))}(n,t,e)},n.M.set(e,$(n.k,t,e)),n.Sn(t,e,i)})(n,t,this,e)},e.forceUpdate=function(){c(n,this)},function u(n,t,e){t&&Object.keys(t).forEach(function(i){var o=t[i],u=o.Ln;1===u||2===u?d(e,i,function t(){return(n.m.get(this)||{})[i]},function t(e){v(n,this,i,r(o.H,e))}):6===u&&p(e,i,R)})}(n,t.P,e)}function E(n,t,e,r){return function(){var i=arguments;return function o(n,t,e){var r=t[e],i=n.Rn.body;return i?(r||(r=i.querySelector(e)),r||(r=t[e]=n.G(e),n.K(i,r)),r.componentOnReady()):Promise.resolve()}(n,t,e).then(function(n){return n[r].apply(n,i)})}}function O(t,e,r,i,u,f){var a={html:{}},s={},l=r[t]=r[t]||{},v=function p(n,t,e){n.Fn||(n.Fn=function(n,t,e,r){return n.addEventListener(t,e,r)},n.Hn=function(n,t,e,r){return n.removeEventListener(t,e,r)});var r=new WeakMap,i={Rn:e,qn:!1,cn:function(n){return n.nodeType},G:function(n){return e.createElement(n)},z:function(n,t){return e.createElementNS(n,t)},Z:function(n){return e.createTextNode(n)},V:function(n){return e.createComment(n)},en:function(n,t,e){return n.insertBefore(t,e)},tn:function(n){return n.remove()},K:function(n,t){return n.appendChild(t)},O:function(n,t){return n.classList.add(t)},nn:function(n){return n.childNodes},rn:function(n){return n.parentNode},fn:function(n){return n.nextSibling},vn:function(n){return n.previousSibling},in:function(n){return D(n.nodeName)},pn:function(n){return n.textContent},un:function(n,t){return n.textContent=t},an:function(n,t){return n.getAttribute(t)},J:function(n,t,e){return n.setAttribute(t,e)},In:function(n,t,e,r){return n.setAttributeNS(t,e,r)},q:function(n,t){return n.removeAttribute(t)},I:function(n,t){return n.hasAttribute(t)},An:function(t){return t.getAttribute("mode")||(n.Context||{}).mode},Bn:function(n,r){return"child"===r?n.firstElementChild:"parent"===r?i.on(n):"body"===r?e.body:"document"===r?e:"window"===r?t:n},B:function(t,e,o,u,f,c,a,s){var l=e,v=t,p=r.get(t);if(p&&p[l]&&p[l](),"string"==typeof c?v=i.Bn(t,c):"object"==typeof c?v=c:(s=e.split(":")).length>1&&(v=i.Bn(t,s[0]),e=s[1]),v){var d=o;(s=e.split(".")).length>1&&(e=s[0],d=function(n){n.keyCode===S[s[1]]&&o(n)}),a=i.qn?{capture:!!u,passive:!!f}:!!u,n.Fn(v,e,d,a),p||r.set(t,p={}),p[l]=function(){v&&n.Hn(v,e,d,a),p[l]=null}}},U:function(n,t){var e=r.get(n);e&&(t?e[t]&&e[t]():Object.keys(e).forEach(function(n){e[n]&&e[n]()}))},On:function(n,t){return n.attachShadow(t)}};i.j=!!i.Rn.documentElement.attachShadow,t.location.search.indexOf("shadow=false")>0&&(i.j=!1),"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(n,t,r){return(r=e.createEvent("CustomEvent")).initCustomEvent(n,t.bubbles,t.cancelable,t.detail),r},t.CustomEvent.prototype=t.Event.prototype),i.Un=function(n,e,r){return n&&n.dispatchEvent(new t.CustomEvent(e,r))};try{t.addEventListener("e",null,Object.defineProperty({},"passive",{get:function(){return i.qn=!0}}))}catch(n){}return i.on=function(n,t){return(t=i.rn(n))&&11===i.cn(t)?t.host:t},i}(l,r,i);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=r,e.location=r.location,e.document=i,e.resourcesUrl=e.publicPath=u,e.enableListener=function(n,t,e,r,i){return function o(n,t,e,r,i,u){if(t){var f=n.y.get(t),c=n.d(f);if(c&&c.dn)if(r){var a=c.dn.find(function(n){return n.t===e});a&&n.k.B(f,e,function(n){return t[a.e](n)},a.o,void 0===u?a.i:!!u,i)}else n.k.U(f,e)}}(y,n,t,e,r,i)},e.emit=function(n,t,r){return v.Un(n,e.eventNameFn?e.eventNameFn(t):t,r)},l.h=o,l.Context=e;var d=r["s-defined"]=r.$definedCmps=r["s-defined"]||r.$definedCmps||{},h=0,y={k:v,Qn:function m(n,t){if(!r.customElements.get(n.n)){A(y,a[n.n]=n,t.prototype,f);var e=t.observedAttributes=[];for(var i in n.P)n.P[i].F&&e.push(n.P[i].F);r.customElements.define(n.n,t)}},b:e.emit,d:function(n){return a[v.in(n)]},S:function(n){return e[n]},isClient:!0,xn:function(n){return!(!d[v.in(n)]&&!y.d(n))},_n:function(){return t+h++},g:function(n,t,e){},D:function(n){return function t(n,e,r){return{create:E(n,e,r,"create"),componentOnReady:E(n,e,r,"componentOnReady")}}(v,s,n)},queue:e.queue=function b(n,t){function e(n){for(var t=0;t<n.length;t++)try{n[t](o())}catch(n){}n.length=0}function r(n,t){for(var e,r=0;r<n.length&&(e=o())<t;)try{n[r++](e)}catch(n){}r===n.length?n.length=0:0!==r&&n.splice(0,r)}function i(){l++,e(c);var t=o()+7*Math.ceil(l*(1/22));r(a,t),r(s,t),a.length>0&&(s.push.apply(s,a),a.length=0),(v=c.length+a.length+s.length>0)?n.raf(i):l=0}var o=function(){return t.performance.now()},u=Promise.resolve(),f=[],c=[],a=[],s=[],l=0,v=!1;return n.raf||(n.raf=t.requestAnimationFrame.bind(t)),{tick:function(n){f.push(n),1===f.length&&u.then(function(){return e(f)})},read:function(t){c.push(t),v||(v=!0,n.raf(i))},write:function(t){a.push(t),v||(v=!0,n.raf(i))}}}(l,r),Sn:function w(n,t,e){if(n.p)c(y,t);else{var r={mode:t.mode,scoped:2===n.En||1===n.En&&!v.j};n.kn(r).then(function(e){try{n.p=e,function r(n,t,e,i,o){if(i){var u=t.n+(o||x);t[u]||(t[u]=i)}}(0,n,n.En,e.style,e.styleMode)}catch(t){n.p=function i(){}}c(y,t)})}},u:new WeakMap,Yn:new WeakMap,Tn:new WeakMap,Pn:new WeakMap,Nn:new WeakMap,y:new WeakMap,M:new WeakMap,v:new WeakMap,l:new WeakMap,a:new WeakMap,Dn:new WeakMap,w:new WeakMap,T:new WeakMap,m:new WeakMap};y.render=g(y,v);var M=v.Rn.documentElement;return M["s-ld"]=[],M["s-rn"]=!0,M["s-init"]=function(){y.Nn.set(M,l.loaded=y.s=!0),v.Un(r,"appload",{detail:{namespace:t}})},y.A=function(t,e,r,i){(function o(t,e,r,i){var o=2===r.En||1===r.En&&!t.k.j,u=r.n+i.mode,f=r[u];if(o&&(i["s-sc"]=n(r,i.mode)),f||(f=r[u=r.n+x],o&&(i["s-sc"]=n(r))),f){var c=e.Rn.head;if(e.j)if(1===r.En)c=i.shadowRoot;else for(var a=i;a=e.rn(a);)if(a.host&&a.host.shadowRoot){c=a.host.shadowRoot;break}var s=t.Yn.get(c);if(s||t.Yn.set(c,s={}),!s[u]){var l=void 0;if(t._?l=t._.Zn(i,u,f):((l=e.G("style")).innerHTML=f,s[u]=!0),l){e.J(l,"data-style-tag",r.n),i.mode&&e.J(l,"data-style-mode",r.n),i["s-sc"]&&e.J(l,"data-style-scoped","true");var v=c.querySelectorAll("[data-styles]");e.en(c,l,v.length&&v[v.length-1].nextSibling||c.firstChild)}}}})(t,e,r,i)},function j(n,t,e,r){var i=e.zn=e.zn||{};return i.Gn=i.Gn||[],i.Gn.push(function o(n,t,e){return{namespace:t,Jn:function(n){return n&&n.tagName?Promise.all([k(e,n.tagName),function t(n,e){return Promise.resolve(n.v.get(e))}(e,n)]).then(function(n){return n[0]&&n[1]?{Kn:n[0],Vn:n[1]}:null}):Promise.resolve(null)},Xn:function(n){return k(e,n)},nt:function(){return Promise.all(n.components.map(function(n){return k(e,n[0])})).then(function(n){return n.filter(function(n){return n})})}}}(n,t,r)),i.Jn||(i.Jn=function(n){return Promise.all(i.Gn.map(function(t){return t.Jn(n)})).then(function(n){return n.find(function(n){return!!n})})}),i.nt||(i.nt=function(){var n=[];return i.Gn.forEach(function(t){n.push(t.nt())}),Promise.all(n).then(function(n){var t=[];return n.forEach(function(n){n.forEach(function(n){t.push(n)})}),t})}),i}(l,t,r,y),function $(n,t,e,r,i,o){if(t.componentOnReady=function(t,e){if(!t.nodeName.includes("-"))return e(null),!1;var r=n.d(t);if(r)if(n.Nn.has(t))e(t);else{var i=n.Dn.get(t)||[];i.push(e),n.Dn.set(t,i)}return!!r},i){for(o=i.length-1;o>=0;o--)t.componentOnReady(i[o][0],i[o][1])&&i.splice(o,1);for(o=0;o<r.length;o++)if(!e[r[o]].componentOnReady)return;for(o=0;o<i.length;o++)i[o][1](null);i.length=0}}(y,l,r,r["s-apps"],r["s-cr"]),l.initialized=!0,y}function C(n,t,r){void 0===r&&(r={}),t=Array.isArray(t)?t:[t];var i=n.document,o=r.hydratedCssClass||"hydrated",u=t.filter(function(n){return n[2]}).map(function(n){return n[0]});if(u.length){var f=i.createElement("style");f.innerHTML=u.join()+"{visibility:hidden}."+o+"{visibility:inherit}",f.setAttribute("data-styles",""),i.head.insertBefore(f,i.head.firstChild)}var c=r.namespace||"HtComponents";Q||(Q=!0,function a(n,t,e){(n["s-apps"]=n["s-apps"]||[]).push(t),e.componentOnReady||(e.componentOnReady=function t(){function e(t){if(r.nodeName.indexOf("-")>0){for(var e=n["s-apps"],i=0,o=0;o<e.length;o++)if(n[e[o]].componentOnReady){if(n[e[o]].componentOnReady(r,t))return;i++}if(i<e.length)return void(n["s-cr"]=n["s-cr"]||[]).push([r,t])}t(null)}var r=this;return n.Promise?new n.Promise(e):{then:e}})}(n,c,n.HTMLElement.prototype)),applyPolyfills(n,function(){if(!U[c]){var u={},f=r.resourcesUrl||"./";P(c,u,n,i,f,o),U[c]=O(c,u,n,i,f,o)}t.forEach(function(t){var r;!function i(n){return/\{\s*\[native code\]\s*\}/.test(""+n)}(n.customElements.define)?(r=function(t){return n.HTMLElement.call(this,t)}).prototype=Object.create(n.HTMLElement.prototype,{constructor:{value:r,configurable:!0}}):r=new Function("w","return class extends w.HTMLElement{}")(n),U[c].Qn(function o(n,t,r){var i={n:n[0],P:{color:{F:"color"}}};i.kn=n[1];var o=n[3];if(o)for(t=0;t<o.length;t++)r=o[t],i.P[r[0]]={Ln:r[1],R:!!r[2],F:"string"==typeof r[3]?r[3]:r[3]?r[0]:0,H:r[4]};return i.En=n[4],n[5]&&(i.dn=n[5].map(e)),i}(t),r)})})}this&&this.tt||(Object.setPrototypeOf||Array);var P=function(){};function applyPolyfills(n,t){n.et=function(){function t(){var n=setTimeout;return function(){return n(e,1)}}function e(){for(var n=0;n<b;n+=2)(0,C[n])(C[n+1]),C[n]=void 0,C[n+1]=void 0;b=0}function r(n,t){var e=this,r=new this.constructor(o);void 0===r[T]&&h(r);var i=e.rt;if(i){var u=arguments[i-1];M(function(){return d(i,r,u,e.it)})}else v(e,r,n,t);return r}function i(n){if(n&&"object"==typeof n&&n.constructor===this)return n;var t=new this(o);return c(t,n),t}function o(){}function u(n){try{return n.then}catch(n){return S.error=n,S}}function f(n,t,e){t.constructor===n.constructor&&e===r&&t.constructor.resolve===i?function(n,t){t.rt===x?s(n,t.it):t.rt===N?l(n,t.it):v(t,void 0,function(t){return c(n,t)},function(t){return l(n,t)})}(n,t):e===S?(l(n,S.error),S.error=null):void 0===e?s(n,t):"function"==typeof e?function(n,t,e){M(function(n){var r=!1,i=function(n,t,e,r){try{n.call(t,e,r)}catch(n){return n}}(e,t,function(e){r||(r=!0,t!==e?c(n,e):s(n,e))},function(t){r||(r=!0,l(n,t))},n.ot);!r&&i&&(r=!0,l(n,i))},n)}(n,t,e):s(n,t)}function c(n,t){if(n===t)l(n,new TypeError("cannot resolve promise w/ itself"));else{var e=typeof t;null===t||"object"!==e&&"function"!==e?s(n,t):f(n,t,u(t))}}function a(n){n.ut&&n.ut(n.it),p(n)}function s(n,t){n.rt===_&&(n.it=t,n.rt=x,0!==n.ft.length&&M(p,n))}function l(n,t){n.rt===_&&(n.rt=N,n.it=t,M(a,n))}function v(n,t,e,r){var i=n.ft,o=i.length;n.ut=null,i[o]=t,i[o+x]=e,i[o+N]=r,0===o&&n.rt&&M(p,n)}function p(n){var t=n.ft,e=n.rt;if(0!==t.length){for(var r,i,o=n.it,u=0;u<t.length;u+=3)r=t[u],i=t[u+e],r?d(e,r,i,o):i(o);n.ft.length=0}}function d(n,t,e,r){var i="function"==typeof e,o=void 0,u=void 0,f=void 0,a=void 0;if(i){try{o=e(r)}catch(n){S.error=n,o=S}if(o===S?(a=!0,u=o.error,o.error=null):f=!0,t===o)return void l(t,new TypeError("Cannot return same promise"))}else o=r,f=!0;t.rt===_&&(i&&f?c(t,o):a?l(t,u):n===x?s(t,o):n===N&&l(t,o))}function h(n){n[T]=W++,n.rt=void 0,n.it=void 0,n.ft=[]}var y,m=Array.isArray?Array.isArray:function(n){return"[object Array]"===Object.prototype.toString.call(n)},b=0,w=void 0,g=void 0,M=function(n,t){C[b]=n,C[b+1]=t,2===(b+=2)&&(g?g(e):P())},j=(y=void 0!==n?n:void 0)||{},k=j.ct||j.at;j="undefined"==typeof self;var $,A,E,O="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,C=Array(1e3),P=void 0;P=k?($=0,A=new k(e),E=document.createTextNode(""),A.observe(E,{characterData:!0}),function(){E.data=$=++$%2}):O?function(){var n=new MessageChannel;return n.st.onmessage=e,function(){return n.lt.postMessage(0)}}():void 0===y&&"function"==typeof require?function(){try{var n=Function("return this")().vt("vertx");return void 0!==(w=n.pt||n.dt)?function(){w(e)}:t()}catch(n){return t()}}():t();var T=Math.random().toString(36).substring(2),_=void 0,x=1,N=2,S={error:null},W=0,D=function(){function n(n,t){this.ht=n,this.yt=new n(o),this.yt[T]||h(this.yt),m(t)?(this.mt=this.length=t.length,this.it=Array(this.length),0===this.length?s(this.yt,this.it):(this.length=this.length||0,this.bt(t),0===this.mt&&s(this.yt,this.it))):l(this.yt,Error("Array Methods must be provided an Array"))}return n.prototype.bt=function(n){for(var t=0;this.rt===_&&t<n.length;t++)this.wt(n[t],t)},n.prototype.wt=function(n,t){var e=this.ht,c=e.resolve;c===i?(c=u(n))===r&&n.rt!==_?this.gt(n.rt,t,n.it):"function"!=typeof c?(this.mt--,this.it[t]=n):e===L?(f(e=new e(o),n,c),this.Mt(e,t)):this.Mt(new e(function(t){return t(n)}),t):this.Mt(c(n),t)},n.prototype.gt=function(n,t,e){var r=this.yt;r.rt===_&&(this.mt--,n===N?l(r,e):this.it[t]=e),0===this.mt&&s(r,this.it)},n.prototype.Mt=function(n,t){var e=this;v(n,void 0,function(n){return e.gt(x,t,n)},function(n){return e.gt(N,t,n)})},n}(),L=function(){function n(t){if(this[T]=W++,this.it=this.rt=void 0,this.ft=[],o!==t){if("function"!=typeof t)throw new TypeError("Must pass a resolver fn as 1st arg");if(!(this instanceof n))throw new TypeError("Failed to construct 'Promise': Use the 'new' operator.");!function(n,t){try{t(function(t){c(n,t)},function(t){l(n,t)})}catch(t){l(n,t)}}(this,t)}}return n.prototype.catch=function(n){return this.then(null,n)},n.prototype.jt=function(n){var t=this.constructor;return this.then(function(e){return t.resolve(n()).then(function(){return e})},function(e){return t.resolve(n()).then(function(){throw e})})},n}();return L.prototype.then=r,L.all=function(n){return new D(this,n).yt},L.race=function(n){var t=this;return m(n)?new t(function(e,r){for(var i=n.length,o=0;o<i;o++)t.resolve(n[o]).then(e,r)}):new t(function(n,t){return t(new TypeError("Must pass array to race"))})},L.resolve=i,L.reject=function(n){var t=new this(o);return l(t,n),t},L.kt=function(n){g=n},L.$t=function(n){M=n},L.At=M,L.Et=function(){var n=void 0;if("undefined"!=typeof global)n=global;else if("undefined"!=typeof self)n=self;else try{n=Function("return this")()}catch(n){throw Error("polyfill failed")}var t=n.Promise;if(t){var e=null;try{e=Object.prototype.toString.call(t.resolve())}catch(n){}if("[object Promise]"===e&&!t.Ot)return}n.Promise=L},L.Promise=L,L.Et(),L}();var e=[];n.customElements&&(!n.Element||n.Element.prototype.closest&&n.Element.prototype.matches&&n.Element.prototype.remove)||e.push(import("./polyfills/dom.js")),"function"==typeof Object.assign&&Object.entries||e.push(import("./polyfills/object.js")),Array.prototype.find&&Array.prototype.includes||e.push(import("./polyfills/array.js")),String.prototype.startsWith&&String.prototype.endsWith||e.push(import("./polyfills/string.js")),n.fetch||e.push(import("./polyfills/fetch.js")),Promise.all(e).then(function(e){e.forEach(function(t){t.applyPolyfill(n,n.document)}),t()})}var T="ssrv",_="ssrc",x="$",N={},S={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},W=function(n){return null!=n},D=function(n){return n.toLowerCase()},L=function(n){return D(n).split("-").map(function(n){return n.charAt(0).toUpperCase()+n.slice(1)}).join("")},R=function(){},F=[],H={forEach:function(n,t){n.forEach(function(n){return t(u(n))})},map:function(n,t){return n.map(function(n){return function e(n){return{vtag:n.vtag,vchildren:n.vchildren,vtext:n.vtext,vattrs:n.vattrs,vkey:n.vkey,vname:n.vname}}(t(u(n)))})}},q="wc-",I="http://www.w3.org/1999/xlink",B=!1,U={},Q=!1;export{C as defineCustomElement,o as h};