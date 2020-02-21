#!/bin/bash

# -e  Exit immediately if a command exits with a non-zero status.
# -x  Print commands and their arguments as they are executed.
set -ex

yarn build
yarn link

(
  cd tests/integration/fixtures/ember-3.16/test-app \
  && yarn \
  && yarn link qunit-xstate-test \
  && yarn ember test
)
