//  SETTING UP GLOBAL VARIABLES
//  Copyright (c) 2009 Hellenic National Documentation Center,yapiviewer@gmail.com
//
//	This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
//	as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
//	This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
//	without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
//	You should have received a copy of the GNU General Public License along with this program; 
//	if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
	
	var img_path="ff.jpg"; 		// The Image Source                     |
	var path = "";				// The Image Path                    	|

	var top_pos=130;          	// Image position from top              |
	var left_pos=260;         	// Image position from left             |
	var max_width=1.6;        	// Max allowable scale for image zoom   |
	var min_width=0.4;         	// Min allowable scale for image zoom   |
	var step=0.2;               // Scale step for zoom   				|

	var canvasLeft=900;         // Left Position of canvas   			|
	var canvasTop=900;          // Top Position of canvas   			|
	var canvasWidth=3500;       // Canvas Width				   			|
	var canvasHeight=3400;      // Canvas Height				   		|

	var img_act_height = 200;	// Height of visible frame where image is displayed		|
	var img_act_width = 255;	// Width of visible frame where image is displayed		|

	var ctxGlobal;				
	var imgGlobal;
	var rotationGlobal = 0;
	var scaleGlobal = 1;
	var startScale = 1;
	var wOr;					// Width of full size image  			|
	var hOr;					// Height of full size image  			|
								
	var first = true;
	var array = new Array();
    var count = 0;
	var interval1 = 1;
	var imgID;
	var initialGlobal = false;
 
//!!!! SELECT THE FUNCTION YOY WANT TO PERFORM !!!!   
    var displayZ = true;		//Set to 'true' if you wanted to display the zoom controls
								//Set to 'false' if you wanted to hide the zoom controls

	var displayR = true;		//Set to 'true' if you wanted to display the rotate controls
								//Set to 'false' if you wanted to hide the rotate controls
	
	var displayBC = true;		//Set to 'true' if you wanted to display the brightness/contrast controls 
								//Set to 'false' if you wanted to hide the brightness/contrast controls

// DEFINITIONS FOR IMAGE DRAGGING
	$(function() {
		$("#move").draggable();
	});
