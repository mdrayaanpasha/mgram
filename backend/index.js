import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from "bcrypt"

const app = express();
const port = 5000;
const mongoURI = 'mongodb://localhost:27017/mgram';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));


//models
import UserModel from "./DB/userModel.js";

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API');
});

app.post("/api/reg",async(req,res)=>{

    const {username,email,password} = req.body;

    //first lets check if user with this email already exists

    

    try{
        const [existingEmailUser,existingUsername] = await Promise.all([
            UserModel.findOne({email: email}),
            UserModel.findOne({username: username})
        ]);

        if (existingEmailUser || existingUsername) {
            return res.status(409).json({message:"Email or Username already exists"});
        }else{
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(password, saltRound);
    
            const newUser = await UserModel.create({username:username,email:email,password:hashedPassword});
            res.status(201).json({message:"User registered successfully"});
        }
        
    }catch(error){
        res.status(500).json({error:error.message});
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
