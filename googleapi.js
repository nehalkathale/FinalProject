const vision = require('@google-cloud/vision');


const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "valid-decoder-371500",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/systemintegrationproject%40valid-decoder-371500.iam.gserviceaccount.com"
}))

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
}

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectLandmark = async (file_path) => {

    let [result] = await client.landmarkDetection(file_path);
    let place = "Result not found"
    if (result.landmarkAnnotations[0]) {
        if (result.landmarkAnnotations[0].description) {
            place = result.landmarkAnnotations[0].description;
        }
    }
    return place;

};


module.exports = { detectLandmark }
