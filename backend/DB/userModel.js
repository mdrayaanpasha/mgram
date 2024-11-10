import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
    email: {
        type: String,
    },
    username: {
        type: String,     
    },
    password: {
        type: String,
    },
    
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel
