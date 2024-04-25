const mongoose = require('mongoose');
const counter = require('./CounterSchema')

const LaneSchema = new mongoose.Schema({
    active: { type: Boolean, default: true },
    default: { type: Boolean, default: false },
    id:{type:Number, default:0},
    description: String,
    name: { type: String, required: true },
    order: Number
});

LaneSchema.pre('save', async function(next) {
    const doc = this;
    try {
        const cnt = await counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1 }}, {new: true, upsert: true});
        doc.id = cnt.seq;
        next();
    } catch (error) {
        next(error);
    }
});

const Lane = mongoose.model('Lane', LaneSchema);
module.exports=Lane;
