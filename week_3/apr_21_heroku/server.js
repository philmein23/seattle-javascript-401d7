const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bearsRouter = require(__dirname + '/routes/bearsrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/bears_db');

app.use('/api', bearsRouter);

app.listen(PORT, () => console.log('server up on port:' + PORT));
