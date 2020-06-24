const axios = require('axios')

const API1_config = {
    URL: 'https://symboinsurance:d92490c25a518c92c0def5b7cf90348abf7226ef@api.exotel.com/v2/accounts/symboinsurance/campaigns'
}

const API2_config = {
    URL : 'https://symboinsurance:d92490c25a518c92c0def5b7cf90348abf7226ef@api.exotel.com/v2/accounts/symboinsurance/campaigns/'
}

const callAPI1 = (config) => {
    return new Promise (async (resolve, reject) => {
        try {
            const res = await axios.post(API1_config.URL, config)
            const data = res.data.response
            console.log(data)
            if(data[0].code == 200) {
                resolve(data[0].data.id)
            }
            else {
                console.log('call failed')
            }
        } catch (e) {
            reject(e)
        }
    })
}

const get_callreport = (payload) => {
    console.log('>>>>',payload)
    return new Promise ( async(resolve, reject) => {
        try {
            let URL = `${API2_config.URL}${payload.ivr_call_id}`
            console.log(URL)
            const res = await axios.get(URL)
            //console.log('>>>>>>>>>>',res.data)
            if(res.data.http_code == 200){
                const data = res.data.response[0]
                //console.log('############3',data)
                resolve(data)
            }
            else {
                reject()
            }
            
        } catch (e) {
            reject()
        }
    }) 
}

module.exports = {
    API1_config,
    API2_config,
    get_callreport,
    callAPI1
}