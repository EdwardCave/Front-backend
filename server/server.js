import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js'
import connectDB from './configs/db.js';
import 'dotenv/config'; // Load environment variables from .env file
import sellerRouter from './routes/sellerRouter.js';
import connnectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import addressRouter from './routes/addressRouter.js';
import orderRouter from './routes/orderRouter.js';
 // Load environment variables from config.env file    
const app = express()

const port = process.env.PORT || 4000

await connectDB()
await connnectCloudinary()


// // Allow multiple origins
const allowedOrigins = ['http://localhost:5173','https://vercel.com/evisus-projects/front-backend-two']

// Middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins, credentials:true}))

app.get('/', (req, res) => { res.send('API is running...')})

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
  console.log(`Server is running  on http://localhost:${port}`)
})