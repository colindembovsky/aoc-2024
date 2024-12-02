#!/bin/bash

SOURCE_DIR="day01"

for i in {02..20}
do
  TARGET_DIR="day$i"
  cp -r "$SOURCE_DIR" "$TARGET_DIR"
done