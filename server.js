import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsdoc from'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';
import appRouter from "./swagger/app.js"
dotenv.config();


const app = express();

app.use(cors());
const port= process.env.PORT || 5000;


const swaggerOptions ={
    swaggerDefinition:{
        info:{
            title:'Blog API',
            description:'Blog API Information',
            contact:{
                name:'amazing Developer'
            },
            servers:["http://localhost:5000"]
        }

    },
    //['.router/*.js']
    apis:["./swagger/app.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use('/displ', displRouter)
app.use('/blog', appRouter);
app.use(bodyParser.json());

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


export default app;
