/**************************************************************************************************************
 * @description   : It is used for making admin Schema in database and storing admin info
 * @package       : mongoose
 * @file          : app/models/note.model.js
 * @author        : Arka Parui
*****************************************************************************************************************/

const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    emailId:{
        type:String
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('admins', adminSchema);