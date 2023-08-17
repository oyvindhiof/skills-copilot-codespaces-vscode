// Create web server
 -X POST -d 'another hello'
// curl -i http://localhost:3000
// curl -i http://localhost:3000 -X DELETE
// curl -i http://localhost:3000 -X DELETE -d '0'
// curl -i http://localhost:3000 -X DELETE -d '1'
// curl -i http://localhost:3000 -X DELETE -d '2'

// Path: comments.js
// Create web server
// Run: node comments.js
// To test: curl -i http://localhost:3000/comments

var http = require('http');
var url = require('url');
var items = []; // data store

var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk) {
                item += chunk;
            });
            req.on('end', function() {
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach(function(item, i) {
                res.write(i + ') ' + item + '\n');
            });
            res.end();
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
    }
});

server.listen(3000);

// curl -i http://localhost:3000 -X POST -d 'hello world'
// curl -i http://localhost:3000 -X POST -d 'another hello'
// curl -i http://localhost:3000
// curl -i http://localhost:3000 -X DELETE
// curl -i http://localhost:3000 -X DELETE -d '0'
// curl -i http://localhost:3000 -X DELETE -d '1'
// curl -i http://localhost:3000 -X DELETE -d '2'

// Path: comments.js
// Create web server
// Run: node comments