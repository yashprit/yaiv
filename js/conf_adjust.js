//	DEFINITIONS FOR IMAGE BRIGHTNESS/CONTRAST ADJUSTMENT
//  Copyright (c) 2009 Hellenic National Documentation Center, yapiviewer@gmail.com
//
//	This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
//	as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
//	This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
//	without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
//	You should have received a copy of the GNU General Public License along with this program; 
//	if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

$(function() {
	$("#brightness-slider").slider({
		range: "min",
		value: 0,
		min: -150,
		max: 150,
		slide: function(event, ui) {
			$("#brightness-value").val(ui.value);
		}
	});
	$("#brightness-value").val($("#brightness-slider").slider("value"));

	$("#contrast-slider").slider({
		range: "min",
		value: 0,
		min: -1.0,
		max: 3.0,
		step: 0.1,
		slide: function(event, ui) {
			$("#contrast-value").val(ui.value);
		}
	});
	$("#contrast-value").val($("#contrast-slider").slider("value"));
});