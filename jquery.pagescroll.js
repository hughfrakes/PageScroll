/*!
 * PageScroll is a jQuery plugin to help you create scrolling effects.
 * The plugin can only run at HTML5 browsers.
 * Copyright (c) 2014 Hugh Frakes - http://www.hughfrakes.com
 * License: MIT
 */

(function($){
	$.fn.pageScroll = function(options) {
		// Default options
		var settings = {
			speed: 20,
			zoom: 20,
			bounce: true
		};

		if (typeof options == "object") {
			$.extend(settings, options);
		}

		// Set DOM and CSS
		var secList = new Array();
		var $sectionsWrap = $(this);
		$sectionsWrap.children("div").each(function(){
			secList.push($(this));
		})
		var secListLength = secList.length;
		$sectionsWrap.appendTo($("body")).css({position: "relative", width: "100%", height: "100%", margin: 0, padding: 0, overflow: "hidden"});
		$("html, body").css({width: "100%", height: "100%", margin: 0, padding: 0});
		$(secList).each(function(){
			$(this).css({
				position: "absolute",
				top: 0,
				left: 0,
				margin: 0,
				padding: 0,
				width: "100%", 
				height: "100%",
				overflow: "hidden",
				transform: "translateY(-100%)",
			})
			.appendTo($sectionsWrap);
		})
		$(secList[0]).css({
			transform: "translateY(0)",
		})

		// Set main global variates
		var mousedown = false;
		var animating = false;
		var scrollDir;
		var previousY;
		var curSecIndex = 1;
		var $preSec = $("");
		var $curSec = $("");
		var $nextSec = $("");

		// Main
		$sectionsWrap.bind("mousedown", eventDown).bind("mousemove", eventMove).bind("mouseup mouseleave", eventUp);
		$sectionsWrap.get(0).addEventListener("touchstart", eventDown);
		$sectionsWrap.get(0).addEventListener("touchmove", eventMove);
		$sectionsWrap.get(0).addEventListener("touchend", eventUp);
		$sectionsWrap.get(0).addEventListener("touchcancel", eventUp);

		function eventDown(e) {
			e.preventDefault();
			if (!animating) {
				animating = true;
				mousedown = true;
				previousY = e.pageY;
				if (curSecIndex == 1) {
					$preSec = $("");
					$curSec = secList[curSecIndex - 1];
					$nextSec = secList[curSecIndex];
					
					$nextSec.css("transform", "translateY(100%)");
				}
				else if (curSecIndex >= secListLength) {
					curSecIndex = secListLength;
					$preSec = secList[curSecIndex - 2];
					$curSec = secList[curSecIndex - 1];
					$nextSec = $("");
					
					$preSec.css("transform", "translateY(-100%)");
				}
				else {
					$preSec = secList[curSecIndex - 2];
					$curSec = secList[curSecIndex - 1];
					$nextSec = secList[curSecIndex];

					$preSec.css("transform", "translateY(-100%)");
					$nextSec.css("transform", "translateY(100%)");
				}
				$(secList).each(function(){
					$(this).css("z-index", 1);
				});
				$curSec.css("z-index", 0);
			}
		}
		function eventMove(e){
			e.preventDefault();
			if (e.changedTouches) e = e.changedTouches[e.changedTouches.length-1];
			if (mousedown == true) {
				var curY = e.pageY;
				var diff = curY - previousY;
				if (diff < 0) {
					scrollDir = "up";
				}
				else if (diff > 0) {
					scrollDir = "down";
				}
				// While scrolling down on last section
				if (curSecIndex >= secListLength && scrollDir == "up") {
					if (settings.bounce) {
						$curSec.css("transform", "translateY("+diff*settings.zoom/300+"px) scale("+(1-Math.abs(diff)/9000*settings.zoom/20)+")");
					}
				}
				// While scrolling up on first section
				else if (curSecIndex == 1 && scrollDir == "down") {
					if (settings.bounce) {
						$curSec.css("transform", "translateY("+diff*settings.zoom/300+"px) scale("+(1-Math.abs(diff)/9000*settings.zoom/20)+")");
					}
				}
				// Middle sections
				else {
					$preSec.css("transform", "translateY("+(-100+diff/20)+"%)");
					$curSec.css("transform", "translateY("+diff*settings.zoom/100+"px) scale("+(1-Math.abs(diff)/5000*settings.zoom/20)+")");
					$nextSec.css("transform", "translateY("+(100+diff/20)+"%)");
				}
			}
		}
		function eventUp(e) {
			e.preventDefault();
			mousedown = false;
			$(secList).each(function(){
				$(this).css("transition", 5/settings.speed + "s ease-out");
			})
			if (scrollDir == "undefined") {
			}
			else if (scrollDir == "up") {
				// While scrolling up on first section
				if (curSecIndex >= secList.length) {
					$curSec.css("transform", "translateY(0) scale(1)");
				}
				else {
					$curSec.css("transform", "translateY(-100%) scale(" + (1 - settings.zoom*0.005) + ")");
					$nextSec.css("transform", "translateY(0)");
					curSecIndex++;
				}
			}
			else if (scrollDir == "down") {
				// While scrolling down on last section
				if (curSecIndex <= 1) {
					$curSec.css("transform", "translateY(0) scale(1)");
				}
				else {
					$curSec.css("transform", "translateY(100%) scale(" + (1 - settings.zoom*0.005) + ")");
					$preSec.css("transform", "translateY(0)");
					curSecIndex--;
				}
			}
			scrollDir = undefined;
			setTimeout(function(){
				$(secList).each(function(){
					$(this).css("transition", "0s");
				});
				animating = false;
			}, 5/settings.speed * 1000);
		}

		// Keep the chaining alive
		return this;
	}
})(jQuery);