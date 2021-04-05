const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    post_id:{
        type:String
    },
    posted: {
        type: Date
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment


