setTimeout(function(){
var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");
var img = document.getElementById('loadimg');

var color = document.getElementById('color');
var size = document.getElementById('size');

function generateUserID(){
	date = new Date;
	return date.toString();
}

if(localStorage['guid'] == undefined){
localStorage['guid'] = generateUserID();

var guid = localStorage['guid'];

var result = prompt('Enter nickname:', 'anonymous');
set(guid + '/nickname', result);
set(guid + '/online', 'true');
set('guid' + '/length', (Number(get['guid'].length) + 1).toString());
set('guid/' + get['guid'].length,guid);
nickname = result;
}else{
	var guid = localStorage['guid'];
	nickname = get[guid + '/nickname'];
	set(guid + '/online', 'true');
}

var guid = localStorage['guid'];

window.onbeforeunload = closingCode;

function closingCode(){
   set(guid + '/online', 'false');
   return null;
}

function appendToElText(id,texta){
	var elm = document.getElementById(id);
	
	var txt = document.createElement('p');
	txt.innerText = texta;
	
	elm.appendChild(txt);
}

function loadList(id,list){
	var li = document.getElementById(id);
	li.innerHTML='';
	var i=0;
	while(i!=list.length){
		appendToElText(id, list[i])
		i++;
	}
}
function matchOnline(){
	var i=0;
	var c=0;
	var out = [];
	var hel;
	var lenghtmax = Number(get['guid'].length)
	while(i!=lenghtmax){
		if(get[get['guid'][i]].online == 'true'){
		out[c]=get[get['guid'][i]].nickname;
		c++;
		}
		i++;
	}
	return out;
}

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
		
var xMouse;
var yMouse;
if (e.pageX || e.pageY) { 
  xMouse = e.pageX;
  yMouse = e.pageY;
}
else { 
  xMouse = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  yMouse = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
} 
xMouse -= canvas.offsetLeft;
yMouse -= canvas.offsetTop;

c.fillStyle = '#' + decimalToHexString(Number(color.value)).toString();
c.fillRect(xMouse - size.value/2, yMouse - size.value/2, size.value, size.value);
	}
}
canvas.onmouseup = function(){
	draw=false;
sendToServer();
loadFromServer();

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

var timOnl = setInterval(function(){
loadList('onlinetab',matchOnline());
},500);


var tim = setInterval(function(){
if(!draw){loadFromServer();}
},20);
}
,2500);