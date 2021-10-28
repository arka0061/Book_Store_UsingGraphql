/**************************************************************************************************************
 * @description   : It is used for making book Schema in database and storing book info
 * @package       : mongoose
 * @file          : app/models/note.model.js
 * @author        : Arka Parui
*****************************************************************************************************************/

const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    emailId:{
        type:String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre:{
        type:String,
        default:"miscellaneous"
    },
    state:{
        type:String,
        default:"Avaiable"
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('books', bookSchema);