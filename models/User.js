const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add your email address'],
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    }, 
    avatar: {
        type: String, 
        default: 'https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/12/20/Pictures/_0745b0ec-231b-11ea-8c10-7db3e225203f.jpg',
    },
    catalog: {
        type: mongoose.Types.ObjectId,
        ref: 'Catalog'
    }
},
{
    timestamps: true,
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;