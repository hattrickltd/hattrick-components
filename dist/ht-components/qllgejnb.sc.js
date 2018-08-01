/*! Built with http://stenciljs.com */
const{h:t}=window.HtComponents;import{a}from"./chunk-b197b654.js";var e=function(t,a,e,i){return new(e||(e=Promise))(function(r,s){function n(t){try{o(i.next(t))}catch(t){s(t)}}function h(t){try{o(i.throw(t))}catch(t){s(t)}}function o(t){t.done?r(t.value):new e(function(a){a(t.value)}).then(n,h)}o((i=i.apply(t,a||[])).next())})};const i={width:92,height:123},r={width:110,height:155};class s extends a{constructor(){super(...arguments),this.avatarSize=r,this.silhouettePath="silhouettes/sil[nr].png",this.facecardPath="backgrounds/card1.png",this.avatarPath="/Img/Avatar/",this.base="",this.background=!0,this.facecard=!0,this.injury=!0,this.round=!1,this.square=!1,this.lazy=!0,this.images=[],this.pendingImages=[]}componentDidLoad(){this.updateAvatar()}updateAvatar(){const t=t=>super[t];return e(this,void 0,void 0,function*(){this.images=[],this.pendingImages.forEach(t=>t.src=""),this.pendingImages=[];let a={background:this.background,injury:this.injury,facecard:this.facecard};this.avatarSize=Object.assign({},a.facecard?r:i),(this.round||this.square)&&(this.avatarSize.height=this.avatarSize.width),yield this.lazy?t("lazyLoad").call(this,this.host):Promise.resolve(),this.loadAvatar(this.parts,a)})}loadAvatar(t,a){a=Object.assign({background:!1,injury:!1,facecard:!1},a);let e=[];if("string"!=typeof t||t.startsWith("data:")||(t=JSON.parse(t)),t instanceof Array&&t.length>0){let i=0;a.facecard&&(i++,e.push(this.loadFacecard().then(t=>(this.addImage(t,0),t)))),t.forEach(t=>{if(!this.shouldIncludePart(t,a))return;let r=i++;e.push(this.loadAvatarPart(t,a).then(t=>(this.addImage(t,r),t)))})}else"string"==typeof t&&t.startsWith("data:")?e.push(this.loadDataUrl(this.parts).then(t=>(this.images=[t],t))):e.push(this.loadSilhouette(t,a).then(t=>(this.addImage(t),t)));return Promise.all(e).then(()=>{this.load.emit(this.images)})}addImage(t,a=0){let e=this.images.slice();e[a]=t,this.images=e}shouldIncludePart(t,a){return!(!t||!t.url||!a.background&&t.url.indexOf("background")>-1||!a.injury&&t.url.indexOf("injur")>-1)}loadAvatarPart(t,a){return new Promise((e,i)=>{let r=this.createImage();this.pendingImages.push(r);let s=t.url;s.indexOf("silhouettes/")>-1&&(s=s.substring(s.indexOf("silhouettes/"))),s=s.indexOf("//")>-1?s.replace("//","https://"):this.base+this.avatarPath+s,r.onload=(()=>{this.pendingImages.splice(this.pendingImages.indexOf(r),1),e({img:r,x:t.x-(a.facecard?0:9),y:t.y-(a.facecard?0:10)})}),r.onerror=(()=>i()),r.src=s})}loadFacecard(){return new Promise((t,a)=>{let e=this.createImage();this.pendingImages.push(e),e.onload=(()=>{this.pendingImages.splice(this.pendingImages.indexOf(e),1),t({img:e,x:0,y:0})}),e.onerror=(()=>a()),e.src=this.base+this.avatarPath+this.facecardPath})}loadSilhouette(t,a){return new Promise((e,i)=>{let r=this.createImage();this.pendingImages.push(r),r.onload=(()=>{this.pendingImages.splice(this.pendingImages.indexOf(r),1),e({img:r,x:a.facecard?0:-9,y:a.facecard?0:-9})}),r.onerror=(()=>i()),r.src=this._getSilhouetteUrl(t)})}loadDataUrl(t){return new Promise(a=>{let e=this.createImage();e.onload=(()=>{a({img:e,x:0,y:0})}),e.src=t})}_getSilhouetteUrl(t){let a=t?t%12+1:Math.floor(11*Math.random())+1;return this.base+this.avatarPath+this.silhouettePath.replace("[nr]",a.toString())}createImage(){let t=new Image;return t.setAttribute("async","true"),t.setAttribute("crossOrigin","anonymous"),t}printToCanvas(t){let a=document.createElement("canvas"),e=a.getContext("2d");return a.width=this.avatarSize.width,a.height=this.avatarSize.height,(t||this.images).forEach(t=>{e.drawImage(t.img,t.x,t.y)}),a}hostData(){return{role:"img",class:{"ht-avatar-round":this.round,"ht-avatar-square":this.square,"ht-avatar-has-facecard":this.facecard}}}render(){return t("div",null,this.images.map(a=>t("img",{src:a.img.src,style:{width:a.img.naturalWidth/this.avatarSize.width*100+"%",height:a.img.naturalHeight/this.avatarSize.height*100+"%",left:a.x/this.avatarSize.width*100+"%",top:a.y/this.avatarSize.height*100+"%"}})))}static get is(){return"ht-avatar"}static get encapsulation(){return"shadow"}static get properties(){return{background:{type:Boolean,attr:"background"},base:{type:String,attr:"base"},facecard:{type:Boolean,attr:"facecard"},host:{elementRef:!0},images:{state:!0},injury:{type:Boolean,attr:"injury",watchCallbacks:["updateAvatar"]},lazy:{type:Boolean,attr:"lazy"},parts:{type:"Any",attr:"parts",watchCallbacks:["updateAvatar"]},printToCanvas:{method:!0},round:{type:Boolean,attr:"round"},square:{type:Boolean,attr:"square"}}}static get events(){return[{name:"load",method:"load",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-ht-avatar-h{position:relative;display:inline-block;width:calc(92px * var(--avatar-size,1));height:calc(123px * var(--avatar-size,1))}.ht-avatar-has-facecard.sc-ht-avatar-h{width:calc(110px * var(--avatar-size,1));height:calc(155px * var(--avatar-size,1))}.ht-avatar-round.sc-ht-avatar-h, .ht-avatar-square.sc-ht-avatar-h{height:calc(92px * var(--avatar-size,1))}.ht-avatar-has-facecard.ht-avatar-round.sc-ht-avatar-h, .ht-avatar-has-facecard.ht-avatar-square.sc-ht-avatar-h{height:calc(110px * var(--avatar-size,1))}div.sc-ht-avatar{position:relative;overflow:hidden;width:100%;height:100%}.ht-avatar-round.sc-ht-avatar-h   div.sc-ht-avatar{border-radius:100%}img.sc-ht-avatar{position:absolute}"}}export{s as HtAvatar};