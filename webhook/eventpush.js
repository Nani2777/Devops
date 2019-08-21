const axios = require('axios');

const eventpush = function(data){
  try{
    var url = `http://${data.server}/ev/?c=${data.compid}&v=${data.vid}&e=${data.event}`
        Object.entries(data).forEach(
          ([key,value]) => {
            if(key != 'compid' && key != 'vid' && key != 'event' && key != 'server'){
              //console.log(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        console.log(url);
        //return url
        try{
          axios.get(url).then(function(response) {
            console.log(response.statusText);
          })
          .catch(function(error) {
            console.log(error);
          });
        }catch(e){
          console.log("Error in event push", e);
        }
      } catch (e){
        console.log("Error in incoming data from value first", e);
        //res.writeHead(200);
        //res.end("ERROR");
      }
}

module.exports = eventpush;