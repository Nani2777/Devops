let express = require('express');
let router = express.Router();

//const drishti = require('./drishti');
//const encryptionApi = require('./encryption');
const webhookscript = require('./webhook');
const feedback = require('./IFL_Feedback');

//router.use('/drishti', drishti);
//router.use('/encrypt', encryptionApi);
router.use('/webhook', webhookscript);
router.use('/feedback', feedback);
module.exports = router;