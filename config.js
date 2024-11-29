//to avoid backtracking and circular dependencies from passing
//secret token jwt for both the user and admin from routes dir to middlwares files 
require('dotenv').config();
const jwt_secret_user=process.env.jwt_secret_user;
const jwt_secret_admin=process.env.jwt_secret_admin;

module.exports={
jwt_secret_admin,
jwt_secret_user
};