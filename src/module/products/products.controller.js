import slugify from "slugify";
import subcategoryModel from "../../../DB/modle/subcategory.model.js";
import categoryModel from "../../../DB/modle/category.model.js";
import cloudinary from "../../services/cloudinary.js";
import productModel from "../../../DB/modle/product.model.js";

export const getproducts = (req,res)=>{
return res.json({message:"products"});

}

export const createProduct = async(req,res)=>{
const {name,price,discount,categoryId,subcategoryId}=req.body;
const checkCategory = await categoryModel.findById(categoryId);
if(!checkCategory){
    return res.status(404).json({message:"category not found"});
}
const checkSubCategory = await subcategoryModel.findById(subcategoryId);
if(!checkSubCategory){
    return res.status(404).json({message:" sub category not found"});
}req.body.slug=slugify(name);
req .body.finalPrice=price-(price*(discount || 0)/100).toFixed(2);

const {secure_url,public_id} =await cloudinary.uploader.upload(req.files.mainImage[0].path,{
    folder:`${process.env.APP_NAME}/Product/${req.body.name}/mainImage`
});
req.body.mainImage={secure_url,public_id};
req.body.subImage=[];
for(const file of req.files.subImage){
    const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
        folder:`${process.env.APP_NAME}/product/${req.body.name}/subImage`
    });
    req.body.subImage.push({secure_url,public_id});
}
req.body.createdBy=req.user._id;
req.body.updateBy=req.user._id;
const product=await productModel.create(req.body);
if(!product){
    return res.status(400).json({message:"error while creating product"});

}
return res.status(400).json({message:"success",product});

}

export const getproductsWithCAtegory = async(req,res)=>{
    const products=await productModel.find({categoryId:req.params.categoryId});
    return res.json({message:"success",products});
    
    }

    export const getproduct = async(req,res)=>{
        const product=await productModel.findById(req.params.productId);
        return res.json({message:"success",product});
        
        }




