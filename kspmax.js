var http = require('http');
var async = require('../async/lib/async.js');
var MAX7219 = require('./MAX7219.js');
var disp = new MAX7219("/dev/spidev0.0", 4);
//var data = {"alt":94644.1533377647,"ApA":266.080000005793,"timeToAp":110,"PeA":123};
var count = 0;
var data1;
 var options = {
  hostname: '192.168.1.65'
  ,port: '8085'
  ,path: '/telemachus/datalink?alt=v.altitude&ApA=o.ApA&timeToAp=o.timeToAp&PeA=o.PeA'
  ,method: 'GET'
  ,headers: { 'Content-Type': 'application/json' }
};

disp.clearDisplay();

//var data = JSON.parse(test);

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
};

function writeOut(num, cont, brite) {
    disp.setActiveController(cont);
    disp.setDisplayIntensity(brite);
    disp.setDecodeAll();
    disp.setScanLimit(8);
    disp.startup();
    var num = pad(parseInt(num), 8).toString(8).split(""); 
    console.log(num);
    disp.setDigitSymbol(7, num[0]);
    disp.setDigitSymbol(6, num[1]);
    disp.setDigitSymbol(5, num[2]);
    disp.setDigitSymbol(4, num[3]);
    disp.setDigitSymbol(3, num[4]);
    disp.setDigitSymbol(2, num[5]);
    disp.setDigitSymbol(1, num[6]);
    disp.setDigitSymbol(0, num[7]);
}

async.whilst(
    function () { return count < 5; },
    function (callback) {
      req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (data) {
//       console.log(data); //
//       var test = JSON.stringify(data);
         var data1 = JSON.parse(data);
        console.log(data1.alt);
        writeOut(data1.alt,0,15);
        writeOut(data1.ApA,1,15);
        writeOut(data1.timeToAp,2,15);
        writeOut(data1.PeA,3,15);
        setTimeout(callback, 100);

      });
      });
      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });
      req.end();
    },
    function (err) {
        // 5 seconds have passed 
    }
);


