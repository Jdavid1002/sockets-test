const users = require('../../models/users')
const bcrypt = require("bcryptjs");

const create = async (username, pass) => {

  let error_message = {
    code : 400,
    content : ''
  }

  if(!username){
    error_message ={
      ...error_message,
      content : 'username empty'
    }
  }

  if(!pass){
    error_message ={
      ...error_message,
      content : 'pass empty'
    }
  }

  if(error_message?.content) return error_message;

  let encriptPass = ''

  bcrypt.hash(pass, 10, (err, palabraSecretaEncriptada) => {
    if (err) {
      console.log("Error hasheando:", err);
    } else {
      encriptPass = palabraSecretaEncriptada
    }
  })

  const user = await new users({
    username, 
    pass : encriptPass
  }).save()

  if(!user){
    error_message ={
      ...error_message,
      content : 'Error in create user'
    }
  }

  if(error_message?.message) return error_message;

  return {
    code : 200,
    content : user
  } 
}

const get = async (id) => {

  let error_message = {
    code : 400,
    content : ''
  }

  if(!id){
    error_message ={
      ...error_message,
      content : 'id empty'
    }
  }

  if(error_message?.content) return error_message;

  const response = await users.find({id : id})

  if(!response){
    error_message ={
      ...error_message,
      content : 'Find user error'
    }
  }

  if(error_message?.message) return error_message;

  return {
    code : 200,
    content : response
  } 
}

const login = async (username, pass) => {

  let error_message = {
    code : 400,
    content : ''
  }

  if(!username){
    error_message ={
      ...error_message,
      content : 'id empty'
    }
  }

  if(!pass){
    error_message ={
      ...error_message,
      content : 'id empty'
    }
  }

  if(error_message?.content) return error_message;

  const response = await users.find({username : username})

  if(!response){
    error_message ={
      ...error_message,
      content : 'User not found'
    }
  }

  let encriptPass = ''

  bcrypt.hash(pass, 10, (err, palabraSecretaEncriptada) => {
    if (err) {
      encriptPass = false
    } else {
      encriptPass = palabraSecretaEncriptada
    }
  })

  if(!encriptPass){
    return {
      ...error_message,
      content : 'Error in hash pasword'
    }
  }

  if(!bcrypt?.compare(response[0]?.pass, encriptPass)){
    error_message ={
      ...error_message,
      content : 'Incorrect Password'
    }
  }

  if(error_message?.message) return error_message;

  return {
    code : 200,
    content : response
  } 
}

exports.login = login;
exports.create = create;
exports.get = get;