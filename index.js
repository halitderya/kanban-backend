const express = require('express');
const mongoose = require('mongoose')
const kanbanBoard = require('./models/KanbanBoardSchema');
const KanbanBoard = require('./models/KanbanBoardSchema');
const app = express();

app.use(express.json());
const connectionpOptions = {
   dbName: `kanbanBoard`,
   useUnifiedTopology: true,

}
mongoose.connect('mongodb://myadmin:mypassword@195.20.255.56:27017',connectionpOptions)
  .then(() => console.log('Connected to DB!'));


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
app.get('/', (req, res) => {


res.send(req.body)


  })


  app.post('/post/',(req,res)=>{

    req===""?console.log("request cannot be empty"): res.send('hello world from post')

    console.log(req);
    

  })

  
  KanbanBoard.create({

    
      name: "Kanban Board Name",
      description: "Kanban Board Description",
      lanes: [
        {
          name: "Lane Name",
          description: "Lane Description",
          order: 1,
          id: 1
        }
      ]
    

  })

// Lane.create({
//   name:"Lane Name",
//   description:"Lane Desc",
//   order:1,
//   id:1
// })