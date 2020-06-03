const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../canderelogs');


router.post('/evcallback/', async (req, res) => {
    let data = req.body;
    log.info(typeof data,' candere post<><><><><><><><><><><><> ', data);
    console.log('post<><><><><><><><><><><><>',req.body);
    log.info('candere body',req.body);
    log.info('candere query',req.query);
    log.info('candere params',req.params);
    log.info('candere headers',req.headers);
    res.writeHead(200);
    res.end("OK");
});

router.get('/evcallback/', async (req, res) => {
    let data = req.query;
    log.info(typeof data,' candere get<><><><><><><><><><><><> ', data);
    log.info('candere body',req.body);
    log.info('candere query',req.query);
    log.info('candere params',req.params);
    log.info('candere headers',req.headers);
    console.log('get<><><><><><><><><><><><>',req.query);
    res.writeHead(200);
    res.end("OK");
});


module.exports = router;