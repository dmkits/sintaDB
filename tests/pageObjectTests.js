module.exports={
    'Sysadmin Header Tests':function(browser){
       var mainHeader=browser.page.sysadminHeader();

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
    //          //  paramsPage.assert.valueContains('@dbHost', '')
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
    'DB Actions Tests': function (browser) {
        var DBActions = browser.page.DBActions();
        DBActions
            .waitForElementPresent('@createDBBtn', 1000)
            .assert.visible('@createDBBtn')
            .moveToElement('@createDBBtn', 5,5)
            .click('@createDBBtn')
            .waitForElementPresent('@authAdminDialog', 6000)
           // .assert.visible('@authAdminDialog')
            .assert.containsText('@authAdminDialog','Admin authorisation')
           // .waitForElementPresent('@authAdminName', 6000)
            .assert.visible('@authAdminName')
            .assert.valueContains('@authAdminName','root')
           // .waitForElementVisible('@authAdminPas', 6000)
            .assert.visible('@authAdminPas')
            .assert.valueContains('@authAdminPas','')
            .submitDialog('@authAdminDialog')
            .waitForElementVisible('@createDBResultField', 1000)
            .assert.containsText('@createDBResultField','ACCESS_DENIED_ERROR')
            .click('@createDBBtn')
            .authorizeAsAdmin()
            .assert.containsText('@createDBResultField','Impossible to create DB!')

            .waitForElementVisible('@dropDBBtn', 1000)
            .click('@dropDBBtn')
            .submitDialog('@authAdminDialog')
            .assert.containsText('@dropDBResultField','ACCESS_DENIED_ERROR')

            .waitForElementVisible('@backupBtn', 1000)
            .click('@backupBtn')
            .submitDialog('@authAdminDialog')
            .waitForElementVisible('@backupDialog', 1000)
            .submitDialog('@backupDialog')
            .assert.containsText('@backupDBResultField',"File name for backup wasn't specified")
        ;

        browser.end();


        //browser.execute(function () {
        //    browser.querySelector('#create_db_btn').click()
        //});
        //DBActions

           //
           //     DBActions.elementIdClick('@createDBBtn', function (){
           //         DBActions.waitForElementVisible('@authAdminDialog', 6000,false, function(){
           //             browser.end();
           //         });
           //     });
           // });
           //// .click('@createDBBtn', function () {
           //     var DBActions = browser.page.DBActions();
           //     DBActions.waitForElementVisible('@authAdminDialog', 6000);
                //.assert.value('@authAdminName', 'root')
                //.assert.value('@authAdminPas', '');

                //this.waitForElementVisible('@authAdminName', 1000);
              //  this.assert.value('@authAdminName', 'root');
              //  browser.end();
          //  });
        //.waitForElementVisible('@authAdminDialog', 2000)
        //.assert.value('@authAdminName', 'root')
        //.assert.value('@authAdminPas', '');


    }

};