const messages = require('../../models/messages')


const create = async (content, sender_id, receiver_id) => {

  let error_message = {
    code : 400,
    content : ''
  }

  if(!content){
    error_message ={
      ...error_message,
      content : 'The content is empty or no exist.'
    }
  }

  if(!sender_id){
    error_message ={
      ...error_message,
      content : 'The id of sender is empty or no exist.'
    }
  }

  if(!receiver_id){
    error_message ={
      ...error_message,
      content : 'The id of receiver is empty or no exist.'
    }
  }


  if(error_message?.content) return error_message;

  const message = await new messages({
    content,
    sender_id,
    receiver_id
  }).save()

  if(!message){
    error_message ={
      ...error_message,
      content : 'Error in create message'
    }
  }

  if(error_message?.message) return error_message;

  return {
    code : 200,
    content : message
  } 
}

const get = async () => {

  let error_message = {
    code : 400,
    content : ''
  }

  if(error_message?.content) return error_message;

  const allMessages = await messages.find()

  if(!allMessages){
    error_message ={
      ...error_message,
      content : 'Error in create message'
    }
  }

  if(error_message?.message) return error_message;

  return {
    code : 200,
    content : allMessages
  } 
}


exports.create = create;
exports.get = get;