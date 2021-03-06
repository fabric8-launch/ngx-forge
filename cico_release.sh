#!/bin/bash
# Show command before executing
set -x

# Exit on error
set -e

# This option sets the exit code of a pipeline to that of the rightmost command to exit with a
# non-zero status, or to zero if all commands of the pipeline exit successfully.
set -o pipefail

# add .npmrc file to give permissions
echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > ~/.npmrc

npm whoami
# Enable verbose output
npm config set loglevel verbose

# Build and Release 
npm run semantic-release