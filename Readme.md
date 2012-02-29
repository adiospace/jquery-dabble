# Dabble

_Dabble_ takes an image and transforms it into a grid of divs. As you hover your mouse over the grid a trail effect is applied. 
Inspired by [Dabble.in](http://dabble.in).


__This is a _proof of concept_. Don't use it in production__. 

## Usage
  
    $('#some_img').dabble();


Customize the defaults:

    $.dabble.defaults = {
      cell: {width: 40, height: 40},
      scale: 1,
      maxWidth: 800
    };

  