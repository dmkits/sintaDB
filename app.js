
var startTime = new Date().getTime();

function startupParams() {
    var app_params = {};
    if (process.argv.length == 0) {
        app_params.mode = 'production';
        app_params.port = 8080;
        return app_params;
    }
    for (var i = 2; i < process.argv.length; i++) {
        if (process.argv[i].indexOf('-p:') == 0) {
            var port = process.argv[i].replace("-p:", "");
            if (port > 0 && port < 65536) {
                app_params.port = port;
            }
        } else if (process.argv[i].charAt(0).toUpperCase() > 'A' && process.argv[i].charAt(0).toUpperCase() < 'Z') {
            app_params.mode = process.argv[i];
        } else if (process.argv[i].indexOf('-log:') == 0) {
            var logParam = process.argv[i].replace("-log:", "");
            if (logParam.toLowerCase() == "console") {
                app_params.logToConsole = true;
            }
        }
    }
    if (!app_params.port)app_params.port = 8080;
    if (!app_params.mode)app_params.mode = 'production';
    return app_params;
}

var app_params = startupParams();

var log = require('winston');

if (!app_params.logToConsole) {
    log.add(log.transports.File, {filename: 'history.log', level: 'debug', timestamp: true});
    log.remove(log.transports.Console);
}

module.exports.startupMode = app_params.mode;

var fs = require('fs');
log.info('fs...', new Date().getTime() - startTime);//test
var express = require('express');
log.info('express...', new Date().getTime() - startTime);//test

//var app = require('express').createServer();
var port = app_params.port;
var path = require('path');
log.info('path...', new Date().getTime() - startTime);//test
var bodyParser = require('body-parser');
log.info('body-parser...', new Date().getTime() - startTime);//test
//var cookieParser = require('cookie-parser');
//log.info('cookie-parser...', new Date().getTime() - startTime);//test
//var request = require('request');
//log.info('request...', new Date().getTime() - startTime);//test

//var Buffer = require('buffer').Buffer;
//log.info('buffer...', new Date().getTime() - startTime);//test
//var iconv_lite = require('iconv-lite');
//log.info('iconv-lite...', new Date().getTime() - startTime);//test
//var xml2js = require('xml2js');
//var parseString = xml2js.parseString;
//var builder = new xml2js.Builder();
//log.info('xml2js...', new Date().getTime() - startTime);//test


var app = express();
var server = require('http').Server(app);
log.info('http...', new Date().getTime() - startTime);//test
var io = require('socket.io')(server);
log.info('socket.io...', new Date().getTime() - startTime);//test


//app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));
var database = require('./dataBase');
log.info('./dataBase...', new Date().getTime() - startTime);//test
var ConfigurationError, DBConnectError;


tryLoadConfiguration();
function tryLoadConfiguration() {
    log.info('tryLoadConfiguration...', new Date().getTime() - startTime);//test
    try {
        database.loadConfig();
        ConfigurationError = null;
    } catch (e) {
        ConfigurationError = "Failed to load configuration! Reason:" + e;
    }
}
if (!ConfigurationError) tryDBConnect();
function tryDBConnect(postaction) {
    log.info('tryDBConnect...', new Date().getTime() - startTime);//test
    database.databaseConnection(function (err) {
        DBConnectError = null;
        if (err) {
            DBConnectError = "Failed to connect to database! Reason:" + err;
        }
        if (postaction)postaction(err);
        log.info('tryDBConnect DBConnectError=', DBConnectError);//test
    });
}


app.get("/sysadmin", function (req, res) {
    log.info('URL: /sysadmin');
    res.sendFile(path.join(__dirname, '/views', 'sysadmin.html'));
});
//app.get("/sysadmin/app_state", function (req, res) {
//    log.info('URL: /sysadmin/app_state');
//    var outData = {};
//    outData.mode = app_params.mode;
//    outData.port=port;
//    if (ConfigurationError) {
//        outData.error = ConfigurationError;
//        res.send(outData);
//        return;
//    }
//    outData.configuration = database.getDBConfig();
//    if (DBConnectError)
//        outData.dbConnection = DBConnectError;
//    else
//        outData.dbConnection = 'Connected';
//    res.send(outData);
//});

app.get("/sysadmin/app_state", function(req, res){                                     log.info("app.get /sysadmin/app_state");
    var outData= {};
    outData.mode= app_params.mode;
    outData.port=port;
    outData.connUserName=database.getDBConfig().user;
    if (ConfigurationError) {
        outData.error= ConfigurationError;
        res.send(outData);
        return;
    }
    outData.configuration= database.getDBConfig();
    if (DBConnectError)
        outData.dbConnection= DBConnectError;
    else
        outData.dbConnection='Connected';
    res.send(outData);
});


app.get("/sysadmin/startup_parameters", function (req, res) {
    log.info('URL: /sysadmin/startup_parameters');
    res.sendFile(path.join(__dirname, '/views/sysadmin', 'startup_parameters.html'));
});

app.get("/sysadmin/startup_parameters/get_app_config", function (req, res) {
    log.info('URL: /sysadmin/startup_parameters/get_app_config');
    if (ConfigurationError) {
        res.send({error:ConfigurationError});
        return;
    }
    res.send(database.getDBConfig());
});
app.get("/sysadmin/startup_parameters/load_app_config", function (req, res) {
    log.info('URL: /sysadmin/startup_parameters/load_app_config');
    tryLoadConfiguration();
    if (ConfigurationError) {
        res.send({error: ConfigurationError});
        return;
    }
    res.send(database.getDBConfig());
});
app.post("/sysadmin/startup_parameters/store_app_config_and_reconnect", function (req, res) {
    log.info('URL: /sysadmin/startup_parameters/store_app_config_and_reconnect', 'newDBConfigString =', req.body);
    var newDBConfigString = req.body;
    database.setDBConfig(newDBConfigString);
    database.saveConfig(
        function (err) {
            var outData = {};
            if (err) outData.error = err;
            tryDBConnect(/*postaction*/function (err) {
                if (DBConnectError) outData.DBConnectError = DBConnectError;
                res.send(outData);
            });
        }
    );
});

//app.get("/sysadmin/DBadmin", function (req, res) {
//    log.info('URL: /sysadmin/createDB');
//    res.sendFile(path.join(__dirname, '/views/sysadmin', 'DBadmin.html'));
//});

//app.post("/sysadmin/connect_to_mysql", function (req, res) { // console.log("req=",req);
//    log.info('sysadmin/connect_to_mysql');
//    var connParams={
//        host: req.body.host,
//        user: req.body.user,
//        password: req.body.password
//    };
//    database.mySQLConnection(connParams,function(err, ok){
//     var outData={};
//            if (err) {
//                outData.error=err.message;
//                res.send(outData);
//                return;
//            }
//        outData.ok=ok;
//        res.send(outData);
//    });
//
//});
//
//app.post("/sysadmin/create_new_DB", function (req, res) {
//    log.info('sysadmin/create_new_DB');
//    var newDBName= req.body.newDBName;
//
//    database.createNewDB(newDBName,function(err, ok){
//        var outData={};
//        if (err) {
//            outData.err=err;
//            res.send(outData);
//            return;
//        }
//        outData.ok=ok;
//        res.send(outData);
//    });
//
//});
///sysadmin/create_new_db


app.post("/sysadmin/create_new_db", function (req, res) {
    log.info('sysadmin/create_new_db');
    var host=req.body.host;
    var newDBName=req.body.newDatabase;
    var newUserName=req.body.newUser;
    var newUserPassword=req.body.newPassword;

    var connParams={
        host: host,
        user: req.body.adminName,
        password: req.body.adminPassword
    };
    var outData={};

    database.mySQLAdminConnection(connParams,function(err){
            if (err) {                  console.log("mySQLAdminConnection err=", err);
                outData.error=err.message;
                res.send(outData);
                return;
            }
        database.checkIfDBExists(newDBName, function(err, result){
            if (err) {                  console.log("checkIfDBExists err=", err);
                outData.error=err.message;
                res.send(outData);
                return;
            }if(result.length>0){
                outData.error="Impossible to create DB! Database "+newDBName+" is already exists!";
                res.send(outData);
                return;
            }
            database.createNewDB(newDBName,function(err, ok){
                if(err){                console.log("createNewDB err=", err);
                    outData.error=err.message;
                    res.send(outData);
                    return;
                }
                outData.DBCreated=ok;
                database.checkIfUserExists(newUserName,function(err,result){
                    if(err){                console.log("checkIfUserExists err=", err);
                        outData.error=err.message;
                        res.send(outData);
                        return;
                    }
                    if(result.length>0){
                    outData.userExists="User "+newUserName+" is already exists!";
                        database.grantUserAccess(host,newUserName,newDBName, function(err, ok){
                            if(err){                console.log("createNewUser err=", err);
                                outData.error=err.message;
                                res.send(outData);
                                return;
                            }
                            outData.accessAdded=ok;
                            res.send(outData);
                        })
                    }else{
                        database.createNewUser(host,newUserName,newUserPassword, function(err, ok){
                            if(err){                console.log("createNewUser err=", err);
                                outData.error=err.message;
                                res.send(outData);
                                return;
                            }
                            outData.userCreated=ok;
                            database.grantUserAccess(host,newUserName,newDBName, function(err, ok){
                                if(err){                console.log("createNewUser err=", err);
                                    outData.error=err.message;
                                    res.send(outData);
                                    return;
                                }
                                outData.accessAdded=ok;
                                res.send(outData);
                            })
                        });
                    }
                });
            });
        });
    });
});

app.post("/sysadmin/drop_db", function (req, res) {
    log.info("/sysadmin/drop_db");
    var host = req.body.host;
    var DBName = req.body.database;
   // var userName = req.body.user;
   // var userPassword = req.body.password;

    var connParams = {
        host: host,
        user: req.body.adminName,
        password: req.body.adminPassword
    };
    var outData = {};

    database.mySQLAdminConnection(connParams, function (err) {
        if (err) {                                                                      console.log("mySQLAdminConnection err=", err);
            outData.error = err.message;
            res.send(outData);
            return;
        }
        database.checkIfDBExists(DBName, function (err, result) {
            if (err) {                                                                  console.log("checkIfDBExists err=", err);
                outData.error = err.message;
                res.send(outData);
                return;
            }
            if (result.length == 0) {
                outData.error = "Impossible to drop DB! Database " + DBName + " is not exists!";
                res.send(outData);
                return;
            }
            database.dropDB(DBName,function(err,ok){
                if (err) {                                                               console.log("checkIfDBExists err=", err);
                    outData.error = err.message;
                    res.send(outData);
                    return;
                }
                outData.dropped=ok;
                res.send(outData);
            })
        });
    });
});



app.post("/sysadmin/auth_as_sysadmin", function (req, res) {
    log.info("/sysadmin/auth_as_sysadmin");
    var host = req.body.host;
    var adminUser=req.body.adminName;
    var adminPassword=req.body.adminPassword;
    var connParams = {
        host: host,
        user: adminUser,
        password: adminPassword
    };
    var outData = {};
    database.mySQLAdminConnection(connParams, function (err) {
        if (err) {                                                                   console.log("mySQLAdminConnection err=", err);
            outData.error = err.message;
            res.send(outData);
            return;
        }
        outData.success="authorized";
        res.send(outData);
    });
});

app.post("/sysadmin/backup_db", function (req, res) {
    log.info("/sysadmin/backup_db");
    var host = req.body.host;
    var DBName = req.body.database;
    var adminUser = req.body.adminName;
    var adminPassword = req.body.adminPassword;
    var backupFileName = req.body.backupFilename + '.sql';
    var backupParam = {
        host: host,
        user: adminUser,
        password: adminPassword,
        database: DBName,
        fileName: backupFileName
    };
    var outData = {};

    database.checkIfDBExists(DBName, function (err, result) {
        if (err) {
            console.log("checkIfDBExists err=", err);
            outData.error = err.message;
            res.send(outData);
            return;
        }
        if (result.length == 0) {
            outData.error = "Impossible to back up DB! Database " + DBName + " is not exists!";
            res.send(outData);
            return;
        }
        if (req.body.rewrite) {
            database.backupDB(backupParam, function (err, ok) {
                if (err) {
                    console.log("checkIfDBExists err=", err);
                    outData.error = err.message;
                    res.send(outData);
                    return;
                }
                outData.backup = ok;
                res.send(outData);
            })
        } else {
            fs.readdir('./backups/', function (err, files) {
                for (var i in files) {
                    if (files[i] == backupFileName) {
                        console.log("files[i]=" + "-" + files[i] + "-");
                        outData.fileExists = true;
                        res.send(outData);
                        return;
                    }
                }
                database.backupDB(backupParam, function (err, ok) {
                    if (err) {
                        console.log("checkIfDBExists err=", err);
                        outData.error = err.message;
                        res.send(outData);
                        return;
                    }
                    outData.backup = ok;
                    res.send(outData);
                })
            });
        }
    });
});

app.post("/sysadmin/restore_db", function (req, res) {
    log.info("/sysadmin/restore_db");
    var host = req.body.host;
    var DBName = req.body.database;
    var adminUser = req.body.adminName;
    var adminPassword = req.body.adminPassword;
    var restoreFileName = req.body.restoreFilename + '.sql';
    var userName = req.body.user;
    var userPassword = req.body.password;
    var restoreParams = {
        host: host,
        user: adminUser,
        password: adminPassword,
        database: DBName,
        fileName: restoreFileName
    };
    var outData = {};
        database.checkIfDBExists(DBName, function (err, result) { console.log("checkIfDBExists");
            if (err) {console.log( "checkIfDBExists err=", err);
                outData.error = err.message;
                res.send(outData);
                return;
            }
            if (result.length == 0) {
                outData.error = "Impossible to restore! Database " + DBName + " is not exists!";
                res.send(outData);
                return;
            }
            var fileToRestore;
            var files = fs.readdirSync('./backups/');                               console.log("files=",files);
                for (var i in files) {
                    if (files[i] == restoreFileName) {
                        fileToRestore = files[i];
                    }
                }
                if (!fileToRestore) {
                    outData.error = "Impossible to restore! File " + restoreFileName + " is not found!";
                    res.send(outData);
                    return;
                }

                if (req.body.rewrite) {                                  console.log("req.body.rewrite  495");
                    database.dropDB(DBName, function (err, ok) {
                        if (err) {
                            console.log("checkIfDBExists err=", err);
                            outData.error = err.message;
                            res.send(outData);
                            return;
                        }
                        outData.DBdropped = ok;
                        database.createNewDB(DBName, function (err, ok) {
                            if (err) {
                                console.log("createNewDB err=", err);
                                outData.error = err.message;
                                res.send(outData);
                                return;
                            }
                            outData.DBCreated = ok;
                            database.checkIfUserExists(userName, function (err, result) {
                                if (err) {
                                    console.log("checkIfUserExists err=", err);
                                    outData.error = err.message;
                                    res.send(outData);
                                    return;
                                }
                                if (result.length > 0) {
                                    outData.userExists = "User " + userName + " is already exists!";
                                    database.grantUserAccess(host, userName, DBName, function (err, ok) {
                                        if (err) {
                                            console.log("createNewUser err=", err);
                                            outData.error = err.message;
                                            res.send(outData);
                                            return;
                                        }
                                        outData.accessAdded = ok;
                                        database.restoreDB(restoreParams, function (err, ok) {
                                            if (err) {
                                                console.log("restoreDB err=", err);
                                                outData.error = err.message;
                                                res.send(outData);
                                                return;
                                            }
                                            outData.restore = ok;
                                            res.send(outData);
                                        })
                                    })
                                } else {
                                    database.createNewUser(host, userName, userPassword, function (err, ok) {
                                        if (err) {
                                            console.log("createNewUser err=", err);
                                            outData.error = err.message;
                                            res.send(outData);
                                            return;
                                        }
                                        outData.userCreated = ok;
                                        database.grantUserAccess(host, userName, DBName, function (err, ok) {
                                            if (err) {
                                                console.log("createNewUser err=", err);
                                                outData.error = err.message;
                                                res.send(outData);
                                                return;
                                            }
                                            outData.accessAdded = ok;
                                            database.restoreDB(restoreParams, function (err, ok) {
                                                if (err) {
                                                    console.log("restoreDB err=", err);
                                                    outData.error = err.message;
                                                    res.send(outData);
                                                    return;
                                                }
                                                outData.restore = ok;
                                                res.send(outData);
                                            })
                                        })
                                    });
                                }
                            });
                        });
                    })
                } else {                                                           console.log(" 495");
                    database.isDBEmpty(DBName, function (err, recodrset) {                 console.log("isDBEmpty recodrset 564=",recodrset);
                        if (err) {
                            console.log("restoreDB err=", err);
                            outData.error = err.message;
                            res.send(outData);
                            return;
                        }
                        if (!recodrset) {
                            database.restoreDB(restoreParams, function (err, ok) {
                                console.log("restoreDB");
                                if (err) {
                                    console.log("restoreDB err=", err);
                                    outData.error = err.message;
                                    res.send(outData);
                                    return;
                                }
                                outData.restore = ok;
                                res.send(outData);
                            })
                        } else {
                            outData.dropDBConfirm = "dropDBConfirm";
                            res.send(outData);
                        }
                    });
                }
        });
    });

app.get("/sysadmin/changeLog", function (req, res) {
    log.info("URL: /sysadmin/changeLog");
    res.sendFile(path.join(__dirname, '/views/sysadmin', 'changeLog.html'));
});

app.get("/sysadmin/changeLog/change_log", function (req, res) {
    log.info("/sysadmin/changeLog/change_log",req.params," ", JSON.stringify(req.query));
    //var initialCRID= req.params[0].replace("Sales","");

    var outData={};
    outData.columns=[];
    outData.columns.push(
         { "data":"ID", "name":"ID", "width":100, "type":"number"}
        ,{ "data":"InstallDate", "name":"InstallDate", "width":80, "type":"text"}
        ,{ "data":"Object", "name":"Object", "width":120, "type":"text"}//,"dateFormat":"DD.MM.YYYY HH:mm:ss
        ,{ "data":"PosNumber", "name":"PosNumber", "width":80, "type":"numeric"}
    );
        res.send(outData);
        return;
});

server.listen(port, function (err) {
    console.log("server runs on port " + port);
    log.info("server runs on port " + port, new Date().getTime() - startTime);
});
log.info("end app", new Date().getTime() - startTime);
