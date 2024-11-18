const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/course/purchase", function(req, res) {
    // you would expect the user to pay you money
    res.json({
        message: "signup endpoint"
    })
})

courseRouter.get("/courses", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    courseRouter
};
