const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"]

    },

    image: {
        type: String
    }


},
    {
        timestamps:true
    }
)

const Image = mongoose.model("gallery", gallerySchema);

module.exports = Image