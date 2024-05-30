const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE;
const dbName = process.env.DBNAME;
const collectionName = process.env.COLLECTION;
const csvFilePath = process.env.CSV_FILE_PATH;

async function loadFiles(req, res) {
    let client;

    try {
        client = new MongoClient(uri);
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const results = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {

                    await collection.insertMany(results);
                    console.log(`${results.length} documents inserted successfully`);
                    res.status(200).send(`<h1>${results.length} Files loaded successfully</h1>`);
                } catch (err) {

                    console.error('Error inserting documents into MongoDB:', err);
                    res.status(500).send('Internal Server Error');
                } finally {

                    await client.close();
                }
            });
    } catch (err) {

        console.error('Error connecting to MongoDB:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function countAlbumsByYear(req, res) {
    let client;

    try {

        client = new MongoClient(uri);
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.aggregate([
            {
                $group: {
                    _id: "$Year",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray();

        console.log('Albums count by year:', result);

        // Build the HTML string
        let responseHTML = '<ul>';
        result.forEach(item => {
            responseHTML += `<li><b>${item._id}:</b> ${item.count}</li>`;
        });
        responseHTML += '</ul>';

        res.status(200).send(responseHTML);
    } catch (err) {

        console.error('Error counting albums by year:', err);
        res.status(500).send('Internal Server Error');
    } finally {

        if (client) {

            await client.close();
        }
    }
}

async function addScoreAttribute(req, res) {
    let client;

    try {

        client = new MongoClient(uri);
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.updateMany({}, [{ $set: { score: { $subtract: [501, { $toInt: "$Number" }] } } }]);

        console.log(`${result.modifiedCount} documents updated with 'score' attribute`);

        res.status(200).send(`<h1>${result.modifiedCount} documents updated with 'score' attribute</h1>`);
    } catch (err) {

        console.error('Error adding score attribute:', err);
        res.status(500).send('Internal Server Error');
    } finally {

        if (client) {

            await client.close();
        }
    }
}

async function queryArtistScore(req, res) {
    let client;

    try {

        client = new MongoClient(uri);
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.aggregate([
            {
                $group: {
                    _id: "$Artist",
                    totalScore: { $sum: "$score" },
                    albumCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    Artist: "$_id",
                    averageScore: { $divide: ["$totalScore", "$albumCount"] }
                }
            }
        ]).toArray();

        console.log('Artist scores:', result);

        // Build the HTML string
        let responseHTML = '<ul>';
        result.forEach(item => {
            responseHTML += `<li><b>${item.Artist}:</b> ${item.averageScore.toFixed(2)}</li>`;
        });
        responseHTML += '</ul>';

        res.status(200).send(responseHTML);
    } catch (err) {

        console.error('Error querying artist scores:', err);
        res.status(500).send('Internal Server Error');
    } finally {

        if (client) {

            await client.close();
        }
    }
}

async function dropCollection(req, res) {
    let client;

    try {
        client = new MongoClient(process.env.DATABASE);
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(process.env.DBNAME);
        await db.collection(process.env.COLLECTION).drop();

        console.log(`Collection ${process.env.COLLECTION} dropped successfully`);
        res.status(200).send(`Collection ${process.env.COLLECTION} dropped successfully`);
    } catch (err) {
        console.error('Error dropping collection:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (client) {
            await client.close();
        }
    }
}

module.exports = { loadFiles, countAlbumsByYear, addScoreAttribute, queryArtistScore, dropCollection };
