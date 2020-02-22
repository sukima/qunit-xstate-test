/* global QUnit */
import { TestModel } from '@xstate/test';
import { TestPlan } from '@xstate/test/lib/types';

export function setupXStateTest<TestContext, TContext>(
  hooks: NestedHooks,
  testModel: TestModel<TestContext, TContext>
) {
  hooks.after(function(assert) {
    try {
      testModel.testCoverage();
    } catch (error) {
      assert.ok(false, 'Not all tests were exercised in this test suite (see console)');
      console.info(
        [
          'Tests in this file are generated. It is checking for full coverage of all possible test',
          'paths. However, if you have filtered or scoped (with module=...) then this assertion will be',
          'a false negative and is safe to ignore.',
          '',
          'For more details: https://github.com/davidkpiano/xstate/tree/master/packages/xstate-test#testmodeltestcoverageoptions',
        ].join('\n')
      );
      console.error(error);
    }
  });
}

type TestCallbackFn<TestContext, TContext, TReturn> = (
  assert: Assert,
  path: TestPlan<TestContext, TContext>['paths'][0]
) => TReturn;

export const testShortestPaths = <TestContext, TContext, TReturn>(
  testModel: TestModel<TestContext, TContext>,
  testCallback: TestCallbackFn<TestContext, TContext, TReturn>
) => {
  testModel.getShortestPathPlans().forEach(plan => {
    QUnit.module(plan.description, function() {
      plan.paths.forEach(path => {
        QUnit.test(path.description, function(assert) {
          return testCallback(assert, path);
        });
      });
    });
  });
};
