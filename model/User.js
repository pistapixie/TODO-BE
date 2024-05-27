const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// 토큰 생성
userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};

// 비밀번호 제거
userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    return obj;
};

const User = mongoose.model('User', userSchema);
module.exports = User;