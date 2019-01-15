function rst(){ localStorage.clear();location.reload(); }

window.onerror = function(error) {
 a = prompt('We found some problems with GameME \n What we think to do?\n1 - Delete profile\n2 - Reload webpage\n3 - Contine','2')
 if(a==1){ rst(); }
 if(a==2){ location.reload(); }
 if(a==3){ window.onerror = function(){}; }
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
setTimeout(function(){
	
	if(typeof get == undefined){location.reload();}
function getUniversalTime(){
	var dt = new Date;
	return dt.getUTCDate()+'|'+dt.getUTCHours()+':'+dt.getUTCMinutes();
}
	
function download(text, name, type) {
  var a = document.getElementById("a");
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
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

var continueOnOtherDevice = document.getElementById('continueOnOtherDevice');
var continueThisDevice = document.getElementById('continueThisDevice');

var createVip = document.getElementById('createVip');

var guid;

var argUrl = window.location.search.replace('?','').split('&');

function detectVip(){
	if(argUrl.length!=0){
		
	}
}

saveop.onclick = function(){
	canvas.toBlob(function(blob){
	a.href = URL.createObjectURL(blob);
	a.download = 'YouArtwork';
	a.click();
	},'image/png',1);
}

fullscreenop.onclick = function(){
	openFullscreen(document.body);
}

continueOnOtherDevice.onclick = function(){
prompt('Don\'t give it code to other people!',localStorage['guid'].hexEncode());
}

continueThisDevice.onclick = function(){
	var code = prompt('Enter code what you see on first device:' , );
	if(code.length>10){
		localStorage['guid'] = code.hexDecode();
		location.reload();
	}
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

function generateUserID(){
	date = new Date;
	return date.toString();
}

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

if(localStorage['guid'] == undefined){
localStorage['guid'] = generateUserID();

guid = localStorage['guid'];

var result = prompt('Enter nickname:', 'anonymous');
if(result.length < 3||!findNickname(result)){
	result = randNick();
}

set(guid + '/c', 'created');
set(guid + '/nickname', result);
set(guid + '/online', 'true');
set('guid' + '/length', (Number(get['guid'].length) + 1).toString());
set('guid/' + get['guid'].length,guid);
nickname = result;
}else{
	guid = localStorage['guid'];
	nickname = get[guid].nickname;
	set(guid + '/online', 'true');
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

guid = localStorage['guid'];

if(get[guid] == undefined){rst();}

styfcolor.style.backgroundColor = get[guid].color;
color.value = get[guid].color;

size.value = get[guid].size;

if(get[localStorage['guid']].chaten == undefined){
	set(localStorage['guid'] + '/chaten',true);
	set(localStorage['guid'] + '/onlineen',true);
	set(localStorage['guid'] + '/cusor', true);
}

curs.checked = get[localStorage['guid']].cusor;
onlineen.checked = get[localStorage['guid']].onlineen;
chaten.checked = get[localStorage['guid']].chaten;

curs.onchange = function(){ deleteCursors(); set(localStorage['guid'] + '/cusor',curs.checked);}
chaten.onchange = function(){
	set(localStorage['guid'] + '/chaten',chaten.checked);
	hideChatOrOnline();
}
onlineen.onchange = function(){
	set(localStorage['guid'] + '/onlineen',onlineen.checked);
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
	var i=0;
	var c=0;
	var out = [];
	var hel;
	var lenghtmax = Number(get['guid'].length)
	while(i!=lenghtmax+1){
		if(get[get['guid'][i]].uOnline != undefined){
		if(get[get['guid'][i]].uOnline == getUniversalTime()){
		out[c]=get[get['guid'][i]].nickname;
		c++;
		}}
		i++;
	}
	return out;
}

color.onchange = function(){
	set(guid + '/color',color.value);
	styfcolor.style.backgroundColor = color.value;
}

size.onchange = function(){
	set(guid + '/size', size.value);
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

document.onpointermove = function(e){
	if(curs.checked){
set('users/'+nickname + '/x',e.pageX);
set('users/'+nickname + '/y',e.pageY);
set('users/'+nickname + '/mouse',true);
	}else{
	set('users/'+nickname + '/mouse',false);	
	}
}

canvas.onpointermove = function(e){
	if(draw){
		
var xMouse;
var yMouse;
var t;
t = e;

if (t.pageX || t.pageY) { 
  xMouse = t.pageX;
  yMouse = t.pageY;
}
else { 
  xMouse = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  yMouse = t.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
} 
xMouse -= canvas.offsetLeft;
yMouse -= canvas.offsetTop;

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

if(live.checked){
sendToServer();
loadFromServer();
}
	}
}
canvas.onpointerup = function(){
	draw=false;
	if(!live.checked){
sendToServer();
loadFromServer();
}

}
canvas.onpointerdown = function(e){
	draw=true;
	
var xMouse;
var yMouse;
var t;
t = e;

if (t.pageX || t.pageY) { 
  xMouse = t.pageX;
  yMouse = t.pageY;
}
else { 
  xMouse = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  yMouse = t.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
} 
xMouse -= canvas.offsetLeft;
yMouse -= canvas.offsetTop;

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

	if(instrument == 'picker'){
		
		color.value = decimalToHexString(getColor(xMouse,yMouse));
		styfcolor.style.backgroundColor = color.value;
	}
c.fillStyle = color.value;
}

function sendToServer(){
	set('canvas',canvas.toDataURL());
}

fchat.onkeyup = function(e){
	if(!fchat.value==''){
	if (e.keyCode == 13) {
		if(fchat.value.charAt(0) != '/'){
		set('chat/length',(Number(get['chat'].length)+1).toString());
		set('chat/' + get['chat'].length, get[guid].nickname + ': ' + fchat.value);
		loadList('chat',getChat());
		}else{
			var cmd = fchat.value.split(' ');
			if(cmd[0]=='/rst'){rst();}
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
return rgbToHex(p[0],p[1],p[2]);
}

function createCursor(x,y,nik){
	var k = document.createElement('div');
	k.innerHTML='<img src="img/cursor.png"><p>' + nik + '</p>';
	k.className = 'cursor';
	k.style.left = x-14 + 'px';
	k.style.top = y + 'px';
	document.body.appendChild(k);
}

function showCursors(){
	var ceo;
	ceo = matchOnline();
	var i=0;
	deleteCursors();
	while(i!=ceo.length){
		if(get['users'][ceo[i]] !=undefined){
		if(ceo[i]!=nickname){
		if(get['users'][ceo[i]].mouse){
		createCursor(get['users'][ceo[i]].x,get['users'][ceo[i]].y,ceo[i]);
		}}}
	i++;
	}
}

function randW(){
	return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);	
}

function randNick(){
var nico = 'SimaKyr';while(!findNickname(nico)){nico = randW();}return nico;
}

function findNickname(niks){
	var i=0;
	while(get['guid'].length!=i){
		if(get[get['guid'][i]].nickname == undefined){
		set(get['guid'][i] + '/nickname',randNick());	
		}
		
		if(get[get['guid'][i]].nickname == niks){
			return false;
		}
		i++;
	}
	return true;
}

function deleteCursors(){
var paras = document.getElementsByClassName('cursor');

while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
}}

nickset.value = nickname;

sNick.onclick = function(){
	if(findNickname()){
		nickname = nickset.value;
		set(localStorage['guid'] + '/nickname',nickname);
	}
	else{
		alert('It nickname use other people')
	}
}
function browserFullscreen(){return window.innerHeight == screen.height};

window.onresize = function(){
	if(browserFullscreen()){
		fullscreenop.className = 'hidebtn';
	}else{
		fullscreenop.className = '';
	}
}

var timO;

d=new Date;

var TimeOld = d.getUTCSeconds()+1;
timO = setInterval(function(){
	d=new Date;
	if(TimeOld!=d.getUTCSeconds()){
		
		clearInterval(timO);
		
var timOnl = setInterval(function(){
set(guid + '/uOnline',getUniversalTime());

loadList('onlinetab',matchOnline());
chatV = getChat();
if(chatV.length!=oldChat.length){
loadList('chat',getChat());
oldChat = chatV;
chat.lastElementChild.scrollIntoView();
}

if(get['kick']==true){location.reload();}
}
,500);}},1);

var tim = setInterval(function(){
if(!draw){loadFromServer();}
if(curs.checked){showCursors();}
},20);
}
,2500);