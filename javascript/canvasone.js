//  NOT MY CODE - http://www.catchmyfame.com/2011/06/28/a-jquery-canvas-scratch-off/
/*
 * jQuery + Canvas Scratch Off
 * @author admin@catchmyfame.com - http://www.catchmyfame.com
 * @version 1.0
 * @date June 28, 2011
 * @copyright (c) 2011 admin@catchmyfame.com (www.catchmyfame.com)
 * @license CC Attribution-NoDerivs 3.0 Unported - http://creativecommons.org/licenses/by-nc-sa/3.0/
 */


//  THIS NEEDS TO BE ON CLICK OF CIRCLE - REVEAL , ELSE HIDDEN

 // CANVAS NUMBER ONE ON THE HOME PAGE
var topImage = new Image();
var bottomImage = new Image();
var coinImage = new Image();
bottomImage.src = "images/eyetest.png";
coinImage.src = "images/rubber.svg";


function init()
{
	var isMouseDown = false;
	var canvasWidth = $('#canvas').width();
	var canvasHeight = $('#canvas').height();
	$('#skill').append('<canvas id="overlay" width="'+canvasWidth+'" height="'+canvasHeight+'" />'); // Create the coin overlay canvas
	var overlayctx = $('canvas')[1].getContext('2d');
	overlayctx.drawImage(coinImage, 0,0);


	function scratchOff(x, y)
	{
		mainctx.save();
		mainctx.beginPath();
		mainctx.arc(x,y,radius,0,Math.PI*2,false); // we don't fill or stroke the arc intentionally
		mainctx.clip();
		mainctx.drawImage(bottomImage, 0, 0);
		mainctx.restore();
	}

	$('#skill').mousedown(function(e){
			isMouseDown = true;
			var relX = e.pageX - this.offsetLeft;
			var relY = e.pageY - this.offsetTop;
			scratchOff(relX, relY, true);
	});
	$('#skill').on("mousemove", "canvas", function(e){
		var relX = e.pageX - (this.offsetLeft);
		var relY = e.pageY - this.offsetTop;
		relX = e.clientX - this.offsetLeft;
		relY = e.clientY - this.offsetTop;
		console.log( e );
		overlayctx.clearRect(0, 0, canvasWidth, canvasHeight);
		overlayctx.drawImage(coinImage, e.offsetX, e.offsetY);
		if (isMouseDown) scratchOff(relX, relY, false);
	});
	$('#skill').mouseup(function(e){
		isMouseDown = false;
	});

	var mainctx = $('canvas')[0].getContext('2d');
	var radius = 40;
	topImage.onload = function(){
		mainctx.drawImage(topImage, 0, 0);
	};
	topImage.src = "images/background.png";
}
