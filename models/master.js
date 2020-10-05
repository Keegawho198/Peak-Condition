const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MasterSchema = new Schema({


email:{
    type:String,
},

password:{
    type:String,
},

  name: {
    type: String,
    
  },

  qualifications: {
    type: String,
    
  },
  
  bio: {
    type: String,

    
  },
 
  image: {
    data: Buffer, 
    type: String },


    users:[
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]



  


  

});

const Master = mongoose.model("Master", MasterSchema);

module.exports = Master;