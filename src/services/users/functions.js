const users = require('../../models/users')


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

  const user = await new users({
    username, 
    pass
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


exports.create = create;
exports.get = get;