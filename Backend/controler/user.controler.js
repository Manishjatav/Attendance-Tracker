import User from "../model/user.js";
import Subject from "../model/subject.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. only email se user find karo
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please Register first.",
            });
        }

        // 2. password compare karo (bcrypt)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // 3. JWT token generate
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 4. response me token bhejo
        return res.status(200).json({
            success: true,
            token,   // ⭐ THIS IS NEW (IMPORTANT)
            userId: user._id,
            name: user.name,
            message: "Login Successful",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};



export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // 1. required fields
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    // 2. email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        });
    }

    next();
};



export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    if (password.length < 5) {
        return res.status(400).send("Password must be at least 6 characters");
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send("Please enter a valid email");
    }

    if (name.length < 3) {
        return res.status(400).send("Password must be at least 6 characters");
    }

    next(); //middle ware expressc
};



export const createAccount = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
        }

        // 2. Hash password ⭐ IMPORTANT
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create empty subject document
        const subjectDoc = await Subject.create({
            subjects: []
        });

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            subjectCollectionId: subjectDoc._id
        });

        // 5. (OPTIONAL but best) Auto login JWT generate
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,   // ⭐ auto login
            userId: user._id,
            name: user.name
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

