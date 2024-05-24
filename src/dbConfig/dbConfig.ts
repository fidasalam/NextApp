import mongoose, { connection } from 'mongoose';

export async function connect() {
    
    try{

        await mongoose.connect(process.env.MONGO_URI!)
          console.log('Database Connection Established');

    }catch(error){
        console.log("something wrong")
    }
}
