const mongoose = require('mongoose');
const CommentSchema= require('./CommentSchema')

const CardSchema = new mongoose.Schema({
    archived: { type: Boolean, default: false },
    comments: [CommentSchema], 
    created: { type: Date, default: Date.now },
    description: { type: String, required: true },
    id: { type: String, required: true },
    lane: { type: mongoose.Schema.Types.ObjectId, ref: 'Lane' }, 
    name: { type: String, required: true },
    owner: { type: String, required: true }
});
