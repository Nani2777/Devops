const csv = require('csvtojson')
const axios = require('axios')

var m = axios.get("https://campaigns-reports.s3.ap-southeast-1.amazonaws.com/79a26a28ddd04b08bdec775707e6ec0a.csv").then((res)=>{
    console.log(res.data)
    csv().fromString(res.data).then(row=>{
        console.log(row)
    })
})
