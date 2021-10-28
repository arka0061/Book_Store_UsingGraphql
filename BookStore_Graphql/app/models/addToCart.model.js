/**************************************************************************************************************
 * @description   : It is used for making addToCart Schema in database and storing customer books
 * books info
 * @package       : mongoose
 * @file          : app/models/note.model.js
 * @author        : Arka Parui
*****************************************************************************************************************/

const mongoose = require('mongoose');
const addToCartSchema = mongoose.Schema({
    emailId:{
        type:String
    },
    bookIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'books'
        }]
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('addToCart', addToCartSchema);