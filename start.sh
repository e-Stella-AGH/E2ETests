#!/bin/bash
if [ $# -gt 0 ]
then
  for dir in "$@"; do
        echo "${dir}/"
        testcafe chrome "${dir}/index.js"
  done
else
  for d in */ ; do
      if [ "$d" != "node_modules/" ]
      then
          echo "${d}"
          testcafe chrome "${d}index.js"
      fi
  done
fi

