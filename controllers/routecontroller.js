const express = require("express");

//const user = require('../data.js').user;
const validators=require('../validators/joivalidations.js').validator
const Joi = require('joi');
let user=[]
const readData = (req, res) => {
  res.send({ user })
}
const getUserByID = (req, res) => {
  const id = req.params.id;
  const position = user.findIndex((users) => users.id === id);
  if (position != -1) {
    res.statusCode = 201;
    res.send(user[position])
  }
  else {
    res.statusCode = 404;
    res.send({ message: `unable to find user with id: ${id}` })
  }

}
const createUser = (req, res) => {
  const data = req.body;
  const isValid = validators(data);
  console.log(isValid.error)
  if ((user.findIndex(users =>
    users.id == data.id) == -1) && isValid.error == undefined) {
    // console.log("cmg1")
    user.push(data)
    res.send(user)
  }
  else {
    if (isValid.error != undefined) {

      res.send(isValid.error)
    }
    else {
      res.send({ message: `The User Already Exsists with id: ${data.id} !!cannot post the data` })
    }
  }
  //res.send(user)
  // res.send({message:"updated successfully"});
}
const updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const isValid = validators(data);

  const position = user.findIndex((users) => users.id === id);
  if (position != -1 && isValid.error == undefined) {
    res.statusCode = 201;
    user[position] = data;
    res.send(user)
    //res.send({message:"added succesfully"})
  }
  else {
    if (isValid.error != undefined) {
      res.send(isValid.error)
    }
    else {
      res.statusCode = 404;
      res.send({ message: "unable to find User" })
    }
  }
  // res.send({message:"updated successfully"});
}
const getAutoSuggestUsers = (req, res) => {
  const loginSubstring = req.params.loginsubstring;
  const limit = req.params.limit
  //console.log(limit)
  const SortedUsers = user.sort((a, b) => {
    a.login.localeCompare(b.login)
  })
  // const SuggestedUsers = SortedUsers.filter((users) => users.login.indexOf(loginsubstring) != -1).slice(0, limit);
  const SuggestedUsers = SortedUsers.filter((users) => users.login.includes(loginSubstring) != false).slice(0, limit);
  res.send(SuggestedUsers)
}
const deleteUser = (req, res) => {
  const id = req.params.id;
  const position = user.findIndex((users) => users.id === id && users.isDeleted === "false");
  //console.log(position)
  if (position != -1) {
    res.statusCode = 201;
    user[position].isDeleted = "true";
    //user.splice(position,1)
    res.send(user)
    //res.send({message:"Deleted succesfully"})
  }
  else {
    res.statusCode = 404;
    res.send({ message: `unable to find User with id: ${id}` })
  }

}
module.exports={
  readData:readData,
  getUserByID:getUserByID,
  createUser:createUser,
  updateUser:updateUser,
  getAutoSuggestUsers:getAutoSuggestUsers,
  deleteUser:deleteUser
}