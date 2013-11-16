var canvas = document.getElementById('sv');
var context = canvas.getContext('2d');

var hueCanvas = document.getElementById('hue');
var hueContext = hueCanvas.getContext('2d');

var gradient = hueContext.createLinearGradient(0, 0, 0, 250);

window.hue = 0;

for(var i = 0; i < 360; i++) {
    gradient.addColorStop(i / 360, 'hsl(' + (360 - i) + ',100%, 50%)');
}

hueContext.fillStyle = gradient;
hueContext.fillRect(0, 0, 20, 250);

var width = 250;
var height = 250;

var start = Date.now();

function draw(hue) {
    window.hue = hue;
    
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var xPercent = x / width;
            var yPercent = y / height;
            
            var h = hue / 360;
            var s = 1 - yPercent;
            var v = xPercent;
            
            var c = hsvToRgb(h, s, v);
            var color = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
            
            context.fillStyle = color;
            context.fillRect(x, y, 1, 1);
        }
    }
}

function hsvToRgb(h, s, v) {
    var r, g, b;
     
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
     
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
     
    return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255) ];
}

draw(0);

document.getElementById('hue').addEventListener('click', function(e) {
    var y = e.pageY - e.target.offsetTop;
    draw(Math.floor(360 - 360 * (y / 250)));
});

document.getElementById('sv').addEventListener('click', function(e) {
    var x = e.pageX - e.target.offsetLeft;
    var y = e.pageY - e.target.offsetTop;
    
    var s = x / 250;
    var v = y / 250;
    
});
