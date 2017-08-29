console.log('Loaded!');

var element=document.getElementById('main-text');
element.innerHTML='Hello This is Changed Text';

////Lets move the image
var img=document.getElementById('madi');
img.onClick=function(){
    img.style.marginLeft='100px';
}