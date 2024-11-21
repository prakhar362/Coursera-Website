const { Router } = require("express");
const bcrypt = require('bcrypt');
const zod = require("zod");
var jwt = require('jsonwebtoken');
const jwt_secret_admin='pqrstuvwxyz';
const adminRouter = Router();
const { adminModel } = require("../db");



// Define Zod schema for validation
const signupSchema = zod.object({
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    firstName: zod.string().nonempty("First name is required"),
    lastName: zod.string().nonempty("Last name is required"),
});

adminRouter.post("/signup", async function(req, res) {
    try {
        // Validate the request body using Zod
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        await adminModel.create({
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


adminRouter.post("/signin",async function(req, res) {

    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const passMatch = await bcrypt.compare(password, admin.password);

        if (!passMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email }, // Payload
            jwt_secret_admin, // Secret key
            { expiresIn: "1h" } // Token expiration
        );

        // Respond with token
        return res.status(200).json({
            message: "Sign in successful",
            token,
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
})

adminRouter.post("/course", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/course", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}