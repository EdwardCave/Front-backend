import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>
        console.log('Database Connected,I am happy')
        );
    await mongoose.connect(`${process.env.MONGODB_URI}`)
   
    } catch (error) {
        console.error(`Error: ${error.message}`);
       
    }
};
export default connectDB;


