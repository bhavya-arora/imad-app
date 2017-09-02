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

var register=document.getElementById('submit_btnRe');
register.onclick=function(){
    console.log('Onclick');
  var request=XMLHttpRequest();
  request.onreadystatechange=function(){
      ////This is a call back
     if(request.readyState === XMLHttpRequest.DONE){
         console.log('under done');
         if(request.status===200){
             console.log('200 request');
             alert('Registered');
         }else{
             register.value='Something went wrong';
         }
         
     }
  };
  var username=document.getElementById('usernameRe');
  console.log(username);
  var password=document.getElementById('passwordRe');
  console.log(password);
  request.open('POST','http://gobhavyaarora15.imad.hasura-app.io/create-user',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username,password:password}));
  console.log('request sent');
};

