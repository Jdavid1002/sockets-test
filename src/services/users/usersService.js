const functions = require('./functions')

const Service = (app) => {

  app.post("/create-user", async function (req, res) {
    try {
      const {username, pass} = req?.body
  
      const response = await functions?.create(username, pass)
  
      if(!response) res.status(400).send('Error')
  
      res.status(response?.code).send(response?.content) 
  
    } catch (error) {
      res.status(400).send('Error')
    }
  })
  
  app.get("/get-user", async function (req, res) {
    try {
      const {id} = req?.body
      
      const response = await functions?.get(id)
  
      if(!response) res.status(400).send('Error')
  
      res.status(response?.code).send(response?.content) 
  
    } catch (error) {
      res.status(400).send('Error')
    }
  })
}

exports.Service = Service;