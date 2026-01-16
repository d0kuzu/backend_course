const {MONGO_DB_NAME, MONGO_URI} = require("../config/env");

const { MongoClient } = require('mongodb')

let client
let db

async function connectMongo() {
    if (db) return db

    client = new MongoClient(MONGO_URI, {
        maxPoolSize: 10,
    })

    await client.connect()
    db = client.db(MONGO_DB_NAME)

    console.log('MongoDB connected')
    return db
}

function getDb() {
    if (!db) {
        throw new Error('MongoDB not connected')
    }
    return db
}

module.exports = { connectMongo, getDb }
