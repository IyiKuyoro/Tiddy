import fs from 'fs';

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  exec(data, callback);
});
