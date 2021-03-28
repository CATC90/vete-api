const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const rootPath = path.parse(require.main.filename).dir;
const pkgJSON = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json')).toString());

const genericOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const getGenericPath = () => {
    return `mongodb://localhost:27017/${pkgJSON.name}`;
}
const config = async (config = {}) => {
    const db = config.mongoURL || getGenericPath();
    const options = config.options ||  genericOptions; 
    await mongoose.connect(db, options);
 
    console.log('BD successfully connected');
    return { db, options };
}

module.exports = config;