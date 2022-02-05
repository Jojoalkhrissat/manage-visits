const express = require('express');
const {db} = require('./framework/config');
const router = require('./api/v1');
const app = express();
app.use('/', router);
app.use(express.json());
app.listen(3050);