const winston = require('winston');
require('winston-mongodb');

let logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple())
      })
    ]
  });

const connectWinston = (config) => {
    if(!config) {
        return null; // does nothing
    }
    logger.add(new winston.transports.MongoDB({ ...config, collection: 'logs'}));
}

module.exports = { logger, connectWinston };