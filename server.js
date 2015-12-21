var express = require('express');
var pg = require('pg');
var app = express();

// var url = process.env.DATABASE_URL || 'localhost:8000'

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public_html'));

app.listen(2000);

app.listen(app.get('port'), function() {
    console.log('Dream Dash is running on port', app.get('port'));
});

var connectionString = "postgres://mzrywechfymqij:sQfZ_XE1k6enGY5RnyTnNkLD7j@ec2-54-204-39-67.compute-1.amazonaws.com:5432/d9q2fvfchkasav";

pg.connect(connectionString + '?ssl=true', function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT * FROM highscores')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

