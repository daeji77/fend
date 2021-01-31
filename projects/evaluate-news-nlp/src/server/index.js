var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

// console.log(`${process.env.API_KEY}`)
const application_key = process.env.API_KEY

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/api/query_sentiment', async function(req, res) {
    console.log("::: /api/query_sentiment :::");

    const url = 'https://api.meaningcloud.com/sentiment-2.1?' +
        `key=${application_key}&of=json&txt=${req.query.text}&lang=en`;
    console.log(url);

    const sentiment = await fetch(url, {
      method: 'post',
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res);
        return res.subjectivity;
    })

    console.log(`sentiment: ${sentiment}`)

    res.send({sentiment: sentiment});
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
