// import bodyParser from 'body-parser';
import express from "express";
const router = express.Router()
import Blog from "../models/blog.js"

router.use(express.json());
// router.use(bodyParser.json());

import jwt from'jsonwebtoken';

const app = express();

router.get('/api',(req, res)=>{
    res.json({
        message:'welcome on the API'
    });
});

router.post('/api/posts',verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{

            res.json({
                message: 'Post create...',
                authData
            });
        }
    })
});

router.post('/api/login',(req, res)=>{
    const user ={
        id:1,
        username:'Epa',
        email:'epa@gmail.com'
    }

    jwt.sign({user}, 'secretkey',(err, token)=>{
        res.json({
            token
        });
    });
});

function verifyToken(req, res, next){
    const beareHeader = req.headers['authorization']; 
     
    if( typeof beareHeader !=='undefined'){
       const bearer = beareHeader.split(' ');
       const bearerToken = bearer[1];
       req.token = bearerToken;
       next();
    }else{
        res.sendStatus(403);
    }
}
router.get('/',verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey',async(err, authData)=>{

        try{
            const displ = await Blog.find()
            res.json(displ)
            authData
        }catch(err){
            res.send('Error'+ err)
        }
    })
   
})
router.get('/:id',verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey',async(err, authData)=>{

        try{
            const displ = await Blog.findById(req.params.id)
            res.json(displ)
            authData
        }catch(err){
            res.send('Error'+ err)
        }
    })
   
})

router.post('/', verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey',async(err, authData)=>{

        const blog = await new Blog({
            name: req.body.name,
            tech: req.body.tech,
            sub:  req.body.sub
        })
        try{
            const a1 =await blog.save()
            res.json(a1)
            authData
        }catch(err){
            res.send('Error')
        }
    })
})
router.delete('/:id', verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey',async(err, authData)=>{

        try{
            await Blog.deleteOne({_id: req.params.id})
            res.json("Blog Deleted!");
        }catch(err){
            res.json({messge:err});
        }
    })
})

router.patch('/:id', verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey',async(err, authData)=>{

        try{
            const blog = await Blog.findById(req.params.id)
            blog.sub = req.body.sub
            const a1 =await blog.save()
            res.json(a1)
            authData
    
        }catch(err){
            res.send(err)
    
        }
    })
})

export default router 
