const {Schema,model} = require('mongoose');
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
},

{
    timestamps:true //asi se agrega las propiedades createdAt y updatedAt a cada modelo de manera automatica
});

module.exports = model('Note',NoteSchema);