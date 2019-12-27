const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('./config')

router.post('/getcall', async (req, res) => {
    try {
        const API1_id = await config.callAPI1()
        console.log(API1_id)
        const API2_response = await axios(`${config.API2_config.URL}${API1_id}`)
        console.log(API2_response.data)
        res.status(200).json({message : "OK"})
    } catch (e) {
        console.log(e)
        res.status(200).json({message : `Something went wrong ${e}`})
    }
})

module.exports = router