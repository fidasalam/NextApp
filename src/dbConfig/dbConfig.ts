import mongoose, { connection } from 'mongoose';

export async function connect() {
    
    try{

        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true // Add this line to avoid deprecation warning
          });
          console.log('Database Connection Established');

    }catch(error){
        console.log("something wrong")
    }
}