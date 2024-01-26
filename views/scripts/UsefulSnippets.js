/**
 * Return the location of the element (x,y) being relative to the document.
 * 
 * @param {Element} obj Element to be located
 */
function getElementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

/** 
 * return the location of the click (or another mouse event) relative to the given element (to increase accuracy).
 * @param {DOM Object} element A dom element (button,canvas,input etc)
 * @param {DOM Event} event An event generate by an event listener.
 */
function getEventLocation(element,event){
    // Relies on the getElementPosition function.
    var pos = getElementPosition(element);
    
    return {
    	x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

var canvas = document.getElementById("canvas");

/**
 * Draw an image (from your own domain or base64)
 * @param {String} sourceurl
 */
function drawImageFromWebUrl(sourceurl){
    var img = new Image();

    img.addEventListener("load", function () {
        // The image can be drawn from any source, the canvas will be filled with the image.
        canvas.getContext("2d").drawImage(img, 0, 0, img.width,    img.height, 0, 0, canvas.width, canvas.height); 
    });

   img.setAttribute("src", sourceurl);
}

var canvas = document.getElementById("canvas");

canvas.addEventListener("click",function(event){
    // Get the coordinates of the click
    var eventLocation = getEventLocation(this,event);
    // Get the data of the pixel according to the location generate by the getEventLocation function
    var context = this.getContext('2d');
    var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 

    // If transparency on the pixel , array = [0,0,0,0]
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
        // Do something if the pixel is transparent
    }

    // Convert it to HEX if you want using the rgbToHex method.
    // var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
},false);


function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

