const express = require('express');
const app = express();

var ourRouter = express.Router();
var routerCeption = express.Router();

routerCeption.get('/time', (req, res) => {
  res.status(200).json({msg: 'it\'s really really slow'});
});

ourRouter.get('/greet/:name', (req, res) => {
  res.status(200).json({msg: 'hello ' + req.params.name});
});

ourRouter.use('/anotherlevel', routerCeption);
app.use('/api', ourRouter);

ourRouter.get('/hello/world', (req, res) => {
  res.status(200).json({msg: 'after the use'});
});

app.get('/api/*', (req, res) => {
  res.status(200).json({msg: 'not in router'});
});

app.listen(3000, () => console.log('server up'));
