var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public_html'));

app.listen(2000);

app.listen(app.get('port'), function () {
    console.log('Dream Dash is running on port', app.get('port'));
});

//==================================================//
//router to database          						//
//==================================================//
// these will be moved to router file.
var connectionString = "postgres://mzrywechfymqij:sQfZ_XE1k6enGY5RnyTnNkLD7j@ec2-54-204-39-67.compute-1.amazonaws.com:5432/d9q2fvfchkasav";
var pgp = require('pg-promise')({
    // initialization options;
});
var db = pgp(connectionString + '?ssl=true');
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/highscores', function (req, res) {

    console.log('im inside of app.post');

    db.none("INSERT INTO highscores(name, score) VALUES(${playerName}, ${score})", req.body)
        .then(function () {
            // success;
            res.send();
        })
        .catch(function (error) {
            // error;
        });

});

app.get('/highscores', function (req, res) {
    // res.send('Get request to server');
    console.log('im inside of app.get');

    db.any("SELECT * FROM highscores ORDER BY score DESC")
        .then(function (data) {
            // success;
            return res.json(data);
        })
        .catch(function (error) {
            // error;
        });

});
