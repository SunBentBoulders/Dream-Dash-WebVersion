var express = require('express');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public_html'));

app.listen(2000);
app.listen(app.get('port'), function() {
    console.log('Dream Dash is running on port', app.get('port'));
});