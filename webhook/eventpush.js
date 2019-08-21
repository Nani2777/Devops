const axios = require('axios');

const eventpush = function(data){
    var url = `http://evbk.gamooga.com/ev/?c=${data.compid}&v=${data.vid}&e=${data.event}`
        Object.entries(data).forEach(
          ([key,value]) => {
            if(key != 'compid' && key != 'vid' && key != 'event'){
              //console.log(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        console.log(url);
        //return url
        axios.get(url).then(function(response) {
          console.log(response.statusText);
        })
        .catch(function(error) {
          console.log(error);
        });
}

module.exports = eventpush;