const express = require('express');
const router = express.Router();
const Card = require('../models/CardSchema')


router.get('/',(req,res)=>{
    
});
router.post('/addCard', async (req,res)=>{
    try{
      
      await Card.create({
        "name": "new card",
        "created": "2024-01-01T09:15:30",
        "archived": false,
        "description": "This is a task for the alpha project.",
        "lane": 2,
        "lane_was":1,
        "owner": "Demo user",
        
      })
      res.status(200).send("Success!")
    }
    catch(error){
      res.status(500).send("Error!: "+error)
    }
});

module.exports = router;
