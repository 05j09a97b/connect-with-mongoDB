const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


//Load env vars
dotenv.config({path:'./config/config.env'});

//connect to database
connectDB();

//route files
const hospitals = require('./routes/hospitals');
const app = express();

//add body parser
app.use(express.json());
app.use('/api/v1/hospitals',hospitals);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT,console.log('Server running in',process.env.NODE_ENV,'mode on port',PORT));

//handle unhandled promises rejections
process.on('inhandleRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close Server & exit process
    server.close(()=>process.exit(1));
});
