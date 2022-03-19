import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
tech:{
    type:String,
    required: true
},
sub:{
    type:Boolean,
    required: true,
    default: false
}

})

const Blog = mongoose.model('Blog',blogSchema)
export default Blog