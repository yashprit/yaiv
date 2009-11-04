//  FUNCTIONS FOR IMAGE TRANSFORMATIONS
//  Copyright (c) 2009 Hellenic National Documentation Center, yapiviewer@gmail.com
//
//	This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
//	as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
//	This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
//	without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
//	You should have received a copy of the GNU General Public License along with this program; 
//	if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

function initiate() {
	ctxGlobal = null;
	imgGlobal = null;
	initialGlobal = false;
	rotationGlobal = 0;
	scaleGlobal = 1;
	startScale = 1;
	wOr = 0;
	hOr = 0;
	
	first = true;
	array = new Array();
    count = 0;
	interval1 = 1;

	zoomRotateControls();

	if(displayBC){
		brightContrastControls();
	}
	
	var newImg = new Image();
	newImg.src = document.getElementById(imgID).src;
	
	while(interval1 > 0){
		if(document.getElementById(imgID).complete || newImg.complete){
			interval1 = -1;
			initialGlobal = true;
			displayImg(newImg);
		}
	}
}	

function displayImg(newImg){

	if(document.getElementById(imgID).complete.complete){
		wOr = document.getElementById(imgID).width;
		hOr = document.getElementById(imgID).height;
		img_path = document.getElementById(imgID).src;
	}		

	if(newImg.complete){
		wOr = newImg.width;
		hOr = newImg.height;
		img_path = document.getElementById(imgID).src;
	}

	if(wOr > hOr){
		startScale = img_act_width/wOr; 
	}
	else{
		startScale = img_act_height/hOr;
	}
	
	scaleGlobal = startScale;

	min_width = startScale;

	canvasWidth = Math.round(wOr*max_width) + canvasLeft;
	canvasHeight = Math.round(hOr*max_width) + canvasTop;
	
	this.canvas = document.getElementsByTagName("canvas")[0];

	if(hOr >= wOr){
		this.canvas.style.left = -canvasLeft + img_act_width/2 - wOr*scaleGlobal/2 + "px";
		this.canvas.style.top = -canvasTop + "px";
	}
	else{
		this.canvas.style.left = -canvasLeft + "px";
		this.canvas.style.top = -canvasTop + img_act_height/2 - hOr*scaleGlobal/2 + "px";
	}
	
	if(document.getElementById("zoomout") != null){   
		document.getElementById("zoomout").className = "zoomout_disable";
	}

	document.getElementById("demo-frame").style.width = img_act_width + "px";
	document.getElementById("main-frame").style.width = img_act_width + 50 + "px";

	new ImageRotator(document.getElementById("image-rotator"), img_path, wOr, hOr);
	
	setTimeout("set_original(false)",500);
	
}

function zoom_out()
{
	if(scaleGlobal <= min_width){
		return;
	}
	  
	this.imageWidth = imgGlobal.width;
	this.imageHeight = imgGlobal.height;
	  	
	var prevScale = scaleGlobal;

	if(scaleGlobal > min_width){
	  	scaleGlobal = scaleGlobal - step;

	  	$("#move").draggable("enable");
		
		document.getElementById("zoomout").className="zoomout_enable";

		this.canvas.style.left = parseInt(document.getElementById('draggable').style.left) + (wOr*prevScale - wOr*scaleGlobal)/2 + "px";
		this.canvas.style.top = parseInt(document.getElementById('draggable').style.top) + (hOr*prevScale - hOr*scaleGlobal)/2 + "px";

		this.move.style.left = 0 + "px";
		this.move.style.top = 0 + "px";
	}
	
	if(scaleGlobal <= min_width){
		set_original(false); 
	}
	
	initialGlobal = true; 
	
	new ImageRotator(document.getElementById("image-rotator"),
	                   img_path, wOr, hOr);
	
} 

function zoom_in()
{
	this.imageWidth = imgGlobal.width;
	this.imageHeight = imgGlobal.height;

	var prevScale = scaleGlobal;

	if(scaleGlobal < max_width){
 		 scaleGlobal = scaleGlobal + step;

 		 $("#move").draggable("enable"); 
		 document.getElementById("zoomout").className="zoomout_enable";

		 this.canvas.style.left = parseInt(document.getElementById('draggable').style.left) + parseInt(document.getElementById('move').style.left) - (wOr*scaleGlobal - wOr*prevScale)/2 + "px";
		 this.canvas.style.top = parseInt(document.getElementById('draggable').style.top) + parseInt(document.getElementById('move').style.top) - (hOr*scaleGlobal - hOr*prevScale)/2 + "px";

		this.move.style.left = 0 + "px";
		this.move.style.top = 0 + "px";

 	}

	initialGlobal = true; 

 	new ImageRotator(document.getElementById("image-rotator"),
                   img_path, wOr, hOr);

} 

function resume_zoom()
{
	this.canvas = document.getElementsByTagName("canvas")[0];
}

function pause_zoom()
{
	this.canvas = document.getElementsByTagName("canvas")[0];
}

function set_original(zoomed)
{
	scaleGlobal = startScale;

	this.canvas = document.getElementsByTagName("canvas")[0];
	if(hOr >= wOr){
		this.canvas.style.left = -canvasLeft + img_act_width/2 - wOr*scaleGlobal/2 + "px";
		this.canvas.style.top = -canvasTop + "px";
	}
	else{
		this.canvas.style.left = -canvasLeft + "px";
		this.canvas.style.top = -canvasTop + img_act_height/2 - hOr*scaleGlobal/2 + "px";
	}
	
	this.move = document.getElementById("move");
	this.move.style.left = 0 + "px";
	this.move.style.top = 0 + "px";

    
    document.getElementById("zoomout").className="zoomout_disable";
	
	first = true;
	array = new Array();
	
    count = 0;

	rotationGlobal = 0;
	$("#move").draggable("disable"); 
	if(zoomed){
		initialGlobal = true; 
		new ImageRotator(document.getElementById("image-rotator"), img_path, wOr, hOr);	
	}

}

function zoomRotateControls(){
	//ROTATE BUTTONS
	document.getElementById("funcButton").appendChild(addDiv("tool-bar","tool-bar","","DIV"));
	document.getElementById("tool-bar").style.float="left";
	
	document.getElementById("tool-bar").appendChild(addDiv("bRight","","Rotate Right","BUTTON"));
	
	document.getElementById("tool-bar").appendChild(addDiv("bLeft","","Rotate Left","BUTTON"));
	
	//ZOOM CONTROLS
	document.getElementById("funcButton").appendChild(addDiv("zoom","zoom","","DIV"));
	
	document.getElementById("zoom").appendChild(addDiv("zoomin","zoomin","","DIV"));
	document.getElementById("zoomin").innerHTML = '<a onclick="javascript:resume_zoom();zoom_in();" title="Zoom In" alt="Zoom In"></a>';

	document.getElementById("zoom").appendChild(addDiv("reset","reset","","DIV"));
	document.getElementById("reset").innerHTML = '<a onclick="javascript:resume_zoom();set_original(true);" title="Reset" alt="Reset"> </a>';
	
	document.getElementById("zoom").appendChild(addDiv("zoomoutDiv","zoomoutDiv","","DIV"));
	document.getElementById("zoomoutDiv").innerHTML = '<a onclick="javascript:resume_zoom();zoom_out();" title="Zoom Out" alt="Zoom Out" id="zoomout"> </a>';
	
	if(!displayR){
		document.getElementById("tool-bar").style.display = "none";
	}

	if(!displayZ){
		document.getElementById("zoomin").style.display = "none";
		document.getElementById("zoomoutDiv").style.display = "none";
	}

}

function brightContrastControls(){
	var controls = '';
	
	//----------- CHECKING IF THE BROWSER SUPPORTS THE 'hasCanvasImageData' FUNCTION AND ADD A CANVAS ELEMENT FOR BRIGHTNESS/CONTRAST FUNCTIONALITY ----------->
	if (Pixastic.Client.hasCanvasImageData()){
		//CONTROLS FOR SETTING UP BRIGHTNESS/CONTRAST
		document.getElementById("image_container").appendChild(addDiv("demo","demo","","DIV"));
		
		controls = '';
		controls += '<p>';
		controls += '<label for="brightness-value">Brightness:</label>';
		controls += '<input type="text" id="brightness-value" style="border:0; color:#f6931f; font-weight:bold;"/>';
		controls += '</p>';			
		controls += '<div id="brightness-slider"></div>';
		
		controls += '<p>';
		controls += '<label for="contrast-value">Contrast:</label>';
		controls += '<input type="text" id="contrast-value" style="border:0; color:#f6931f; font-weight:bold;" />';
		controls += '</p>';
		controls += '<div id="contrast-slider"></div>';
		
		document.getElementById("demo").innerHTML = controls;
		
		//BUTTON ADJUST & RESET
		document.getElementById("image_container").appendChild(addDiv("bc","bc","","DIV"));
		
		controls = '';
	
		controls += '<input type="button" onclick="push($(\'#brightness-value\').val(),$(\'#contrast-value\').val());adjust($(\'#brightness-value\').val(),$(\'#contrast-value\').val());" value="Adjust B&amp;C"/>';
		controls += '<input type="button" onclick="reset();" value="Reset"/><br/>';
	
		document.getElementById("bc").innerHTML = controls;
	}
}


function addDiv(cName,id,title,el){
	var eDiv=document.createElement(el);
	eDiv.className = cName;
	
	if(id != ""){
		eDiv.id = id;
	}
	
	if(title != ""){
		eDiv.title = title;
		eDiv.alt = title;
	}


	return eDiv;
}

function push(b,c){
    array[count]=[b,c];
    count++;
}

function adjust(b,c) {	

	document.getElementById("tmp").style.display ='block';
		
	var canvasTMP = document.getElementById("tmp");
	var ctxTMP = canvasTMP.getContext("2d");
		
	var Win, hw;
	if(wOr > hOr){
		Win = Math.abs((wOr*scaleGlobal - img_act_height)/2);
		hw = wOr;
	}
	else{
		Win = Math.abs((hOr*scaleGlobal - img_act_width)/2);
		hw = hOr;
	}
	canvasTMP.style.left = - Win+"px";
	canvasTMP.style.top = - Win+"px";

	canvasTMP.width = hw*scaleGlobal+2*Win + 5;
	canvasTMP.height = hw*scaleGlobal+2*Win + 5;
	canvasTMP.style.width = hw*scaleGlobal+2*Win + 5+"px";
	canvasTMP.style.height = hw*scaleGlobal+2*Win + 5+"px";
	

	if(wOr > hOr){
		var dataDescTMP = document.getElementById("draggable").getContext("2d").getImageData(900, 900-Win, hw*scaleGlobal+Win, hw*scaleGlobal+Win);
		ctxTMP.putImageData(dataDescTMP, Win, 0);
	}
	else{
		var dataDescTMP = document.getElementById("draggable").getContext("2d").getImageData(900-Win, 900, hw*scaleGlobal+Win, hw*scaleGlobal+Win);
		ctxTMP.putImageData(dataDescTMP, 0, Win);
	}
	
	brightness(canvasTMP,b,c);

	var dataDescTMPNew = document.getElementById("tmp").getContext("2d").getImageData(0, 0, hw*scaleGlobal+Win, hw*scaleGlobal+Win);

	var canvasG = document.getElementById("draggable");	
				
	canvasG.style.width = canvasWidth + "px";
	canvasG.width = canvasWidth;
	canvasG.style.height = canvasHeight + "px";
	canvasG.height = canvasHeight;

	
	ctxGlobal.putImageData(dataDescTMPNew, canvasLeft-Win, canvasTop-Win);

	ctxGlobal.save();

	document.getElementById("tmp").style.display = "none";	
	first = false;

}

function reset(){
	
	first = true;
	array = new Array();
	
    count = 0;
	initialGlobal = true; 
	new ImageRotator(document.getElementById("image-rotator"),
	                   img_path, wOr, hOr);
}



// FUNCTION FOR IMAGE BRIGHTNESS/CONTRAST ADJUSTMENT		
function brightness(canvasTMP,b,c) {
	Pixastic.process(canvasTMP, "brightness", {brightness :b,contrast :c,legacy:true});	
}
