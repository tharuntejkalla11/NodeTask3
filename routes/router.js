const express = require("express");
const getAutoSuggestUsers=require('../controllers/routecontroller.js').getAutoSuggestUsers;

const getUserByID =require('../controllers/routecontroller.js').getUserByID;
const readData=require('../controllers/routecontroller.js').readData;
const createUser=require('../controllers/routecontroller.js').createUser;
const updateUser=require('../controllers/routecontroller.js').updateUser;
const deleteUser=require('../controllers/routecontroller.js').deleteUser;
const router = express.Router();


router.get("/:loginsubstring/:limit", getAutoSuggestUsers);
router.get("/:id", getUserByID);
router.get("/", readData);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser)

module.exports={
    router:router
}