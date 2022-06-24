const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log("Connected to Database")
        db = client.db(dbName)
        collection = db.collection('movies')
    })

// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routes
app.get('/', async (req, res) => {
    try {
        res.render('index')
    } catch (error) {
        response.status(500).send({message: error.message })
    }
})


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port`)
})