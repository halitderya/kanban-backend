const mongoose = require('mongoose');

const LaneSchema = new mongoose.Schema({
    active: { type: Boolean, default: true },
    default: { type: Boolean, default: false },
    id:{type:Number,required:true},
    description: String,
    name: { type: String, required: true },
    order: Number
});
const Lane = mongoose.model('Lane', LaneSchema);
module.exports=Lane;
