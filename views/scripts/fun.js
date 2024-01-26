var element = document.querySelector('#colorCanvas');

function initColorPicker(brightness)
{
    var canvasEl = document.getElementById('colorCanvas');
    var canvasContext = canvasEl.getContext('2d');

    var image = new Image(this.width, this.height);
	canvasContext.filter="brightness("+ brightness + "%)"
    //image.crossOrigin = 'anonymous';
    image.onload = () => canvasContext.drawImage(image, 0, 0, image.width, image.height); 
    image.src = "../../views/images/gradient.png";

    canvasEl.onclick = function(mouseEvent) 
    {
      var imgData = canvasContext.getImageData(mouseEvent.offsetX, mouseEvent.offsetY, 1, 1);
      var rgb = imgData.data;

      //alert("rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")");
      var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
      myModal.toggle();
    }
}

function brightness(value) {

	console.log(value);

}

window.onload = function() {
    initColorPicker();
	brightness();




var canvas = document.getElementById("colorCanvas");
function getElementPosition(obj) {
	var curleft = 0, curtop = 0;
	if(obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return { x: curleft, y: curtop};
	}
	return undefined;
}

function getEventLocation(element, event){
	var pos = getElementPosition(element);
	
	return {
		x: (event.pageX - pos.x),
		y: (event.pageY - pos.y)
	};
}

function rgbToHex(r, g, b) {
	if (r > 255 || g > 255 || b > 255)
		throw "Invalid color component";
	return ((r << 16) | (g << 8) | b).toString(16);
}

function drawImageFromWebUrl(sourceurl){
	var img = new Image();
	
	img.addEventListener("load", function(){
		canvas.getContext("2d").drawImage(
		img,
		0,
		0,
		img.width,
		img.height,
		0,
		0,
		canvas.width,
		canvas.height
		);
	});
	
	img.setAttribute("src", sourceurl);
	// img.setAttribute('crossOrigin', "");
}

//drawImageFromWebUrl("./images/cw.png");

canvas.addEventListener("mousemove",function(e){
	let eventLocation = getEventLocation(this, e);
	let coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;
	
	let context = this.getContext('2d');
	let pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;
	
	if(
		(pixelData[0] == 0) &&
		(pixelData[1] == 0) &&
		(pixelData[2] == 0) &&
		(pixelData[3] == 0))
	{
		coord += " (Transparent color detected, cannot be converted to HEX)";
	}
	
	let hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
	
	document.getElementById("status").innerHTML = coord;
	//is this supposed to = hex? // yes it is.
	document.getElementById("color").style.backgroundColor = hex;
	document.getElementById("hex").innerHTML = hex;
},false);
	if(document.getElementById("UserID").value == '' ) {
		document.getElementById("save_color_btn").disabled = true;
	}
}; //end of window onload function

function reassignColor(element, color) {
	console.log("reassigning");
	console.log(color);
	document.getElementById(element).style.backgroundColor = color;
}

//for complementary colors we need to convert the hex value into rgb

// function hexToRgb(hex) {
// 	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
// 	return result ? {
// 	  r: parseInt(result[1], 16),
// 	  g: parseInt(result[2], 16),
// 	  b: parseInt(result[3], 16)
// 	} : null;
//   }

//rbg to hex to possibly display color on the website and tell the user the hex code

// function componentToHex(c) {
// 	var hex = c.toString(16);
// 	return hex.length == 1 ? "0" + hex : hex;
//   }
  
//   function rgbToHex(r, g, b) {
// 	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//   }


//here is another example that works with just hexadeicmal and gives the complementary color:
/* hexToComplimentary : Converts hex value to HSL, shifts
 * hue by 180 degrees and then converts hex, giving complimentary color
 * as a hex value
 * @param  [String] hex : hex value  
 * @return [String] : complimentary color as hex value
 */
// function hexToComplimentary(hex){

//     // Convert hex to rgb
//     // Credit to Denis http://stackoverflow.com/a/36253499/4939630
//     var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

//     // Get array of RGB values
//     rgb = rgb.replace(/[^\d,]/g, '').split(',');

//     var r = rgb[0], g = rgb[1], b = rgb[2];

//     // Convert RGB to HSL
//     // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
//     r /= 255.0;
//     g /= 255.0;
//     b /= 255.0;
//     var max = Math.max(r, g, b);
//     var min = Math.min(r, g, b);
//     var h, s, l = (max + min) / 2.0;

//     if(max == min) {
//         h = s = 0;  //achromatic
//     } else {
//         var d = max - min;
//         s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

//         if(max == r && g >= b) {
//             h = 1.0472 * (g - b) / d ;
//         } else if(max == r && g < b) {
//             h = 1.0472 * (g - b) / d + 6.2832;
//         } else if(max == g) {
//             h = 1.0472 * (b - r) / d + 2.0944;
//         } else if(max == b) {
//             h = 1.0472 * (r - g) / d + 4.1888;
//         }
//     }

//     h = h / 6.2832 * 360.0 + 0;

//     // Shift hue to opposite side of wheel and convert to [0-1] value
//     h+= 180;
//     if (h > 360) { h -= 360; }
//     h /= 360;

//     // Convert h s and l values into r g and b values
//     // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
//     if(s === 0){
//         r = g = b = l; // achromatic
//     } else {
//         var hue2rgb = function hue2rgb(p, q, t){
//             if(t < 0) t += 1;
//             if(t > 1) t -= 1;
//             if(t < 1/6) return p + (q - p) * 6 * t;
//             if(t < 1/2) return q;
//             if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//             return p;
//         };

//         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         var p = 2 * l - q;

//         r = hue2rgb(p, q, h + 1/3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1/3);
//     }

//     r = Math.round(r * 255);
//     g = Math.round(g * 255); 
//     b = Math.round(b * 255);

//     // Convert r b and g values to hex
//     rgb = b | (g << 8) | (r << 16); 
//     return "#" + (0x1000000 | rgb).toString(16).substring(1);
// }  
