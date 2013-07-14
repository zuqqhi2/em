#!/bin/sh

$HADOOP_STREAMING_PATH=/usr/local/hadoop/contrib/streaming/hadoop-streaming-1.1.2.jar
$CHILD_ENV=$PATH:/home/hadoop/.rvm/bin
$HDFS_INPUT_ACTION_LOG_PATH=action_log
$HDFS_INPUT_EVENT_PATH=event_data
$HDFS_OUTPUT_PATH=recommend_data
$MAPPER_PATH=/home/hadoop/evaluater/batches/calc_item_distance/map_calc_dist.rb
$REDUCER_PATH=/home/hadoop/evaluater/batches/calc_item_distance/red_calc_dist.rb

hadoop jar $HADOOP_STREAMING_PATH -D mapred.child.env='${CHILD_ENV}' -input $HDFS_INPUT_ACTION_LOG_PATH -output $HDFS_OUTPUT_PATH -mapper 'bundle exec ruby ${MAPPER_PATH}' -reducer 'bundle exec ruby ${REDUCER_PATH}' -file $MAPPER_PATH -file $REDUCER_PATH 
