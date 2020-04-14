const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
const log = require('../../logger');
const Url = require('url');
//var morgan = require('morgan');
//var winston = require('../../config/winston');

//app.use(morgan('combined', { stream: winston.stream }));
/*router.post('/implwebhook', function (req, res) {
  console.log('working');
  log.info('chat post logs');
  log.info(req.body);
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  log.info('error');
  log.info('working'); 
  //log.info(req.body);
  res.writeHead(200);
  res.end("OK");
});*/

router.post('/nanismswebhook', function (req, res) {
  let body = req.body;
    console.log(body);
    log.info('###############click wrapper');
    log.info(body);
    let self = this;
    let eventToTrigger = '_wpsms_click';
    let compid = body.compid;
    let vid = body.vid;
    let cp_id = body.cp_id;
    let cp_type = body.cp_type;
    let tp = body.tp;
    let tpid = body.tpid;
    let runid = body.runid;
    let td = new Date().getTime() + '' + parseInt(Math.random()*10000);
    let url = body.url;//'https://www.lidolearning.com/?utmcampaign=testcamp';    
    let urlToWrap;
    let urlObj = Url.parse(url, true, true);
    urlToWrap = urlObj.format(urlObj);
    let wrappedurl = 'http://'+'evbk.gamooga.com'+'/ev/?e='+eventToTrigger+'&c='+compid+'&v='+vid+'&ky=cp_id&vl='+cp_id+'&tp=s&ky=cp_type&vl='+cp_type+'&tp=s&ky=tp&vl='+tp+'&tp=s&ky=tpid&vl='+tpid+'&tp=s&ky=runid&vl='+runid+'&tp=s&s=abc&t=xyz&z='+td+'&redir='+urlToWrap;
    console.log(wrappedurl);
    //res.status(200).json({ 'url' : encodeURIComponent(wrappedurl)});//send(wrappedurl);
    /*axios({
      method:'POST',
      url:'http://shorturl.karix.solutions/services/api/vlurlshortner?user_ref={{klix_test_aash.phone}}&long_url='+encodeURIComponent(wrappedurl),
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        Authentication: 'Bearer O3l5UsxIZAcJSbnvVmHm7g=='
      },
    })*/
    let shrturl = 'http://shorturl.karix.solutions/services/api/vlurlshortner?user_ref=9492794266&long_url='+encodeURIComponent(wrappedurl);
    axios.get(shrturl,{
      headers:{
        //'Content-Type':'application/x-www-form-urlencoded',
        Authentication: 'Bearer O3l5UsxIZAcJSbnvVmHm7g=='
      }
    }).then(function(response){
      console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRResponse');
      log.info(response);
      console.log(response);
      res.status(200);
    }).catch(function(error){
      console.log(error);
    })
});

router.get('/smswebhook', function (req, res) {
  console.log('SMS get logs');
  //log.info(JSON.stringify(req));
  //log.info(JSON.stringify(req.query));
  log.info(req.query);
    try {
        var data = req.query;
        console.log('saim',data,typeof(data));
        if (typeof (data) == 'object') {
            var cmp_data = data['extra'];
            var campaign_data = JSON.parse(cmp_data);
            var camp_data = new Object(campaign_data.cust_params);
            var vid = campaign_data['vid'];
            var comp_id = campaign_data['comp_id'];
            var mobile = data['phoneNo'];
            var status = data['status'];
            var cause = data['cause'];
            var error = data['errCode'];
            var event = '_sms_delivered';
            camp_data["mobile"] = mobile;
            camp_data["status"] = status;
            camp_data["cause"] = cause;
            camp_data["error"] = error;
            console.log(comp_id,'Gupshup SMS -', camp_data);
            //Log.L(Log.I, comp_id,'Gupshup SMS -', camp_data);
            try {
                var url = "http://evbk.gamooga.com/ev/?c=" + comp_id + "&v=" + vid + "&e=" + event
                Object.entries(camp_data).forEach(
                    ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
                );
                console.log(comp_id,'Gupshup SMS -', url)
                //Log.L(Log.I, comp_id,'Gupshup SMS -', url);
                axios.get(url).then(function (response) {
                  }).catch(function (error) {
                    console.log(comp_id,'karvy Gupshup -',error);
                    //Log.L(Log.E, comp_id,'karvy Gupshup -', error);
                  });
            }
            catch (err) {
              console.log(comp_id,'gupshup - Error in Webhook from Gamooga Event API \n%s', err);
                //Log.L(Log.E, comp_id,'gupshup - Error in Webhook from Gamooga Event API \n%s', err);
                res.writeHead(200);
                res.end("ERROR");
            }
        }
        console.log('Instead of passing object we are getting', typeof (data));
        //Log.L(Log.I,'Instead of passing object we are getting', typeof (data));        
        //res.writeHead(200);
        //res.end("ok");
        res.status(200).send("OK")
    }
    catch (err) {
      console.log('gupshup - Error in Webhook from Gupshup \n%s', err);
        //Log.L(Log.I,'gupshup - Error in Webhook from Gupshup \n%s', err);
        //res.writeHead(200);
        //res.end("ERROR");
        res.status(200).json({'error':err})
    } 
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //log.info('error');
  //log.info('working'); 
  //log.info(req.body);
  //res.writeHead(200);
  //res.end("OK");
});

router.post('/smswebhook', function (req, res) {
  log.info('SMS post logs');
  log.info(req.body);
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //log.info('error');
  //log.info('working'); 
  //log.info(req.body);
  res.writeHead(200);
  res.end("OK");
});

  router.get('/implwebhook', function (req, res) {
    log.info('chat get logs');
    log.info('body',req.body);
    log.info('query',req.query);
    log.info('params',req.params);
    log.info('headers',req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    log.info('error');
    log.info('working'); 
    log.info(req.body);
    try {
      var webhookData = req.query;
      log.info('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        var complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          var z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        log.info(custom_params)
        //var comp_id = custom_params['cmpid']
        var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        var vid = custom_params['vid']
        log.info('Final----',comp_id,custom_params)
        var event = 'test_oracle'
        var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              log.info(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        log.info(url);
        axios.get(url).then(function(response) {
          log.info(response.statusText);
        })
        .catch(function(error) {
          log.info(error);
        });
      }
      //res.writeHead(200);
      res.end("OK");
    } catch(err){
      log.info('Oracle \n%s', err)
    }
  });

  router.get('/implwebhook/spam/', function (req, res) {
    log.info('chat get logs');
    log.info('body',req.body);
    log.info('query',req.query);
    log.info('params',req.params);
    log.info('headers',req.headers);
    log.info(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    log.info('error');
    log.info('working'); 
    log.info(req.body);
    try {
      var webhookData = req.query;
      log.info('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        var complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          var z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        log.info(custom_params)
        //var comp_id = custom_params['cmpid']
        var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        var vid = custom_params['vid']
        log.info('Final----',comp_id,custom_params)
        var event = 'test_oracle'
        var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              log.info(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        log.info(url);
        /*axios.get(url).then(function(response) {
          log.info(response.statusText);
        })
        .catch(function(error) {
          log.info(error);
        });*/
      }
      //res.writeHead(200);
      res.end("OK");
    } catch(err){
      log.info('Oracle \n%s', err)
    }
  });

router.get('/implwebhook/unsubscribe/', function (req, res) {
  log.info('chat get logs');
  log.info('body',req.body);
  log.info('query',req.query);
  log.info('params',req.params);
  log.info('headers',req.headers);
  log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  log.info('error');
  log.info('working'); 
  log.info(req.body);
  try {
    var webhookData = req.query;
    log.info('Oracle Email -', webhookData);
    if(typeof(webhookData) == 'object'){
      var complete_data = webhookData.cmpdetails.split(',');
      let custom_params = complete_data.reduce((object, key) => {
        var z = key.split(':')
        object[z[0]] = z[1];
        return object;
      }, {});
      log.info(custom_params)
      //var comp_id = custom_params['cmpid']
      var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
      var vid = custom_params['vid']
      log.info('Final----',comp_id,custom_params)
      var event = 'test_oracle'
      var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
      Object.entries(custom_params).forEach(
        ([key,value]) => {
          if(key != 'cmpid' && key != 'vid'){
            log.info(key,value)
            url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
          }
        }
      )
      log.info(url);
      /*axios.get(url).then(function(response) {
        log.info(response.statusText);
      })
      .catch(function(error) {
        log.info(error);
      });*/
    }
    //res.writeHead(200);
    res.end("OK");
  } catch(err){
    log.info('Oracle \n%s', err)
  }
});


router.post('/wpsmscallback/', async (req, res) => {
  let wtappsms = req.body;
log.info(typeof wtappsms);
console.log('body<><><><><><><><><><><><>',req.body);
try{
    if (typeof (wtappsms) == 'object') {
        log.info(wtappsms);
        let extra = wtappsms.recipient.reference.messageTag1;
        let event_type = wtappsms.events.eventType;
        if (event_type  == 'DELIVERY EVENTS'){//status == "Read" || status == "delivered" || status == "sent"){
            console.log(extra)
            var params = extra.split(';').reduce((arr, each) => {
              arr[each.split(':')[0]] = each.split(':')[1]
              return arr
            },{})
            console.log(params)
            if(params['compid'] == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
              params['server'] = 'engageb.rsec.co.in';
            } else if(params['compid']=='fcbe3928-6512-48a6-8cb5-c8c51e100539'){
              params['server'] = 'js3in1.gamooga.com';
            }else{
              params['server'] = 'evbk.gamooga.com';
            }
            var details = Object.assign({},params,{event_type,status:wtappsms.notificationAttributes.status,reason:wtappsms.notificationAttributes.reason,channel:wtappsms.channel,to_add:wtappsms.recipient.to,event:'_wpsms_'+wtappsms.notificationAttributes.status})
              
              //{...params,event_type,status:wtappsms.notificationAttributes.status,reason:wtappsms.notificationAttributes.reason,channel:wtappsms.channel,to_add:wtappsms.recipient.to,event:'_wpsms_'+wtappsms.notificationAttributes.status}
            console.log(details);
            log.info(details);
            eventpush(details);
        }
    }
  }catch (e){
      log.info("Error in incoming data from value first", e);
      res.writeHead(200);
      res.end("ERROR");
  }
  res.writeHead(200);
  res.end("OK");
});

/*
router.post('/wpsmscallback', async (req, res) => {
    let wtappsms = req.body
    console.log(wtappsms)
    let servermaper = {
        '6a7ba941-3460-4ff6-b36b-1e1d214415c5' : 'engageb.rsec.co.in',
        'fcbe3928-6512-48a6-8cb5-c8c51e100539' : 'js3in1.gamooga.com'
    }
    try {
        if (typeof (wtappsms) == 'object') { 
            let extra = wtappsms.recipient.reference.messageTag1
            let event_type = wtappsms.events.eventType

            if( event_type == 'DELIVERY EVENTS') {
                var params = extra.split(';').reduce((arr, each) => {
                    arr[each.split(':')[0]] = each.split(':')[1]
                    return arr
                },{})
                let compid = params.comp_id ? params.comp_id : params.compid
                if (servermaper[compid]) {
                    params.server = servermaper[compid]
                } else {
                    params.server = 'evbk.gamooga.com'
                }

                params = Object.assign({},params,{
                  event_type,
                  status:wtappsms.notificationAttributes.status,
                  reason:wtappsms.notificationAttributes.reason,
                  channel:wtappsms.channel,
                  to_add:wtappsms.recipient.to,
                  mid : wtappsms.events.mid,
                  event:'_wpsms_'+wtappsms.notificationAttributes.status
              })
              
                eventpush(params);
                res.status(200).send('OK')
            }
        }
    } catch(e) {
        res.status(200).send('ERROR')
    }
})
 

  try {
      if (typeof (wtappsms) == 'object') {
          log.info(wtappsms);
          let extra = wtappsms.recipient.reference.messageTag1;
          let event_type = wtappsms.events.eventType;
          if (event_type  == 'DELIVERY EVENTS'){
              var params = extra.split(';').reduce((arr, each) => {
                arr[each.split(':')[0]] = each.split(':')[1]
                return arr
              },{})
              let compid = params.comp_id ? params.comp_id : params.compid;
              if(compid == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
                params['server'] = 'engageb.rsec.co.in';
                console.log(params)
              } else {
                params['server'] = compid == 'fcbe3928-6512-48a6-8cb5-c8c51e100539'? 'js3in1.gamooga.com': 'evbk.gamooga.com';
              }
              console.log(params)
              params = {...params,event_type,status:wtappsms.notificationAttributes.status,reason:wtappsms.notificationAttributes.reason,channel:wtappsms.channel,to_add:wtappsms.recipient.to,event:'_wpsms_'+wtappsms.notificationAttributes.status}
              
              eventpush(params);
          }
      }
  }catch (e){
      console.log("Error in incoming data from value first", e);
      res.writeHead(200);
      res.end("ERROR");
    }
  //res.writeHead(200);
  res.end("OK");
});
*/

module.exports = router;