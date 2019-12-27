const axios = require('axios')

const API1_config = {
    URL: 'https://symboinsurance:d92490c25a518c92c0def5b7cf90348abf7226ef@api.exotel.com/v2/accounts/symboinsurance/campaigns',
    body : {
        "campaigns":[
            {
            "caller_id":"02248977892",
            "url":"http://my.exotel.com/symboinsurance/exoml/start_voice/263515",
            "from": [ "+919494843730"],
            "retries": {
                "number_of_retries": 3,
                "interval_mins": 2,
                "mechanism": "Exponential",
                "on_status": ["failed"]
                }
            }
        ]
    }
}

const API2_config = {
    URL : 'https://symboinsurance:d92490c25a518c92c0def5b7cf90348abf7226ef@api.exotel.com/v2/accounts/symboinsurance/campaigns/'
}

const callAPI1 = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const res = await axios.post(API1_config.URL, API1_config.body)
            const data = res.data.response
            console.log(data)
            if(data[0].code == 200) {
                resolve(data[0].data.id)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    API1_config,
    API2_config,
    callAPI1
}