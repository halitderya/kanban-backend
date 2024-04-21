const mongoose = require('mongoose');

const BoardSettingsSchema = new mongoose.Schema({
    allow_comments: { type: Boolean, default: false },
    background_color: { type: String, default: '#ffffff' },
    board_name: { type: String, required: true },
    due_date_notifications: { type: Boolean, default: false },
    visibility: { type: String, default: 'private' }
});
