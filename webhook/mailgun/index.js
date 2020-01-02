const express = require('express');
const router = express.Router();
const axios = require('axios');
const log = require('../../logger');

router.post('/espcallback/', function (req, res) {
    console.log('Mailgun post logs');
    console.log(req.query);
    console.log('Body <><><><><><>',req.body);
    res.writeHead(200);
    res.end("OK");
});

module.exports = router;
