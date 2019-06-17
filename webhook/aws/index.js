const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');

router.post('/espcallback/', async (req, res) => {
    console.log(req.body);
    //Log.L(Log.I, req.body);
    console.log(req.headers);
    //Log.L(Log.I, req.headers);
    //res.send({"status":"Success"});
    res.end("OK");
});

module.exports = router;