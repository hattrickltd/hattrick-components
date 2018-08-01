/*! Built with http://stenciljs.com */
import{h}from"./ht-components.core.js";var ProgressArc=function(){function t(){this.counterClockwise=!1}return t.prototype.completeChanged=function(){this.updateRadius()},t.prototype.componentWillLoad=function(){this.strokeWidth||(this.strokeWidth=this.size/5),this.updateRadius()},t.prototype.updateRadius=function(){this.offset=/firefox/i.test(navigator.userAgent)?-89.9:-90,this.strokeWidthCapped=Math.min(this.strokeWidth,this.size/2-1),this.radius=Math.max((this.size-this.strokeWidthCapped)/2-1,0),this.circumference=2*Math.PI*this.radius,this.transformValue="rotate("+this.offset+", "+this.size/2+", "+this.size/2+")"},t.prototype.render=function(){return h("svg",{style:{width:this.size+"px",height:this.size+"px"}},h("circle",{id:"background",fill:"none",cx:this.size/2,cy:this.size/2,r:this.radius,"stroke-dasharray":this.circumference,"stroke-dashoffset":(this.counterClockwise?1:-1)*this.complete*this.circumference,transform:this.transformValue}),h("circle",{fill:"none",cx:this.size/2,cy:this.size/2,r:this.radius,"stroke-dasharray":this.circumference,"stroke-dashoffset":(this.counterClockwise?-1:1)*(1-this.complete)*this.circumference,transform:this.transformValue}))},Object.defineProperty(t,"is",{get:function(){return"ht-progress-arc"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{complete:{type:Number,attr:"complete",watchCallbacks:["completeChanged"]},counterClockwise:{type:Boolean,attr:"counter-clockwise"},size:{type:Number,attr:"size"},strokeWidth:{type:Number,attr:"stroke-width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ht-progress-arc-h{display:inline-block}circle.sc-ht-progress-arc{stroke-width:var(--progress-arc-stroke-width,8px);stroke:var(--progress-arc-color,#000)}circle#background.sc-ht-progress-arc{stroke-width:var(--progress-arc-stroke-width,8px);stroke:var(--progress-arc-rest-color,transparent)}"},enumerable:!0,configurable:!0}),t}(),ProgressArc$1=function(){function t(){this.staminaLabel="Stamina"}return t.prototype.componentWillLoad=function(){this.handleSize(),this.updateStaminaClass()},t.prototype.componentWillUpdate=function(){this.handleSize(),this.updateStaminaClass()},t.prototype.handleSize=function(){"small"===this.size&&(this.size=29),"large"===this.size&&(this.size=44)},t.prototype.updateStaminaClass=function(){this.stamina<.25?this.progressClass="stamina-verylow":this.stamina<.5?this.progressClass="stamina-low":this.stamina<.75?this.progressClass="stamina-high":this.progressClass="stamina-veryhigh"},t.prototype.hostData=function(){return{style:{width:this.size+"px",height:this.size+"px"},title:this.staminaLabel+": "+100*this.stamina+"%"}},t.prototype.render=function(){return[h("span",{class:"rating"},h("span",{class:"rating-full"},Math.floor(this.rating)),this.rating%1!=0&&h("span",{class:"rating-half"},".5")),h("ht-progress-arc",{size:this.size,complete:this.stamina,class:this.progressClass})]},Object.defineProperty(t,"is",{get:function(){return"ht-rating"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{rating:{type:Number,attr:"rating"},size:{type:"Any",attr:"size",mutable:!0},stamina:{type:Number,attr:"stamina"},staminaLabel:{type:String,attr:"stamina-label"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ht-rating-h{position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;background:var(--rating-background,#fff);color:var(--rating-color,#666);border-radius:100%;font-weight:var(--rating-font-weight,bold);-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;--progress-arc-stroke-width:4px;--progress-arc-rest-color:var(--rating-stamina-arc-rest, #CCCCCC)}[size=small].sc-ht-rating-h{--progress-arc-stroke-width:3px}ht-progress-arc.sc-ht-rating{position:absolute;top:0;left:0}.stamina-verylow.sc-ht-rating{--progress-arc-color:var(--rating-stamina-arc-very-low, #DD4140)}.stamina-low.sc-ht-rating{--progress-arc-color:var(--rating-stamina-arc-low, #F5A104)}.stamina-high.sc-ht-rating{--progress-arc-color:var(--rating-stamina-arc-high, #F1C40A)}.stamina-veryhigh.sc-ht-rating{--progress-arc-color:var(--rating-stamina-arc-very-high, #31A94B)}.rating-full.sc-ht-rating{font-size:1em}.rating-half.sc-ht-rating{font-size:.6em}"},enumerable:!0,configurable:!0}),t}();export{ProgressArc as HtProgressArc,ProgressArc$1 as HtRating};