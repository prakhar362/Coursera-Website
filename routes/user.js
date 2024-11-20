const { Router } = require("express");
const bcrypt = require("bcrypt");
const zod = require("zod");
const { userModel } = require("../db");

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


userRouter.post("/signin", (req, res) => {
    res.json({
        message: "User signin endpoint"
    });
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
