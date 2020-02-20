import { TestModel } from '@xstate/test';

export function setupXStateTest<TestContext, TContext>(
  hooks: NestedHooks,
  testModel: TestModel<TestContext, TContext>
) {
  hooks.after(async function(assert) {
    try {
      await testModel.testCoverage();
    } catch (error) {
      assert.ok(false, 'Not all tests were exercised in this test suite (see console)');
      console.info([
        'Tests in this file are generated. It is checking for full coverage of all possible test',
        'paths. However, if you have filtered or scoped (with module=...) then this assertion will be',
        'a false negative and is safe to ignore.',
        '',
        'For more details: https://github.com/davidkpiano/xstate/tree/master/packages/xstate-test#testmodeltestcoverageoptions'
      ].join('\n'));
      console.error(error);
    }
  });
}
