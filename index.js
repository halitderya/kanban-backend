const express = require('express');
// const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
app.get('/get/', (req, res) => {

res.send(req.body)


  })


  app.post('/post/',(req,res)=>{

    req===""?console.log("request cannot be empty"): res.send('hello world from post')

    console.log(req);
    

  })

