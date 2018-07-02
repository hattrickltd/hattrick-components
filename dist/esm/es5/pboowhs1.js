/*! Built with http://stenciljs.com */
var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),__generator=this&&this.__generator||function(t,e){var i,n,a,o,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function r(o){return function(r){return function(o){if(i)throw new TypeError("Generator is already executing.");for(;l;)try{if(i=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,n=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(a=(a=l.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){l=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){l.label=o[1];break}if(6===o[0]&&l.label<a[1]){l.label=a[1],a=o;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(o);break}a[2]&&l.ops.pop(),l.trys.pop();continue}o=e.call(t,l)}catch(t){o=[6,t],n=0}finally{i=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,r])}}};import{h}from"./ht-components.core.js";import{a as LazyLoadedComponent}from"./chunk-b197b654.js";var BarPart,__awaiter=function(t,e,i,n){return new(i||(i=Promise))(function(a,o){function l(t){try{s(n.next(t))}catch(t){o(t)}}function r(t){try{s(n.throw(t))}catch(t){o(t)}}function s(t){t.done?a(t.value):new i(function(e){e(t.value)}).then(l,r)}s((n=n.apply(t,e||[])).next())})},Bar=function(t){function e(){var e=t.apply(this,arguments)||this;return e.max=20,e.cap=0,e.isCap=!1,e.label="",e.denomination="",e.hideContent=!1,e.lazy=!0,e.levelText="",e.showSkillInColumn=BarPart.Max,e.labelTextWidth=0,e.levelTextWidth=0,e.forceLevelTextPosition=!1,e.didLoad=!1,e}return __extends(e,t),Object.defineProperty(e.prototype,"totalWidth",{get:function(){return this.host.clientWidth},enumerable:!0,configurable:!0}),e.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return this._hostStyle=window.getComputedStyle(this.host,null),[4,this.lazy];case 1:return e.sent()?("lazyLoad",t.prototype.lazyLoad).call(this,this.host):Promise.resolve(),this.didLoad=!0,this.setCalculations(!1),[2]}})})},e.prototype.componentDidLoad=function(){this.didLoad&&this.setCalculations()},e.prototype.componentWillUpdate=function(){this.didLoad&&this.setCalculations()},e.prototype.setCalculations=function(t){void 0===t&&(t=!0),this.skillWidth=this.getSkillWidth(),this.capWidth=this.getCapWidth(),this.hideContent||(this.levelText=this.getLevelText(),this.labelTextWidth=getTextWidth(this.label,this._hostStyle.font),this.levelTextWidth=getTextWidth(this.levelText,this._hostStyle.font),t&&(this.denomination?(this.forceLevelTextPosition=!1,this.showSkillInColumn=BarPart.None):this.doesLevelTextFitInMaxColumn()?(this.forceLevelTextPosition=!1,this.showSkillInColumn=BarPart.Max):this.doesLevelTextFitInCapColumn()?(this.forceLevelTextPosition=!1,this.showSkillInColumn=BarPart.Cap):this.doesLevelTextFitInLevelColumn()?(this.forceLevelTextPosition=!1,this.showSkillInColumn=BarPart.Level):(this.forceLevelTextPosition=!0,this.hasMaxBar()?this.showSkillInColumn=BarPart.Max:this.hasCapBar()?this.showSkillInColumn=BarPart.Cap:this.showSkillInColumn=BarPart.Level))),this.numberPadding=this.getNumberPadding()},e.prototype.percentageToPixels=function(t){return t>1&&(t/=100),this.totalWidth*t},e.prototype.getSkillWidth=function(){return this.level<=0?0:this.level>this.max?100:this.level/this.max*100},e.prototype.getCapWidth=function(){return this.hasCapBar()?this.cap/this.max*100-this.skillWidth:0},e.prototype.getNumberPadding=function(){var t=this.labelTextWidth,e=0,i=this.percentageToPixels(this.skillWidth+this.capWidth);return i<t&&(e=t-i+5),e},e.prototype.getLevelText=function(){return this.cap>0?this.getSkillNumberText(this.level)+" / "+this.cap:this.getSkillNumberText(this.level)},e.prototype.getSkillNumberText=function(t){return t<0?"-":t>this.max?this.max+" (+"+(t-this.max)+")":t.toString()},e.prototype.hasCapBar=function(){return this.cap>0&&this.cap!==this.level},e.prototype.hasMaxBar=function(){return this.level<this.max&&this.cap<this.max},e.prototype.doesLevelTextFitInMaxColumn=function(){var t=this.percentageToPixels(100-this.capWidth-this.skillWidth);return this.levelTextWidth+10<t},e.prototype.doesLevelTextFitInCapColumn=function(){var t=this.percentageToPixels(this.capWidth),e=this.levelTextWidth+10,i=this.labelTextWidth-this.percentageToPixels(this.capWidth);return i>0&&(t-=i),e<t},e.prototype.doesLevelTextFitInLevelColumn=function(){var t=this.percentageToPixels(this.levelTextWidth),e=this.levelTextWidth+10,i=this.labelTextWidth-this.percentageToPixels(this.skillWidth);return i>0&&(t-=i),e<t},e.prototype.getPadding=function(){return"ltr"===(this._hostStyle.direction||"ltr")?{"padding-left":this.numberPadding+"px"}:{"padding-right":this.numberPadding+"px"}},e.prototype.hostData=function(){return{"aria-label":this.label+": "+(this.denomination||this.level+" / "+(this.cap||this.max))}},e.prototype.render=function(){return this.didLoad?h("table",{class:{"level-text-dont-fit":this.forceLevelTextPosition,"has-cap-bar":this.hasCapBar()}},h("tr",null,h("td",{class:{"bar-level":!0,maxed:this.isCap},style:{width:this.skillWidth+"%"}},h("span",{class:"title"},this.label),this.denomination&&h("span",{class:"denomination"},this.denomination),this.showSkillInColumn===BarPart.Level&&h("span",{class:"number"},this.levelText)),this.hasCapBar()&&h("td",{class:"bar-cap",style:{width:this.capWidth+"%"}},this.showSkillInColumn===BarPart.Cap&&h("span",{class:"number"},this.levelText)),this.hasMaxBar()&&h("td",{class:"bar-max",style:this.getPadding()},this.showSkillInColumn===BarPart.Max&&h("span",{class:"number"},this.levelText)))):h("table",null)},Object.defineProperty(e,"is",{get:function(){return"ht-bar"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{cap:{type:Number,attr:"cap"},capWidth:{state:!0},denomination:{type:String,attr:"denomination",reflectToAttr:!0},didLoad:{state:!0},forceLevelTextPosition:{state:!0},hideContent:{type:Boolean,attr:"hide-content"},host:{elementRef:!0},isCap:{type:Boolean,attr:"is-cap"},label:{type:String,attr:"label"},labelTextWidth:{state:!0},lazy:{type:Boolean,attr:"lazy"},level:{type:Number,attr:"level"},levelText:{state:!0},levelTextWidth:{state:!0},max:{type:Number,attr:"max"},numberPadding:{state:!0},showSkillInColumn:{state:!0},skillWidth:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{position:relative;display:block;font-size:1em;line-height:1em}table{table-layout:fixed;width:100%;border-spacing:0;overflow:hidden}td{height:calc(1em + .25em);padding:1px;vertical-align:middle}td.bar-level{background-color:var(--bar-level-background,#a9a9a9);color:var(--bar-max-background,#ececec);position:relative;text-align:start}td.bar-level.maxed{background-color:var(--bar-capped-background,#ffeb99);color:var(--bar-level-background,#a9a9a9)}td.bar-cap{background-color:var(--bar-cap-background,#cacaca);color:var(--bar-max-background,#ececec);text-align:start}td.bar-max{background-color:var(--bar-max-background,#ececec);color:var(--bar-level-background,#a9a9a9)}.title{color:var(--bar-title-color,#000);white-space:nowrap;position:absolute;top:2px}:host([denomination]) .title{width:80px;overflow:hidden}:host-context([dir=ltr]) .title{left:2px}:host-context([dir=rtl]) .title{right:2px}.number{display:inline-block;margin-left:5px;margin-right:5px;white-space:nowrap}td.bar-level .number{position:absolute;top:2px}:host-context([dir=ltr]) td.bar-level .number{right:0}:host-context([dir=rtl]) td.bar-level .number{left:0}.level-text-dont-fit .bar-cap{color:var(--bar-max-background,#ececec)}.level-text-dont-fit .bar-max{color:var(--bar-cap-background,#cacaca)}.level-text-dont-fit.has-cap-bar.bar-max{color:var(--bar-level-background,#a9a9a9)}.level-text-dont-fit .number{position:absolute;top:2px}:host-context([dir=ltr]) .level-text-dont-fit .number{right:0}:host-context([dir=rtl]) .level-text-dont-fit .number{left:0}.denomination{position:absolute;color:var(--bar-denomination-color,#000);white-space:nowrap;top:2px}:host-context([dir=ltr]) .denomination{left:85px}:host-context([dir=rtl]) .denomination{right:85px}"},enumerable:!0,configurable:!0}),e}(LazyLoadedComponent);function getTextWidth(t,e){var i=getTextWidth,n=(i.canvas||(i.canvas=document.createElement("canvas"))).getContext("2d");return n.font=e,n.measureText(t).width}!function(t){t[t.None=-1]="None",t[t.Level=0]="Level",t[t.Cap=1]="Cap",t[t.Max=2]="Max"}(BarPart||(BarPart={}));export{Bar as HtBar};