import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import { module, test } from 'qunit';
import sinon, { SinonSpy } from 'sinon';
import { setupXStateTest } from 'qunit-xstate-test';

type MetaTestContext = { assert: Assert };

const thingGoodModel = createModel(
  Machine({
    id: 'thing-good',
    initial: 'step1',
    states: {
      'step1': {
        on: { TOGGLE: 'step2' },
        meta: { test: ({ assert }: MetaTestContext) => assert.ok(true) },
      },
      'step2': {
        meta: { test: ({ assert }: MetaTestContext) => assert.ok(true) },
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
        meta: { test: ({ assert }: MetaTestContext) => assert.ok(true) },
      },
      'step2': {
        meta: { test: ({ assert }: MetaTestContext) => assert.ok(true) },
      },
    },
  })
);


module('Integration | setupXStateTest', function() {

  module('Success', function(hooks) {
    setupXStateTest(hooks, thingGoodModel);

    thingGoodModel.getShortestPathPlans().forEach(plan => {
      module(plan.description, function() {
        plan.paths.forEach(path => {
          test(path.description, function(assert) {
            path.test({ assert });
          });
        });
      });
    });

  });

  module('Failure', function(hooks) {
    setupXStateTest(hooks, thingBadModel);

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

    thingBadModel.getShortestPathPlans().forEach(plan => {
      module(plan.description, function() {
        plan.paths.forEach(path => {
          test(path.description, function(assert) {
            path.test({ assert });
          });
        });
      });
    });

  });

});
