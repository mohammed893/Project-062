const Request = require('../models/requests.archive.models');
const { Binary } = require('mongodb');

const getRequest = (req, res) => {
  Request.findOne({ id: req.params.id }).then((result) => {
    // console.log(result['fileData']);
    res.json({ base64: Buffer.from(Uint8Array.from(result['fileData']).buffer).toString('base64') });
  }).catch((e) => {
    console.log(e);
    res.status(400).send(`error: ${e}`);
  });
};

const postRequest = async (req, res) => {
  try {
    const documentExist = await Request.findOne({ id: req.params.id });
    if (documentExist) {
      throw Error('this does already exist');
    }

    const document = new Request({ id: req.params.id, fileData: new Binary(req.file.buffer) });
    await document.save();
    console.log('request added');
  } catch (err) {
    console.log('Error Adding', err);
  }
};

module.exports = {
  getRequest,
  postRequest
};