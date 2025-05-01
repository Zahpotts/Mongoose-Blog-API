const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({

    title: { type: String, required: true },
    article: { type: String, required: true },
    published: { type: Date, default: Date.now },
    feature: { type: Boolean, default: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Blog', BlogSchema);