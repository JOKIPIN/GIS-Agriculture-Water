const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.createUser = async function (username, password) {
    const user = new this({ username, password });
    return user.save();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
