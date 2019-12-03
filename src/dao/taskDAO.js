const AWS = require('../config/AWSProvider');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB();

class TaskDAO {
    
    init() {
        return new Promise((resolve, reject) => {
            dynamoDB.listTables({}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data.TableNames.indexOf('Tasks') == -1) {
                        dynamoDB.createTable({
                            TableName: 'Tasks',
                            AttributeDefinitions: [
                                { AttributeName: 'id', AttributeType: 'S' },
                            ],
                            KeySchema: [
                                { AttributeName: 'id', KeyType: 'HASH' },
                            ],
                            ProvisionedThroughput: {
                                ReadCapacityUnits: 1,
                                WriteCapacityUnits: 1
                            },
                        }, (err, data) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(data)
                            }
                        })
                    } else {
                        resolve(data)
                    }
                }
            })
        })
    }

    insert(task) {
        return new Promise((resolve, reject) => {

            const id = task.id || uuid()

            dynamoDB.putItem({
                TableName: 'Tasks',
                Item: {
                    "id": { S: id },
                    "title": { S: task.title },
                    "resume": { S: task.resume },
                    "isPriority": { BOOL: task.isPriority },
                    "isDone": { BOOL: task.isDone }
                }
            }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        id,
                        title: task.title,
                        resume: task.resume,
                        isPriority: task.isPriority,
                        isDone: task.isDone
                    })
                }
            });

        })
    }

    listAll() {
        return new Promise((resolve, reject) => {
            dynamoDB.scan({ TableName: 'Tasks' }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const list = [];
                    data.Items.forEach(item => {
                        const task = {
                            id: item.id.S,
                            title: item.title.S,
                            resume: item.resume.S,
                            isPriority: item.isPriority.BOOL,
                            isDone: item.isDone.BOOL,
                        }
                        list.push(task)
                    });
                    resolve(list)
                }
            });
        })
    }

    findTaskById(id) {
        return new Promise((resolve, reject) => {
            dynamoDB.getItem({
                TableName: 'Tasks',
                Key: {
                    "id": { S: id }
                }
            }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const item = data.Item;
                    var task = null;
                    if (item) {
                        task = {
                            id: item.id.S,
                            title: item.title.S,
                            resume: item.resume.S,
                            isPriority: item.isPriority.BOOL,
                            isDone: item.isDone.BOOL,
                        }
                    }
                    resolve(task)
                }
            });
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            dynamoDB.deleteItem({
                TableName: 'Tasks',
                Key: {
                    "id": { S: id }
                }
            }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

module.exports = TaskDAO