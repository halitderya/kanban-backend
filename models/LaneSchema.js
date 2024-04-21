const mongoose = require('mongoose');

const LaneSchema = new mongoose.Schema({
    active: { type: Boolean, default: true },
    dbid: { type: String, required: true },
    default: { type: Boolean, default: false },
    description: String,
    id: Number,
    name: { type: String, required: true },
    order: Number
});
