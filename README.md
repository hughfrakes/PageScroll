#PageScroll
=================
This is a jQuery plugin to help you create page scroll effects.
The plugin can only run at HTML5 browsers.

##Instruction
-----------
//html
<div id="wrap">
    <div>First page goes here.</div>
    <div>Second page goes here.</div>
    ...
    <div>You can add as many pages as you like.</div>
</div>

//javascript
$("#").pagescroll();
// or
$('a[href*="#"]').pagescroll({duration: 1200});
// or
$('a[href*="#"]').pagescroll({
  duration: 1200,
  easing: 'easeOutQuart'
});
```

Options
-------
+ `duration` :  
  millisecond of move interval time. The default is 1200(ms).
+ `easing` :  
  function name of how to move. The default is null (same as '_easeOutQuart_').

If you want to set the easing option name to the option, you require
including jQuery Easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/).

License
-------
You may use this under the terms of either MIT License or
GNU General Public License (GPL) Version 2. (same as jQuery).

### Copyright
Copyright (c) MIYAGINO.net. All Rights Reserved.
