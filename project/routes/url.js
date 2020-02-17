const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')

const Url = require('../models/URL')

// @route               POST  /api/url/shorten
// @description         Create Short url    
router.post('/shorten' , async (req,res) => {
    const { longUrl } = req.body
    const baseUrl = config.get('baseURL')
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid Base Url')
    }
    
    //Create url code
    const urlCode = shortid.generate()
    
    
    //Check Long Url
    if (validUrl.isUri(longUrl)) { 
        try {
            let url = await Url.findOne({ longUrl})

            if(url)
            {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date : new Date()
                })

                await url.save()
                res.json(url)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Server Error')
        }
        
    } else {
        res.status(401).json('Invalid Long Url')
    }
})

module.exports = router