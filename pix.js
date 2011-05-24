function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {

        var img = document.createElement('img');
        img.src= e.target.result;

        var width = img.width;
        var height = img.height;

        var canvas = document.getElementById("c");
        var context = canvas.getContext("2d");

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

        colors = pixelate(canvas, context);

        $middle = $('#pixel-area .middle');
        $middle.css('width', canvas.width*5-1);
        $middle.css('height', canvas.height*5);
        for(var i=0; i<colors.length; i++) {
          $middle.append('<div class="pixel" style="background-color:'+colors[i]+';" data-color="'+ colors[i] + '" ></div>');
        }
        $('.pixel').hover(function() {
          $(this).css("-webkit-transition","none");
          $(this).css("background-color","grey");
        },
        function() {
          var color = $(this).data('color');
          console.log(color);
          $(this).css("-webkit-transition","background-color 5s ease-out");
          $(this).css("background-color", color);
        });

        //console.log(context.getImageData(10,10,1,1));
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function pixelate(canvas, ctx) {
  
  var col = canvas.width/10;
  var row = canvas.height/10;

  var colors = [];

  for(var r=1; r<row; r++) {
    for(var c=1; c<col; c++) {
      var width = c * 10;
      var height = r * 10;
      
      var data = ctx.getImageData(width, height, 1, 1).data;
      colors.push('rgba(' + data[0] +',' + data[1]+','+data[2]+','+data[3] + ')');
    }
  }
 return colors; 
}

