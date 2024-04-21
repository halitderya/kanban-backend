const mongoose = require('mongoose');
const BoardSettingsSchema = require('./BoardSettingsSchema')
const CardSchema= require('./CardSchema')
const LaneSchema=require('./LaneSchema')

const KanbanBoardSchema = new mongoose.Schema({
    board_settings: BoardSettingsSchema,
    cards: [CardSchema],
    lanes: [LaneSchema]  
});

 const KanbanBoard = mongoose.model('KanbanBoard', KanbanBoardSchema);
 module.exports=KanbanBoard;
