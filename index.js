require('dotenv').config();

const express=require('express');
const app = express();
const cors=require('cors');

//importing routes
const generalroute = require('./routers/gen_routes');
const userroute = require('./routers/user_reg_routes')
const {requireSignIn,isAuth}=require('./routers/auth_routes')
const mainroute = require('./routers/con-routes')

// importing db
const { db } = require('./dp/mongoose_db');



db();




app.use(cors());
app.use(express.json());



//custom middleware

app.use('/api',userroute);
app.use('/api',requireSignIn,isAuth,mainroute);
app.use(generalroute)


const PORT=process.env.PORT || 8081;
const server=app.listen(PORT,()=>{
    console.log("app listening", PORT)
})