const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../canderelogs');


router.post('/evcallback/', async (req, res) => {
    let data = req.body;
    log.info(typeof data,' candere post<><><><><><><><><><><><> ', data);
    console.log(typeof data,'body<><><><><><><><><><><><>',req.body);
    const renameKey = (object, key, newKey) => {
        const clonedObj = clone(object);                  
        const targetKey = clonedObj[key];
        delete clonedObj[key];
        clonedObj[newKey] = targetKey;
        return clonedObj;
    };
    const clone = (obj) => Object.assign({}, obj);
    try{
        if (typeof (data) == 'object') {
            // data['compid'] = '107a3b41-1aa3-45c6-a324-f0399a2aa2af';
            data['compid'] = 'f7cfe791-dcc0-4c2c-a233-a5ca65229915';
            data['uid'] = data['Email_id']
            data = renameKey(data, 'eventName', 'event');
            if(data['compid'] == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
                data['server'] = 'engageb.rsec.co.in';
            } else if(data['compid']=='fcbe3928-6512-48a6-8cb5-c8c51e100539'){
                data['server'] = 'js3in1.gamooga.com';
            }else{
                data['server'] = 'evbk.gamooga.com';
            }
            console.log(data);
            log.info(data);
            setTimeout(function(){
                eventpush(data);
            },10000)
        }
    }catch (e){
        log.info("Error in incoming data from value first", e);
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
    res.end("OK");
});


module.exports = router;