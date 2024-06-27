const fs = require('fs');
const { Binary, ObjectId } = require('mongodb');
const Archive = require('../models/archive.model');
const NodeCache = require('node-cache');
const documentCache = new NodeCache({ stdTTL: 60 * 60 });

const post_user = async (req, res) => {
    try {
        const documentExist = await Archive.findOne({ name: req.body.userId });
        if (documentExist) {
            throw Error('this does already exist');
        }
        const document = new Archive({ name: req.body.userId });
        await document.save();
        res.send('user added to archive');
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('Failed to add user.');
    }
}

const post_doc = async (req, res) => {

    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    try {
        const { userId, filetype, filename } = req.body;
        switch (filetype) {
            case 'vacations':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        vacations: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'ID':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        ID: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'penalties':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        penalties: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'employmentContract':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        employmentContract: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'disability':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        disability: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'innerTransfers':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        innerTransfers: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'secondments':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        secondments: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'academicQualification':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        academicQualification: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'certificates':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        certificates: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'privateVacations':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        privateVacations: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'personalPhoto':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        personalPhoto: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;
            case 'bankingTransactions':
                await Archive.updateOne({ name: userId }, {
                    $push: {
                        bankingTransactions: {
                            filename: filename,
                            fileData: new Binary(req.file.buffer)
                        }
                    }
                });
                break;

        }
        res.send('document added');
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('Failed to upload file.');
    }
};

const get_doc = (req, res) => {
    Archive.findOne({ name: req.params.id })
        .then((result) => {
            console.log(`user name: ${result.name}`);
            documentCache.set(req.params.id, result);
            res.status(200).send(
                `${documentCache.get(req.params.id).name}`
            );
        })
        .catch((e) => res.status(500).send(`error: ${e}`));
};

const get_file = async (req, res) => {
    if (!documentCache.has(req.params.id)) {
        get_doc(req, res);
    }
    console.log(req.params.id);
    let images = documentCache.get(req.params.id)[`${req.params.images}`];
    const json = [];
    console.log(typeof images);
    if (typeof images != undefined) {
        console.log(typeof images);
        images.forEach((e) => {
            json.push({
                name: e.filename,
                binary: Buffer.from(Uint8Array.from(e.fileData).buffer).toString('base64'),
            });
        })
    }
    const jsonString = JSON.stringify(json);
    res.set('Content-Type', 'application/json');
    res.send(jsonString);
};

module.exports = {
    post_user,
    post_doc,
    get_doc,
    get_file,
};
/*
example to save the files
const img = fs.readFileSync('./images/penalty2.png');
        const document = new Archive({
            name: 'User 1',
            penalties: [
                {
                    filename: 'جزاء-فبراير2024.png',
                    fileData: new Binary(img)
                }
            ],
            employmentContract: [
                {
                    filename: 'employmentContract.png',
                    fileData: new Binary(img),
                },
            ],
            disability: [{
                filename: 'disability.png',
                fileData: new Binary(img),
            }],
            innerTransfers: [
                {
                    filename: 'transfer.png',
                    fileData: new Binary(img)
                }
            ],
            ID: [
                {
                    filename: 'idface.png',
                    fileData: new Binary(img),
                },
                {
                    filename: 'idback.png',
                    fileData: new Binary(img)
                }
            ],
            secondments: [
                {
                    filename: 'secondment.png',
                    fileData: new Binary(img),
                }
            ]
        });
        document.save();
*/
// let names = [
//     'penalties',
//     'vacations', //checked
//     'disability', //checked
//     'innerTransfers', //checked
//     'secondments',
//     'certificates',
//     'privateVacations',
//     'bankingTransactions',
//     'employmentContract'
// ];