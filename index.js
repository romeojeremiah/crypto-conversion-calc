const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res){

    let source_cur = req.body.crypto;
    let target_cur = req.body.fiat;

    request(`https://apiv2.bitcoinaverage.com/convert/global?from=${source_cur}&to=${target_cur}`, function(error, response, body){
            
            if(!error && response.statusCode === 200){
                let data = JSON.parse(body);
                let current_time = data.time;

                res.write(`<h1>The current time is ${current_time}</h1>`)
                res.write(`<h3>${source_cur} to ${target_cur} is ${data.price}</h3>`);
                res.send();
            }
    })

})

app.listen(3000, function(){
    console.log('Server running on port 3000');
})