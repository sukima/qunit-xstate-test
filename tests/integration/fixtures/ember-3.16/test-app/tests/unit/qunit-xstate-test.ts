import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import { module, test } from 'qunit';
import sinon, { SinonSpy } from 'sinon';
import { setupXStateTest, testShortestPaths } from 'qunit-xstate-test';

type MetaTestContext = { assert: Assert };

const thingGoodModel = createModel(
  Machine({
    id: 'thing-good',
    initial: 'step1',
    states: {
      'step1': {
        on: { TOGGLE: 'step2' },
        meta: { test: ({ assert }: MetaTestContext) => assert.equal(true, true) },
      },
      'step2': {
        meta: { test: ({ assert }: MetaTestContext) => assert.equal(true, true) },
      },
    },
  })
);

const thingBadModel = createModel(
  Machine({
    id: 'thing-bad',
    initial: 'step1',
    states: {
      'step1': {
        meta: { test: ({ assert }: MetaTestContext) => assert.equal(true, true) },
      },
      'step2': {
        meta: { test: ({ assert }: MetaTestContext) => assert.equal(true, true) },
      },
    },
  })
);

type OkSpyConfig = { ok?: SinonSpy };

function setupAssertOkSpy(hooks: NestedHooks): OkSpyConfig {
  let spyConfig: OkSpyConfig = {};
  let originalOk: Assert['ok'];

  hooks.before(function(assert) {
    spyConfig.ok = sinon.spy();
    originalOk = ((assert as any).__proto__).ok;
    (assert as any).__proto__.ok = spyConfig.ok;
  });

  hooks.after(function(assert) {
    (assert as any).__proto__.ok = originalOk;
  });

  return spyConfig;
}

module('Integration | setupXStateTest', function() {

  module('Success', function(hooks) {
    let spy = setupAssertOkSpy(hooks);

    hooks.after(function(assert) {
      assert.equal(spy.ok?.called, false, 'assert.ok not called');
    });

    setupXStateTest(hooks, thingGoodModel);

    testShortestPaths(thingGoodModel, function(assert, path) {
      return path.test({ assert });
    });
  });

  module('Failure', function(hooks) {
    let spy = setupAssertOkSpy(hooks);

    hooks.after(function(assert) {
      assert.equal(spy.ok?.called, true, 'assert.ok called');
      assert.equal(spy.ok?.callCount, 1);
      assert.equal(spy.ok?.getCall(0).args[0], false);
      assert.equal(spy.ok?.getCall(0).args[1], 'Not all tests were exercised in this test suite (see console)');
    });

    setupXStateTest(hooks, thingBadModel);

    testShortestPaths(thingBadModel, function(assert, path) {
      return path.test({ assert });
    });
  });
});
