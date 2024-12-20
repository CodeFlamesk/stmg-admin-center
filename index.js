const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb+srv://Mikasa:sivs1827@cluster0.oabrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const start = async () => {
    try {
        await client.connect()
        console.log('ready')
        const db = client.db('stmg') 
        await db.createCollection('users') 
        const users = db.collection('users')
        await users.insertOne({ name: 'Mikasa', age: 21 })
        const user = await users.findOne({ name: 'Mikasa' })
        console.log(user)
    } catch (e) {
        console.log(e)
    } finally {
        await client.close() 
    }
}

start()
