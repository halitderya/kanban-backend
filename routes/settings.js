const express = require('express');
const router = express.Router();
const Card = require('../models/CardSchema')
const Lane= require('../models/LaneSchema')
const mongoose =require('mongoose')

router.get('/',(req,res)=>{
    
});
router.post('/createdefaultcards',async (req,res)=>{
    try {
        await createDefaultCards();
        res.status(200).send("Default cards created successfully");
        return;
    } catch (error) {
        console.error('Error creating default cards:', error);
        res.status(500).send("Failed to create default cards");
    }
    
})
router.delete('/resetDefaultLanes',async (req,res)=>{
    try {
        await resetDefaultLanes();
        res.status(200).send("Successfully resetted to default lanes");
    } catch (error) {
        console.error('Error resetting to default lanes:', error);
        res.status(500).send("Error resetting to default lanes");
    }
    
})


async function resetDefaultLanes() {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Lane.deleteMany({}, { session }); // session ekleniyor

    await Lane.create([
      { name: "To Do", description: "Tasks that need to be done.", order: 1, active: true, default: true },
      { name: "In Progress", description: "Tasks that are currently being worked on.", order: 2, active: true, default: true },
      { name: "Review", description: "Tasks that are in the review phase.", order: 3, active: true, default: true },
      {  name: "Testing", description: "Tasks that are undergoing testing.", order: 4, active: true, default: true },
      {  name: "Deploy", description: "Tasks that are ready for deployment.", order: 5, active: true, default: true },
      {  name: "On Hold", description: "Tasks that are on hold or waiting for further action.", order: 6, active: true, default: true },
      {  name: "Completed", description: "Tasks that have been successfully completed.", order: 7, active: true, default: true }
    ], { session }); // session ekleniyor

    
    await session.commitTransaction();
  } 
  catch (error) {
    await session.abortTransaction();
    throw error; 
  } 
  finally {
    session.endSession();
  }
};

function resetBoardSettings(){
      
BoardSettings.create({

    allow_comments: true,
    default_theme: "light", 
    board_name: "Kanban",
  setting_4:"",
  setting_5:""
  })
}

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

module.exports = router;
