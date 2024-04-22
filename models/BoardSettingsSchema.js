const mongoose = require('mongoose');

const BoardSettingsSchema = new mongoose.Schema({
    allow_comments: { type: Boolean, default: false },
    default_theme: { type: String, default: '#ffffff' },
    board_name: { type: String, required: true },
    due_date_notifications: { type: Boolean, default: false },
    visibility: { type: String, default: 'private' }
});
const BoardSettings = mongoose.model('BoardSettings', BoardSettingsSchema);
module.exports=BoardSettings;
