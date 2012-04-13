var error = function(){ 
};

error.prototype = {

  reason : function(data)
{
  var text;
  if(data=="sci")
  
    text = "Now, please log in!" ;
  else if(data=="uua")
    text = "This username has already been taken!";
  else if(data=="sep")
    text = "your session just expired!";
  else
    text = "Hello! Please log in!";
  return text;
},
  text : String 
  };

module.exports = new error();
