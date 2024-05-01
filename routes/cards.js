const express = require("express");
const router = express.Router();
const Card = require("../models/CardSchema");

router.get("/allCards", async (req, res) => {
  const cardsmap = await Card.find({});
  res.status(200).json(cardsmap);
});
router.post("/addComment", async (req, res) => {
  const id = req.query.id;
  const comment = req.body.comment;

  if (comment && id) {
    try {
      await Card.updateOne(
        { id: id },
        { $push: { comments: [{ comment: comment }] } }
      );
      res.status(200).send("comment added");
    } catch (error) {
      res.status(500).send("error updating card: " + error);
    }
  } else {
    res.status(400).send("missing properties");
  }
});

router.post("/editCard", async (req, res) => {
  const id = req.query.id;
  const { name, description, owner, lane } = req.body;

  if (name && description && owner && lane !== 0) {
    try {
      await Card.updateOne(
        { id: id },
        {
          name: req.body.name,
          archived: req.body.archived,
          description: req.body.description,
          lane: req.body.lane,
          owner: req.body.owner,
        }
      );
      res.status(200).send("Success!");
    } catch (error) {
      res.status(500).send("Error!: " + error);
    }
  } else {
    res.status(400).send("missing properties");
  }
});

router.get("/findCards", async (req, res) => {
  const searchQuery = req.query.searchQuery;
  if (searchQuery !== "") {
    try {
      const result = await Card.find({
        name: { $regex: new RegExp(searchQuery), $options: "i" },
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(400).send("Not found");
      }
    } catch (error) {
      res.status(500).send("Error: " + error);
    }
  } else {
    res.status(400).send("provide a search query");
  }
});

router.post("/changeArchive", async (req, res) => {
  const id = req.query.id;

  if (id) {
    const card = await Card.findOne({ id: id });
    console.log(card);

    if (card) {
      try {
        card.archived = !card.archived;
        await card.save();
        res.status(200).send("successfully updated!");
      } catch (error) {
        res.status(500).send("error occured: " + error);
      }
    } else {
      res.status(400).send("No card found with id: " + id);
    }
  } else {
    res.status(400).send("Id cannot be empty...");
  }
});
router.post("/addCard", async (req, res) => {
  const { name, description, owner, lane } = req.body;

  if (name && description && owner && lane !== 0) {
    try {
      await Card.create({
        name: req.body.name,
        archived: false,
        description: req.body.description,
        lane: req.body.lane,
        owner: req.body.owner,
      });
      res.status(200).send("Success!");
    } catch (error) {
      res.status(500).send("Error!: " + error);
    }
  } else {
    res.status(400).send("missing properties");
  }
});

router.delete("/deleteAllCards", async (req, res) => {
  try {
    await Card.deleteMany({});
    res.status(200).send("successfully deleted");
  } catch (error) {
    res.status(500).send("can't deleted: " + error);
    throw error;
  }
});

module.exports = router;
