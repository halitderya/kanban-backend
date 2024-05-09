const express = require("express");
const router = express.Router();
const Lane = require("../models/LaneSchema");

router.get("/allLanes", async (req, res) => {
  const lanesmap = await Lane.find({});
  res.status(200).json(lanesmap);
});
router.delete("/deleteLane", async (req, res) => {
  if (req.query.id) {
    console.log(req.query.id);

    try {
      const response = await Lane.deleteOne({ id: req.query.id });

      if (response.deletedCount > 0) {
        res.status(200).send(response.deletedCount + " Record(s) Deleted");
      } else {
        res.status(400).send("Nothing Deleted");
      }
    } catch (error) {
      res.status(500).send("Nothing Deleted error: " + error);
    }
  } else {
    res.status(400).send("missing properties");
  }
});

router.post("/changeLaneArchive", async (req, res) => {
  const id = req.body.id;

  if (id) {
    const lane = await Lane.findOne({ id: id });

    if (lane) {
      try {
        lane.active = !lane.active;
        await lane.save();
        res.status(200).json(lane);
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
router.post("/reorderLanes", async (req, res) => {
  if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
    return res.status(400).send("Missing or incorrect body properties");
  }

  try {
    const result = await Lane.bulkWrite(
      req.body.map((update) => ({
        updateOne: {
          filter: { id: update.id },
          update: { $set: { order: update.order } },
        },
      }))
    );

    res.status(200).json({ message: "Updates successful", result: result });
  } catch (error) {
    console.error("Error updating lane orders: ", error);
    res.status(500).send("An error occurred while updating lane orders");
  }
});

router.post("/addLane", async (req, res) => {
  const { name, description, order } = req.body;

  if (name && description && order) {
    try {
      const created = await Lane.create({
        name: name,
        description: description,
        order: order,
      });
      res.status(200).json(created);
    } catch (error) {
      res.status(500).send("error creating lane: " + error);
    }
  } else {
    res.status(400).send("Req body cannot be empty");
  }
});

module.exports = router;
