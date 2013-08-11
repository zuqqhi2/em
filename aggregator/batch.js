#!/usr/bin/env node
/**
 * @description
 *      test batch
 * @author dommy <shonan.shachu at gmail.com>
 */
 
// to use node commander module
// $npm install commander
var command = require('commander');
 
// function to split list items
function list(val) {
    return val.split(',');
}
 
// parse command options
// create help command automatically
command
    .version('1.0.0')
    .usage('[option]')
    .option('-i, --integer <n>', 'integer', parseInt)
    .option('-f, --float <n>', 'float', parseFloat)
    .option('-s, --string [String]', 'string')
    .option('-l, --list <items>', 'List devided by ","', list)
    // to make batch better, include execute or force option
    .option('-e, --exec', 'force to execute the batch')
    .parse(process.argv);
 
if(command.integer) console.log('integer : ' + command.integer);
if(command.float)   console.log('float   : ' + command.float);
if(command.string)  console.log('string  : ' + command.string);
if(command.list)    console.log('list    : ' + JSON.stringify(command.list));
if(command.exec)    console.log('exec    : ' + command.exec);
