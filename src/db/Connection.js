import mongoose from "mongoose";
import {DB_Name} from '../constants.js'

const DBConnect = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log(`\n MongoDB connected !! DB Host : ${
            connectionInstance.connection.host
        }`);
    }
    catch(error){
        console.log("An Error Occured" , error);
        process.exit(1);
    }
}

export default DBConnect;