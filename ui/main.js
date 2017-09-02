///////submit button
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    console.log('under submit');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200) {
                  submit.value = 'Sucess!';
                  console.log('success');
                  alert('Sucess!');
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
                  
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
        }
        
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://gobhavyaarora15.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type', 'application/json');
    console.log('after post');
    request.send(JSON.stringify({username:username,password:password}));
    console.log('after json');
   
};

var submitRe=document.getElementById('submit_btnRe');
submitRe.onclick=function(){
    console.log('under submit');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200) {
                  submitRe.value = 'Sucess!';
                  console.log('success');
                  alert('Sucess!');
              } else if (request.status === 403) {
                  submitRe.value = 'Invalid credentials. Try again?';
                  
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submitRe.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submitRe.value = 'Login';
              }
        }
        
    };
    var username=document.getElementById('usernameRe').value;
    var password=document.getElementById('passwordRe').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://gobhavyaarora15.imad.hasura-app.io/create-user',true);
    request.setRequestHeader('Content-Type', 'application/json');
    console.log('after post');
    request.send(JSON.stringify({username:username,password:password}));
    console.log('after json');
   
};

