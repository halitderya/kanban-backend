const express = require('express');
const mongoose = require('mongoose')
const BoardSettings = require('./models/BoardSettingsSchema')

const app = express();
const cardRoutes = require('./routes/cards');
const settingsRoutes= require("./routes/settings")

app.use(express.json());
const connectionpOptions = {
   dbName: `kanbanBoard`,
}

app.use('/cards',cardRoutes)
app.use('/settings',settingsRoutes)


mongoose.connect('mongodb://myadmin:mypassword@195.20.255.56:27017',connectionpOptions)
  .then(() => console.log('Connected to DB!'));


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})