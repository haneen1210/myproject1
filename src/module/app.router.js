import connectDB from '../../DB/connection.js';
import categoriesRouter from './categories/categories.router.js';
import productsRouter from './products/products.router.js'

const initApp = (app,express)=>{
app.use(express.json());
connectDB();
app.get('/',(req,res)=>{

    return res .status(200).json({message:"welcom"});
})

app.use('/categories',categoriesRouter);
app.use('/products',productsRouter);
    

app.get("*",(req,res)=>{

    return res .status(500).json({message:"page not found"});
})

}

export default initApp;