# PageScroll

This is a jQuery plugin to help you create page scrolling effects.
The plugin can only run at HTML5 browsers.

## Usage ##
```html
<div id="wrap">
	<div>First page goes here.</div>
	<div>Second page goes here.</div>
	...
	<div>You can add as many pages as you like.</div>
</div>
```
```javascript
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script> 
<script>
    $("#wrap").pageScroll();
    //or
	$("#wrap").pageScroll({
		speed: 20,      //Scroll speed
		zoom: 20,       //Ratio of zoom-out effects
		bounce: true        //Bounce while scrolling first/last page
	});	
</script>
```


## License ##
You may use this under the terms of either MIT License or GNU General Public License (GPL) Version 2. (same as jQuery).

## Copyright ##
Copyright (c) Hugh Frakes(www.hughfrakes.com). All Rights Reserved.

