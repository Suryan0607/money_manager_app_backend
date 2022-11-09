const express = require('express');
const router = express.Router();
const User = require('../models/usermodels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//signup
router.post("/signup", async (req, res) => {
    try {
        const payload = req.body;

        const salt = await bcrypt.genSalt(10);

        payload.hashed_password = await bcrypt.hash(payload.password, salt);

        delete payload.password;

        let user = new User(payload);

        await user.save((err, data) => {
            if (err) {

                return res.status(400).send({
                    message: "Some Error While Registering..."
                });
            }
            return res.status(201).send({
                message: "User Has Been Registered Successfully.",
                data: data.hashedPassword,
            })


        })
    } catch (error) {
       
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }

});

//signin
router.post("/signin", async (req, res) => {
    try {  
        const { email, password } = req.body;

        const existingUser = await User.find({ email: email });


        if (existingUser) {

            const isValidUser = await bcrypt.compare(password, existingUser[0].hashed_password);
            
            if (isValidUser) {
                const token = jwt.sign({ _id: existingUser[0]._id }, process.env.SECRET_KEY);


                res.cookie('entryToken', token, {
                    expires: new Date(Date.now() + 9999999),
                    httpOnly: false
                });

                const { _id, username, email } = existingUser[0];
                return res.status(200).json({ token: token, user: { _id, email, username } });

            }

            return res.status(400).send({
                message: "Email/Password Are Not Valid."
            })
        }
        return res.status(400).send({
            message: "User Doesn't Exist."
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

//signout
router.get("/signout", async (req, res) => {
    await res.clearCookie('entryToken');

    return res.status(200).send({
        message: "Successfully Signed Out!"
    })
});

//getuser

router.get('/user/:id', (req, res) => {
    try{
        User.find({_id: req.params.id},(err, data) => {
            if(err){
               return res.status(400).send('Error while getting the User details')
            }
            res.status(200).send(data);
        })
   }catch(err){
       res.status(500).send('Internal Server Error');
   }
});

//update
router.put('/user/:id',  (req, res) => {
try{
    User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true},
        (err, data) => {
            if(err){
                return res.status(400).json({
                    error: "Error while updating user"
                });
            }

            return res.status(201).json(data);
        });
    }
    catch(err){
        res.status(500).send('Internal Server Error', err)
    }
})

//delete
router.delete('/user',  (req, res) => {
    try {
    User.deleteOne({ _id: req.body },
        (err, Data) => {
            if (err) {
                return res.status(400).send('Error While Removing User')
            }
            res.status(201).send("Account Deleted Successfully")
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    };
})




module.exports = router;






