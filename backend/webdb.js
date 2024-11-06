import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/'
const dbName = 'ThaZone'
const client = new MongoClient(url)

async function startServer() {
  try {
    await client.connect()
    console.log('Successfully connected to database!')
  } catch (err) {
    console.error('Error connecting to database:', err)
    process.exit(1) // Exit if the database connection fails
  }

  const server = createServer(async (req, res) => {
    const db = client.db(dbName)
    const subscribers = db.collection('subscribers')
    let subscribersList

    try {
      subscribersList = await subscribers.find().toArray()
    } catch (err) {
      console.error('Error fetching subscribers:', err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Internal Server Error' }))
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(subscribersList))
  })

  const host = 'localhost'
  const port = 3000

  server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`)
  })
}

startServer()
