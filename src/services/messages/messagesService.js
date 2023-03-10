const functions = require('./functions')

const Service = (app) => {

  app.post("/create-message", async function (req, res) {
    try {
      const {content, sender_id, receiver_id} = req?.body
  
      const response = await functions?.create(content, sender_id, receiver_id)
  
      if(!response) res.status(400).send('Error')
  
      res.status(response?.code).send(response?.content) 
  
    } catch (error) {
      res.status(400).send('Error')
    }
  })
  
  app.get("/get-messages", async function (req, res) {
    try {
  
      const response = await functions?.get()
  
      if(!response) res.status(400).send('Error')
  
      res.status(response?.code).send(response?.content) 
  
    } catch (error) {
      res.status(400).send('Error')
    }
  })

}

exports.Service = Service;