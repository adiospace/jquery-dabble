$('#file-upload').change(function(e) {
  var file = e.target.files[0]; 
  // no file no pixels
  if (!file) return;
  // only process image files.
  if (!file.type.match('image.*')) return;

  var reader = new FileReader();

    // Closure to capture the file information.
  reader.onload = (function(f) {
    return function(e) {
      var img = document.createElement('img')
        , c = document.createElement('canvas')
        , ctx = c.getContext('2d')
        , cell = {width: 10, height: 10}
        , scale = 2
        , lim = 400
        , cols, rows
        , width, height
        , ratio
        , colors
        , html = [];

        img.src = e.target.result;
        width = img.width;
        height = img.height;

      if (width>=height) {
        ratio = width/lim;
        img.width = lim;
        img.height = height/ratio;
      } else {
        ratio = height/lim;
        img.width = width/ratio;
        img.height = lim;
      }
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      cols = Math.round(c.width/cell.width);
      rows = Math.round(c.height/cell.height);

      $pixels = $('#pixels');
      $pixels.css('width', cols*cell.height*scale + 1);
      $pixels.css('height', rows*cell.width*scale + 1);

      colors = pixelate(c, ctx, rows, cols, cell);

      for (var i=0; i<colors.length; i++) {
        html.push(''
          + '<div class="pixel"'
          + 'style="background-color:"' + colors[i]
          +'" data-color="'+ colors[i] 
          + '"></div>');
      }

      $pixels.html(html.join(''));
      $('#pixels .pixel').css('width', cell.width*scale);
      $('#pixels .pixel').css('height', cell.height*scale);

      $('.pixel').hover(function() {
        $(this).css('-webkit-transition','none');
        $(this).css('background-color','#888');
      }, function() {
        var color = $(this).data('color');
        $(this).css('-webkit-transition','background-color 5s ease-out');
        $(this).css('background-color', color);
      });
    };
  })(file);
  reader.readAsDataURL(file);
});

function pixelate(canvas, ctx, rows, cols, cell) {
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
}
