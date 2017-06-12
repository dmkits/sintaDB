var fs = require('fs');
//var sql = require('mssql');
var mysql      = require('mysql');
var app = require('./app');
var dbConfig;
var dbConfigFilePath;
//var conn=null;
var connection=null;

module.exports.getDBConfig=function(){
    return dbConfig;
};
module.exports.setDBConfig=function(newDBConfig){
    dbConfig= newDBConfig;
};
module.exports.loadConfig=function(){
    dbConfigFilePath='./' + app.startupMode + '.cfg';
    var stringConfig = fs.readFileSync(dbConfigFilePath);
    dbConfig = JSON.parse(stringConfig);
};
module.exports.saveConfig=function(callback) {
    fs.writeFile(dbConfigFilePath, JSON.stringify(dbConfig), function (err, success) {
        callback(err,success);
    })
};
module.exports.databaseConnection=function(callback){

    if(connection) {
        connection.end(function (err) {
            if(err) console.log(err);
            return;
        });
    }
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
          if (err) {
              callback(err.message);
              return;
          }
          callback(null,"connected");
      });
};

module.exports.createChangelogTable= function(callback) {
    //var reqSql = new sql.Request(conn);
   var query_str=fs.readFile("./scripts/createChangeLog.sql","utf-8");
    connection.query(query_str,
        function (err, recordset) {
            if (err) {
                callback(err);
                return;
            }
               callback(null,recordset);
        }
    );
};

function formatDate(date){
    var dch = date.split("");
    var newDateFormat = dch[0] + dch[1] + dch[2] + dch[3] + "-" + dch[4] + dch[5] + "-" + dch[6] + dch[7] + " " + dch[8] + dch[9] + ":" + dch[10] + dch[11] + ":" + dch[12] + dch[13];
    return newDateFormat;
}

function detectPaymentForm(PaymentForm){
    return  PaymentForm == '0' ? 1 : 2;
}


