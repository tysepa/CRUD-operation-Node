// import bodyParser from 'body-parser';
import express from "express";
import bcrypt from "bcrypt";
const router = express.Router()
import Blog from "../models/blog.js";
import User from "../models/user.js"

router.use(express.json());


// router.use(bodyParser.json());
// not uses this

import jwt from'jsonwebtoken';

const app = express();

router.get('/api',(req, res)=>{
    res.json({
        message:'welcome on the API'
    });
});


router.post("/register", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
  
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
  
      const resultPost = await newUser.save();
  
      res.status(200).json(resultPost);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //login endpoint
  router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (user) {
            const validPassword = await bcrypt.compare(body.password, user.password);
            if (validPassword) {
                //res.status(200).json({ Message: "User successfully logged in!!" });
                res.status(200).json({
                    message: "User logged in successfully",
                    token: jwt.sign({ email: user.email, fullName: user.name, _id: user._id }, 'epa')
                });
            } else {
                res.status(400).json({ Error: "Invalid Password!!" });
            }
        } else {
            res.status(401).json({ Error: "User does not exist!!" });
        }
    } catch (error) {
        res.status(404).json({ Error: "Internal error"})
    }
  });
  
  
  // Verify Token
   export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
          res.status(401).json({ status: "error", code: "401" , error: "Unauthorized", message: "Access denied. Please login" });
        } else {
          next();
        }
      });
    } else {
      // Forbidden
      res.status(403).json({ status: "error", code: "403" , error: "Forbidden", message: "Access denied. Please login" });
    }
  };
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
