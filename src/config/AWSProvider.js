const AWS = require('aws-sdk');

AWS.config.update({
    region: 'sa-east-1',
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: 'http://localhost:8000'
});

module.exports = AWS