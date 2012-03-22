var view = require('./view.js');
 
var controller = function() {};
 
controller.prototype = {
   
    supply_view : function(user, callback) {
                 var callback = (typeof callback === 'function') ? callback : function() {};
                  
                     var data = {
                            'user' : user ? user : 'nobody'
                                  };
                      
                      view.renderView('view', data, function(data) {
                                 callback(data);
                                     });
                           }
};
 
module.exports = new controller();
