const express = require('express');
const bodyParser = require('body-parser');                        
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();                                                               


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://sagar123singh:ds@cluster0.oye0t.mongodb.net/aws-cloud?authSource=admin&replicaSet=atlas-gyucxl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});