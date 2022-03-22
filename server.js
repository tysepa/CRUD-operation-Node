import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import appRouter from "./swagger/app.js"
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

const port= process.env.PORT || 5000;

app.use('/displ', displRouter)
app.use('/blog', appRouter);
app.use(bodyParser.json());

<<<<<<< HEAD
=======



>>>>>>> second
const mongoURI =process.env.connectionDb;

mongoose.connect( mongoURI,{
    useNewUrlParser: true,
     useUnifiedTopology: true
    });

mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected');
})
app.use(express.json());
import displRouter from "./routers/displ.js";

app.listen(port, ()=>{

    console.log(`connection lisyen on ${port}`);
})

<<<<<<< HEAD
app.listen(port, ()=>{
    console.log(`connection lisyen on ${port}`);
})
=======
export default app;
//use env file
>>>>>>> second
