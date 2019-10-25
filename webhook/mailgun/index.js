const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/espcallback/', function (req, res) {
    console.log('Mailgun post logs');
    console.log(req.query);
    console.log('Body <><><><><><>',req.body);
});

module.exports = router;
