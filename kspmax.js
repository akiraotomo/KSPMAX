var http = require('http');
var body1;

function shit(callback) {
    return http.get({
        host: '192.168.1.65'
        ,port: '8085'
        ,path: '/telemachus/datalink?altitude=v.altitude&missiontime=v.missionTime'
 
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
            body1 = body;
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);
            body1 = parsed;
          console.log(parsed);
        });
    });
}


shit();
console.log(body1);