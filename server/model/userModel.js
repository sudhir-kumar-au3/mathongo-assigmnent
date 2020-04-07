const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin"]
    },
    lastActive: {
        type: Date,
        default: Date.now()
    },
    disable: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});
// userSchema.pre('save', function(next) {
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });
module.exports = {
    userSchema
}