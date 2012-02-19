/*!
 * dabbleback
 * Copyright(c) 2011 Adrian Olaru <agolaru@gmail.com>
 * MIT Licensed
 */

;(function(exports) {

  /**
   * Canvas & it's context.
   */
  var c = document.createElement('canvas')
    , ctx = c.getContext('2d');

  /**
   * Dabbleback an image file.
   *
   * @param {File} file 
   * @param {Function} fn 
   * @api public
   */

  exports.dabbleback = function dabbleback(file, fn) {

    // no file no pixels
    if (!file) return;
    // only process image files.
    if (!file.type.match('image.*')) return;

    var html
      , reader = new FileReader()
      , img = document.createElement('img');

    reader.onload = function(e) {
      img.onload = function(){ 
        html = generate(process(img));
        fn && fn(html);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  /**
   * Library version.
   */

  exports.dabbleback.version = '0.0.1';

  /**
   * Defaults.
   * 
   * `cell` - width and height of the cell used for reading the color
   * `scale` - scale of the cell in html (cell.width * scale)
   *
   */

  exports.dabbleback.defaults = {
      cell: {width: 20, height: 20}
    , scale: 1.5
  };

  /**
   * Process the image. Scale it. Take the colors and dimensions.
   *
   * @param {Image} img 
   */

  var process = function (img) {
    var cell = dabbleback.defaults.cell
      , scale = dabbleback.defaults.scale
      , cols, rows
      , lim = 400
      , ratio
      , colors
      , big = 'width'
      , small = 'height';
    
    if (img.height > img.width) {
      big = 'height';
      small = 'width';
    }

    lim = img[big] > lim ? lim : img[big];
    ratio = img[big]/lim;
    img[big] = lim;
    img[small] = img[small]/ratio;

    c.width = img.width;
    c.height = img.height;

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, img.width, img.height);

    cols = Math.round(c.width/cell.width);
    rows = Math.round(c.height/cell.height);

    return { 
        pixel: { width: cell.width*scale, height: cell.height*scale }
      , width: cols*cell.width*scale+1
      , height: rows*cell.height*scale+1
      , colors: pixelate(rows, cols, cell) 
    };
  };

  /**
   * Get the colors from image drawn on the canvas
   *
   * @param {Number} rows 
   * @param {Number} cols 
   * @param {Object} cell width and height
   */

  var pixelate = function (rows, cols, cell) {
    var shift = Array.prototype.shift
      , rgba, red, green, blue, alpha
      , colors = []
      , row, col
      , x, y;

    for(row=0; row<rows; row++) {
      for(col=0; col<cols; col++) {
        x = col * cell.width;
        y = row * cell.height;
        rgba = ctx.getImageData(x, y, 1, 1).data;
        red = shift.call(rgba);
        green = shift.call(rgba);
        blue = shift.call(rgba);
        alpha = shift.call(rgba);
        colors.push('rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
      }
    }
  return colors; 
  };

  /**
   * Generate HTML
   *
   * @param {Object} config
   */

  var generate = function (config) {
    var html = []
      , colors = config.colors
      , pixel = config.pixel
      , width = config.width
      , height = config.height;
    
    for (var i=0; i<colors.length; i++) {
      html.push('<div class="pixel" style="'
        + 'background-color:' + colors[i] 
        + '; width: '+ pixel.width + 'px'
        + '; height: '+ pixel.height + 'px'
        + ';" data-color="' + colors[i] 
        + '"></div>');
    }

    html = '<div id="pixels" style="'
    + 'width: ' + width + 'px; height: '+ height + 'px;">'
    +  html.join('') 
    + '</div>';
  return html;
  };

})(this);
