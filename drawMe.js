setTimeout(function(){
var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");
var img = document.getElementById('loadimg');

var color = document.getElementById('color');
var size = document.getElementById('size');

var draw = false;

function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}

function loadFromServer(){ 
var imgdata = get['canvas'];
img.src = imgdata;
img.onload = function(){c.drawImage(img,0,0);}
}

loadFromServer();

canvas.onmousemove = function(e){
	if(draw){
	var xMouse = e.clientX-180;
	var yMouse = e.clientY;
c.fillStyle = '#' + decimalToHexString(Number(color.value)).toString();
c.fillRect(xMouse, yMouse, size.value, size.value);
	}
}
canvas.onmouseup = function(){
	draw=false;
}
canvas.onmousedown = function(){
	draw=true;
}
canvas.addEventListener("touchmove", canvas.onmousemove, false);
canvas.addEventListener("touchstart", canvas.onmousedown, false);
canvas.addEventListener("touchend", canvas.onmouseup, false);

function sendToServer(){
	set('canvas',canvas.toDataURL());
}

var tim = setInterval(function(){
sendToServer();
loadFromServer();
},10);
}
,2500);