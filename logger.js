const opts = {
    errorEventName:'error',
        logDirectory:'/logfiles', // NOTE: folder must exist and be writable...
        fileNamePattern:'roll-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};

const log = require('simple-node-logger').createRollingFileLogger( opts );

module.exports = log