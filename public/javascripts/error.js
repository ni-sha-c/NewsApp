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
  else if(data=="nl")
    text = "Hello! Please log in!";
  else if(data=="jpa")
    text = "Your article has been successfully posted!";
  else if(data=="cpa")
    text = "your article couldn't be posted!";
  return text;
},
  text : String 
  };

module.exports = new error();
