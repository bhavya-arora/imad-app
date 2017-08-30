////////This is for when click me button is clicked//////

var button=document.getElementById('counter');
var span=document.getElementById('count');
span.innerHTML=2;
var counter=0;
button.onclick=function(){
    counter = counter+1;
    span.innerHTML=counter.toString();
}