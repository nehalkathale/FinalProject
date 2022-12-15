const vision = require('@google-cloud/vision');


const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "valid-decoder-371500",
    "private_key_id": "",
    "private_key": "Wrdpryv/FJ/4qXLzK5+LISMbLwikD/lH6nbTt2rHS/zlPK4\ncMkYj65rAgMBAAECggEAE72Q04xPf/vzqKHFfi3ExdKyjvrqzDDAohHkc9b2Lro+\n7gMxUNIXV62+PU/4wLTjaqqOLpNXYQHCX56Dwtgx3hUBglOjOX++VaU6GUiIz67L\nLVftJqQp7HvK6FOZjS3aMRH/61V5+rRN5hJpd6mbBUYdey96ub9M/a6yePWQoMmo\nkvsIOA+xqY/p9or9f3jzlLg1Iv21qp1w2WVaJMZmzt7U8Xj5GaI13uxhVHoNwUij\nW1q1VxKVhB+C6BhFX6RjGIkyoVtXhddky8Q8XpTy3N/XdxqkIIpTHywCeFlgSu0j\n4Y41WtJ35KZNWfNp4zoxDmKqFtJE3zZTc4ZFKuAHsQKBgQD+FVd5+A2DnFXjO4ft\nsYL26MQfIXUT+w/XUxUNWN+qm7vyhPw6o8cYvsf1dyaqI8iV6eAsQMx1+bNW3BHQ\nXiJ7NZlxtVaXmaaMwgRxeABZW5Ad7u2Vv2oImMbhtFE5nZ5lbA6yQPzckow5lsxU\nVE9MwTskoy/5HVmdRMurtYNDmQKBgQDLYnI3Tu1UImPQPWYo98yGpfUY4KoQe/uG\nJHk+X7ff5GhK6xPagMPBWM6zVn1zq7W5WseI0gOPds9GdUNkyQytNHW/Se9KG45k\nxEfAonOmaN9WMRhxdc94awP6mrDdCTHOG1rO8QU1DY++VO6L9FnMj+HvDjkzGlP+\nGb4XjJ9EowKBgB1IVmGPLfeKD/f1R3AkciSEpP21fGnGGIhHYfi80mI2Oo3zt6IG\neA6pBiCLD+Cx6Q8l+hj/itDZ60pKaJ8sCitK/Rk2vfkQ0zoLrjlpjBjATba1b5o/\nijfda6ZdgrLyMGwd7P+sL7g4B4MnlvrtEIqXBnrtd7ztHgPbBuIONEeZAoGAMVsS\nnJlqvqAZ2M8Nm6OG3qYndIIQwy9TOppfUeOom4yyQnwJtVzKJIGIp7y1dPyWfQSq\np2lPs+EBK/gJAsxHZ0Dz0hf/GdzWEV4Qi47gweFxUVlYtTAByRcvQAGKKhmxHHNG\n9jFHMji4SVgTC6OgpyPDkF/DQcOB3ogguVZG0EECgYAb8xH/YL4pGMs90O1Khhg/\nvy38em/4JSQ5q4mngXN1rEJ6T1LCfUPnzSWNX+zOo7ndp2Hpqj5pAlZqTKyrtlM6\n8eTha34UWN6NJ6PP2CCJVnuZTn8yF8n/ao0upMpsqhFnYu26wVFC8TAChteilosH\nj9b4T1C8yiVD5oLZPJS2XQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "",
    "client_id": "112021150750770439923",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
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