import { module, test } from 'qunit';
import sinon, { SinonSpy } from 'sinon';

import { setupXStateTest } from 'qunit-xstate-test';

module('Integration | setupXStateTest', function(hooks) {

  module('Success', function(hooks) {
    setupXStateTest(hooks, undefined);

    // TODO: Test Loop Here
  });

  module('Failure', function(hooks) {
    let okSpy: SinonSpy;

    hooks.before(function(assert) {
      okSpy = sinon.spy();
      assert.ok = okSpy;
    });

    hooks.after(function(assert) {
      assert.equal(okSpy.called, true);
      assert.equal(okSpy.getCall(0).args[0], false);
      assert.equal(okSpy.getCall(0).args[1], 'Not all tests were exercised in this test suite (see console)');
    });

    setupXStateTest(hooks, undefined);

    // TODO: Test Loop Here
  });

});
