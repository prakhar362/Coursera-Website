const { Router } = require("express");
const bcrypt = require("bcrypt");
const zod = require("zod");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const jwt_secret_user='abcdefghijkl';
const userRouter = Router();

// Define Zod schema for validation
const signupSchema = zod.object({
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    firstName: zod.string().nonempty("First name is required"),
    lastName: zod.string().nonempty("Last name is required"),
});

// Signup endpoint
userRouter.post("/signup", async (req, res) => {
    try {
        // Validate the request body using Zod
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.status(201).json({
            message: "Signup succeeded",
        });
    } catch (err) {
        if (err instanceof zod.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors,
            });
        }
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

module.exports = userRouter;

userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            jwt_secret_user, // Secret key
            { expiresIn: "1h" } // Token expiration
        );

        // Respond with token
        return res.status(200).json({
            message: "Sign in successful",
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "User purchases endpoint"
    });
});

// Export the user router
module.exports = {
    userRouter
};
