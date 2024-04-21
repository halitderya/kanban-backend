const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
