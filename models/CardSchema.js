const mongoose = require('mongoose');
const counter = require('./CounterSchema')


const CardSchema = new mongoose.Schema({
    archived: { type: Boolean, default: false },
    comments: 
    [   {comment:{type:String, required:false},
        date:{type:String,required:false}}
    ]
    , 
    id:{type:Number, default:0},
    created: { type: Date, default: Date.now },
    description: { type: String, required: true },
    lane: { type:Number}, 
    name: { type: String, required: true },
    owner: { type: String, required: true }
});




CardSchema.pre('save', async function(next) {
    const doc = this;
    try {
        const cnt = await counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1 }}, {new: true, upsert: true});
        doc.id = cnt.seq;
        next();
    } catch (error) {
        next(error);
    }
});


const Card = mongoose.model('Card', CardSchema);
module.exports=Card;