const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: String
    }, 
    date: {
        type: String
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post


