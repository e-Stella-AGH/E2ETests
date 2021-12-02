#!/bin/bash
if [ $# -gt 0 ]
then
  for dir in "$@"; do
    if [ "$dir" != "node_modules" ] && [ "$dir" != "commons" ]
    then
      echo "${dir}/"
      testcafe chromium "${dir}/index.js"
    fi
  done
else
  for d in */ ; do
      if [ "$d" != "node_modules/" ] && [ "$dir" != "commons" ]
      then
          echo "${d}"
          testcafe chromium "${d}index.js"
      fi
  done
fi

