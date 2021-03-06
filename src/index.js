const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  next();
});

const port = process.env.NODE_ENV === 'development' ? 3001 : process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

require('./routes/health')(app);
require('./routes/users')(app);

app.listen(port, () => {
  console.log(`listening on ${port}`);
})

module.exports = app;