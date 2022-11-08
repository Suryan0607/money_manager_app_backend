const express = require('express');
const router = express.Router();

router.get('/hello',async(req,res)=>{
    const username=req.query.name;
   await res.status(200).send(`Hello ${username?? ""}! How are you? `);  
});
 
module.exports=router;