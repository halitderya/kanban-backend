const express = require('express');
const mongoose = require('mongoose')
const Lane = require("./Models/LaneSchema")
const Card = require('./Models/CardSchema')
const BoardSettings = require('./Models/BoardSettingsSchema')

const app = express();

app.use(express.json());
const connectionpOptions = {
   dbName: `kanbanBoard`,

}
mongoose.connect('mongodb://myadmin:mypassword@195.20.255.56:27017',connectionpOptions)
  .then(() => console.log('Connected to DB!'));


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
app.get('/', (req, res) => {


res.send(req.body)


  })
  app.post("/createdefaultcards", async (req, res) => {
    try {
        await createDefaultCards();
        res.status(200).send("Default cards created successfully");
    } catch (error) {
        console.error('Error creating default cards:', error);
        res.status(500).send("Failed to create default cards");
    }
});


  app.post('/addcard',(req,res)=>{

    Card.create({
      "name": "new card",
      "created": "2024-01-01T09:15:30",
      "archived": false,
      "description": "This is a task for the alpha project.",
      "lane": 2,
      "lane_was":1,
      "owner": "Demo user",
      
    }).then(
      res.sendStatus(200).send("card added",this.Card.id)
    ).catch(
      res.sendStatus(500)
    )



  })
BoardSettings.create({

  allow_comments: true,
  default_theme: "light", 
  board_name: "Kanban",
setting_4:"",
setting_5:""
})

function CreateCard(){


}
Lane.create(

  {
    id:1,
    "name": "To Do",
    "description": "Tasks that need to be done.",
    "order":1,
    "active": true,
    "default": true
  },
  {
    id:2,
    "name": "In Progress",
    "description": "Tasks that are currently being worked on.",
    "order":2,

    "active": true,
    "default": true
  },
  {
    id:3,
    "name": "Review",
    "description": "Tasks that are in the review phase."
    
    ,
    "order":3,

    "active": true,
    "default": true
  },
  {
    id:4,
    "name": "Testing",
    "description": "Tasks that are undergoing testing."
    ,
    "order":4,

    "active": true,
    "default": true
  },
  {
    id:5,
    "name": "Deploy",
    "description": "Tasks that are ready for deployment.",
    "order":5,

    "active": true,
    "default": true
  },
  {
    id:6,
    "name": "On Hold",
    "description": "Tasks that are on hold or waiting for further action."
    ,
    "order":6,

    "active": true,
    "default": true
  },
  {
    id:7,
    "name": "Completed",
    "description": "Tasks that have been successfully completed."
    ,
    "order":7,

    "active": true,
    "default": true
  }


);
function createDefaultCards(){

  Card.create({
    "name": "Task Alpha",
    "created": "2024-01-01T09:15:30",
    "archived": false,
    "description": "This is a task for the alpha project.",
    "lane": 2,
    "lane_was":1,
    "owner": "Demo user",
    "comments": [
      {
        "comment": "Great progress! Keep it up.",
        "date": "2024-01-03T14:30:45"
      },
      {
        "comment": "Any blockers you're facing?",
        "date": "2024-01-05T11:20:10"
      }
    ]
  },
  {
    "name": "Bug Fixing",
    "created": "2024-01-02T14:45:12",
    "archived": false,
    "description": "Fix critical bugs in the software.",
    "lane": 2,
    "lane_was":1,
  
    "owner": "Demo user",
    "comments": [
      {
        "comment": "Found a major bug in module X.",
        "date": "2024-01-04T09:55:20"
      },
      {
        "comment": "The fix for issue Y is in progress.",
        "date": "2024-01-06T15:20:30"
      }
    ]
  },
  {
    "name": "Customer Feedback",
    "created": "2024-01-06T11:20:30",
    "archived": false,
    "description": "Review and respond to customer feedback.",
    "lane": 2,
    "lane_was":1,
  
    "owner": "Demo user",
    "comments": []
  },
  {
    "name": "Financial Analysis",
    "created": "2024-01-07T13:05:42",
    "archived": false,
    "description": "Analyze company's financial performance and prepare reports.",
    "lane": 2,
    "lane_was":1,
  
    "owner": "Demo user",
    "comments": [
      {
        "comment": "Completed the quarterly analysis.",
        "date": "2024-01-09T10:40:15"
      }
    ]
  },
  {
    "name": "Hiring Process",
    "created": "2024-01-08T17:17:01",
    "archived": false,
    "description": "Manage the hiring process and onboard new employees.",
    "lane": 2,
    "lane_was":1,
  
    "owner": "Demo user",
    "comments": [
      {
        "comment": "Interviews scheduled for next week.",
        "date": "2024-01-10T13:15:30"
      },
      {
        "comment": "Welcome aboard to the new team members!",
        "date": "2024-01-12T09:00:00"
      }
    ]
  }
  )
}

