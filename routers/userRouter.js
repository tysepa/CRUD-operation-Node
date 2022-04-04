import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js"

const router = express.Router()
import jwt from'jsonwebtoken';

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
      jwt.verify(req.token, 'secret', (err, authData) => {
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

  export default router;