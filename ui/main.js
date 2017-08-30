console.log('Loaded!');

var element=document.getElementById('main-text');
element.innerHTML='Hello This is Changed Text';

////Lets move the image
var img=document.getElementById('madi');
var leftMargin=0;
function moveRight (){
    leftMargin=leftMargin+5;
    img.style.marginLeft=leftMargin+'px';
}
img.onclick = function(){
   setInterval(moveRight,50);
}

////////This is for when click me button is clicked//////

var button=document.getElementById('counter');
var span=document.getElementById('count');
var counter=0;
button.onclick=function(){
    counter = counter+1;
    span.innerHTML=counter.toString();
}