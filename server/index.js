const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(morgan('dev'));

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
