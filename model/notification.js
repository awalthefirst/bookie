var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var MessageSchema = new Schema({
 
});

var obj = {
   getMessDb: function () {
    return mongoose.model('Message', MessageSchema);
  },
  
};



//mongo
module.exports = obj;