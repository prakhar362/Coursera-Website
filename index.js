const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Attach routers to their respective base routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

const port = 3000; // Define the port number

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

