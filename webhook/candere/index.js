const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../canderelogs');


router.post('/evcallback/', async (req, res) => {
    let data = req.body;
    log.info(typeof data,' candere ', data);
    const renameKey = (object, key, newKey) => {
        const clonedObj = clone(object);                  
        const targetKey = clonedObj[key];
        delete clonedObj[key];
        clonedObj[newKey] = targetKey;
        return clonedObj;
    };
    const clone = (obj) => Object.assign({}, obj);
    async function sleep(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve,ms)
            index = -1;
        })
    }
    try{
        if (typeof (data) == 'object') {
            console.log(Object.keys(data).length)
            var values = Object.keys(data).map(function (key) { return data[key]; });
            let date_ob = new Date();
            let index = -1;
            values.forEach(async (each) => {
                index++
                await sleep(index*6000)
                // console.log(each,'<><><><><><>',new Date())
                each['uid'] = each['email_id']
                each = renameKey(each, 'eventName', 'event');
                each['event'] = 'digital_certificate'
                each['compid'] = 'f7cfe791-dcc0-4c2c-a233-a5ca65229915';
                if(each['compid'] == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
                    each['server'] = 'engageb.rsec.co.in';
                } else if(each['compid']=='fcbe3928-6512-48a6-8cb5-c8c51e100539'){
                    each['server'] = 'js3in1.gamooga.com';
                }else{
                    each['server'] = 'evbk.gamooga.com';
                }
                log.info(each,'<><><><><><>',new Date())
                console.log(each,'<><><><><><>',new Date())
                eventpush(each)
            })
        }
    }catch (e){
        log.info("Error in incoming data from value first", e);
        console.log("Error in incoming data from value first", e)
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
    res.end("OK");
});


module.exports = router;