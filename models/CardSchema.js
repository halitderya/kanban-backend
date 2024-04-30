const mongoose = require("mongoose");
const counter = require("./CounterSchema");
const { type } = require("express/lib/response");

const CardSchema = new mongoose.Schema({
  archived: { type: Boolean, default: false },
  comments: [
    {
      comment: { type: String, required: false },
      date: { type: String, required: false, default: Date.now },
    },
  ],
  id: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  description: { type: String, required: true },
  lane: { type: Number },
  name: { type: String, required: true },
  owner: { type: String, required: true },
});

CardSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    try {
      const cnt = await counter.findByIdAndUpdate(
        { _id: "entityId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      doc.id = cnt.seq;
      doc.created.d = Date.now();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
CardSchema.pre("save", async function (next) {
  const doc = this;

  console.log("this:", this);
});

const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
