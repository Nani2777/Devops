const express = require('express');
const router = express.Router();
const axios = require('axios');
const log = require('../../logger');

router.post('/espcallback/', function (req, res) {
    log.info('Mailgun post logs');
    log.info(req.query);
    log.info('Body <><><><><><>',req.body);
});

module.exports = router;
