import connectDB from '../../DB/connection.js';
import categoriesRouter from './categories/categories.router.js';
import productsRouter from './products/products.router.js'
import subcategoriesRouter from './subcategory/subcategory.router.js'
import authRouter from './auth/auth.router.js'
import couponRouter from './coupon/coupon.router.js'
import cartRouter from './cart/cart.router.js'
import orderRouter from './order/order.router.js'
import { sendEmail } from '../services/email.js';
import { globalErrorHandler } from '../services/errorHanding.js';
const initApp = async(app,express)=>{
app.use(express.json());
connectDB();
app.get('/',(req,res)=>{

    return res .status(200).json({message:"welcom"});
})
app.use('/auth',authRouter);
app.use('/categories',categoriesRouter);
app.use('/products',productsRouter);
app.use('/supcategory',subcategoriesRouter);
app.use('/coupony',couponRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.get("*",(req,res)=>{

    return res .status(500).json({message:"page not found"});
})
app.use(globalErrorHandler)
}

export default initApp;