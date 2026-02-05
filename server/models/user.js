const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type: String, 
        required: true
    },
    email : {
        type: String, 
        required: true,
        unique: true 
    },
    password : {
        type: String, 
        required: true
    },
    isAdmin : {
        type: Boolean, 
        default: false 
    }
}, {
    timestamps : true,
})

// CHECK: Use existing model if available to prevent OverwriteModelError
const userModel = mongoose.models.users || mongoose.model('users', userSchema);

module.exports = userModel;