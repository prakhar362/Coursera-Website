const { Router } = require("express");
const { userMiddlware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase",userMiddlware,async function(req, res) {
    // you would expect the user to pay you money
    const userId=req.userId;
    const courseId=req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "you have successfully purchased content"
    })
})

courseRouter.get("/preview", async function(req, res) {
    const courses=await courseModel.find({});
    res.json({
        message: "signup endpoint"
    })
})

courseRouter.get("/purchases",userMiddlware,async function(req, res) {
    
    const userId=req.userId;
    const purchases=
    await purchaseModel.find({
        userId,
    });

    res.json({
       purchases
    })
})

module.exports = {
    courseRouter
};
