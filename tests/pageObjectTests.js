
module.exports= {
    'Sysadmin Header Tests': function (browser) {
        var mainHeader = browser.page.sysadminHeader();

        mainHeader
            .findDojoStdDialog({title:'Title',content:'lsdfmklsdmfklmds'}).assertVisible()
            .findDojoButtonWithText('Login').assertEnabled().assertVisible().click()

        //var paramsPage = browser.page.startUpParams();
        //paramsPage.resetDBConfig();
        mainHeader.navigate()
            .waitForElementVisible('body', 1000)
            .assert.visible("@img")
            .assert.title('sinta')
            .assert.containsText('@mode', "MODE:test")
            .assert.containsText('@port', "PORT:8080")
            .assert.containsText('@dbName', "DB NAME:sample_sinta")
            .assert.containsText('@user', "USER:user")
            .assert.containsText('@dbConnectionState', 'Connected')
            .assert.visible('@StartUpParamsBtn')
            .click('@StartUpParamsBtn');
        browser.pause(2000);
    },
    //'Sysadmin Startup params Tests': function (browser) {
    //    var paramsPage = browser.page.startUpParams();
    //    paramsPage
    //       .waitForElementVisible('@localConfigInfo',1000, true, function(){
    //            browser.pause(2000, function(){
    //                paramsPage.assert.containsText('@localConfigInfo', "Configuration loaded.")
    //            });
    //        })
    //    .click('@loadSettingsBtn', function(){
    //            browser.pause(5000, function(){
    //                paramsPage.assert.containsText('@localConfigInfo', "Configuration reloaded.")
    //            });
    //        })
    //        .waitForElementVisible('@dbHost', 2000)
    //        .clearValue('@dbHost', function () {
    //              paramsPage.setValue('@dbHost', '192.168.0.93_false', function () {
    //                    var mainHeader=browser.page.sysadminHeader();
    //                    paramsPage
    //                        .click('@StoreAndReconnectBtn', function(){
    //                            browser.pause(6000, function(){
    //                                paramsPage.assert.containsText('@localConfigInfo', "Configuration saved.")
    //                                    .assert.containsText('@localConfigInfo', "Failed to connect to database!")
    //                            });
    //                        });
    //                    mainHeader
    //                        .waitForElementVisible('@dbConnectionState', 1000)
    //                        .assert.containsText("@dbConnectionState","Failed to connect to database!");
    //                });
    //        })
    //        .resetDBConfig()
    //        .waitForElementVisible('@dbName', 1000)
    //        .clearValue('@dbName', function () {
    //            //  paramsPage.assert.valueContains('@dbHost', '')
    //            paramsPage.setValue('@dbName', 'GMSSample38xml_false', function () {
    //                var mainHeader=browser.page.sysadminHeader();
    //                paramsPage
    //                    .click('@StoreAndReconnectBtn', function(){
    //                        browser.pause(1000, function(){
    //                            paramsPage.assert.containsText('@localConfigInfo', "Configuration sav")
    //                                .assert.containsText('@localConfigInfo', "Failed to connect to database!")
    //                        });
    //                    });
    //                mainHeader.waitForElementVisible('@dbName', 1000)
    //                    .assert.containsText("@dbName","GMSSample38xml_false")
    //                    .waitForElementVisible('@dbConnectionState', 1000)
    //                    .assert.containsText("@dbConnectionState","Failed to connect to database!");
    //            });
    //        })
    //        .resetDBConfig()
    //        .waitForElementVisible('@dbUser', 1000)
    //        .clearValue('@dbUser', function () {
    //            paramsPage.assert.valueContains('@dbUser', '')
    //                .setValue('@dbUser', 'sa1', function () {
    //                    var mainHeader=browser.page.sysadminHeader();
    //                    paramsPage.assert.valueContains('@dbUser', 'sa1')
    //                              .click('@StoreAndReconnectBtn');
    //                    mainHeader.waitForElementVisible('@user', 1000)
    //                        .assert.containsText("@user","sa1")
    //                        .waitForElementVisible('@dbConnectionState', 1000)
    //                        .assert.containsText("@dbConnectionState","Failed to connect to database!");
    //                });
    //        })
    //        .resetDBConfig()
    //        .waitForElementVisible('@dbPassword', 1000)
    //        .clearValue('@dbPassword', function () {
    //            paramsPage.assert.valueContains('@dbPassword', '')
    //                .setValue('@dbPassword', 'false', function () {
    //                    var mainHeader=browser.page.sysadminHeader();
    //                    paramsPage.assert.valueContains('@dbPassword', 'false')
    //                        .click('@StoreAndReconnectBtn');
    //                    mainHeader
    //                        .waitForElementVisible('@dbConnectionState', 1000)
    //                        .assert.containsText("@dbConnectionState","Failed to connect to database!");
    //                });
    //        })
    //    .resetDBConfig();
    //
    //},
    'DB Empty Admin Values': function (browser) {
        var DBActions = browser.page.DBActions();
        DBActions
            .waitForElementPresent('@createDBBtn', 1000)
            .assert.visible('@createDBBtn')
            .click('@createDBBtn')
            .submitDialog('@authAdminDialog')
            .waitForElementVisible('@createDBResultField', 1000)
            .assert.containsText('@createDBResultField', 'ACCESS_DENIED_ERROR')

            .waitForElementVisible('@dropDBBtn', 1000)
            .click('@dropDBBtn')
            .submitDialog('@authAdminDialog')
            .assert.containsText('@dropDBResultField', 'ACCESS_DENIED_ERROR')

            .waitForElementVisible('@backupBtn', 1000)
            .click('@backupBtn')
            .submitDialog('@authAdminDialog')
            .waitForElementVisible('@backupDialog', 1000)
            .submitDialog('@backupDialog')
            .assert.containsText('@backupDBResultField', "File name for backup wasn't specified")

            .click('@restoreBtn')
            .submitDialog('@authAdminDialog')
            .assert.visible('@restoreDialog')
            .submitDialog('@restoreDialog')
            .assert.containsText('@restoreDBResultField', "ACCESS_DENIED_ERROR")
        ;

    },
    'DB Button Actions Tests': function (browser) {

        var DBActions = browser.page.DBActions();
        var header = browser.page.sysadminHeader();
        DBActions
            .waitForElementPresent('@dropDBBtn', 1000)
            .click('@dropDBBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@dropDBResultField', 1000)
            .assert.containsText('@dropDBResultField', 'dropped!');
        header
            .assert.containsText('@dbConnectionState', 'Failed to connect to database!');

        DBActions.click('@backupBtn')
            .authorizeAsAdmin()
            .assert.visible("@backupDialog")
            .assert.visible("@backupFileName")
            .setValue("@backupFileName","sinta")
            .submitDialog('@backupDialog')
            .waitForElementVisible('@backupDBResultField', 1000)
            .assert.visible("@backupDBResultField")
            .assert.containsText('@backupDBResultField', 'FAIL!')

            .click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog', 1000)
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","sinta")
            .submitDialog('@restoreDialog')
            .waitForElementVisible('@restoreDBResultField', 1000)
            .assert.visible("@restoreDBResultField")
            .assert.containsText('@restoreDBResultField', 'FAIL!')

            .click('@createDBBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@createDBResultField', 1000)
            .assert.containsText('@createDBResultField', 'Database created!');
        header
            .assert.containsText('@dbConnectionState', 'Connected');

        DBActions.click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog', 1000)
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","sinta")
            .submitDialog('@restoreDialog')
            .waitForElementVisible('@restoreDBResultField', 5000)
            .assert.containsText('@restoreDBResultField', 'Db dump file restored successfully')

            .click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog', 1000)
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","sinta")
            .submitDialog('@restoreDialog')
            .waitForElementVisible('@rewriteDBDialog', 5000)
            .submitDialog('@rewriteDBDialog')
            .waitForElementVisible('@restoreDBResultField', 5000)
            .assert.containsText('@restoreDBResultField', 'Db dump file restored successfully')


            .click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog', 1000)
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","fail0000")
            .submitDialog('@restoreDialog')
            //.waitForElementVisible('@rewriteDBDialog', 5000)
            //.submitDialog('@rewriteDBDialog')
            .waitForElementVisible('@restoreDBResultField', 5000)
            .assert.containsText('@restoreDBResultField', 'FAIL!')

            .waitForElementVisible('@backupBtn', 1000)
            .click('@backupBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@backupDialog', 1000)
            .clearValue("@backupFileName")
            .setValue("@backupFileName","backup"+Math.floor(Math.random()*10000))
            .submitDialog('@backupDialog')
            .waitForElementVisible('@backupDBResultField', 10000)
            .assert.containsText('@backupDBResultField', 'backup saved')

            .waitForElementVisible('@backupBtn', 1000)
            .click('@backupBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@backupDialog', 1000)
            .clearValue("@backupFileName")
            .setValue("@backupFileName","backup")
            .submitDialog('@backupDialog')
            .waitForElementVisible('@rewriteBackupDialog', 10000)
            .submitDialog('@rewriteBackupDialog')
            .waitForElementVisible('@backupDBResultField', 5000)
            .assert.containsText('@backupDBResultField', 'backup saved')


            .click('@createDBBtn')
            .authorizeAsAdmin()
        ;
        browser.end();
    }
};