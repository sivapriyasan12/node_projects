const http = require('http')
const fs = require('fs')
const readline = require('readline');
const table_module = require('./stats');

http.createServer(function(req,res){
    let filedata = fs.readFileSync('networklog.txt');
    let data_list = [];
    let testData = {};
    let splitList = filedata.toString().split('\r\n');
    for (let i = 0; i < splitList.length; i++) {
        let data = splitList[i];
        // console.log(data);
        // console.log('--------');
        if (data.split(":")[0] != ''){
        testData[data.split(":")[0]] = data.replace(data.split(":")[0]+':', '');
        }
        else{
            data_list.push(testData);
            testData = {};
        }
        // data_list.push(testData);
    };
    // console.log(data_list);
    let table_html = table_module.stat.tableFormatter(data_list, 'Success');
    // console.log(d);
    
    res.writeHead(200, {'Content-type': 'text/html'});
    
    res.write(table_html);
    
    return res.end();
}).listen(8082);