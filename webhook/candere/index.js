const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../logger');


router.post('/evcallback/', async (req, res) => {
    let data = req.body;
    log.info(typeof data,' candere post<><><><><><><><><><><><> ', data);
    console.log('post<><><><><><><><><><><><>',req.body);
    res.writeHead(200);
    res.end("OK");
});

router.get('/evcallback/', async (req, res) => {
    let data = req.body;
    log.info(typeof data,' candere get<><><><><><><><><><><><> ', data);
    console.log('get<><><><><><><><><><><><>',req.body);
    res.writeHead(200);
    res.end("OK");
});


module.exports = router;