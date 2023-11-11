import slugify from "slugify";
import categoryModel from "../../../DB/modle/category.model.js";
import subcategoryModel from "../../../DB/modle/subcategory.model.js";
import cloudinary from "../../services/cloudinary.js";

export const createSubcategory =async(req,res)=>{
const {name,createdId}=req.body;
const subcategory=await subcategoryModel.findOne({name});
if(subcategory){
    return res.status(409).json({message:`sub categry ${name} already exists`})
}
const category= await categoryModel.findById(createdId);

if(!category){
    return res.status(404).json({message:"category not found"});
}

 const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.APP_NAME}/subcategories`
})
const subCategory=await subcategoryModel.create({name,slug:slugify(name),createdId,image:{secure_url,public_id}})
return res.status(201).json({message:"success",subCategory});
}

export const getSubCategories=async(req,res)=>{
    const createdId=req.params.id;
    const category=await categoryModel.findById(createdId);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }
    const subcategories=await subcategoryModel.find({createdId}).populate({
        path:'createdId'
    });
    return res.status(200).json({message:"success",subcategories});
}