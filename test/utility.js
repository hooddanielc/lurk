var path = require('path');
var expect = require('chai').expect;
var spawn = require('child_process').spawn;
var utility = require(path.resolve(__dirname, '..', 'lib', 'utility'));

describe('utility', function () {
  it('can spawn a process', function (done) {
    var cmd = process.platform === 'win32' ? 'dir' : 'ls';
    var list = utility.spawn(cmd);

    list.on('close', function (exitCode) {
      expect(exitCode).to.eql(0);
      done();
    });
  });

  it('can spawn a process with args', function (done) {
    var python = utility.spawn('python', ['--version'], {
      stdio: 'inherit'
    });

    python.on('close', function (exitCode) {
      expect(exitCode).to.eql(0);
      done();
    });
  })

  it('reads emscripten config', function (done) {
    utility.readEmscriptenConfig().then(function (cfg) {
      expect(cfg).to.be.a('object');
      expect(cfg.EMSCRIPTEN_NATIVE_OPTIMIZER).to.be.a('string');
      expect(cfg.EMSCRIPTEN_ROOT).to.be.a('string');
      expect(cfg.LLVM_ROOT).to.be.a('string');
      done();
    }).catch(function (err) {
      done(err);
    });
  });
});
