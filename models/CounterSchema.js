const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('counter', CounterSchema);

module.exports=Counter