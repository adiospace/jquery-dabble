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
      var img = document.createElement('img');
      img.src= e.target.result;

      var width = img.width;
      var height = img.height;

      var canvas = document.getElementById('c');
      var context = canvas.getContext('2d');

      if (width>=height) {
        var ratio = width/400;
        img.width = 400;
        img.height = height/ratio;
      } else {
        var ratio = height/400;
        img.width = width/ratio;
        img.height = 400;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);


      var cell = {width: 10, height: 10}
        , cols = Math.round(canvas.width/cell.width)
        , rows = Math.round(canvas.height/cell.height);

      $pixels = $('#pixels');
      $pixels.css('width', cols * 50 + 1);
      $pixels.css('height', rows * 50 +1 );

      colors = pixelate(canvas, context, rows, cols, cell);

      for (var i=0; i<colors.length; i++) {
        $pixels.append('<div class="pixel" style="background-color:'+colors[i]+';" data-color="'+ colors[i] + '" ></div>');
      }
      $('.pixel').hover(function() {
        $(this).css('-webkit-transition','none');
        $(this).css('background-color','#888');
      },
      function() {
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

