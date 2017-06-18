var fs = require('fs');
//var sql = require('mssql');
var mysqlDump = require('mysqldump');
var  MysqlTools= require('mysql-tools');
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
            connection=null;
            if(err) console.log(err);
            return;
        });
    }
    connection=null;
    connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
          if (err) {
              connection=null;
              callback(err.message);
              return;
          }
          callback(null,"connected");
      });
};
module.exports.mySQLAdminConnection = function (connParams, callback) {
    if (connection) {
        connection.end(function (err) {
            if (err) {
                connection=null;
                callback(err);           console.log("err  connection.end =", err);
                return;
            }
            connection=null;
            connection = mysql.createConnection(connParams);
            connection.connect(function (err) {
                if (err) {              console.log("createConnection err=",err);
                    connection=null;
                    callback(err);
                    return;
                }
                callback(null, "connected");
            });
        });
        return;
    }
    connection=null;
    connection = mysql.createConnection(connParams);
    connection.connect(function (err) {
        if (err) {
            connection=null;
            callback(err);
            return;
        }
        callback(null, "connected");

    });
};

module.exports.checkIfDBExists= function(DBName,callback) {
    connection.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '"+DBName+"'",
        function (err, recordset) {
            if (err) {
                callback(err);
                return;
            }
            callback(null,recordset);
        }
    );
};

module.exports.createNewDB= function(DBName,callback) {
    connection.query('CREATE SCHEMA '+DBName,
        function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, DBName+" Database created!");
        }
    );
};

module.exports.checkIfUserExists= function(newUserName,callback) {
    connection.query("select * from mysql.user where user='"+newUserName+"'",
        function (err, recordset) {
            if (err) {
                callback(err);
                return;
            }
            callback(null,recordset);
        }
    );
};

module.exports.createNewUser= function(host,newUserName,newUserPassword,callback) {
    connection.query("CREATE USER '"+newUserName+"'@'"+host+"' IDENTIFIED BY '"+newUserPassword+"'",
        function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null,"User "+ newUserName+" created!");
        }
    );
};

module.exports.grantUserAccess= function(host,userName,newDBName,callback) {
    var strQuery="GRANT ALL PRIVILEGES ON "+newDBName+".* TO '"+userName+"'@'"+host+"' WITH GRANT OPTION"; console.log("strQuery=",strQuery);
    connection.query(strQuery,
        function (err ) {
            if (err) {
                callback(err);
                return;
            }
            callback(null,userName+" granted privileges!");
        }
    );
};

module.exports.dropDB= function(DBName,callback) {
    connection.query("DROP DATABASE "+ DBName,
        function (err ) {
            if (err) {
                callback(err);
                return;
            }
            callback(null,DBName+" dropped!");
        }
    );
};


module.exports.isDBEmpty= function(DBName,callback) {
    var isEmpty;
    connection.query("SELECT table_name FROM information_schema.tables where table_schema='"+DBName+"'",
        function (err,recordset ) {
            if (err) {
                callback(err);
                return;
            }
            if(recordset.length==0) isEmpty=true;

            console.log("isEmpty=",isEmpty);
            callback(null,isEmpty);
        }
    );
};

module.exports.backupDB= function(backupParam,callback) {
    mysqlDump({
        host: backupParam.host,
        user: backupParam.user,
        password: backupParam.password,
        database: backupParam.database,
        dest:'./backups/'+backupParam.fileName
    },function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null,"Database "+backupParam.database+" backup saved to "+backupParam.fileName);
        });

//    var tool = new MysqlTools();
//    tool.dumpDatabase({
//        host: backupParam.host
//        , user: backupParam.user
//        , password: backupParam.password
//        , dumpPath: './backups/'/*+backupParam.fileName*/
//        , database: backupParam.database
//    }, function (error, output, message, dumpFileName) {
//        if (error instanceof Error) {
//            console.log(error);
//        } else {
//            console.log(output);
//            console.log(message);
//            console.log(dumpFileName);
//            callback(null,"Database "+backupParam.database+" backup saved to "+backupParam.fileName);
//        }
//    });
//};
}

module.exports.restoreDB= function(restoreParams,callback) {
//    mysqlDump({
//        host: backupParam.host,
//        user: backupParam.user,
//        password: backupParam.password,
//        database: backupParam.database,
//        dest:'./backups/'+backupParam.fileName
//    },function (err) {
//        if (err) {
//            callback(err);
//            return;
//        }
//        callback(null,"Database "+backupParam.database+" backup saved to "+backupParam.fileName);
//    });
//};
//if(connection){
//    connection.end();
//    connection=null;
//}
    var tool = new MysqlTools();
    tool.restoreDatabase({
        host: restoreParams.host
        , user: restoreParams.user
        , password: restoreParams.password
        , sqlFilePath: './backups/' + restoreParams.fileName
        , database: restoreParams.database
        ,dropTable:true
    }, function (error, output, message) {
        if (error instanceof Error) {
            console.log(error);
            callback(error);
        } else {
            console.log(output);
            console.log(message);
            callback(null,"Database restored successfully!");
        }
    });
};

module.exports.createChangelogTable= function(callback) {
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

//function formatDate(date){
//    var dch = date.split("");
//    var newDateFormat = dch[0] + dch[1] + dch[2] + dch[3] + "-" + dch[4] + dch[5] + "-" + dch[6] + dch[7] + " " + dch[8] + dch[9] + ":" + dch[10] + dch[11] + ":" + dch[12] + dch[13];
//    return newDateFormat;
//}

function detectPaymentForm(PaymentForm){
    return  PaymentForm == '0' ? 1 : 2;
}


