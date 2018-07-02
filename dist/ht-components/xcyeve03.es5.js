/*! Built with http://stenciljs.com */
HtComponents.loadBundle("xcyeve03",["exports"],function(t){var e=window.HtComponents.h,n=function(){function t(){this.daysText="days",this.keepCounting=!1,this.maxHours=72}return t.prototype.componentWillLoad=function(){var t=this;this.deadlineUpdated(),this._interval=setInterval(function(){return t.updateTime()},1e3)},t.prototype.componentDidUnload=function(){this._interval&&clearInterval(this._interval)},t.prototype.deadlineUpdated=function(){var t;this._deadline=(t=this.deadline,t?("string"==typeof t&&(t=Date.parse(t.replace(/(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}.*?\+\d{2}).?(\d{2})/,"$1T$2:$3"))),"number"==typeof t&&(t=new Date(t)),t):new Date).getTime(),this.updateTime()},t.prototype.updateTime=function(){this.seconds=Math.floor((this._deadline-Date.now())/1e3),this.seconds<=0&&!this.keepCounting&&(clearInterval(this._interval),this._interval=void 0)},t.prototype.getTime=function(){if(this.shouldShowDaysText())return Math.floor(this.seconds/24/60/60)+" "+this.daysText;if(this.seconds>=0){var t=Math.floor(this.seconds/60/60),e=Math.floor(this.seconds/60%60),n=Math.floor(this.seconds%60);return this.format(t,e,n)}return this.seconds<0&&this.keepCounting?(t=Math.floor(-this.seconds/60/60),e=Math.floor(-this.seconds/60%60),n=Math.floor(-this.seconds%60),this.format(t,e,n)):"00:00:00"},t.prototype.shouldShowDaysText=function(){return this.seconds>60*this.maxHours*60},t.prototype.padLeft=function(t){return t<10?"0"+t:t.toString()},t.prototype.format=function(t,e,n){return this.padLeft(t)+":"+this.padLeft(e)+":"+this.padLeft(n)},t.prototype.hostData=function(){return{role:"timer",class:{"ht-timer-passed-zero":this.keepCounting&&this.seconds<0,"ht-timer-finished":!this.keepCounting&&this.seconds<=0}}},t.prototype.render=function(){return e("span",null,this.getTime())},Object.defineProperty(t,"is",{get:function(){return"ht-timer"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{daysText:{type:String,attr:"days-text"},deadline:{type:"Any",attr:"deadline",watchCallbacks:["deadlineUpdated"]},keepCounting:{type:Boolean,attr:"keep-counting"},maxHours:{type:Number,attr:"max-hours"},seconds:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host{font-variant-numeric:tabular-nums lining-nums}"},enumerable:!0,configurable:!0}),t}();t.HtTimer=n,Object.defineProperty(t,"__esModule",{value:!0})});