const express = require('express')
const router = express.Router()
const config = require('./config')
const eventpush = require('../eventpush')
const axios = require('axios')
const csv = require('csvtojson')

router.post('/getcall', async (req, res) => {
    try {
        const reqbody = req.body
        const symbo_config = reqbody.symbo_config
        const gamooga_config = reqbody.gamooga_config
        const caller_id = await config.callAPI1(symbo_config)
        const Gamooga_props = {
            comp_id : gamooga_config.comp_id || '-',
            vid : gamooga_config.vid || '-',
            cp_type : gamooga_config.cp_type || '-',
            cp_id : gamooga_config.cp_id || '-',
            tp : gamooga_config.tp || '-',
            tpid : gamooga_config.tpid || '-',
            caller_id : symbo_config.campaigns[0].caller_id,
            mobile : symbo_config.campaigns[0].from[0],
            ivr_call_id : caller_id,
            server : 'evbk.gamooga.com',
            event : 'test'
        }
        try {
            const eventcall_resp = await eventpush(Gamooga_props)
            if(eventcall_resp.status == 200) {
                res.status(200).json({message : "OK"})
            }
        } catch (e) {
            res.status(200).json({message : `Something went wrong ${e}`})
        }
        
    } catch (e) {
        console.log(e)
        res.status(200).json({message : `Something went wrong ${e}`})
    }
})

router.post('/reports', async(req, res) => {
    console.log(req.body)
    try {
        const gamooga_config = req.body
        const gamooga_props = {
            comp_id : gamooga_config.comp_id || '-',
            vid : gamooga_config.vid || '-',
            cp_type : gamooga_config.cp_type || '-',
            cp_id : gamooga_config.cp_id || '-',
            tp : gamooga_config.tp || '-',
            tpid : gamooga_config.tpid || '-',
            event : 'test',
            server : 'evbk.gamooga.com'
        }
        const ivr_call_id = gamooga_config.ivr_call_id
        const dlvr_reports = await config.get_callreport({ivr_call_id})
        const iscsvgenerated = dlvr_reports.data.status || '-'
        if(iscsvgenerated == 'Completed') {
            const csvurl = dlvr_reports.data.report_url
            console.log(csvurl)
            const csvstr = await axios.get(csvurl)
            const data = await csv().fromString(csvstr.data)
            console.log(data[0])
            let eventConfig = Object.assign(gamooga_props,data[0])
            const eventpushres = await eventpush(eventConfig)
            if(eventpushres.status == 200){
                res.status(200).json({message:'OK'})
            }
            else {
                res.status(200).json({message: 'something went wrong while send an event'})
            }
            
        }   
        else {
            res.status(200).json({message:'Link not yet generated'})
        }
    } catch (e) {
        res.status(200).json({message: "Something went wrong"})
        console.log(e)
    }
})

module.exports = router