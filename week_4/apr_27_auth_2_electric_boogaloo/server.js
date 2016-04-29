require('dotenv').config();
if (!process.env.APP_SECRET)
  throw new Error('You need to set the APP_SECRET environment variable');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bearsRouter = require(__dirname + '/routes/bearsrouter');
const authRouter = require(__dirname + '/routes/auth_router');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/bears_db');

app.use('/api', bearsRouter);
app.use('/api', authRouter);

app.listen(PORT, () => console.log('server up on port:' + PORT));
