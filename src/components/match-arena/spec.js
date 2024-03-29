// Generated by Haxe 4.2.1+bf9ff69
(function ($hx_exports, $global) { "use strict";
var HxOverrides = function() { };
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var SpecGen = $hx_exports["SpecGen"] = function() {
	this.skintones = ["#E9CBA7","#EED0B8","#F7DDC4","#F7E2AB","#EFC794","#EFC088","#E7BC91","#ECC083","#D09E7D","#CB9662","#AB8B64","#94623D","#885633","#76441F","#B26949","#80492A","#623A17"];
	this.mask_canvas = window.document.createElement("canvas");
	this.mask_ctx = this.mask_canvas.getContext("2d",null);
};
SpecGen.prototype = {
	drawSpectators: function(img,mask,canvas,amount,home_color,visitor_color) {
		if(visitor_color == null) {
			visitor_color = "#1E47EB";
		}
		if(home_color == null) {
			home_color = "#D01616";
		}
		var width = img.width;
		var height = img.height;
		var aspect = mask.width / mask.height;
		this.ctx = canvas.getContext("2d",null);
		var mhei = Math.round(82 / aspect);
		this.mask_canvas.width = 82;
		this.mask_canvas.height = mhei;
		canvas.width = width;
		canvas.height = height;
		this.mask_ctx.drawImage(mask,0,0,mask.width,mask.height,0,0,82,mhei);
		var data = this.mask_ctx.getImageData(0,0,82,mhei);
		console.log("src/SpecGen.hx:67:",data.data.length);
		var i = 2;
		var l = data.data.length;
		var places = [];
		while(i < l) {
			var val = data.data[i];
			if(val > 120) {
				places.push({ x : Math.floor(i / 4) % 82 / 82 + Math.random() * 0.01, y : Math.floor(i / 4 / 82) / mhei - 0.005 - Math.random() * 0.01, v : val});
			}
			i += 4;
		}
		var remove = Math.floor(places.length * (1.0 - amount));
		while(remove > 0) {
			HxOverrides.remove(places,places[Math.floor(places.length * Math.random())]);
			--remove;
		}
		var _g = 0;
		while(_g < places.length) {
			var spec = places[_g];
			++_g;
			this.ctx.globalAlpha = 0.2;
			this.ctx.fillStyle = "#000011";
			this.ctx.beginPath();
			this.ctx.arc(spec.x * width,spec.y * height + height / 70,width / 100,0,Math.PI * 2,false);
			this.ctx.fill();
			this.ctx.globalAlpha = 0.9;
			var shirtcolor = home_color;
			if(spec.x > 0.5) {
				shirtcolor = visitor_color;
			}
			this.ctx.fillStyle = shirtcolor;
			this.ctx.fillRect(spec.x * width - width / 200,spec.y * height,width / 100,height / 40);
			this.ctx.beginPath();
			this.ctx.arc(spec.x * width,spec.y * height,width / 140,0,Math.PI * 2,false);
			var tmp = this.skintones;
			var tmp1 = Math.floor(Math.random() * this.skintones.length);
			this.ctx.fillStyle = tmp[tmp1];
			this.ctx.globalAlpha = 0.85;
			this.ctx.fill();
		}
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, {});
