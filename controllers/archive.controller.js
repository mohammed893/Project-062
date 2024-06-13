const fs = require('fs');
const { Binary, ObjectId } = require('mongodb');
const Archive = require('../models/archive.model');
// const mongoose = require('mongoose');

const post_doc = async (req, res) => {
    try {
        await Archive.create(req.body);
        console.log(`file saved`);
        res.status(201).send('done');
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).send('Failed to save file');
    }
};
const get_doc = (req, res) => {
    Archive.findById(req.params.id)
        .then((result) => {
            // test to save one of the images
            fs.writeFileSync(
                './test.png',
                result.penalties[0].penalty.fileData
            );
            res.status(200).send(`got it: ${result.name}`);
        })
        .catch((e) => res.status(500).send(`error: ${e}`));
};
module.exports = {
    post_doc,
    get_doc,
    // get_file,
};
/*
example to save the files, you can use it till buliding the ui to make, I think I might make a simple html view to try it before building the flutter app
const img = fs.readFileSync('./images/penalty2.png');
        const document = new Archive({
            name: 'omar mohamed',
            penalties: [
                {
                    penalty: {
                        filename: 'penalty3.png',
                        fileData: new Binary(img),
                    },
                    penaltyRemoval: {
                        filename: 'penalty2.png',
                        fileData: new Binary(img),
                    },
                },
            ],
            vacations: [
                {
                    filename: 'vacation1.png',
                    fileData: new Binary(img),
                },
                {
                    filename: 'penalty2.png',
                    fileData: new Binary(img),
                },
            ],
            employmentContract: {
                employmentContractData: {
                    filename: 'employmentContract.png',
                    fileData: new Binary(img),
                },
            },
            disability: {
                filename: 'disability.png',
                fileData: new Binary(img),
            },
        });
*/
