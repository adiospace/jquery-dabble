/*!
 * Dabble
 * Copyright(c) 2012 Adrian Olaru <agolaru@gmail.com>
 * MIT Licensed
 */

(function($){

  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');


  $.dabble = function(el, options) {
    this.el = el;
    this.$el = $(el);
    this.options = $.extend({}, $.dabble.defaults, options);
  };


  $.dabble.VERSION = '0.1.0';

  $.dabble.prototype = {
    constructor: $.dabble,

    init: function() {
      return this.generate(this.process());
    },

    generate: function(config) {
      var colors = config.colors
        , pixel = config.pixel
        , width = config.width
        , height = config.height
        , html = [];
      
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
    },

    process: function() {
      var cols, rows, ratio, colors
        , cell = this.options.cell
        , scale = this.options.scale
        , lim = 400
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
    },

    pixelate: function(rows, cols, cell) {
      var rgba, red, green, blue, alpha
        , row, col
        , x, y
        , shift = Array.prototype.shift
        , colors = [];

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
    },

    render: function(html) {
      $('#result').html(html);
      $('#pixels .pixel').hover(function() {
        $(this).css({
            '-webkit-transition': 'none'
          , '-moz-transition':    'none'
          , '-o-transition':      'none'
          , 'transition':         'none'
          , 'background-color':   '#888'
      });
      }, function() {
        var $el = $(this)
          , color = $el.data('color');

        $el.css({
            '-webkit-transition': 'background-color 5s ease-out'
          , '-moz-transition':    'background-color 5s ease-out'
          , '-o-transition':      'background-color 5s ease-out'
          , 'transition':         'background-color 5s ease-out'
          , 'background-color':   color
        });
      });
    }
  };

  $.dabble.defaults = {
    cell: {width: 20, height: 20},
    scale: 1.5
  };

  $.fn.dabble = function(options) {
    return this.each(function() {
      new $.dabble(this, options);
    });
  };
})(jQuery);