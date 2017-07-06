
module.exports= {
    'Sysadmin Header If  All Elements Visible Tests': function (browser) {

        var mainHeader = browser.page.sysadminHeader();
        mainHeader
            .navigate()
            .waitForElementVisible("@img")
            .assert.visible("@img")
            .assert.title('sinta')
            .assert.containsText('@mode', "MODE:test")
            .assert.containsText('@port', "PORT:8080")
            .assert.containsText('@dbName', "DB NAME:sample_sinta")
            .assert.containsText('@user', "USER:user")
            .assert.containsText('@dbConnectionState', 'Connected')
            .assert.visible('@StartUpParamsBtn')
            .click('@StartUpParamsBtn')
            .assert.attributeContains('@StartUpParamsBtn','aria-pressed','true');
    },

    //'Sysadmin Startup DB params Tests': function (browser) {
    //
    //    var startUpParams = browser.page.startUpParams();
    //    var mainHeader = browser.page.sysadminHeader();
    //
    //    startUpParams
    //        .waitForElementVisible('@dbHostLabel')
    //        .assert.containsText('@dbHostLabel','db.host')
    //        .waitForElementVisible('@dbNameLabel')
    //        .assert.containsText('@dbNameLabel','db.name')
    //        .waitForElementVisible('@dbUserLabel')
    //        .assert.containsText('@dbUserLabel','db.user')
    //        .waitForElementVisible('@dbPasswordLabel')
    //        .assert.containsText('@dbPasswordLabel','db.password')
    //
    //        .waitForElementVisible('@dbHostInput')
    //        .assert.valueContains('@dbHostInput','localhost')
    //        .waitForElementVisible('@dbNameInput')
    //        .assert.valueContains('@dbNameInput','sample_sinta')
    //        .waitForElementVisible('@dbUserInput')
    //        .assert.valueContains('@dbUserInput','user')
    //        .waitForElementVisible('@dbPasswordInput')
    //        .assert.valueContains('@dbPasswordInput','user')
    //
    //        .waitForElementVisible('@localConfigInfo')
    //        .assert.containsText('@localConfigInfo', "Configuration loaded.")
    //        .click('@loadSettingsBtn')
    //        .assert.containsText('@localConfigInfo', "Configuration reloaded.")
    //        .waitForElementVisible('@dbHostInput')
    //        .clearValue('@dbHostInput')
    //        .setValue('@dbHostInput', '192.168.0.93_false')
    //        .click('@StoreAndReconnectBtn')
    //        .waitForElementVisible('@localConfigInfo')
    //        .assert.containsText('@localConfigInfo', "Configuration sav")
    //        .assert.containsText('@localConfigInfo', "Failed to connect to database!");
    //
    //    mainHeader.waitForElementVisible('@dbConnectionState')
    //        .assert.containsText("@dbConnectionState", "Failed to connect to database!");
    //
    //    startUpParams
    //        .resetDBConfig()
    //        .waitForElementVisible('@dbNameInput')
    //        .clearValue('@dbNameInput')
    //        .setValue('@dbNameInput', 'GMSSample38xml_false')
    //        .click('@StoreAndReconnectBtn')
    //        .waitForElementVisible('@localConfigInfo')
    //        .assert.containsText('@localConfigInfo', "Configuration sav")
    //        .assert.containsText('@localConfigInfo', "Failed to connect to database!");
    //
    //    mainHeader.waitForElementVisible('@dbName')
    //        .assert.containsText("@dbName", "GMSSample38xml_false")
    //        .waitForElementVisible('@dbConnectionState')
    //        .assert.containsText("@dbConnectionState", "Failed to connect to database!");
    //
    //    startUpParams
    //        .resetDBConfig()
    //        .waitForElementVisible('@dbUserInput')
    //        .clearValue('@dbUserInput')
    //        .setValue('@dbUserInput','sa1')
    //        .click('@StoreAndReconnectBtn');
    //
    //    mainHeader.waitForElementVisible('@user')
    //        .assert.containsText("@user", "sa1")
    //        .waitForElementVisible('@dbConnectionState')
    //        .assert.containsText("@dbConnectionState", "Failed to connect to database!");
    //
    //    startUpParams.resetDBConfig()
    //        .waitForElementVisible('@dbPasswordInput')
    //        .clearValue('@dbPasswordInput')
    //        .setValue('@dbPasswordInput','false')
    //        .click('@StoreAndReconnectBtn');
    //
    //    mainHeader
    //        .waitForElementVisible('@dbConnectionState')
    //        .assert.containsText("@dbConnectionState", "Failed to connect to database!");
    //
    //    startUpParams
    //        .resetDBConfig();
    //},

    'Empty  Dialog Values': function (browser) {
        var startUpParams = browser.page.startUpParams();
        startUpParams
            .waitForElementVisible('@dropDBBtn')
            .click('@dropDBBtn')
            .submitDialog('@authAdminDialog')
            .assert.containsText('@dropDBResultField', 'ACCESS_DENIED_ERROR')

            .waitForElementVisible('@dropDBBtn')
            .click('@dropDBBtn')
            .cancelDialog('@authAdminDialog')
            .assert.containsText('@dropDBResultField', 'ACCESS_DENIED_ERROR')

            .waitForElementVisible('@backupBtn')
            .click('@backupBtn')
            .submitDialog('@authAdminDialog')
            .waitForElementVisible('@backupDialog')
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

        var startUpParams = browser.page.startUpParams();
        var mainHeader = browser.page.sysadminHeader();
        startUpParams

            .waitForElementVisible('@createDBBtn')
            .assert.visible('@createDBBtn')
            .click('@createDBBtn')
            .submitDialog('@authAdminDialog')
            .waitForElementVisible('@createDBResultField')
            .assert.containsText('@createDBResultField', 'ACCESS_DENIED_ERROR')

            .waitForElementVisible('@createDBBtn')
            .assert.visible('@createDBBtn')
            .click('@createDBBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@createDBResultField')
            .assert.containsText('@createDBResultField', 'Impossible to create DB!')


            .waitForElementPresent('@dropDBBtn')
            .click('@dropDBBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@dropDBResultField')
            .assert.containsText('@dropDBResultField', 'dropped!');
        mainHeader
            .assert.containsText('@dbConnectionState', 'Failed to connect to database!');

        startUpParams.click('@backupBtn')
            .authorizeAsAdmin()
            .assert.visible("@backupDialog")
            .assert.visible("@backupFileName")
            .setValue("@backupFileName","sinta")
            .submitDialog('@backupDialog')
            .waitForElementVisible('@backupDBResultField')
            .assert.visible("@backupDBResultField")
            .assert.containsText('@backupDBResultField', 'FAIL!')

            .click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog')
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","sinta")
            .submitDialog('@restoreDialog')
            .waitForElementVisible('@restoreDBResultField')
            .assert.visible("@restoreDBResultField")
            .assert.containsText('@restoreDBResultField', 'FAIL!')

            .click('@createDBBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@createDBResultField')
            .assert.containsText('@createDBResultField', 'Database created!');
        mainHeader
            .assert.containsText('@dbConnectionState', 'Connected');

        startUpParams.click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog')
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","sinta")
            .submitDialog('@restoreDialog')
            .waitForElementVisible('@restoreDBResultField')
            .assert.containsText('@restoreDBResultField', 'Db dump file restored successfully')

            .click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog')
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","sinta")
            .submitDialog('@restoreDialog')
            .waitForElementVisible('@rewriteDBDialog')
            .submitDialog('@rewriteDBDialog')
            .waitForElementVisible('@restoreDBResultField')
            .assert.containsText('@restoreDBResultField', 'Db dump file restored successfully')

            .click('@restoreBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@restoreDialog')
            .clearValue("@restoreFileName")
            .setValue("@restoreFileName","fail0000")
            .submitDialog('@restoreDialog')
            .waitForElementVisible('@restoreDBResultField')
            .assert.containsText('@restoreDBResultField', 'FAIL!')

            .waitForElementVisible('@backupBtn')
            .click('@backupBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@backupDialog')
            .clearValue("@backupFileName")
            .setValue("@backupFileName","backup"+Math.floor(Math.random()*10000))
            .submitDialog('@backupDialog')
            .waitForElementVisible('@backupDBResultField', 10000)
            .assert.containsText('@backupDBResultField', 'backup saved')

            .waitForElementVisible('@backupBtn')
            .click('@backupBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@backupDialog')
            .clearValue("@backupFileName")
            .setValue("@backupFileName","backup")
            .submitDialog('@backupDialog')
            .waitForElementVisible('@rewriteBackupDialog', 10000)
            .submitDialog('@rewriteBackupDialog')
            .waitForElementVisible('@backupDBResultField')
            .assert.containsText('@backupDBResultField', 'backup saved')

        ;browser.end();
    }
};