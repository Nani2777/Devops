let express = require('express');
let router = express.Router();

//const drishti = require('./drishti');
//const encryptionApi = require('./encryption');
const webhookscript = require('./webhook');
const feedback = require('./IFL_Feedback');
const conf = require('./config');
//const logs = require('./logs');

//router.use('/drishti', drishti);
//router.use('/encrypt', encryptionApi);
router.use('/webhook', webhookscript);
router.use('/feedback', feedback);
router.use('/logs', conf);
//router.use('/feedback', logs);
module.exports = router;