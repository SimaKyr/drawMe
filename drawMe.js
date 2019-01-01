setTimeout(function(){
var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");
var img = document.getElementById('loadimg');

var color = document.getElementById('color');
var size = document.getElementById('size');
var live = document.getElementById('chcboxlive');

var fchat = document.getElementById('fchat');
var chat = document.getElementById('chat');

var settings = document.getElementById('settings');

var instrument = 'pen';

var pen = document.getElementById('pen');
var erase = document.getElementById('erase');
var picker = document.getElementById('picker');
var fill = document.getElementById('fill');
var rectangle = document.getElementById('rectangle');
var percent = document.getElementById('percent');

var sinstrument = document.getElementById('selectedinstrument');

function setInstument(inst){
	instrument = inst;
	sinstrument.src = 'img/' + inst + '.png';
	
}

color.style.backgroundColor = '#82b1ff';
size.style.backgroundColor = '#82b1ff';

pen.onclick = function(){ setInstument('pen'); }
erase.onclick = function(){ setInstument('erase'); }
picker.onclick = function(){ setInstument('picker'); }
fill.onclick = function(){ setInstument('fill'); }
rectangle.onclick = function(){ setInstument('rectangle'); }
percent.onclick = function(){ setInstument('percent'); }

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
	while(i!=lenghtmax+1){
		if(get[get['guid'][i]].online == 'true'){
		out[c]=get[get['guid'][i]].nickname;
		c++;
		}
		i++;
	}
	return out;
}

color.onchange = function(){
	color.style.backgroundColor = '#' + decimalToHexString(Number(color.value)).toString();
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

if(instrument == 'pen'){
c.fillStyle = '#' + decimalToHexString(Number(color.value)).toString();
c.fillRect(xMouse - size.value/2, yMouse - size.value/2, size.value, size.value);
}
if(instrument == 'erase'){
c.fillStyle = '#ffffff';
c.fillRect(xMouse - size.value/2, yMouse - size.value/2, size.value, size.value);
}

if(live.checked){
sendToServer();
loadFromServer();
}
	}
}
canvas.onmouseup = function(){
	draw=false;
	if(!live.checked){
sendToServer();
loadFromServer();
}

}
canvas.onmousedown = function(e){
	draw=true;
	
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

	if(instrument == 'picker'){
		
		color.value = getColor(xMouse,yMouse);
		color.style.backgroundColor = '#' + decimalToHexString(Number(color.value)).toString();
	}

}
canvas.addEventListener("touchmove", canvas.onmousemove, false);
canvas.addEventListener("touchstart", canvas.onmousedown, false);
canvas.addEventListener("touchend", canvas.onmouseup, false);

function sendToServer(){
	set('canvas',canvas.toDataURL());
}

fchat.onkeyup = function(e){
	if(!fchat.value==''){
	if (e.keyCode == 13) {
		set('chat/length',(Number(get['chat'].length)+1).toString());
		set('chat/' + get['chat'].length, get[guid].nickname + ': ' + fchat.value);
		loadList('chat',getChat());
		fchat.value='';
		chat.lastElementChild.scrollIntoView()
	}
	}
}

function getChat(){
	var ch = get['chat'];
	var i=0;
	var out=[];
	while(i-1!=ch.length){
		out[i]=ch[i];
		i++;
	}
	return out;
}

function getColor(x,y){
var p = c.getImageData(x, y, 1, 1).data;
bbb = p;
return p[2] * 65536 + p[1] * 256 + p[0];
}

var timOnl = setInterval(function(){
loadList('onlinetab',matchOnline());
loadList('chat',getChat());
},500);

var tim = setInterval(function(){
if(!draw){loadFromServer();}
},20);
}
,2500);