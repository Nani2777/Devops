const axios = require('axios');
const log = require('../logger');

/**
 * Mandatery feilds for event push
 * @param {comp_id:"",server:"",vid:"",event:""} data  
 */

const eventpush = function(data){
    return new Promise ((resolve, reject) => {
        try {
            let compid = data.comp_id ? data.comp_id : data.compid;
            var url = `http://${data.server}/ev/?c=${compid}&v=${data.vid}&e=${data.event}`
            Object.entries(data).forEach(
                ([key,value]) => {
                  if(key != 'compid' && key != 'comp_id' && key != 'vid' && key != 'event' && key != 'server'){
                    url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
                  }
                }
            )
            try {
                axios.get(url).then(function(response) {
                    console.log(response.data)
                    log.info(response.statusText);
                    resolve({message: "Event push successfull",status:200})
                }).catch(function(error) {
                    log.info('Getting Error while sending the requesst',error)
                    reject()
                });
            } catch(e) {
                log.info('Something went wrong while calling Gamooga API', e)
                reject()
                
            }
        }
        catch (e) {
            log.info('Receiving wrong incoming data', e)
            reject()
        }
    })
}

module.exports = eventpush;