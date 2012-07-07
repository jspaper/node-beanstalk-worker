Beanstalk Worker for Node.js
============================

Fork from [benlund/node-beanstalk-worker](https://github.com/benlund/node-beanstalk-worker) compatiable with [han/stalker](https://github.com/han/stalker).

## compatible with stalker
benlund/node-beanstalk-worker provide a cluster worker in single machine, but the job data format incompatiable with han/stalker. han/stalker is a cool wrapper for ruby user could easy to manipulate beanstalk job. I change data format node-beanstalk-worker could get jobs from stalker.

## Try cluster of node.js
node-beanstalk-worker didn't support failover yet. This means once any workers throwe and all of the workers will throw too. I recommend you could try [node.js cluster](http://nodejs.org/api/cluster.html) and one process only run single node-beanstalk-worker also could take advantage of `stop` worker in node-beanstalk-worker. The `stop` way of node-beanstalk-worker is more safe than exit directly process like `process.exit(0)`.

## limit reserves
Sometimes, one job will block all of the queue because coding mistake or the other problems. I set the max reserves time 30, if more then 30 times the job will been buried.

## TODO

* yaml coniguration