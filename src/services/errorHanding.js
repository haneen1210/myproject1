export const asynHandler = (fun) => {
    return (req, res, next) => {
        fun(req, res, next).catch((error) => {
            //return res.status(500).json({ message: "catch error", error: error.stack });
            return next(new Error(error.stack));
        })
    }
}


export const globalErrorHandler =(err,req,res,next)=>{
    if(err){
        return res.status(err.cause||500).json({message:err.message});
    }
}
