exports.handlers = {

  test: {
    foo: function(data, done){
      require('sys').puts('test.foo job passed data: ' + JSON.stringify(data));
      done();
    },
    bar: function(data, done){
      require('sys').puts('test.bar job passed data: ' + JSON.stringify(data));
      done();
    }
  },
  test1: function(data, done) {
    require('sys').puts('test1 job passed data: ' + JSON.stringify(data));
    done();
  }

};
