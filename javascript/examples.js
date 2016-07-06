
/*
 * jQuery + Canvas Scratch Off
 * @author admin@catchmyfame.com - http://www.catchmyfame.com
 * @version 1.0
 * @date June 28, 2011
 * @copyright (c) 2011 admin@catchmyfame.com (www.catchmyfame.com)
 * @license CC Attribution-NoDerivs 3.0 Unported - http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
var topImage = new Image();
var bottomImage = new Image();
var coinImage = new Image();
bottomImage.src = "images/port.svg";
coinImage.src = "images/temp.gif";

function init()
{
	var isMouseDown = false;
	var canvasWidth = $('#canvas').width();
	var canvasHeight = $('#canvas').height();
	$('body').append('<canvas id="overlay" width="'+canvasWidth+'" height="'+canvasHeight+'" />'); // Create the coin overlay canvas
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

	$('#overlay').mousedown(function(e){
			isMouseDown = true;
			var relX = e.pageX - this.offsetLeft;
			var relY = e.pageY - this.offsetTop;
			scratchOff(relX, relY, true);
	});
	$('#overlay').mousemove(function(e){
		var relX = e.pageX - this.offsetLeft;
		var relY = e.pageY - this.offsetTop;
		overlayctx.clearRect(0,0,canvasWidth,canvasHeight);
		overlayctx.drawImage(coinImage, relX-radius, relY-radius);
		if (isMouseDown) scratchOff(relX, relY, false);
	});
	$('#overlay').mouseup(function(e){
		isMouseDown = false;
	});

	var mainctx = $('canvas')[0].getContext('2d');
	var radius = 50;
	topImage.onload = function(){
		mainctx.drawImage(topImage, 0, 0);
	};
	topImage.src = "images/grafitti.jpeg";
}
