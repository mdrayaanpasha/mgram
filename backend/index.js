import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import PostModel from './DB/postModel.js';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';
import path from "path"

dotenv.config();

const app = express();
const port = 5000;
const mongoURI = 'mongodb://localhost:27017/mgram';
app.use(express.static("avatars"));


app.use(cors());
app.use(helmet()); // For enhanced security headers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

// Import Models
import UserModel from './DB/userModel.js';

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API');
});

// Register Route
app.post("/api/reg", [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, email, password,college, Img } = req.body;
    console.log(Img)
    try {
        const [existingEmailUser, existingUsername] = await Promise.all([
            UserModel.findOne({ email: email }),
            UserModel.findOne({ username: username })
        ]);

        if (existingEmailUser || existingUsername) {
            return res.status(409).json({ message: "Email or Username already exists" });
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await UserModel.create({ username, email, password: hashedPassword,college, ImgPath: Img });
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '60d' });

            console.log(token);
            res.status(201).json({ userToken: token, message: "User registered successfully" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
app.post('/api/log', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '60d' });
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/api/fetchUserInfo",async(req,res)=>{
    const token = req.body.token

    if(!token) return res.status(401).json({ error: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        res.status(200).json({User: user});
    } catch (error) {
        res.status(401).json({ error: 'Not authorized' });
    }
    
})

app.post("/api/userPost",async(req,res)=>{
    const data = req.body.Data;

    try {
        await PostModel.create(data);
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating post"});
    }
})


app.post("/api/getUserInfo",async(req,res)=>{
    const token = req.body.token;
    console.log("i cmae here")
    if(!token) res.status(403).json({ message: "Not Authorized"});
    
    const decoded  = jwt.verify(token,process.env.JWT_SECRET);
    try {
        let user = await UserModel.findById(decoded.id);
        user.password = "YOU-WONT-GET-IT-SUCKER!!!#!@#!@#!@#!@#!#";

        res.status(200).json({ userData: user });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
