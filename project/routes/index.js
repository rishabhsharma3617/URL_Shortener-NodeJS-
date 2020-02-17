const express = require('express')
const router = express.Router()

const Url = require('../models/URL')
 // @route     GET /:code
 // @desc      Redirect to the long original url
router.get('/:code' , async(req,res) => {
    try {
        const url = await Url.findOne( {urlCode : req.params.code} )
        if(url)
        {
            return res.redirect(url.longUrl)
        } 
        else 
        {
            return res.status(404).json("No Url found with this name")
        }
    } catch (error) {
        console.log(err)
        res.status(500).json('Server Eroor')
    }
})


module.exports = router
