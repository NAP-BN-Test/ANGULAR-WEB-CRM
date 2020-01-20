let app = require('express')();
let server = require('http').createServer(app);
let cors = require('cors');

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/router') //importing route
routes(app)

const port = process.env.PORT || 3302

server.listen(port, function () {
    console.log('http://localhost:' + port);
});
