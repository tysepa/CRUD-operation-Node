import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use('/displ', displRouter)
app.use(bodyParser.json());



const mongoURI ="mongodb+srv://tuyiepa:Epaphrodis@cluster0.vyxlu.mongodb.net/blogs?retryWrites=true&w=majority"
mongoose.connect( mongoURI,{
    useNewUrlParser: true,
     useUnifiedTopology: true
    });

mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected');
})
app.use(express.json());
import displRouter from "./routers/displ.js";

app.listen(5000, ()=>{
    console.log('connection lisyen on 5000');
})