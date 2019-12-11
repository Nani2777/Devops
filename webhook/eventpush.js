const axios = require('axios');
const log = require('../logger');

const eventpush = function(data){
  try{
    let compid = data.comp_id ? data.comp_id : data.compid;
    var url = `http://${data.server}/ev/?c=${compid}&v=${data.vid}&e=${data.event}`
        Object.entries(data).forEach(
          ([key,value]) => {
            if(key != 'compid' && key != 'comp_id' && key != 'vid' && key != 'event' && key != 'server'){
              //log.info(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        log.info(url);
        console.log(url);
        //return url
        try{
          axios.get(url).then(function(response) {
            log.info(response.statusText);
          })
          .catch(function(error) {
            log.info(error);
          });
        }catch(e){
          log.info("Error in event push", e);
        }
      } catch (e){
        log.info("Error in incoming data from value first", e);
        //res.writeHead(200);
        //res.end("ERROR");
      }
}

module.exports = eventpush;