const express = require("express");


const { allowUserToUserAppUrl } = require("../middlewares/auth");
const app = express();


const router = express.Router();

const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser, handleLoginUser } = require('../controllers/user');


// Read user or get users
router.get('/',allowUserToUserAppUrl, handleGetAllUsers);

//Create users
router.post("/", handleCreateUser);

//login user
router.post("/login", handleLoginUser);

// delete and update.................
router.route("/: id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router

