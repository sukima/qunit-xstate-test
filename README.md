qunit-xstate-test
==============================================================================

QUnit integration with @xstate/test

```ts
module('Testing my State Machine', function(hooks) {
  setupXStateTest(hooks, myTestModel);

  // set up and execute tests
});
```

`setupXStateTest` defines an `after` hook that checks your state machine's test coverage.


Installation
------------------------------------------------------------------------------

```
yarn add --dev qunit-xstate-test
npm install --save-dev qunit-xstate-test
```

## Ember Projects

Requirements: [ember-auto-import](https://github.com/ef4/ember-auto-import) and add the above import to your `tests/test-helper.js` file.


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
