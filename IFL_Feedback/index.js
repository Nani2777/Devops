const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/ifli_non_hni/', async (req, res) => {
    try {
        let callback_feedback = req.body;
        let uid = callback_feedback.uid;
        let event = callback_feedback.event;
        let feedback = callback_feedback.feedback;
        let url = "http://js1in1.gamooga.com/evwid/?c=1bcef8b8-7c5d-400b-a02d-41cf56a5f2bb&u=" + uid + "&e=" + event;
        Object.entries(feedback).forEach(
            ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
        );
        axios.get(url).then(function (response) {
            console.log("Successfully data pushed to gamooga", feedback);
            if (response.status == 200) {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end("OK");
            }
        }).catch(function (error) {
            console.log("Failed to store data in Gamooga", feedback);
            //res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end("ERROR");
        });
    } catch (e) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("ERROR");
    }
});

router.get('/ifli_non_hni/', async(req, res) => {
    try {
        let callback_feedback = req.query;
        let uid = callback_feedback.uid;
        let event = callback_feedback.event;
        let url = "http://js1in1.gamooga.com/evwid/?c=1bcef8b8-7c5d-400b-a02d-41cf56a5f2bb&u=" + uid + "&e=" + event;
        Object.entries(callback_feedback).forEach(
            ([key, value]) => {
                if(key!='uid' && key!='event') {
                url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
                }
            }    
        );
        axios.get(url).then(function (response) {
            console.log("Successfully data pushed to gamooga", callback_feedback);
            if (response.status == 200) {
                res.status(200).send('OK')
            }
        }).catch(function (error) {
            console.log("Failed to store data in Gamooga", callback_feedback);
            //res.setHeader("Content-Type", "application/json");
            res.status(404).send('ERROR')
        });
    } catch (e) {
        res.status(500).send('ERROR')
        
    }

})

router.get('/ifl_voiceblast/', async(req, res) => {
    try {
        console.log('printingggg',req.query)
       let callback_feedback = req.query;
        console.log('printingggg',callback_feedback)
        let uid = callback_feedback.u;
        let event = callback_feedback.e;
        let comp_id=callback_feedback.c;
        //let feedback = callback_feedback.feedback;
        let url = "http://js1in1.gamooga.com/evwid/?c=" + comp_id + "&u=" + uid + "&e=" + event;
        Object.entries(callback_feedback).forEach( 
            ([key, value]) => {
                if(key!='u' && key!='e' && key!='c') {
                url = url + "&ky=" + key.toLowerCase() + "&vl=" + value + "&tp=s"
                }
            }    
        );
        console.log(url);
        axios.get(url).then(function (response) {
            console.log("Successfully data pushed to gamooga", callback_feedback);
            if (response.status == 200) {
                res.status(200).send('OK')
            }
        }).catch(function (error) {
            console.log("Failed to store data in Gamooga", callback_feedback);
            //res.setHeader("Content-Type", "application/json");
            res.status(404).send('ERROR')
        });
        res.status(200).send('OK')
    } catch (e) {
        console.log (e)
        res.status(500).send('ERROR')        
    }

})

module.exports = router;
