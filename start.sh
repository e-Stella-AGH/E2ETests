#!/bin/bash
if [ $# -gt 0 ]
then
  for dir in "$@"; do
    if [ "$dir" != "node_modules" ] && [ "$dir" != "commons" ]
    then
      echo "${dir}/"
      testcafe chrome "${dir}/index.js"
    fi
  done
else
  for d in */ ; do
      if [ "$d" != "node_modules/" ] && [ "$dir" != "commons" ]
      then
          echo "${d}"
          testcafe chrome "${d}index.js"
      fi
  done
fi

