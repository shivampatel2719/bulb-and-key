const express = require('express')
const path = require('path');

require('dotenv').config()

const app = express();

app.use(express.static(path.join(__dirname,"/dist/bulb-and-key/")));

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,"/dist/bulb-and-key/index.html"))
});

app.listen(process.env.PORT || 8080);


