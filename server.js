const staticServer = require('node-static');

var fileServer = new staticServer.Server('./build');

require('http')
    .createServer(function(request, response) {
        request
            .addListener('end', function() {
                fileServer.serve(request, response);
            })
            .resume();
    })
    .listen(8080);
