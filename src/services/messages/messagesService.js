const app = require('../../server')
const create = require('./functions')

app.post("/create-message", async function (req, res) {
  try {
    const {content, sender_id, receiver_id} = req?.body

    const response = await create(content, sender_id, receiver_id)

    if(!response) res.status(400).send('Error')

    res.status(response?.code).send(response?.content) 

  } catch (error) {
    console.log(error)
    res.status(400).send('Error')
  }
});
