/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='ht-components']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
(function(t,e,n,o){"use strict";function i(t){return{t:t[0],e:t[1],n:!!t[2],o:!!t[3],i:!!t[4]}}function r(t,e){if(P(e)&&"object"!=typeof e&&"function"!=typeof e){if(t===Boolean||3===t)return"false"!==e&&(""===e||!!e);if(t===Number||4===t)return parseFloat(e);if(t===String||2===t)return e.toString()}return e}function c(t,e,n,o){const i=t.r.get(e);i&&((o=i["s-ld"]||i.$activeLoading)&&((n=o.indexOf(e))>-1&&o.splice(n,1),o.length||(i["s-init"]&&i["s-init"](),i.$initLoad&&i.$initLoad())),t.r.delete(e))}function s(t,e,n){let o,i,r=null,c=!1,s=!1;for(var f=arguments.length;f-- >2;)L.push(arguments[f]);for(;L.length>0;)if((n=L.pop())&&void 0!==n.pop)for(f=n.length;f--;)L.push(n[f]);else"boolean"==typeof n&&(n=null),(s="function"!=typeof t)&&(null==n?n="":"number"==typeof n?n=String(n):"string"!=typeof n&&(s=!1)),s&&c?r[r.length-1].c+=n:null===r?r=[s?{c:n}:n]:r.push(s?{c:n}:n),c=s;if(null!=e){if(e.className&&(e.class=e.className),"object"==typeof e.class){for(f in e.class)e.class[f]&&L.push(f);e.class=L.join(" "),L.length=0}null!=e.key&&(o=e.key),null!=e.name&&(i=e.name)}return"function"==typeof t?t(Object.assign({},e,{children:r}),q):{s:t,f:r,c:void 0,l:e,u:o,a:i,p:void 0,d:!1}}function f(t,e,n,o){e.split(" ").forEach(e=>{t[e]=!0,n&&(t[`${e}-${n}`]=!0,o&&(t[`${e}-${n}-${o}`]=t[`${e}-${o}`]=!0))})}function l(t,e){t.m.has(e)||(t.m.set(e,!0),t.b?t.queue.write(()=>u(t,e)):t.queue.tick(()=>u(t,e)))}function u(t,e,n,o,i,r){if(t.m.delete(e),!t.v.has(e)){if(o=t.y.get(e),n=!o){if((i=t.r.get(e))&&i.$rendered&&(i["s-rn"]=!0),i&&!i["s-rn"])return(i["s-rc"]=i["s-rc"]||[]).push(()=>{u(t,e)}),void(i.$onRender=i["s-rc"]);o=function c(t,e,n,o,i,r,s){try{(function f(t,e,n,o,i,r,c){for(c in t.w.set(o,n),t.g.has(n)||t.g.set(n,{}),(r=Object.assign({color:{type:String}},e.properties)).mode={type:String},r)p(t,r[c],n,o,c,i)})(t,i=t.M(e).k,e,o=new i,n),function l(t,e,n){if(e){const o=t.w.get(n);e.forEach(e=>{n[e.method]={emit:n=>{t.j(o,e.name,{bubbles:e.bubbles,composed:e.composed,cancelable:e.cancelable,detail:n})}}})}}(t,i.events,o);try{if(r=t.O.get(e)){for(s=0;s<r.length;s+=2)o[r[s]](r[s+1]);t.O.delete(e)}}catch(n){t.C(n,2,e)}}catch(n){o={},t.C(n,7,e,!0)}return t.y.set(e,o),o}(t,e,t.W.get(e));try{o.componentWillLoad&&(r=o.componentWillLoad())}catch(n){t.C(n,3,e)}}else try{o.componentWillUpdate&&(r=o.componentWillUpdate())}catch(n){t.C(n,5,e)}r&&r.then?r.then(()=>a(t,e,o,n)):a(t,e,o,n)}}function a(t,e,n,o){(function i(t,e,n,o){try{const i=e.k.host,r=e.k.encapsulation,c="shadow"===r&&t.N.x;let l,u;if(l=function i(t,e,n){return t&&Object.keys(t).forEach(o=>{t[o].reflectToAttr&&((n=n||{})[o]=e[o])}),n}(e.k.properties,o),u=c?n.shadowRoot:n,!n["s-rn"]){t.A(t,t.N,e,n);const i=n["s-sc"];i&&(t.N.P(n,function r(t){return`${t}-host`}(i),""),o.render||t.N.P(n,function c(t){return`${t}-slot`}(i),""))}if(o.render||o.hostData||i||l){t.T=!0;const a=o.render&&o.render();let p;if((p=o.hostData&&o.hostData())&&e.S){const t=Object.keys(p).reduce((t,n)=>e.S[n]?t.concat(n):e.S[S(n)]?t.concat(S(n)):t,[]);if(t.length>0)throw new Error("The following keys were attempted to be set with hostData() from the "+`${e.R} component: ${t.join(", ")}. `+"If you would like to modify these please set @Prop({ mutable: true, reflectToAttr: true}) on the @Prop() decorator.")}l&&(p=p?Object.assign(p,l):l),t.T=!1,i&&(p=function l(t,e,n){return t=t||{},Object.keys(e).forEach(o=>{"theme"===o?f(t.class=t.class||{},e[o],n.mode,n.color):"class"===o?f(t[o]=t[o]||{},e[o]):t[o]=e[o]}),t}(p,i,o));const d=t.L.get(n)||{};d.p=u;const m=s(null,p,a);m.d=!0,t.L.set(n,t.render(n,d,m,c,r))}t.q&&t.q.D(n),n["s-rn"]=!0,n.$onRender&&(n["s-rc"]=n.$onRender),n["s-rc"]&&(n["s-rc"].forEach(t=>t()),n["s-rc"]=null)}catch(e){t.T=!1,t.C(e,8,n,!0)}})(t,t.M(e),e,n);try{o?e["s-init"]():(n.componentDidUpdate&&n.componentDidUpdate(),g(t.L.get(e)))}catch(n){t.C(n,6,e,!0)}}function p(t,e,n,o,i,c,s,f){if(e.type||e.state){const l=t.g.get(n);e.state||(!e.attr||void 0!==l[i]&&""!==l[i]||(s=c&&c.I)&&P(f=s[e.attr])&&(l[i]=r(e.type,f)),n.hasOwnProperty(i)&&(void 0===l[i]&&(l[i]=r(e.type,n[i])),delete n[i])),o.hasOwnProperty(i)&&void 0===l[i]&&(l[i]=o[i]),e.watchCallbacks&&(l[D+i]=e.watchCallbacks.slice()),h(o,i,function l(e){return(e=t.g.get(t.w.get(this)))&&e[i]},function u(n,o){(o=t.w.get(this))&&(e.state||e.mutable)&&d(t,o,i,n)})}else if(e.elementRef)m(o,i,n);else if(e.method)m(n,i,o[i].bind(o));else if(e.context){const r=t.B(e.context);void 0!==r&&m(o,i,r.H&&r.H(n)||r)}else e.connect&&m(o,i,t.F(e.connect))}function d(t,e,n,o,i,r,c){(i=t.g.get(e))||t.g.set(e,i={});const s=i[n];if(o!==s&&(i[n]=o,r=t.y.get(e))){if(c=i[D+n])for(let t=0;t<c.length;t++)try{r[c[t]].call(r,o,s,n)}catch(t){}!t.T&&e["s-rn"]&&l(t,e)}}function m(t,e,n){Object.defineProperty(t,e,{configurable:!0,value:n})}function h(t,e,n,o){Object.defineProperty(t,e,{configurable:!0,get:n,set:o})}function b(t,e,n,o,i){const r=e!==(e=e.replace(/^xlink\:?/,"")),c=I[e]||o;c&&(!n||"false"===n)||i?r?t.removeAttributeNS(B,T(e)):t.removeAttribute(e):"function"!=typeof n&&(c&&(n=""),r?t.setAttributeNS(B,T(e),n):t.setAttribute(e,n))}function v(t,e,n,o,i,r,c,s,f,l){if("class"!==n||r)if("style"===n){for(s in o=o||E,i=i||E,o)i[s]||(e.style[s]="");for(s in i)i[s]!==o[s]&&(e.style[s]=i[s])}else"o"!==n[0]||"n"!==n[1]||!/[A-Z]/.test(n[2])||n in e?"list"!==n&&"type"!==n&&!r&&(n in e||-1!==["object","function"].indexOf(typeof i)&&null!==i)?(l=t.M(e))&&l.S&&l.S[n]?(y(e,n,i),c&&l.S[n].U&&b(e,l.S[n].z,i,3===l.S[n].Q,null==i)):"ref"!==n&&(y(e,n,null==i?"":i),null!=i&&!1!==i||e.removeAttribute(n)):null!=i&&"key"!==n?b(e,n,i):(r||t.N.Z(e,n)&&(null==i||!1===i))&&t.N.G(e,n):(n=T(n)in e?T(n.substring(2)):T(n[2])+n.substring(3),i?i!==o&&t.N.J(e,n,i):t.N.K(e,n));else if(o!==i){const t=null==o||""===o?N:o.trim().split(/\s+/),n=null==i||""===i?N:i.trim().split(/\s+/);let r=null==e.className||""===e.className?N:e.className.trim().split(/\s+/);for(s=0,f=t.length;s<f;s++)-1===n.indexOf(t[s])&&(r=r.filter(e=>e!==t[s]));for(s=0,f=n.length;s<f;s++)-1===t.indexOf(n[s])&&(r=[...r,n[s]]);e.className=r.join(" ")}}function y(t,e,n){try{t[e]=n}catch(t){}}function $(t,e,n,o,i){const r=11===n.p.nodeType&&n.p.host?n.p.host:n.p,c=e&&e.l||E,s=n.l||E;for(i in c)s&&null!=s[i]||null==c[i]||v(t,r,i,c[i],void 0,o,n.d);for(i in s)i in c&&s[i]===("value"===i||"checked"===i?r[i]:c[i])||v(t,r,i,c[i],s[i],o,n.d)}function w(t,e){function n(i,r,c,s,f,l,d,v,y){if(v=r.f[c],u||(m=!0,"slot"===v.s&&(p&&e.P(s,p+"-slot",""),v.f?v.V=!0:v.X=!0)),P(v.c))v.p=e.Y(v.c);else if(v.X)v.p=e.Y("");else{if(l=v.p=H||"svg"===v.s?e._("http://www.w3.org/2000/svg",v.s):e.tt(v.V?"slot-fb":v.s),H="svg"===v.s||"foreignObject"!==v.s&&H,$(t,null,v,H),P(p)&&l["s-si"]!==p&&e.P(l,l["s-si"]=p,""),P(a)&&e.P(l,W,a+"."+c+(function t(e){if(e)for(var n=0;n<e.length;n++)if("slot"!==e[n].s||t(e[n].f))return!0;return!1}(v.f)?"":".")),v.f)for(f=0;f<v.f.length;++f)(d=n(i,v,f,l))&&(P(a)&&3===d.nodeType&&!d["s-cr"]&&e.et(l,e.nt("s."+a+"."+f)),e.et(l,d),P(a)&&3===d.nodeType&&!d["s-cr"]&&(e.et(l,e.nt("/")),e.et(l,e.Y(" "))));"svg"===v.s&&(H=!1)}return v.p["s-hn"]=h,(v.V||v.X)&&(v.p["s-sr"]=!0,v.p["s-cr"]=b,v.p["s-sn"]=v.a||"",(y=i&&i.f&&i.f[c])&&y.s===v.s&&i.p&&o(i.p)),v.p}function o(n,i,r,c){t.ot=!0;const l=e.it(n);for(r=l.length-1;r>=0;r--)(c=l[r])["s-hn"]!==h&&c["s-ol"]&&(e.rt(c),e.ct(f(c),c,s(c)),e.rt(c["s-ol"]),c["s-ol"]=null,m=!0),i&&o(c,i);t.ot=!1}function i(t,o,i,r,c,f,l,u){const a=t["s-cr"]||t.$defaultHolder;for((l=a&&e.st(a)||t).shadowRoot&&(l=l.shadowRoot);c<=f;++c)r[c]&&(u=P(r[c].c)?e.Y(r[c].c):n(null,i,c,t))&&(r[c].p=u,e.ct(l,u,s(o)))}function r(t,n,i,r){for(;n<=i;++n)P(t[n])&&(r=t[n].p,d=!0,r["s-ol"]?e.rt(r["s-ol"]):o(r,!0),e.rt(r))}function c(t,e){return t.s===e.s&&t.u===e.u&&("slot"!==t.s||t.a===e.a)}function s(t){return t&&t["s-ol"]?t["s-ol"]:t}function f(t){return e.st(t["s-ol"]?t["s-ol"]:t)}const l=[];let u,a,p,d,m,h,b;return function v(y,w,g,k,M,j,O,W,x,E,N,A){if(h=e.ft(y),b=y["s-cr"],u=k,a="shadow"!==M?j:null,p=y["s-sc"],m=d=!1,function l(u,a,p){const d=a.p=u.p,m=u.f,h=a.f;H=a.p&&P(e.lt(a.p))&&void 0!==a.p.ownerSVGElement,H="svg"===a.s||"foreignObject"!==a.s&&H,P(a.c)?(p=d["s-cr"]||d.$defaultHolder)?e.ut(e.st(p),a.c):u.c!==a.c&&e.ut(d,a.c):("slot"!==a.s&&$(t,u,a,H),P(m)&&P(h)?function b(t,u,a,p,d,m,h,v){let y=0,$=0,w=u.length-1,g=u[0],k=u[w],M=p.length-1,j=p[0],O=p[M];for(;y<=w&&$<=M;)if(null==g)g=u[++y];else if(null==k)k=u[--w];else if(null==j)j=p[++$];else if(null==O)O=p[--M];else if(c(g,j))l(g,j),g=u[++y],j=p[++$];else if(c(k,O))l(k,O),k=u[--w],O=p[--M];else if(c(g,O))"slot"!==g.s&&"slot"!==O.s||o(e.st(g.p)),l(g,O),e.ct(t,g.p,e.at(k.p)),g=u[++y],O=p[--M];else if(c(k,j))"slot"!==g.s&&"slot"!==O.s||o(e.st(k.p)),l(k,j),e.ct(t,k.p,g.p),k=u[--w],j=p[++$];else{for(d=null,m=y;m<=w;++m)if(u[m]&&P(u[m].u)&&u[m].u===j.u){d=m;break}P(d)?((v=u[d]).s!==j.s?h=n(u&&u[$],a,d,t):(l(v,j),u[d]=void 0,h=v.p),j=p[++$]):(h=n(u&&u[$],a,$,t),j=p[++$]),h&&e.ct(f(g.p),h,s(g.p))}y>w?i(t,null==p[M+1]?null:p[M+1].p,a,p,$,M):$>M&&r(u,y,w)}(d,m,a,h):P(h)?(P(u.c)&&e.ut(d,""),i(d,null,a,h,0,h.length-1)):P(m)&&r(m,0,m.length-1)),H&&"svg"===a.s&&(H=!1)}(w,g),P(a)&&e.P(w.p,C,a),m){for(function t(n,o,i,r,c,s,f,u,a,p){for(c=0,s=(o=e.it(n)).length;c<s;c++){if((i=o[c])["s-sr"]&&(r=i["s-cr"]))for(u=e.it(e.st(r)),a=i["s-sn"],f=u.length-1;f>=0;f--)(r=u[f])["s-cn"]||r["s-nr"]||r["s-hn"]===i["s-hn"]||((3===(p=e.pt(r))||8===p)&&""===a||1===p&&null===e.dt(r,"slot")&&""===a||1===p&&e.dt(r,"slot")===a)&&(l.some(t=>t.mt===r)||(d=!0,r["s-sn"]=a,l.push({ht:i,mt:r})));1===e.pt(i)&&t(i)}}(g.p),O=0;O<l.length;O++)(W=l[O]).mt["s-ol"]||((x=e.Y(""))["s-nr"]=W.mt,e.ct(e.st(W.mt),W.mt["s-ol"]=x,W.mt));for(t.ot=!0,O=0;O<l.length;O++){for(W=l[O],N=e.st(W.ht),A=e.at(W.ht),x=W.mt["s-ol"];x=e.bt(x);)if((E=x["s-nr"])&&E&&E["s-sn"]===W.mt["s-sn"]&&N===e.st(E)&&(E=e.at(E))&&E&&!E["s-nr"]){A=E;break}(!A&&N!==e.st(W.mt)||e.at(W.mt)!==A)&&W.mt!==A&&(e.rt(W.mt),e.ct(N,W.mt,A))}t.ot=!1}return d&&function t(n,o,i,r,c,s,f,l){for(r=0,c=(i=e.it(n)).length;r<c;r++)if(o=i[r],1===e.pt(o)){if(o["s-sr"])for(f=o["s-sn"],o.hidden=!1,s=0;s<c;s++)if(i[s]["s-hn"]!==o["s-hn"])if(l=e.pt(i[s]),""!==f){if(1===l&&f===e.dt(i[s],"slot")){o.hidden=!0;break}}else if(1===l||3===l&&""!==e.vt(i[s]).trim()){o.hidden=!0;break}t(o)}}(g.p),l.length=0,g}}function g(t,e){t&&(t.l&&t.l.ref&&t.l.ref(e?null:t.p),t.f&&t.f.forEach(t=>{g(t,e)}))}function k(t,e,n,o,i){const r=t.pt(e);let c,s,f,l;if(i&&1===r){(s=t.dt(e,W))&&(f=s.split("."))[0]===o&&((l={}).s=t.ft(l.p=e),n.f||(n.f=[]),n.f[f[1]]=l,n=l,i=""!==f[2]);for(let r=0;r<e.childNodes.length;r++)k(t,e.childNodes[r],n,o,i)}else 3===r&&(c=e.previousSibling)&&8===t.pt(c)&&"s"===(f=t.vt(c).split("."))[0]&&f[1]===o&&((l={c:t.vt(e)}).p=e,n.f||(n.f=[]),n.f[f[2]]=l)}function M(t,e){const n={nodeName:e},o=t.M(n);if(!o||!o.k)return Promise.resolve(null);const i=o.k,r=function c(t){return Object.keys(t).reduce((e,n)=>{const o=t[n];let i;const r={name:n};if(o.state)i="states",r.yt=o.watchCallbacks||[];else if(o.elementRef)i="elements";else if(o.method)i="methods";else{i="props";let t="any";o.type&&(t=o.type,"function"==typeof o.type&&(t=o.type.name)),r.type=t.toLowerCase(),r.mutable=o.mutable||!1,r.connect=o.connect||"-",r.context=o.connect||"-",r.yt=o.watchCallbacks||[]}return e[i].push(r),e},{$t:[],wt:[],gt:[],kt:[]})}(i.properties||{}),s=(o.Mt||[]).map(t=>({jt:t.t,capture:t.i,disabled:t.n,passive:t.o,method:t.e})),f=i.events||[],l=Object.assign({Ot:i.is,Ct:o.Wt||"unknown",encapsulation:i.encapsulation||"none"},r,{events:{xt:f,listeners:s}});return Promise.resolve(l)}function j(t,e,n,o){n.connectedCallback=function(){(function n(t,e,o){t.Et.has(o)||(t.Et.set(o,!0),function i(t,e){const n=t.M(e);n.Mt&&n.Mt.forEach(n=>{n.n||t.N.J(e,n.t,function o(t,e,n,i){return o=>{(i=t.y.get(e))?i[n](o):((i=t.O.get(e)||[]).push(n,o),t.O.set(e,i))}}(t,e,n.e),n.i,n.o)})}(t,o)),t.v.delete(o),t.Nt.has(o)||(t.Nt.set(o,!0),o["s-id"]||(o["s-id"]=t.At()),function r(t,e,n){for(n=e;n=t.N.lt(n);)if(t.Pt(n)){t.Tt.has(e)||(t.r.set(e,n),n.$activeLoading&&(n["s-ld"]=n.$activeLoading),(n["s-ld"]=n["s-ld"]||[]).push(e));break}}(t,o),t.queue.tick(()=>t.St(e,o,function n(t,e,o,i,r){return o.mode||(o.mode=t.Rt(o)),o["s-cr"]||t.dt(o,C)||t.x&&1===e.encapsulation||(o["s-cr"]=t.Y(""),o["s-cr"]["s-cn"]=!0,t.ct(o,o["s-cr"],t.it(o)[0])),t.x||1!==e.encapsulation||"shadowRoot"in HTMLElement.prototype||(o.shadowRoot=o),1===e.encapsulation&&t.x&&(o.shadowRoot,t.Lt(o,{mode:"open"})),i={qt:o["s-id"],I:{}},e.S&&Object.keys(e.S).forEach(n=>{(r=e.S[n].z)&&(i.I[r]=t.dt(o,r))}),i}(t.N,e,o))))})(t,e,this)},n.attributeChangedCallback=function(t,n,o){(function i(t,e,n,o,c,s,f){if(t&&o!==c)for(s in t)if((f=t[s]).z&&T(f.z)===T(n)){e[s]=r(f.Q,c);break}})(e.S,this,t,n,o)},n.disconnectedCallback=function(){(function e(t,n){if(!t.ot&&function o(t,e){for(;e;){if(!t.st(e))return 9!==t.pt(e);e=t.st(e)}}(t.N,n)){t.v.set(n,!0),c(t,n),g(t.L.get(n),!0),t.N.K(n),t.Et.delete(n);{const e=t.y.get(n);e&&e.componentDidUnload&&e.componentDidUnload()}t.q&&t.q.Dt(n),[t.r,t.It,t.W].forEach(t=>t.delete(n))}})(t,this)},n["s-init"]=function(){(function e(t,n,o,i,r){if(!t.Tt.has(n)&&(i=t.y.get(n))&&!t.v.has(n)&&(!n["s-ld"]||!n["s-ld"].length)){delete n["s-ld"],t.Tt.set(n,!0);try{g(t.L.get(n)),(r=t.It.get(n))&&(r.forEach(t=>t(n)),t.It.delete(n)),i.componentDidLoad&&i.componentDidLoad()}catch(e){t.C(e,4,n)}n.classList.add(o),c(t,n)}})(t,this,o)},n.forceUpdate=function(){l(t,this)},function i(t,e,n){e&&Object.keys(e).forEach(o=>{const i=e[o],c=i.Bt;1===c||2===c?h(n,o,function e(){return(t.g.get(this)||{})[o]},function e(n){d(t,this,o,r(i.Q,n))}):6===c&&m(n,o,R)})}(t,e.S,n)}function O(t,e,n,o){return function(){const i=arguments;return function r(t,e,n){let o=e[n];return o||(o=t.Ht.querySelector(n)),o||(o=e[n]=t.tt(n),t.et(t.Ht,o)),o.componentOnReady()}(t,e,n).then(t=>t[o].apply(t,i))}}const C="data-ssrv",W="data-ssrc",x="$",E={},N=[],A={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},P=t=>null!=t,T=t=>t.toLowerCase(),S=t=>T(t).split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(""),R=()=>{},L=[],q={getAttributes:t=>t.l,replaceAttributes:(t,e)=>t.l=e},D="wc-",I={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},B="http://www.w3.org/1999/xlink";let H=!1;(function F(t,e,n,o,r,c){function f(t,e){if(!n.customElements.get(t.R)){j(v,u[t.R]=t,e.prototype,c);{const n=e.observedAttributes=[];for(const e in t.S)t.S[e].z&&n.push(t.S[e].z)}n.customElements.define(t.R,e)}}const u={html:{}},a={},p=n[t]=n[t]||{},d=function m(t,e,n){t.Ft||(t.Ft=((t,e,n,o)=>t.addEventListener(e,n,o)),t.Ut=((t,e,n,o)=>t.removeEventListener(e,n,o)));const o=new WeakMap,i={zt:n.documentElement,Qt:n.head,Ht:n.body,Zt:!1,pt:t=>t.nodeType,tt:t=>n.createElement(t),_:(t,e)=>n.createElementNS(t,e),Y:t=>n.createTextNode(t),nt:t=>n.createComment(t),ct:(t,e,n)=>t.insertBefore(e,n),rt:t=>t.remove(),et:(t,e)=>t.appendChild(e),it:t=>t.childNodes,st:t=>t.parentNode,at:t=>t.nextSibling,bt:t=>t.previousSibling,ft:t=>T(t.nodeName),vt:t=>t.textContent,ut:(t,e)=>t.textContent=e,dt:(t,e)=>t.getAttribute(e),P:(t,e,n)=>t.setAttribute(e,n),Gt:(t,e,n,o)=>t.setAttributeNS(e,n,o),G:(t,e)=>t.removeAttribute(e),Z:(t,e)=>t.hasAttribute(e),Rt:e=>e.getAttribute("mode")||(t.Context||{}).mode,Jt:(t,o)=>"child"===o?t.firstElementChild:"parent"===o?i.lt(t):"body"===o?i.Ht:"document"===o?n:"window"===o?e:t,J:(e,n,r,c,s,f,l,u)=>{const a=n;let p=e,d=o.get(e);if(d&&d[a]&&d[a](),"string"==typeof f?p=i.Jt(e,f):"object"==typeof f?p=f:(u=n.split(":")).length>1&&(p=i.Jt(e,u[0]),n=u[1]),!p)return;let m=r;(u=n.split(".")).length>1&&(n=u[0],m=(t=>{t.keyCode===A[u[1]]&&r(t)})),l=i.Zt?{capture:!!c,passive:!!s}:!!c,t.Ft(p,n,m,l),d||o.set(e,d={}),d[a]=(()=>{p&&t.Ut(p,n,m,l),d[a]=null})},K:(t,e)=>{const n=o.get(t);n&&(e?n[e]&&n[e]():Object.keys(n).forEach(t=>{n[t]&&n[t]()}))},Lt:(t,e)=>t.attachShadow(e)};i.x=!!i.zt.attachShadow,e.location.search.indexOf("shadow=false")>0&&(i.x=!1),i.Kt=((t,n,o)=>t&&t.dispatchEvent(new e.CustomEvent(n,o)));try{e.addEventListener("e",null,Object.defineProperty({},"passive",{get:()=>i.Zt=!0}))}catch(t){}return i.lt=((t,e)=>(e=i.st(t))&&11===i.pt(e)?e.host:e),i}(p,n,o);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=n,e.location=n.location,e.document=o,e.resourcesUrl=e.publicPath=r,e.enableListener=((t,e,n,o,i)=>(function r(t,e,n,o,i,c){if(e){const r=t.w.get(e),s=t.M(r);if(s&&s.Mt)if(o){const o=s.Mt.find(t=>t.t===n);o&&t.N.J(r,n,t=>e[o.e](t),o.i,void 0===c?o.o:!!c,i)}else t.N.K(r,n)}})(v,t,e,n,o,i)),e.emit=((t,n,o)=>d.Kt(t,e.eventNameFn?e.eventNameFn(n):n,o)),p.h=s,p.Context=e;const h=n["s-defined"]=n.$definedCmps=n["s-defined"]||n.$definedCmps||{};let b=0;const v={N:d,Vt:f,j:e.emit,M:t=>u[d.ft(t)],B:t=>e[t],isClient:!0,Pt:t=>!(!h[d.ft(t)]&&!v.M(t)),At:()=>t+b++,C:(t,e,n)=>void 0,F:t=>(function e(t,n,o){return{create:O(t,n,o,"create"),componentOnReady:O(t,n,o,"componentOnReady")}})(d,a,t),queue:e.queue=function y(t,e){function n(t){for(let e=0;e<t.length;e++)try{t[e]()}catch(t){}t.length=0}function o(t,e){let n=0;for(;n<t.length&&r()<e;)try{t[n++]()}catch(t){}n===t.length?t.length=0:0!==n&&t.splice(0,n)}function i(){a++,n(f);const e=r()+7*Math.ceil(a*(1/22));o(l,e),o(u,e),l.length>0&&(u.push(...l),l.length=0),(p=f.length+l.length+u.length>0)?t.raf(i):a=0}const r=()=>e.performance.now(),c=Promise.resolve(),s=[],f=[],l=[],u=[];let a=0,p=!1;return t.raf||(t.raf=e.requestAnimationFrame.bind(e)),{tick(t){s.push(t),1===s.length&&c.then(()=>n(s))},read(e){f.push(e),p||(p=!0,t.raf(i))},write(e){l.push(e),p||(p=!0,t.raf(i))}}}(p,n),St:function $(t,e){if(t.k)l(v,e);else{const n="string"==typeof t.Wt?t.Wt:t.Wt[e.mode],o=2===t.encapsulation||1===t.encapsulation&&!d.x;import(r+n+(o?".sc":"")+".js").then(n=>{try{(function o(t,e,n){const o=n.style;if(o){const i=n.is+(n.styleMode||x);if(!e[i]){const n=t.tt("template");e[i]=n,t.P(n,"data-tmpl-style-id",i),n.innerHTML=`<style data-style-id="${i}">${o}</style>`,t.et(t.Qt,n)}}})(d,t,t.k=n[S(t.R)])}catch(e){t.k=class{}}l(v,e)}).catch(t=>void 0)}},r:new WeakMap,Xt:new WeakMap,Nt:new WeakMap,Et:new WeakMap,Tt:new WeakMap,w:new WeakMap,W:new WeakMap,y:new WeakMap,v:new WeakMap,m:new WeakMap,It:new WeakMap,O:new WeakMap,L:new WeakMap,g:new WeakMap};v.render=w(v,d);const g=d.zt;g["s-ld"]=[],g["s-rn"]=!0,g["s-init"]=(()=>{v.Tt.set(g,p.loaded=v.b=!0),d.Kt(n,"appload",{detail:{namespace:t}})}),function W(t,e,n){const o=n.querySelectorAll(`[${C}]`),i=o.length;let r,c,s,f,l,u;if(i>0)for(t.Tt.set(n,!0),f=0;f<i;f++)for(r=o[f],c=e.dt(r,C),(s={}).s=e.ft(s.p=r),t.L.set(r,s),l=0,u=r.childNodes.length;l<u;l++)k(e,r.childNodes[l],s,c,!0)}(v,d,g),v.A=((t,e,n,o)=>{(function i(t,e,n,o){const i=n.k.styleMode,r=n.encapsulation;(2===r||1===r&&!t.N.x)&&(o["s-sc"]=function c(t,e){const n=`data-${t.R}`;return e&&e!==x?`${n}-${e}`:n}(n,i));const s=n.R+(i||x),f=n[s];if(f){let n=e.Qt;if(e.x)if(1===r)n=o.shadowRoot;else{let t=o;for(;t=e.st(t);)if(t.host&&t.host.shadowRoot){n=t.host.shadowRoot;break}}let i=t.Xt.get(n);if(i||t.Xt.set(n,i={}),!i[s]){let t;{t=f.content.cloneNode(!0),i[s]=!0;const o=n.querySelectorAll("[data-styles]");e.ct(n,t,o.length&&o[o.length-1].nextSibling||n.firstChild)}}}})(t,e,n,o)}),function E(t,e,n,o){const i=n.Yt=n.Yt||{};return i._t=i._t||[],i._t.push(function r(t,e,n){return{namespace:e,te:t=>t&&t.tagName?Promise.all([M(n,t.tagName),function e(t,n){return Promise.resolve(t.y.get(n))}(n,t)]).then(t=>t[0]&&t[1]?{ee:t[0],ne:t[1]}:null):Promise.resolve(null),oe:t=>M(n,t),ie:()=>Promise.all(t.components.map(t=>M(n,t[0]))).then(t=>t.filter(t=>t))}}(t,e,o)),i.te||(i.te=(t=>Promise.all(i._t.map(e=>e.te(t))).then(t=>t.find(t=>!!t)))),i.ie||(i.ie=(()=>{const t=[];return i._t.forEach(e=>{t.push(e.ie())}),Promise.all(t).then(t=>{const e=[];return t.forEach(t=>{t.forEach(t=>{e.push(t)})}),e})})),i}(p,t,n,v),(p.components||[]).map(t=>{const e=function n(t,e,o){const r={R:t[0],S:{color:{z:"color"}}};r.Wt=t[1];const c=t[3];if(c)for(e=0;e<c.length;e++)o=c[e],r.S[o[0]]={Bt:o[1],U:!!o[2],z:"string"==typeof o[3]?o[3]:o[3]?o[0]:0,Q:o[4]};return r.encapsulation=t[4],t[5]&&(r.Mt=t[5].map(i)),r}(t);return u[e.R]=e}).forEach(t=>f(t,class extends HTMLElement{})),function N(t,e,n,o,i,r){if(e.componentOnReady=((e,n)=>{if(!e.nodeName.includes("-"))return n(null),!1;const o=t.M(e);if(o)if(t.Tt.has(e))n(e);else{const o=t.It.get(e)||[];o.push(n),t.It.set(e,o)}return!!o}),i){for(r=i.length-1;r>=0;r--)e.componentOnReady(i[r][0],i[r][1])&&i.splice(r,1);for(r=0;r<o.length;r++)if(!n[o[r]].componentOnReady)return;for(r=0;r<i.length;r++)i[r][1](null);i.length=0}}(v,p,n,n["s-apps"],n["s-cr"]),p.initialized=!0})(o,n,t,e,resourcesUrl,hydratedCssClass)})(window,document,Context,namespace);
})({},"HtComponents","hydrated");