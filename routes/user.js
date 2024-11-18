const { Router } = require("express");
const userRouter = Router();
//Basic workflow/sop how routes in js work.
// Define user-related endpoints
userRouter.post("/signup", (req, res) => {
    res.json({
        message: "User signup endpoint"
    });
});

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
