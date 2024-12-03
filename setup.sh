#!/bin/bash

SOURCE_DIR="day01"

for i in {2..20}
do
  TARGET_DIR=$(printf "day%02d" $i)
  cp -r "$SOURCE_DIR" "$TARGET_DIR"
done