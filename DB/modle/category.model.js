import mongoose,{Schema,model,Types} from "mongoose";
const categorySchema = new  Schema({
name:{
type:String,
required:true,
unique:true,

},

slug:{
    type:String,
    required:true,

},
image:{
    type:Object,
    required:true,

},

status:{
    type:String,
   default:"Active",
   enum:['Active','Inactive'],

},
createdBy:{type:Types.ObjectId,ref:'User'},
updateBy:{type:Types.ObjectId,ref:'User'},
},{
timestamps:true,}

);

const categoryModel = mongoose.model.User || model('category',categorySchema);
export default categoryModel;
