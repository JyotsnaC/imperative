#!/bin/bash
imperative-test-cli test --help
CMD_RC=$?
if [ $CMD_RC -ne 0 ]
then
    echo "Help did not return the expected return code of 0. Return code: $CMD_RC"
    exit $CMD_RC
fi 
imperative-test-cli test --help --rfj
CMD_RC=$?
if [ $CMD_RC -ne 0 ]
then
    echo "Help did not return the expected return code of 0 with the rfj option. Return code: $CMD_RC"
    exit $CMD_RC
fi 
exit $CMD_RC