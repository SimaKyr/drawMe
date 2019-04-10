
function getPosition(e, elementd) {
	var tmp3 = elementd.getBoundingClientRect();
  return { 
    x: e.clientX - tmp3.left,
    y: e.clientY - tmp3.top,
  }; 
}

function randW(){
	return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);	
}

roomName = 'main';

window.onerror = function(error) {
 a = prompt('We found some problems with GameME \n What we think to do?\n1 - Reload game\n2 - Contine','2')
 if(a==1){ location.reload(); }
 if(a==2){ window.onerror = function(){}; }
};

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}
function getUniversalTime(addmin){
	var dt = new Date;
	if(addmin!=undefined){
		return dt.getUTCDate()+'|'+dt.getUTCHours()+':'+(dt.getUTCMinutes()+addmin);
	}else{
		return dt.getUTCDate()+'|'+dt.getUTCHours()+':'+dt.getUTCMinutes();
	}
}
	
document.getElementById("a").style.display = 'none';

function download(text, name, type) {
  var a = document.getElementById("a");
  a.style.display = 'block';
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
  a.style.display = 'none';
}

var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");
var img = document.getElementById('loadimg');

var color = document.getElementById('color');
var size = document.getElementById('size');
var live = document.getElementById('chcboxlive');
var curs = document.getElementById('curs');

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
var line = document.getElementById('line');

var sinstrument = document.getElementById('selectedinstrument');

var nickset = document.getElementById('nickset');

var sNick = document.getElementById('sNick');
var creditsget = document.getElementById('creditsget');
var clsSetup = document.getElementById('clsSetup');

var setupop = document.getElementById('setupop');
var saveop = document.getElementById('saveop');
var fullscreenop = document.getElementById('fullscreenop');

var setup = document.getElementById('setup');

var chaten = document.getElementById('chaten');
var onlineen = document.getElementById('onlineen');

var styfcolor = document.getElementById('styfcolor');

var hsmenu = document.getElementById('hsmenu');

var oldChat = [];
var chatV;

var onltext = document.getElementById('onltext');

var createVip = document.getElementById('createVip');

var guid;

var argUrl = window.location.search.replace('?','').split('&');

detectVip()

function detectVip(){
	if(argUrl.length!=0){
		roomName = argUrl[0].replace('vip=','');
		if(roomName.length!=argUrl[0]){
			if(get[roomName] == undefined){
				roomName='main';
				}
		}else{roomName='main';}
	}
}

function createVipF(vipname){
	set(vipname + '/chat/length',0);
	set(vipname + '/chat/0','Welcome to youown server!');
	
	set(vipname + '/users/' + nickname + '/own', true);
	set(vipname + '/canvas','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAANSURBVBhXY/j///9/AAn7A/0FQ0XKAAAAAElFTkSuQmCC');
}

createVip.onclick = function(){ 
var linVip = randW();

createVipF(linVip);

alert('To play VIP with friends you must go to the link: ' + 'https://simakyr.github.io/drawMe/?vip=' + linVip)
}

var savedYMouse;
var savedXMouse;

saveop.onclick = function(){
	canvas.toBlob(function(blob){
	a.href = URL.createObjectURL(blob);
	a.download = 'YouArtwork-' + randW();
	a.click();
	},'image/png',1);
}

fullscreenop.onclick = function(){
	openFullscreen(document.body);
}

setupop.onclick = function(){
	if(setup.className == 'close'){
		setup.className = '';
	}else{
		setup.className = 'close';
	}
}

clsSetup.onclick = setupop.onclick;

hsmenu.onclick = function(){
	if(settings.className=='hidemenu'){
		settings.className='';
		hsmenu.src='img/left.png';
	}else{
		settings.className='hidemenu';
		hsmenu.src='img/right.png';
	}
}

creditsget.onclick = function(){
alert("Icons by - Icons8, see https://icons8.com");
}


function setInstument(inst){
	instrument = inst;
	sinstrument.src = 'img/' + inst + '.png';
	
}

size.style.backgroundColor = '#82b1ff';


pen.onclick = function(){ setInstument('pen'); }
erase.onclick = function(){ setInstument('erase'); }
picker.onclick = function(){ setInstument('picker'); }
fill.onclick = function(){ setInstument('fill'); }
rectangle.onclick = function(){ setInstument('rectangle'); }
percent.onclick = function(){ setInstument('percent'); }
line.onclick = function(){ setInstument('line'); }

function openFullscreen(elemF) {
  if (elemF.requestFullscreen) {
    elemF.requestFullscreen();
  } else if (elemF.mozRequestFullScreen) { /* Firefox */
    elemF.mozRequestFullScreen();
  } else if (elemF.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elemF.webkitRequestFullscreen();
  } else if (elemF.msRequestFullscreen) { /* IE/Edge */
    elemF.msRequestFullscreen();
  }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var disableLoad = false;
load = function(){

if(disableLoad) return;
if(!disableLoad) disableLoad = true;

firebase.auth().onAuthStateChanged(function(user) {

if (firebase.auth().currentUser !== null){

var guid = firebase.auth().currentUser.uid;

var nickname = 'users/' + guid + '/nickname';

styfcolor.style.backgroundColor = get['users'][guid].color;
color.value = get['users'][guid].color;

size.value = get['users'][guid].size;

if(get['users'][guid].chaten == undefined){
	set('users/' + guid + '/chaten',true);
	set('users/' + guid + '/onlineen',true);
	set('users/' + guid + '/cusor', true);
}

curs.checked = get['users'][guid].cusor;
onlineen.checked = get['users'][guid].onlineen;
chaten.checked = get['users'][guid].chaten;

curs.onchange = function(){ deleteCursors(); set('users' + guid + '/cusor',curs.checked);}
chaten.onchange = function(){
	set('users/' + guid + '/chaten',chaten.checked);
	hideChatOrOnline();
}
onlineen.onchange = function(){
	set('users/' + guid + '/onlineen',onlineen.checked);
	hideChatOrOnline();
	
}

function hideChatOrOnline(){
	if(onlineen.checked){
		onlinetab.className = '';
		onltext.className = '';
	}else{
		onlinetab.className = 'close';
		onltext.className = 'close';
	}
	if(chaten.checked){
		fchat.className = '';
		chat.className = '';
	}else{
		fchat.className = 'close';
		chat.className = 'close';	
	}
}

hideChatOrOnline();

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
	var i=1;
	var c=0;
	var out = [];
	var hel;
	var lenghtmax = Number(get['users']['guid'].length)
	while(i!=lenghtmax+1){
		if(get['users'][get['users']['guid'][i]].uOnline != undefined){
			
		if(get['users'][get['users']['guid'][i]].uOnline == getUniversalTime(1)||
		get['users'][get['users']['guid'][i]].uOnline == getUniversalTime(-1)||
		get['users'][get['users']['guid'][i]].uOnline == getUniversalTime(0)){
			
		out[c]=get['users'][get['users']['guid'][i]].nickname;
		c++;
		}}
		i++;
	}
	return out;
}

color.onchange = function(){
	set('users/' + guid + '/color',color.value);
	styfcolor.style.backgroundColor = color.value;
}

size.onchange = function(){
	set('users/' + guid + '/size', size.value);
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
var imgdata = get[roomName]['canvas'];
img.src = imgdata;
img.onload = function(){c.drawImage(img,0,0);}
}

loadFromServer();

document.onpointermove = function(e){
	if(curs.checked){
set('users/' + guid + '/cursorX',e.pageX);
set('users/' + guid + '/cursorY',e.pageY);
}}

canvas.onpointermove = function(e){
	if(draw){
		
var xMouse;
var yMouse;
xMouse = getPosition(e,e.target).x;
yMouse = getPosition(e,e.target).y;

if(instrument == 'pen'){
c.fillStyle = color.value;

c.beginPath();
c.strokeStyle = 'rgba(0,0,0,0)';
c.arc(xMouse - size.value/2, yMouse - size.value/2, size.value, 0, 2 * Math.PI);
c.fill();
c.stroke();
}
if(instrument == 'erase'){
	c.fillStyle = '#fff';

c.beginPath();
c.strokeStyle = 'rgba(0,0,0,0)';
c.arc(xMouse - size.value/2, yMouse - size.value/2, size.value, 0, 2 * Math.PI);
c.fill();
c.stroke();
}

if(instrument == 'line'){
	loadFromServer();
	
	c.lineCap = 'round';
	
	c.beginPath();
	c.strokeStyle = color.value;
	c.moveTo(savedX, savedY);
	c.lineTo(xMouse, yMouse);
	
	savedXMouse = xMouse;
	savedYMouse = yMouse;
	
	c.lineWidth = size.value;
	c.stroke();
}

if(instrument == 'rectangle'){
	loadFromServer();
	
	c.strokeStyle = color.value;
	
	savedXMouse = xMouse;
	savedYMouse = yMouse;
	
	c.lineWidth = size.value;
	c.beginPath();
	c.rect(savedX,savedY,xMouse-savedX,yMouse-savedY);
	c.stroke();
}
if(instrument == 'percent'){
	loadFromServer();
	
	c.strokeStyle = color.value;
	
	savedXMouse = xMouse;
	savedYMouse = yMouse;
	
	c.lineWidth = size.value;
	c.beginPath();
	c.arc(savedX,savedY,xMouse-savedX, 0, 2 * Math.PI);
	c.stroke();
}

if(live.checked){
sendToServer();
loadFromServer();
}
	}
}
document.onpointerup = function(){
	draw=false;
	
	if(instrument == 'line'){
	loadFromServer();
	
	c.lineCap = 'round';
	
	c.beginPath();
	c.strokeStyle = color.value;
	c.moveTo(savedX, savedY);
	c.lineTo(savedXMouse, savedYMouse);
	c.lineWidth = size.value;
	c.stroke();
}

if(instrument == 'rectangle'){
	loadFromServer();
	
	c.strokeStyle = color.value;
	
	c.lineWidth = size.value;
	c.beginPath();
	c.rect(savedX,savedY,savedXMouse-savedX,savedYMouse-savedY);
	c.stroke();
}
if(instrument == 'percent'){
	loadFromServer();
	
	c.strokeStyle = color.value;
	
	c.lineWidth = size.value;
	c.beginPath();
	c.arc(savedXMouse,savedYMouse,savedXMouse-savedX, 0, 2 * Math.PI);
	c.stroke();
}
	sendToServer();
	if(!live.checked){
loadFromServer();
}

}
canvas.onpointerdown = function(e){
	draw=true;
	
var xMouse;
var yMouse;

xMouse = getPosition(e,e.target).x;
yMouse = getPosition(e,e.target).y;

if(instrument == 'pen'){
c.fillStyle = color.value;

c.beginPath();
c.strokeStyle = 'rgba(0,0,0,0)';
c.arc(xMouse - size.value/2, yMouse - size.value/2, size.value, 0, 2 * Math.PI);
c.fill();
c.stroke();
}

if(instrument == 'erase'){
c.fillStyle = '#ffffff';

c.beginPath();
c.strokeStyle = 'rgba(0,0,0,0)';
c.arc(xMouse - size.value/2, yMouse - size.value/2, size.value, 0, 2 * Math.PI);
c.fill();
c.stroke();
}

if(instrument == 'rectangle'||instrument == 'percent'||instrument == 'line'){
sendToServer();
	
savedX = xMouse;
savedY = yMouse;
}

	if(instrument == 'picker'){
		
		color.value = decimalToHexString(getColor(xMouse,yMouse));
		styfcolor.style.backgroundColor = color.value;
	}
c.fillStyle = color.value;
}

function sendToServer(){
	set(roomName + '/' +'canvas',canvas.toDataURL());
}

fchat.onkeyup = function(e){
	if(!fchat.value==''){
	if (e.keyCode == 13) {
		if(fchat.value.charAt(0) != '/'){
		set(roomName + '/chat/length',(Number(get[roomName]['chat'].length)+1).toString());
		set(roomName + '/chat/' + get[roomName]['chat'].length, get['users'][guid].nickname + ': ' + fchat.value);
		loadList('chat',getChat());
		}else{
			var cmd = fchat.value.split(' ');
			if(cmd[0]=='/img'){
				if(cmd.length==2){
					draw = true;
					img.src = cmd[1];
					img.onload = function(){c.drawImage(img,0,0);}
					sendToServer();
					draw = false;
				}
			}
		}
		fchat.value='';
		chat.lastElementChild.scrollIntoView();
	}
	}
}

function getChat(){
	var ch = get[roomName]['chat'];
	var i=0;
	var out=[];
	while(i!=(Number(ch.length)+1)){
		out[i]=ch[i];
		i++;
	}
	return out;
}

function getColor(x,y){
var p = c.getImageData(x, y, 1, 1).data;
bbb = p;
return rgbToHex(p[0],p[1],p[2]);
}

function createCursor(x,y,nik){
	var k = document.createElement('div');
	k.innerHTML='<img src="img/cursor.png"><p>' + nik + '</p>';
	k.className = 'cursor';
	k.style.left = x-24 + 'px';
	k.style.top = y + 'px';
	document.body.appendChild(k);
}

function showCursors(){
	var ceo;
	ceo = matchOnline();
	var i=0;
	deleteCursors();
	while(i!=ceo.length){
        if(get['users'][ceo[i]] != undefined){
		if(get['users'][ceo[i]]['cursorX'] != undefined){
        if(get['users'][ceo[i]]['cursorY'] != undefined){
        if(get['users'][ceo[i]]['roomName'] == roomName){
		if(ceo[i]!=nickname){
		createCursor(get['users'][ceo[i]]['cursorX'],get['users'][ceo[i]]['cursorY']);
		}}}}}
	i++;
	}
}

function deleteCursors(){
var paras = document.getElementsByClassName('cursor');

while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
}}

function browserFullscreen(){return window.innerHeight == screen.height};

window.onresize = function(){
	if(browserFullscreen()){
		fullscreenop.className = 'hidebtn';
	}else{
		fullscreenop.className = '';
	}
}

function updAll(){

loadList('onlinetab',matchOnline());

chatV = getChat();

if(chatV.length!=oldChat.length){
loadList('chat',getChat());
oldChat = chatV;
chat.lastElementChild.scrollIntoView();
}

if(get[roomName].kick==true){location.reload();}

if(!draw){loadFromServer();}
}

updAll();

firebase.database().ref('users/').on('child_changed', function(snap){ 
if(curs.checked){showCursors();}
});

firebase.database().ref(roomName + '/chat').on('child_changed', function(snap){ 

loadList('chat',getChat());
oldChat = chatV;
chat.lastElementChild.scrollIntoView();

});

set('users/' + guid + '/roomName',roomName);
firebase.database().ref('users').on('child_changed', function(snap){ 
loadList('onlinetab',matchOnline());
});

firebase.database().ref(roomName).on('child_changed',function(){
     if(!draw){loadFromServer();}
	 if(get['kick']==true){location.reload();}
});

setInterval( function(){set('users/'+ guid + '/uOnline',getUniversalTime());} ,1000);
}else{
alert('Please login in GameME for play game!');
window.open("https://simakyr.github.io/gameME/","_self");
}})};
