#! /usr/bin/env node

var BeanstalkWorkerCluster  = require('../lib/beanstalk_worker_cluster').BeanstalkWorkerCluster;

process.on('SIGINT', function() {
  BeanstalkWorkerCluster.stop();
});

process.on('TERM', function() {
  BeanstalkWorkerCluster.stop();
});

var options = {
  workers: 3,
  server: '127.0.0.1:11300',
  tubes: ['test1', 'test.foo', 'test.bar'],
  ignore_default: true,
  handlers: ['../handlers/test', '../handlers/http_request']
};


// conf file
var config_file = process.argv[2];
var config_options = {};
if(config_file) {
  config_options = require(config_file);
}

for(var k in config_options) {
  if(config_options.hasOwnProperty(k)) {
    options[k] = config_options[k];
  }
}

var oHandlers={};
for(var i=0; i< options.handlers.length; i++) {
  oHandlers=MergeRecursive(oHandlers, require(options.handlers[i]).handlers);
}

function MergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}


BeanstalkWorkerCluster.start(options.server, options.workers, oHandlers, options.tubes, options.ignore_default);


/* Todo:

 - hot stopping/starting of workers

 - daemonize properly

 - logging to file

*/
