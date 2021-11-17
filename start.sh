#!/bin/bash
for d in */ ; do
    if [ "$d" != "node_modules/" ]
    then
        echo "${d}"
        testcafe chrome "${d}index.js"
    fi
done