const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },
    email:{
        type: String,
        trim : true,
        required : true,
        unique:32
    },
    phoneNumber:{
         type: Number,
         maxlength:15,
         require:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    

})

module.exports = mongoose.model("User", userSchema)


