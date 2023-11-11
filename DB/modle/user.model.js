import mongoose,{Schema,model} from "mongoose";
const UserSchema = new  Schema ({
userName:{
type:String,
required:true,
min:4,
max:5

},

email:{
    type:String,
    required:true,
    unique:true,  
},

password:{
    type:String,
    unique:true, 
},
image:{

  type:Object,  
},
phone:{
    type:String, 
},

address:{
    type:String,
},
confirmEmail:{
    type:Boolean,
    default:false,
    
},

gender:{
    type:String,
    enum:['Male','Female'],
},
statuse:{
type:String,
default:'Active',
enum:['Active','Inactive'],

},

role:{
type:String,
default:'User',
enum:['User','Admin'],

},

},{
timestamps:true,}


);

const userModel = mongoose.models.User || model('User',UserSchema);
export default userModel;

