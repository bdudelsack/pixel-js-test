var paper = require("paper-jsdom");
var fs = require('fs');
var path = require('path');

var canvas = new paper.Size(1024, 1024);
paper.setup(canvas);

with(paper) {
    var raster = new Raster('https://static.geo.de/bilder/dc/96/81961/article_image_big/mona-lisa-p-1024727412.jpg');
    raster.position = view.center;


    // Hide the raster:
    raster.visible = false;

    // The size of our grid cells:
    var gridSize = 17;

    // Space the cells by 120%:
    var spacing = 0.55;

    raster.on('load', function() {
        paper.view.update();
        raster.size = new Size(50,50)

        for (var y = 0; y < raster.height; y++) {
            for(var x = 0; x < raster.width; x++) {
                // Get the color of the pixel:
                var color = raster.getPixel(x, y);

                var rotate = (x % 2) == (y % 2)
                drawZigZag(new Point(x, y) * gridSize,new Size(gridSize / 2 / spacing, gridSize / 2 / spacing), Math.floor((1 - color.gray) * 5), rotate)
            }
        }

        var svg = project.exportSVG({ asString: true });
        fs.writeFile(path.resolve('./out.svg'), svg, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        project.activeLayer.position = view.center;
    });

    function drawZigZag(point, size, steps, rotate) {
        var border = new Path.Rectangle({
            point: point,
            size: size,
            strokeColor: 'black',
        })

        // var line = new Path({
        //     strokeColor: 'black'
        // })
        //
        // var step = size.height / steps
        //
        // for(var i = 0; i < steps; i++) {
        //     line.add(new Point(0,step * i) + point, new Point(size.width, step * (i+0.5)) + point)
        // }
        //
        // line.add(new Point(0,size.height) + point)
        //
        // line.scale(0.9)
        //
        // if(rotate) {
        //     line.rotate(90)
        // }
    }

    project.activeLayer.position = view.center;
}




