#!/bin/bash
for d in */ ; do
    if [ "$d" != "node_modules/" ]
    then
        testcafe chrome "${d}index.js"
    fi
done