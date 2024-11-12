import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
    
    Learn:{
        type: String
    },
    Teach:{
        type: String
    },
    Message:{
        type:String,
    },
    College:{
        type: String
    },
    Username:{
        type: String
    }
});

const PostModel = mongoose.model('PostModel', userSchema);

export default PostModel
