const axios = require('axios');
const log = require('../../logger');

const eventpush = function(data){
  try{
    var url = `http://${data.server}/ev/?c=${data.compid}&v=${data.vid}&e=${data.event}`
        Object.entries(data).forEach(
          ([key,value]) => {
            if(key != 'compid' && key != 'vid' && key != 'event' && key != 'server'){
              //log.info(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        log.info(url);
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