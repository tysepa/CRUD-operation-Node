import express from'express';


const app =express();




//Routes
/**
 * @swagger
 * /api/Blogs:
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
 * /api/blogs/:id:
 *  put:
 *     tags:
 *        - ID param
 *     description: Put by id
 *     parameters:
 *          - name: id
 *            description: id to Put by
 *            in: path
 *            type: integer
 *            required: true
 *     responses:
 *         '200':
 *            description: A success response
 */

 app.put('/api/blog/:id',(req, res)=>{
    console.log("request");
    res.status(201).send("successfully updated blog");
});

/**
 * @swagger
 * /api/blogs/:id:
 *  delete:
 *     tags:
 *        - ID param
 *     description: Delete by id
 *     parameters:
 *          - name: id
 *            description: id to delete by
 *            in: path
 *            type: integer
 *            required: true
 *     responses:
 *         '200':
 *            description: A success response
 */

 app.delete('/blog/:id',(req, res)=>{
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


/**
 * @swagger
 * /api/blogs/:id:
 *  get:
 *     tags:
 *        - ID param
 *     description: Get by id
 *     parameters:
 *          - name: id
 *            description: id to get by
 *            in: path
 *            type: integer
 *            required: true
 *     responses:
 *         '200':
 *            description: A success response
 */
 app.get('/api/blogs/:id',(req, res)=>{
    console.log('request');
    res.status(200).send("get blog on id")
})



export default app