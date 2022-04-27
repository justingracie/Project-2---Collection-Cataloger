//models/Discog

const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    album:{
        type: String,
        required: [true, 'ablum cannot be empty :(']
    },
    artist: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true
    },
    itemValue: {
        type: Number,
        min: [0, 'you cannot add a negative number'],
        required: true
    },
    mediaFormat: {
        type: String, 
    },
    realeaseYear:{
        type: String
    },
    trackList:{
        type: [String],
        required: true
    },
    collectorComments:{
        type: String
    },
    spotifyLink: {
        type: String, 
        required: false
    },
    appleMusic: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    }

);

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;
