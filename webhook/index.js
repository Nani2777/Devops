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
const oraclewebhook = require('./oracledyn');
const infobpiwebhook = require('./infobpi');
const symbo = require('./symbo');
const mailgun = require('./mailgun');
const karix = require('./karix');
const googleads = require('./googleads');


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
router.use('/infobpi', infobpiwebhook);
router.use('/symbo', symbo);
router.use('/mailgun', mailgun);
router.use('/karix', karix);
router.use('/googleads', googleads);

module.exports = router;