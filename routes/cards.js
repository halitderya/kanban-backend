const express = require('express');
const router = express.Router();
const Card = require('../models/CardSchema')


router.get('/',(req,res)=>{
    
});

router.post('/addComment',async(req,res)=>{
const id= req.query.id
const comment = req.body.comment

if(comment && id )
{


      try{
       await Card.updateOne({id:id}, {$push:{comments:[{comment:comment}]}})
        res.status(200).send("comment added");

      }
      catch(error){
      res.status(500).send("error updating card: "+ error)
      }



  }
else{
    res.status(400).send("missing properties")

}

})


























router.post('/addCard', async (req,res)=>{
  const { name, description, owner, lane } = req.body;

  if(name && description && owner && lane !== 0)
{

    try{
      
      await Card.create({
        "name": req.body.name,
        "archived": false,
        "description": req.body.description,
        "lane": req.body.lane,
        "owner": req.body.owner,
      })
      res.status(200).send("Success!")
    }
    catch(error){
      res.status(500).send("Error!: "+error)
    }
  }
  else{
    res.status(400).send("missing properties")
  }
});









router.delete("/deleteAllCards" ,async (req,res)=>{

try{
await Card.deleteMany({});
res.status(200).send("successfully deleted")

}

catch(error){
  res.status(500).send("can't deleted: "+error)
  throw(error)


}


})

module.exports = router;
