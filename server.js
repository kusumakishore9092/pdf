'use strict';
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const pdf = require('html-pdf');
const Handlebars = require('handlebars');

const source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
const template = Handlebars.compile(source);

const data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
const result = template(data);
const options = { format: 'Letter' };

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', (req,res) => {
  pdf.create(result, options).toStream(function(err, stream) {
    if (err) return console.log(err);
      res.setHeader('Content-type', 'application/pdf')
        stream.pipe(res)
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
