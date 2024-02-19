import cartModel from "../../../DB/modle/cart.model.js";
import couponModel from "../../../DB/modle/coupon.model.js";
import orderModel from "../../../DB/modle/order.model.js";
import productModel from "../../../DB/modle/product.model.js";



export const createOrder = async (req, res, next) => {
    const { couponName } = req.body;
    const cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart) {
        return next(new Error(`cart is empty`, { cause: 400 }));
    }
    req.body.products = cart.products;

    //return res.json(req.body.products);

    if (couponName) {
        const coupon = await couponModel.findOne({ name: couponName });


        if (!coupon) {
            return next(new Error(`coupon not found`, { cause: 404 }));
        }

        const currentDate = new Date();

        if (coupon.expireData <= currentDate) {
            return next(new Error(`this coupon has expried`, { cause: 404 }));
        }
        if (coupon.useBy.includes(req.user._id)) {
            return next(new Error(`coupon already used`, { cause: 404 }));
        }

        req.body.coupon = coupon;
    }
    let subTotel = 0;
    let finalProductList = [];
    for (let product of req.body.products) {
        const checkProduct = await productModel.findOne({
            _id: product.productId,
            stock: { $gte: product.quantity }
        })

        if (!checkProduct) {
            return next(new Error(`product quantity not availble`, { cause: 404 }));
        }
        product = product.toObject();
        product.name = checkProduct.name;
        product.unitPrice = checkProduct.price;
        product.discount = checkProduct.discount;
        product.finalPrice = product.quantity * checkProduct.finalProductList;

        subTotel += product.finalProductList;
        finalProductList.push(product);
    }
    const user = await userModel.findById(req.user._id);
    if (!req.user.address) {
        req.user.address = user.address;
    }
    if (!req.user.phone) {
        req.user.phone = user.phone;
    }
    const order = await orderModel.create({
        userId: req.user._id,
        products: finalProductList,
        finalPrice: subTotel - (subTotel * (req.body.coupon?.amount || 0) / 100),
        address: req.user.address,
        phoneNumber: req.user.phone,
        couponName: req.user.couponName,
    });

    for (let product of req.body.products) {
await productModel.updateOne({_id:product.productId},{$inc:{$stock:-product.quantity}})
    }
if(req.body.coupon){
    await productModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})
}
await cartModel.updateOne({userId:req.user._id},{products:[]})


    return res.status(201).json({message:"success",order});
}



