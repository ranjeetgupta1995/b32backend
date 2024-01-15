const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema({
    blacklist: String
}, {
    versionKey: false
});

const blacklistModel = mongoose.model('blacklist', blacklistSchema);

module.exports = {
    blacklistModel
}