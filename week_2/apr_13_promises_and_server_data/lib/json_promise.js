module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    var stringified = '';
    req.on('data', (data) => {
      stringified += data.toString();
    });

    req.on('end', () => {
      try {
        var parsed = JSON.parse(stringified);
        resolve(parsed);
      } catch (e) {
        reject({error: e, input: stringified}); 
      }
    });
  });
};
