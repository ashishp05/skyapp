import ValidationError from '@/utils/ValidationError';
import mongoose from 'mongoose';

mongoose.connection.on("connected", () => {
    console.log("Database Connection Established");
});
mongoose.connection.on("reconnected", () => {
    console.log("Database Connection Reestablished");
});
mongoose.connection.on("disconnected", () => {
    console.log("Database Connection Disconnected");
});
mongoose.connection.on("close", () => {
    console.log("Database Connection Closed");
});
mongoose.connection.on("error", (error) => {
    console.log("Database ERROR: " + error);
});

const DB_URL = process.env.DB_URL 

if(!DB_URL)
    throw new ValidationError("Database Url is not defined.")

let isConnected = false ;

export const connectDB = async () => {
    if(isConnected) return;
    try {
        await mongoose.connect(DB_URL)
        isConnected = true
            var db = mongoose.connection;
    db.once("open", function () {
        callback();
    });
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = { mongoose , connectDB}