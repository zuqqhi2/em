#!/bin/sh

$HDFS_RECOMMEND_DATA_PATH=recommend_data
$LOCAL_RECOMMEND_DATA_PATH=/home/hidetomo/em/evaluater/csv/
$DATE_STR=`date +%Y%m%d`

hadoop fs -get $HDFS_RECOMMEND_DATA_PATH/event_relation$DATE_STR.dat $LOCAL_RECOMMEND_DATA_PATH/event_realation$DATE_STR.csv
