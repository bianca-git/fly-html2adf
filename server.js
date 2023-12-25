import express from 'express'
import html2adf from './src/html2adf.js'

// set up express web server
const app = express()

app.post('/', express.json() ,(req, res) => {
    try {

    let body = req.body
      body.forEach(b => {
        b.description = html2adf(b.descriptionHTML)
        delete b.descriptionHTML
      })
      console.log(body)
      res.set('Content-Type', 'application/json')
      res.send(body)
    } catch (error) {
      res.send(error)
    }
  })

// Start web server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
