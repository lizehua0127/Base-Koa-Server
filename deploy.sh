#!/bin/bash

echo "current profile : ${MY_PROFILE_ACTIVE}"

echo "install components ..."
npm install

if [[ "${MY_PROFILE_ACTIVE}" == "prod" ]] ; then
    echo "deploy in prod environment"
    npm run start
else
    echo "deploy in test environment"
    npm run test
fi

if [[ $? != 0 ]] ; then
    echo "run failed, exit ..."
    exit -1
fi
