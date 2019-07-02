let express = require("express");
let router = express.Router();

const awswebhook = require('./aws');
const valuefirstwebhook = require('./valuefirst');
const pepipostwebhook = require('./pepipost');
const gupshupwebhook = require('./gupshup');
const netcorewebhook = require('./netcore');
const mailkootwebhook = require('./mailkoot');
const exotelwebhook = require('./exotel');
const falconidewebhook = require('./falconide');
const titanwebhook = require('./titan');
const implwebhook = require('./testapi');
const logg = require('../config/winston');




router.use('/aws', awswebhook);
router.use('/valuefirst', valuefirstwebhook);
router.use('/pepipost', pepipostwebhook);
router.use('/gupshup', gupshupwebhook);
router.use('/netcore', netcorewebhook);
router.use('/mailkoot', mailkootwebhook);
router.use('/exotel', exotelwebhook);
router.use('/falconide', falconidewebhook);
router.use('/titan', titanwebhook);
router.use('/testapi', implwebhook);

module.exports = router;