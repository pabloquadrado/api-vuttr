const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ToolSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: String,
    tags: Array
}, {
    versionKey: false,
});

ToolSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Tool", ToolSchema);