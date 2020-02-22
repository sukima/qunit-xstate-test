qunit-xstate-test
==============================================================================

QUnit integration with [@xstate/test](https://xstate.js.org/docs/packages/xstate-test/)

```ts
import { module } from 'qunit';
import { setupXStateTest, testShortestPaths } from 'qunit-xstate-test';
import { Machine } from 'xstate';
import { createModel } from '@xstate/test';

const testModel = createModel(
  Machine({
    // ...
    states: {
      'state-name': {
        meta: { 
          async test({ assert }) {
            assert.equal(/* assert something about your state */);
          }
        }
      }
    }
  })
);

module('Testing my State Machine', function(hooks) {
  setupXStateTest(hooks, testModel);

  testShortestPaths(testModel, (assert, path) => {
    // set up for your tests
    // ...
    // pass `assert` to your meta.test context
    return path.test({ assert });
  });
});
```

NOTE: `setupXStateTest` defines an `after` hook that checks your state machine's test coverage.

Examples:

 - [Integration Test with an Ember App](https://github.com/sukima/qunit-xstate-test/blob/master/tests/integration/fixtures/ember-3.16/test-app/tests/unit/qunit-xstate-test.ts#L61-L73)
 - [General `@xstate/test` Docs](https://xstate.js.org/docs/packages/xstate-test/)


Installation
------------------------------------------------------------------------------

```
yarn add --dev qunit-xstate-test
npm install --save-dev qunit-xstate-test
```

## Ember Projects

Requirements: [ember-auto-import](https://github.com/ef4/ember-auto-import)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


Prior Art
------------------------------------------------------------------------------
- [qunit-dom](https://github.com/simplabs/qunit-dom)
  much of the config for this repo was taken from qunit-dom.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
