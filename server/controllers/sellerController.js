
import jwt from "jsonwebtoken"

// Login Seller : Api /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const {email,password} = req.body
        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"30d"})
            res.cookie("sellerToken",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:process.env.NODE_ENV === "production" ? 'none':"strict",
                maxAge:30*24*60*60*1000
            })
            return res.json({success:true, message:"Login Successfully"})
        }else {
            return res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error.message)
        return res.json({success:false, message: error.message });
    }
}

// Seller isAuth : Api /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        
        return res.json({success:true,user})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false, message: error.message });
    }
}

// Seller isAuth : Api /api/seller/logout
export const sellerlogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none':"strict",
        });
        return res.json({success:true, message:"Logout Successfully"});
    } catch (error) {
        console.log(error.message)
        return res.json({success:false, message: error.message });
    }
};