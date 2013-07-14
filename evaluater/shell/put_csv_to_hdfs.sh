#!/bin/sh

$HDFS_ACTION_LOG_PATH=action_log
$HDFS_EVENT_DATA_PATH=event_data
$CSV_PATH=/home/hidetomo/yama/evaluater/csv/
$DATE_STR=`date +%Y%m%d`

hadoop fs -put $HDFS_ACTION_LOG_PATH $CSV_PATH/user_action_log$DATE_STR.csv
hadoop fs -put $HDFS_EVENT_DATA_PATH $CSV_PATH/event_data$DATE_STR.csv
