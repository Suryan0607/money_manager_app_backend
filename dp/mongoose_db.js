const mongoose = require('mongoose');

exports.db = () =>{
    mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
        console.log('Connection Established....');
    }).catch((err)=> {
        console.log(err);
    })
}