import slugify from 'slugify'
import postModel from '../models/postModel.js'
import categoryModel from '../models/CategoryModel.js'
import fs from 'fs'
export const createPostController = async(req,res)=>{
    try {
        const {name,category} = req.fields
        const {photo} = req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"})
                case !category:
                    return res.status(500).send({error:"Category is required"})
                    case photo && photo.size > 2000000:
                        return res.status(500).send({error:"photo is required"})
        }
        const post = new postModel({...req.fields,slug:slugify(name)});
        if(photo){
            post.photo.data = fs.readFileSync(photo.path)
            post.photo.contentType = photo.type
        }
        await post.save()
        res.status(201).send({
            success:true,
            message:"Post created successfully",
            post,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in creating post"
        })
        
    }
}

//get post controller==========================================

export const getPostController = async(req,res)=>{
    try {
        const posts = await postModel.find({}).populate("category").select('-photo').limit(50).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            total:posts.length,
            message:"all posts",
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting posts",
            error:error.message
        })
        
    }
}


//get single product controller

export const getSinglePostController = async(req,res)=>{
    try {
        const singlePost = await postModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:"Single Product fetched",
            singlePost
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in getting single post",
            error
        })
    }
}


//get photo
export const postPhotoController = async(req,res)=>{
    try {
        const post = await postModel.findById(req.params.pid).select("photo")
        if(post.photo.data){
            res.set("Content-type",post.photo.contentType)
            return res.status(200).send(post.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in getting photo",
            error
        })
        
    }
}

//delete post controller
export const deletePostController = async(req,res)=>{
    try {
        await postModel.findOneAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"post deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while deleting post",
            error,
        })
        
    }
}

//get post by category

export const postCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const post = await postModel.find({category}).populate('category')
        res.status(200).send({
            success:true,
            category,
            post
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting post",
            error
        })
        
    }
}