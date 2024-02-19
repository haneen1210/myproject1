import joi from 'joi';
export const generalFields = {
    email: joi.string().email().required().messages({
        'string.empty': "email is required",
        'string.empty': "plz enter a valid email ",
    }),
    password: joi.string().required().min(3).messages({
        'string.empty': "password is required",
    }),
    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),
        //  dest:joi.string(),
    })
}

export const validation = (schema) => {
    return (req, res, next) => {
        const inputsData = { ...req.body, ...req.params, ...req.query };
        if (req.file || req.files) {
            inputsData.file = req.file || req.files;
        }
        //{ abortEarly: false } عشان يطبعلي كل الايرور مش بس يرور واحد
        const vlidationResult = schema.validate(inputsData, { abortEarly: false });
        if (vlidationResult.error?.details) {
            return res.status(400).json({
                message: "validation error",
                validationError: vlidationResult.error?.details
            })
        }
        next();
    }
}