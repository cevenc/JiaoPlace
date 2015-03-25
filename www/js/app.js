/*
 * Copyright © 2012-2015, Intel Corporation. All rights reserved.
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...
//leancloud接口声明
AV.initialize("7eqc976ehi2s13n8kjly6rxd230qfqhfvq4ughgqzq2ntrz5", "9ye5tws6xm92hhy8xgu9ca25q7k6d1pbn9a832xa7xpb835y");
document.addEventListener("deviceready", onDeviceReadyi, false);
function onDeviceReadyi() {
	
}
function refresh(){
	waitit();
	var query = new AV.Query("photo");
	query.descending("createdAt");
	query.limit(20);
	query.find({
	success: function(results) {
		// Do something with the returned AV.Object values
		for (var i = 0; i < results.length ; i++) {
		var object = results[i];
		document.getElementById('imgli').innerHTML+='<li class="table-view-cell widget uib_w_8" data-uib="ratchet/list_item" data-ver="0" style="padding:0"><figure data-am-widget="figure" class="am am-figure am-figure-default " data-am-figure="{  pureview: '+"'true'"+' }"><img src="'+object.get("photofile").url()+'" style="width:100%" data-rel="'+object.get("photofile").url()+'" /></figure></li>';
			console.log("sus");
			waititgo();
            //
		}
	},
	error: function(error) {
		waititgo();
	}
	});
	}
	refresh();
function waitit(){
	$('#wait').css("display","block");
}
function waititgo(){
	$('#wait').css("display","none");
}
function getpic(){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
    console.log(navigator.camera);
	waitit();
	navigator.camera.getPicture(function(data){	
		$('#img').attr('src','data:image/jpeg;base64,'+data);
		$('#canvas').attr("src",'data:image/jpeg;base64,'+data);
		page2load();
		
			

},function(error){
		
	waititgo();

},{


destinationType:Camera.DestinationType.DATA_URL,


sourceType:Camera.PictureSourceType.PHOTOLIBRARY,


allowEdit:false,


targetWidth:2160,


targetHeight:1214,


mediaType:Camera.MediaType.PICTURE


});

}
	waititgo();
	
	}





function watermark(id,img1src,img2src) {
	waitit();
	var canvas = document.getElementById(id);
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		var img1 = new Image();
		var img2 = new Image();
		img1.src=img1src;
		img2.src=img2src;
		var img1sr=document.getElementById("img");
		img1.onload = function(){
			ctx.drawImage(img1,0,0,canvas.width,canvas.height);
//			ctx.drawImage(img2,0,0,img1.width,img1.height);

		};
		img2.onload = function(){
//			ctx.drawImage(img1,0,0,img1.width,img1.height);
			ctx.drawImage(img2,0,0,canvas.width,canvas.height);
			var _canvas=document.getElementById("canvas_");
			var data = _canvas.toDataURL(); 
			$('#canvas').attr("src",data);
			$('#canvas').attr("data-rel",data.substring(22));
			waititgo();

		};
		
	}
}
function change(imgtemp){
	var img2s=document.getElementById("imgtemp"+imgtemp).src;
	var img1s=document.getElementById("img").src;
	watermark('canvas_',img1s,img2s);
}
function page2load(){
	waitit();
	activate_page("#select"); 
	console.log("1111");
	var img2s=document.getElementById("imgtemp1").src;
	var img1s=document.getElementById("img").src;
	watermark('canvas_',img1s,img2s);
	waititgo();
}

function uploadit(base64){
		var photourl;
	var file = new AV.File("photo.jpg", { base64: base64 });
	file.save().then(function() {
  // The file has been saved to AV.
		var photo = new AV.Object("photo");
		photo.set("photofile", file);
		photo.save(null, {
			success: function(photo){
			// Execute any logic that should take place after the object is saved.
			this.photourl=photo.get("photofile").url();
				console.log(this.photourl);
			},
			error: function(photo, error) {
			// Execute any logic that should take place if the save fails.
			// error is a AV.Error with an error code and description.
			alert('指向失败: ' + error.description);
			}
		});


	}, function(error) {
		// The file either could not be read, or could not be saved to AV.
		alert('存储失败: ' + error.description);
	});
	return this.photourl;
	
}
function share(){
	waitit();
	activate_page("#fenxiang"); 
	var _canvas=document.getElementById("canvas_");
	var data = _canvas.toDataURL(); 
	var b64 = data.substring(22); 
//	uploadit(b64);
	$('#imgsharecontent').attr("src",data);
	waititgo();
}
function large(){
	$('.imgsharecontent').css('background','#000');
	$('.imgsharecontent').css('position','fixed');
	$('.imgsharecontent').css('width','100%');
	$('.imgsharecontent').css('height','100%');
	$('#imgsharecontent').css('position','absolute');
	$('#imgsharecontent').css('top','30%');
	$('#imgsharecontent').css('width','100%');
	$('.imgsharecontent').attr('onclick','largecancel()');
}
function largecancel(){
	$('.imgsharecontent').attr('style','');
	$('#imgsharecontent').attr('style','');
	$('.imgsharecontent').attr('onclick','large()');
}
function DownLoadReportIMG(imgPathURL){  
            $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="DoSaveAsIMG();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");  
        if (document.all.IframeReportImg.src != imgPathURL) {  
            //加载图片  
            document.all.IframeReportImg.src = imgPathURL;  
			
            DoSaveAsIMG(); 
        }  
        else {  
            //图片直接另存为  
            DoSaveAsIMG();    
        }  
    }  
function DoSaveAsIMG(){  
	document.getElementById("IframeReportImg").document.execCommand("SaveAs");
	}

function doshare(){
	var _canvas=document.getElementById("canvas_");
	var data = _canvas.toDataURL(); 
	var b64 = data.substring(22); 
	uploadit(b64);
	DownLoadReportIMG(b64);
	activate_page("#fenxiang"); 
}