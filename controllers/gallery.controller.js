const Image = require("../models/gallery.model");
const User = require("../models/users.models");
const fs = require('fs')
const path = require('path')


const getAllImagesById = async (req, res) => {
   try {
       const { id } = req.params

       let currentUser = await User.findOne({ _id: id })
       if (currentUser) {
           let currentUserImages = await Image.find({ email:currentUser.email })
           if (currentUserImages != "") {
               return res.status(200).json(currentUserImages)
           }
           return res.status(200).json({message:"no images found for user"})
       }
       return res.status(404).json({ message: "user not found" })
   } catch (err) {
        console.log(err.message);
       res.status(500).json({message:"error getting images"})
   }
}


/**
 * @create new image
 * POST /images
 */

const insertNewImage = async (req, res) => {
    try {
        
        let { email } = req.body
        let { filename } = req.file

        if (!email) {
            return res.status(400).json({message:"email is required to identify the user"})
        }

        let newImage = new Image({
            email,
            image : filename
        })

        await newImage.save()
        if (newImage) {
            return res.redirect('/dashboard')
        }
        res.status(200).jon({message:"image not saved"})
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"error inserting image"})
    }
}

const deleteImage = async (req, res) => {
    try {
        
        let { id } = req.params
        if (!id) {
            return res.status(400).json({message:"image id is required to delete it"})
        }

        let imageToDelete = await Image.findByIdAndDelete(id)
        if (imageToDelete) {
            
            fs.unlink(path.join(__dirname, '..', 'public', 'images', 'uploads', imageToDelete.image), (err) => {
                if(err) console.log('error locating image:', err.message);
                 res.status(200).json({message:"image deleted successfully"})
            })

            return
        }

        res.status(200).json({message:"image not deleted"})
    } catch (err) {
        console.log("error deleting image:",err.message);
        res.status(500).json({message:"error deleting image"})
    }
}

module.exports = {
    getAllImagesById,
    insertNewImage,
    deleteImage
}