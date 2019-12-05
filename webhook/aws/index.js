const express = require('express');
const router = express.Router();
const axios = require('axios');
const log = require('../../logger');
//const Log = require('stark/utils/log');

router.post('/espcallback/', async (req, res) => {
    log.info(req.body);
    //Log.L(Log.I, req.body);
    log.info(req.headers);
    //Log.L(Log.I, req.headers);
    //res.send({"status":"Success"});
    res.end("OK");
});

module.exports = router;