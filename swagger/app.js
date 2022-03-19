import express from'express';
import swaggerJsdoc from'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';

const app =express();


const swaggerOptions ={
    swaggerDefinition:{
        info:{
            title:'Blog API',
            description:'Blog API Information',
            contact:{
                name:'amazing Developer'
            },
            servers:["http://localhost:4000"]
        }

    },
    //['.router/*.js']
    apis:["app.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
/**
 * @swagger
 * /Blogs:
 *  get:
 *    description: Use to request all blogs
 *    responses:
 *        '200':
 *         description: A success response
 */

app.get('/api/blogs',(req, res)=>{
    console.log("request");
    res.status(200).send("blog results");
});

/**
 * @swagger
 * /blog:
 *  put:
 *    description: Use to update a blogs
 *    responses:
 *        '201':
 *         description: A successful response
 */

 app.put('/api/blog',(req, res)=>{
    console.log("request");
    res.status(201).send("successfully updated blog");
});

/**
 * @swagger
 * /blog:
 *  delete:
 *    description: Use to delete a blog
 *    responses:
 *        '200':
 *         description: A successful response
 */

 app.put('/:id',(req, res)=>{
    console.log("request");
    res.status(200).send("successfully deleted blog");
});

/**
 * @swagger
 * /blog:
 *  post:
 *    description: Use to add a blog
 *    responses:
 *        '200':
 *         description: A successful response
 */

 app.post('/blog',(req, res)=>{
    console.log("request");
    res.status(200).send("successfully created blog");
});




export default app