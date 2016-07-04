var box = new createjs.Shape();
box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], 0, 0, 100, 100)
box.graphics.drawRect(0, 0, 100, 100);
box.cache(0, 0, 100, 100);

var bmp = new createjs.Bitmap("images/grafitti.jpeg");
bmp.filters = [
    new createjs.AlphaMaskFilter(box.cacheCanvas)
];
bmp.cache(0, 0, 100, 100);
