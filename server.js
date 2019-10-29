'use strict';

var express = require('express');
var cors = require('cors');
const formidalbe = require('formidable');
const util = require('util');
const _get = require('lodash/get');

const _  = {
  get: _get,
}

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', (req, res) => {
  const form = new formidalbe.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const contentType = _.get(files, 'upfile.type', 'text/plain');
    const size = _.get(files, 'upfile.size', null);
    const fileName = _.get(files, 'upfile.name', null);
    // res.end(util.inspect({
    //   type: contentType
    //   size
    // }));
    res.set({
      'content-type': contentType
    })
    res.status(200).json({
      name: fileName,
      type: contentType,
      size,
    })
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
