import slugify from 'slugify'
import categoryModel from '../../../DB/modle/category.model.js';
import cloudinary from '../../services/cloudinary.js';
export const getcategories = async (req, res) => {
    const categories = await categoryModel.find();
    return res.status(200).json({ message: "success", categories });

}


export const createcategories = async (req, res) => {
    const name = req.body.name.toLowerCase();


    if (await categoryModel.findOne({ name })) {
        return res.status(409).json({ message: "category name already exists" });
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/categories`
    })
    const cat = await categoryModel.create({ name, slug: slugify(name), image: { secure_url, public_id } });
    return res.status(201).json({ message: "success", cat });

}

export const getspecificCategory = async (req, res) => {
    const { id } = req.params;
    const categories = await categoryModel.findById(id);
    return res.status(200).json({ message: "success", categories });

}


export const updateCategory = async (req, res) => {
    try {
        const categories = await categoryModel.findById(req.params.id);
        if (!categories) {
            return res.status(400).json({ message: `invalid category id ${req.params.id}` });
        }
        
        if (req.body.name) {

         if(await categoryModel.findOne({name:req.body.name}).select('name')){
            return res.status(400).json({message:`category ${req.body.name} already exists`})
         }

            categories.name = req.body.name;
            categories.slug = slugify(req.body.name);
        }



        if(req.body.status){
            categories.status=req.body.status;
        }
        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/categories` })
            await cloudinary.uploader.destroy(categories.image.public_id);
            categories.image = { secure_url, public_id };
        }
        await categories.save();

        return res.status(200).json({ message: "success" });

    }
    catch (err) {
        return res.status(500).json({ message: "error", err: err });

    }

}

export const getActiveCategory = async (req, res) => {
try{
    const categories = await categoryModel.find({status:'Active'}).select('name');
    return res.status(200).json({ message: "success", categories });
}
catch(err){
    return res.json({err:err.stack})
}
}
