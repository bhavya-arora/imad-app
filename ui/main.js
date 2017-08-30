////////This is for when click me button is clicked//////

var button=document.getElementById('counter');
button.onclick=function(){
    
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span=document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        
    };
    request.open('GET','http://gobhavyaarora15.imad.hasura-app.io/counter',true);
    request.send(null);
   
}