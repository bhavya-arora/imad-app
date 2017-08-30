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
