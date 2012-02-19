/*!
 * Dabble
 * Copyright(c) 2012 Adrian Olaru <agolaru@gmail.com>
 * MIT Licensed
 */

(function($){

  $.dabble = function(el, options) {
    this.el = el;
    this.$el = $(el);
    this.options = $.extend({}, $.dabble.defaults, options);
    console.log('merge');
  };

  $.dabble.defaults = {
  };

  $.fn.dabble = function(options) {
    return this.each(function() {
      new $.dabble(this, options);
    });
  };
})(jQuery);


// ;(function(exports) {

//   var c = document.createElement('canvas')
//     , ctx = c.getContext('2d');

//   exports.dabbleback = function dabbleback(file, fn) {

//     if (!file) return;
//     if (!file.type.match('image.*')) return;

//     var html
//       , reader = new FileReader()
//       , img = document.createElement('img');

//     reader.onload = function(e) {
//       img.onload = function(){ 
//         html = generate(process(img));
//         fn && fn(html);
//       };
//       img.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   exports.dabbleback.version = '0.0.1';

//   exports.dabbleback.defaults = {
//       cell: {width: 20, height: 20}
//     , scale: 1.5
//   };

//   var process = function (img) {
//     var cell = dabbleback.defaults.cell
//       , scale = dabbleback.defaults.scale
//       , cols, rows
//       , lim = 400
//       , ratio
//       , colors
//       , big = 'width'
//       , small = 'height';
    
//     if (img.height > img.width) {
//       big = 'height';
//       small = 'width';
//     }

//     lim = img[big] > lim ? lim : img[big];
//     ratio = img[big]/lim;
//     img[big] = lim;
//     img[small] = img[small]/ratio;

//     c.width = img.width;
//     c.height = img.height;

//     ctx.clearRect(0, 0, c.width, c.height);
//     ctx.drawImage(img, 0, 0, img.width, img.height);

//     cols = Math.round(c.width/cell.width);
//     rows = Math.round(c.height/cell.height);

//     return { 
//         pixel: { width: cell.width*scale, height: cell.height*scale }
//       , width: cols*cell.width*scale+1
//       , height: rows*cell.height*scale+1
//       , colors: pixelate(rows, cols, cell) 
//     };
//   };

//   var pixelate = function (rows, cols, cell) {
//     var shift = Array.prototype.shift
//       , rgba, red, green, blue, alpha
//       , colors = []
//       , row, col
//       , x, y;

//     for(row=0; row<rows; row++) {
//       for(col=0; col<cols; col++) {
//         x = col * cell.width;
//         y = row * cell.height;
//         rgba = ctx.getImageData(x, y, 1, 1).data;
//         red = shift.call(rgba);
//         green = shift.call(rgba);
//         blue = shift.call(rgba);
//         alpha = shift.call(rgba);
//         colors.push('rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
//       }
//     }
//   return colors; 
//   };

//   var generate = function (config) {
//     var html = []
//       , colors = config.colors
//       , pixel = config.pixel
//       , width = config.width
//       , height = config.height;
    
//     for (var i=0; i<colors.length; i++) {
//       html.push('<div class="pixel" style="'
//         + 'background-color:' + colors[i] 
//         + '; width: '+ pixel.width + 'px'
//         + '; height: '+ pixel.height + 'px'
//         + ';" data-color="' + colors[i] 
//         + '"></div>');
//     }

//     html = '<div id="pixels" style="'
//     + 'width: ' + width + 'px; height: '+ height + 'px;">'
//     +  html.join('') 
//     + '</div>';
//   return html;
//   };

// })(this);



    // function render(html) {
    //   $('#result').html(html);
    //   $('#pixels .pixel').hover(function() {
    //     $(this).css({
    //         '-webkit-transition': 'none'
    //       , '-moz-transition': 'none'
    //       , '-o-transition': 'none'
    //       , 'transition': 'none'
    //       , 'background-color': '#888'
    //   });
    //   }, function() {
    //     var $el = $(this)
    //       , color = $el.data('color');

    //     $el.css({
    //         '-webkit-transition': 'background-color 5s ease-out'
    //       , '-moz-transition': 'background-color 5s ease-out'
    //       , '-o-transition': 'background-color 5s ease-out'
    //       , 'transition': 'background-color 5s ease-out'
    //       , 'background-color': color
    //     });
    //   });
    // }
