var express = require('express')
var multer = require('multer')
const path = require("path");
var app = express()
var port = 3000;




const googleAPI = require("./googleapi.js")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

app.use('/a', express.static('/b'));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


app.post('/getDestinationName', upload.single('destinationPicture'), function (req, res, next) {
    console.log(JSON.stringify(req.file));
    console.log(req.file.path)
    googleAPI.detectLandmark("./" + req.file.path).then((response1) => {
        console.log(response1);
        var response = '<a href="/">Home</a><br><div class="text-center"><div style=background-color: #ffffff;padding: 10px 30px 40px;border-radius: 10px;width: 600px;height: 310px;box-shadow: 0 5px 10px 0 rgb(0 0 0 / 30%);>'
        response += `<img src="http://localhost:3000/uploads/${req.file.filename}" style="width:500px ;margin-left: auto;margin-right: auto;display: block;"/><br></div>`
        response += `<h2 style="width: fit-content;margin-left: auto;margin-right: auto;">${response1}</h2>`

        return res.send(response)
    }).catch(err => next(err));

})

app.listen(port, () => console.log(`Server running on port ${port}!`))
