const express = require('express');
const router = express.Router();
const Card = require('../models/CardSchema')


router.get('/',(req,res)=>{
    
});
router.post('/addCard', (req,res)=>{
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

});

module.exports = router;
