//to avoid backtracking and circular dependencies from passing
//secret token jwt for both the user and admin from routes dir to middlwares files 

const jwt_secret_user='abcdefghijkl';
const jwt_secret_admin='pqrstuvwxyz';

module.exports={
jwt_secret_admin,
jwt_secret_user
};