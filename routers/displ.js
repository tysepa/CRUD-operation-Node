// import bodyParser from 'body-parser';
import express from "express";
const router = express.Router()
import Blog from "../models/blog.js"

router.use(express.json());
// router.use(bodyParser.json());
router.get('/',async(req, res)=>{
    try{
        const displ = await Blog.find()
        res.json(displ)
    }catch(err){
        res.send('Error'+ err)
    }
   
})
router.get('/:id',async(req, res)=>{
    try{
        const displ = await Blog.findById(req.params.id)
        res.json(displ)
    }catch(err){
        res.send('Error'+ err)
    }
   
})

router.post('/', async(req, res)=>{
    const blog = await new Blog({
        name: req.body.name,
        tech: req.body.tech,
        sub:  req.body.sub
    })
    try{
        const a1 =await blog.save()
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
router.delete('/:id', async(req, res)=>{
    try{
        await Blog.deleteOne({_id: req.params.id})
        res.json("Blog Deleted!");
    }catch(err){
        res.json({messge:err});
    }
})

router.patch('/:id', async(req, res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        blog.sub = req.body.sub
        const a1 =await blog.save()
        res.json(a1)

    }catch(err){
        res.send(err)

    }
})

export default router 
