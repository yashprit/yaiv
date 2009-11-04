//  FUNCTIONS FOR IMAGE ROTATOR
//
//	Copyright 2006 Google Inc.
//
//	Modified by Hellenic National Documentation Center, yapiviewer@gmail.com, 2009
//
//	Licensed under the Apache License, Version 2.0 (the "License");
//	you may not use this file except in compliance with the License.
//	You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//	Unless required by applicable law or agreed to in writing, software
//	distributed under the License is distributed on an "AS IS" BASIS,
//	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//	See the License for the specific language governing permissions and
//	limitations under the License.



function sawFunc(a) {
  var PI = Math.PI;
  var PI2 = PI / 2;
  // make sure a is within 0 to PI
  a = a % PI;
  if (a < 0) {
    a += PI;
  }
  if (a < PI2) {
    return a / PI2;
  } else {
    return (PI - a) / PI2;
  }
}

function easeInEaseOut(t) {
  var t2 = t * t;
  return 3 * t2 - 2 * t * t2;
}

function ImageRotator(el, src, w, h) {

  this.element = el;
  this.toolBar = el.getElementsByTagName("div")[0];
  this.canvas = el.getElementsByTagName("canvas")[0];
    
  //var images = el.getElementsByTagName("img");
  //imgGlobal = images[images.length - 1];

  imgGlobal = document.getElementById("zimg");

  var btns = el.getElementsByTagName("button");

  this.btnCw = btns[1];
  this.btnCcw = btns[0];
  
  this.w = w;
  this.h = h;

  var self = this;
  this.btnCcw.onclick = function () {
    self.rotateCcw();
  };
  this.btnCw.onclick = function () {
    self.rotateCw();
  };
  imgGlobal.onload = function (e) {
    self.onImageLoad(e);
  };
  

  imgGlobal.onerror = function (e) {
    self.onImageError(e);
  };
  imgGlobal.onabort = function (e) {
    self.onImageAbort(e);
  };
  this.setImage(src, w, h);
  this.layout();

  var onResize = function () {
    self.layout();
  };
  var onLoad = function () {
    self.onWindowLoad();
  };
  if (window.addEventListener) {
    window.addEventListener("resize", onResize, false);
    window.addEventListener("load", onLoad, false);
  } else if (window.attachEvent) {
    window.attachEvent("onresize", onResize);
    window.attachEvent("onload", onLoad);
  }

}

ImageRotator.prototype = {
  getLoaded: function () {
    return this.imageLoaded && this.windowLoaded;
  },
  setImage: function (src, w, h) {
    this.imageLoaded = false;
    imgGlobal.src = src;
    this.imageWidth = w;
    this.imageHeight = h;

  },

  layout: function () {
    var PI2 = Math.PI / 2;
    var h = this.imageHeight;
    var w = this.imageWidth;
    
    var th = this.toolBar.offsetHeight;
    if (!ctxGlobal || ctxGlobal == null) {
      this.btnCw.disabled = true;
      this.btnCcw.disabled = true;
      this.canvas.style.display = "none";
      imgGlobal.style.display = "block";
      var ratio = Math.min(w / this.imageWidth, h / this.imageHeight, 1);
      var imgW = this.imageWidth * ratio;
      var imgH = this.imageHeight * ratio;
      var y = th + (h - imgH) / 2;
      var x = (w - imgW) / 2;
      imgGlobal.style.left = Math.round(x) + "px";
      imgGlobal.style.top = Math.round(y) + "px";
      imgGlobal.style.width = Math.round(imgW) + "px";
      imgGlobal.style.height = Math.round(imgH) + "px";
      

   } else {
	   if(initialGlobal){
		this.btnCw.disabled = this.isAnimating_;
		this.btnCcw.disabled = this.isAnimating_;
		   
		this.canvas.style.display = "block";
		imgGlobal.style.display = "none";
		
		
		this.canvas.style.width = canvasWidth + "px";
		this.canvas.width = canvasWidth;
		this.canvas.style.height = canvasHeight + "px";
		this.canvas.height = canvasHeight; 
		
		
		ctxGlobal.save();
		ctxGlobal.clearRect(0, 0, w, h);      
		
		var curLeft = Math.abs(parseInt(document.getElementById('draggable').style.left));
		var curTop = Math.abs(parseInt(document.getElementById('draggable').style.top));
		
		ctxGlobal.scale(scaleGlobal, scaleGlobal);
		
      	rw = Math.round( (wOr) /2) + canvasLeft/scaleGlobal;
      	rh = Math.round( (hOr) /2) + canvasTop/scaleGlobal;
      	
		ctxGlobal.translate(rw, rh);
		ctxGlobal.rotate(rotationGlobal);
		ctxGlobal.translate(-rw, -rh);
		
		ctxGlobal.drawImage(imgGlobal, canvasLeft/scaleGlobal, canvasTop/scaleGlobal, wOr, hOr);
		
		if(!first){
			var i;
			for(i = 0; i < count; i++) {
               	adjust(array[i][0],array[i][1]);
            }
		}

		ctxGlobal.restore();    
		initialGlobal = false;
      }
   }
  },

  rotation: 0,
  animationDuration: 500,

  rotateCcw: function () {
    if (!this.isAnimating_) {
      this.startTime_ = (new Date).valueOf();
      this.currentAngle_ = rotationGlobal;
      this.deltaAngle_ = Math.PI / 2;
      this.isAnimating_ = true;
      this.animCounter_ = 0;
      this.rotate_();
    }
  },

  rotateCw: function () {
    if (!this.isAnimating_) {
      this.startTime_ = (new Date).valueOf();
      this.currentAngle_ = rotationGlobal;
      this.deltaAngle_ = -Math.PI / 2;
      this.isAnimating_ = true;
      this.animCounter_ = 0;
      this.rotate_();
    }
  },

  rotate_: function () {
  	$("#move").draggable("enable"); 
    if (this.isAnimating_) {
      var t = easeInEaseOut(Math.min(1, (new Date - this.startTime_) /
                            this.animationDuration));
      rotationGlobal = t * this.deltaAngle_ + this.currentAngle_;
      if (t < 1) {
        var self = this;
        window.setTimeout(function () {
          self.rotate_();
        }, 10);
      } else {
        this.isAnimating_ = false;
      }
	  initialGlobal = true; 
      this.layout();
    }
  },

  onImageLoad: function (e) {
    this.imageLoaded = true;
    this.initCanvas();
  },
  

  onImageError: function (e) {
    this.imageLoaded = false;
  },
  onImageAbort: function (e) {
    this.imageLoaded = false;
  },
  onWindowLoad: function (e) {
    this.windowLoaded = true;
    this.initCanvas();
  },

  initCanvas: function () {

    if ((!ctxGlobal || ctxGlobal == null) && this.imageLoaded) {
      // IE recreates the element?
      
	  this.canvas = this.element.getElementsByTagName("canvas")[0];
	  
      ctxGlobal  = this.canvas.getContext("2d");
      

      if (!ctxGlobal || ctxGlobal == null) {
        return;
      }
      this.layout();
    }
  }
  

};





