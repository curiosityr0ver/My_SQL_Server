const zlib = require('zlib');

const sendResponse = (res, error, data, statusCode = 200) => {
    if (error) {
        const compressedError = zlib.gzipSync(JSON.stringify(data));
        return res.status(400).send(error);
    }
    const compressedData = zlib.gzipSync(JSON.stringify(data));
    res.status(200).send(compressedData);
};

module.exports = sendResponse