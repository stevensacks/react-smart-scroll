#!/bin/bash
GITHUB_TOKEN=$CD_GITHUB_TOKEN

#check for ESLint violations
if (grep '<error' build/eslint.xml 1> /dev/null 2>&1) then
  sumEslint=$(cat build/eslint.xml | grep -o '<error' | wc -l)
  echo "ESLint found "${sumEslint}" issues!";
  curl -H "Authorization: token $GITHUB_TOKEN" --request POST --data '{"state": "failure", "context": "travis-ci/ESLint", "description": "ESLint found '"${sumEslint}"' issues!"}' https://api.github.com/repos/dotsub/react-smart-scroll/statuses/${TRAVIS_COMMIT} > /dev/null
else
  curl -H "Authorization: token $GITHUB_TOKEN" --request POST --data '{"state": "success", "context": "travis-ci/ESLint", "description": "ESLint Passed"}' https://api.github.com/repos/dotsub/react-smart-scroll/statuses/${TRAVIS_COMMIT} > /dev/null
fi
