var fs=require('fs');

var startUpParamsCommands = {

    createTempDB: function () {
        var instance=this;
        instance.waitForElementVisible('@dbHostInput')
            .waitForElementVisible('@dbNameInput')
            .waitForElementVisible('@dbUserInput')
            .waitForElementVisible('@dbPasswordInput')
            .clearValue('@dbHostInput')
            .setValue('@dbHostInput',"localhost")
            .clearValue('@dbNameInput')
            .setValue('@dbNameInput', "sinta_temp")     //create temp DB sinta temp;
            .clearValue('@dbUserInput')
            .setValue('@dbUserInput',  "user")
            .clearValue('@dbPasswordInput')
            .setValue('@dbPasswordInput',  "user")
            .click('@createDBBtn')
            .authorizeAsAdmin()
            .waitForElementVisible('@createDBResultField')
            .assert.containsText('@createDBResultField',"created")
            .click('@StoreAndReconnectBtn');
        return instance;
    },

    dropTempDBAndReconnect: function () {
        this.api.perform(function(){
            console.log("dropTempDBAndReconnect");
        });

        var instance=this;
        var dbConfig;
        this.api.pause(2000);

        fs.unlink('./test.cfg', function (err) {              //dele file
            if (err && err.code == 'ENOENT') {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
            } else if (err) {
                // maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
            }
            fs.rename('./test_temp_copy.cfg', './test.cfg', function (err) {
                if (err) console.log('ERROR: ' + err);
                dbConfig = JSON.parse(fs.readFileSync("./test.cfg", "utf-8"));
            })
        });

        this.api.perform(function () {
            instance.waitForElementVisible('@dbHostInput')
                .waitForElementVisible('@dbNameInput')
                .waitForElementVisible('@dbUserInput')
                .waitForElementVisible('@dbPasswordInput')
                .clearValue('@dbHostInput')
                .setValue('@dbHostInput', "localhost")
                .clearValue('@dbNameInput')
                .setValue('@dbNameInput', "sinta_temp")     //create temp DB sinta_temp;
                .clearValue('@dbUserInput')
                .setValue('@dbUserInput', "user")
                .clearValue('@dbPasswordInput')
                .setValue('@dbPasswordInput', "user")
                .click('@dropDBBtn')
                .authorizeAsAdmin()
                .waitForElementVisible('@dropDBResultField')
                .assert.containsText('@dropDBResultField', "dropped")

                .waitForElementVisible('@dbHostInput')
                .waitForElementVisible('@dbNameInput')
                .waitForElementVisible('@dbUserInput')
                .waitForElementVisible('@dbPasswordInput')
                .clearValue('@dbHostInput')
                .setValue('@dbHostInput', dbConfig.host)
                .clearValue('@dbNameInput')
                .setValue('@dbNameInput', dbConfig.database)
                .clearValue('@dbUserInput')
                .setValue('@dbUserInput', dbConfig.user)
                .clearValue('@dbPasswordInput')
                .setValue('@dbPasswordInput', dbConfig.password)
                .click('@StoreAndReconnectBtn');
        });
        return instance;
    },

    resetTempDBConfig: function () {
        var instance=this;
        instance.waitForElementVisible('@dbHostInput')
            .waitForElementVisible('@dbNameInput')
            .waitForElementVisible('@dbUserInput')
            .waitForElementVisible('@dbPasswordInput')
            .clearValue('@dbHostInput')
            .setValue('@dbHostInput','localhost')
            .clearValue('@dbNameInput')
            .setValue('@dbNameInput', 'sinta_temp')
            .clearValue('@dbUserInput')
            .setValue('@dbUserInput',  'user')
            .clearValue('@dbPasswordInput')
            .setValue('@dbPasswordInput',  'user')
            .click('@StoreAndReconnectBtn');
        return instance;
    },

    submitDialog: function (dialog) {
        var instance=this;
        return instance.waitForElementVisible(dialog)
            .assert.visible(dialog+'_submitBtn')
            .click(dialog+'_submitBtn')
            .waitForElementNotVisible(dialog);
    },

    cancelDialog: function (dialog) {
        var instance=this;
        return instance.waitForElementVisible(dialog+'_cancelBtn')
            .click(dialog+'_cancelBtn')
            .waitForElementNotVisible(dialog);
    },

    assertAdminDialogIsEmpty:function(){
        var instance=this;
        return instance.waitForElementVisible('@authAdminDialog')
            .waitForElementVisible('@authAdminDialog_AdminName')
            .assert.valueContains('@authAdminDialog_AdminName', 'root')
            .waitForElementVisible('@authAdminDialog')
            .assert.valueContains('@authAdminDialog_AdminPas', '')
    },

    authorizeAsAdmin:function(){
        var instance=this;
        return instance.waitForElementVisible('@authAdminDialog')
            .assert.containsText('@authAdminDialog', 'Admin authorisation')
            .assert.visible('@authAdminDialog_AdminName')
            .assert.valueContains('@authAdminDialog_AdminName', 'root')
            .assert.visible('@authAdminDialog_AdminPas')
            .assert.valueContains('@authAdminDialog_AdminPas', '')
            .setValue('@authAdminDialog_AdminPas','Rty1988')
            .click('@authAdminDialog_submitBtn')
            .waitForElementNotVisible('@authAdminDialog');
    },

    assertBackupDialogIsEmpty:function(){
        var instance=this;
        return instance.waitForElementVisible('@backupDialog')
            .waitForElementVisible('@backupFileName')
            .assert.valueContains('@backupFileName', '')
    },

    assertRestoreDialogIsEmpty:function(){
        var instance=this;
        return instance.waitForElementVisible('@restoreDialog')
            .waitForElementVisible('@restoreFileName')
            .assert.valueContains('@restoreFileName', '')
    }
};


module.exports={
    commands:[startUpParamsCommands],
    elements:{
        localConfigInfo:'#sa_startup_params_appLocalConfig',

        dbHostLabel:'label[for="db.host"]',
        dbNameLabel:'label[for="db.name"]',
        dbUserLabel:'label[for="db.user"]',
        dbPasswordLabel:'label[for="db.password"]',

        dbHostInput:'input[id="db.host"]',
        dbNameInput:'input[id="db.name"]',
        dbUserInput:'input[id="db.user"]',
        dbPasswordInput:'input[id="db.password"]',

        loadSettingsBtn:"#SA_startup_params_BtnAppLocalConfigLoad",
        StoreAndReconnectBtn:'#SA_startup_params_BtnAppLocalConfigSaveAndReconnect',

        createDBBtn:'#create_db_btn',
        dropDBBtn:'#drop_db_btn',
        backupBtn:'#backup_db_btn',
        restoreBtn:'#restore_db_btn',

        createDBResultField:"#create_db_result",
        dropDBResultField:'#drop_db_result',
        backupDBResultField:'#backup_db_result',
        restoreDBResultField:'#restore_db_result',

        authAdminDialog: '#adminAuthDialog',
                authAdminDialog_AdminName:'input[id="admin_name"]',
                authAdminDialog_AdminPas:'#admin_password',
                authAdminDialog_submitBtn:{
                    selector:'//div[@id="adminAuthDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Login"]',
                    locateStrategy:'xpath'
                },
                authAdminDialog_cancelBtn:{
                    selector:'//div[@id="adminAuthDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Cancel"]',
                    locateStrategy:'xpath'
                },

        backupDialog: '#backupDialog',
                backupFileName:"#backup_fileName",
                backupDialog_submitBtn:{
                    selector:'//div[@id="backupDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Save"]',
                    locateStrategy:'xpath'
                },
                backupDialog_cancelBtn:{
                    selector:'//div[@id="backupDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Cancel"]',
                    locateStrategy:'xpath'
                },

        rewriteBackupDialog: '#rewriteBackupDialog',
                rewriteBackupDialog_submitBtn:{
                    selector:'//div[@id="rewriteBackupDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Rewrite"]',
                    locateStrategy:'xpath'
                },
                rewriteBackupDialog_cancelBtn:{
                    selector:'//div[@id="rewriteBackupDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Cancel"]',
                    locateStrategy:'xpath'
                },

        restoreDialog: '#restoreDialog',
                restoreFileName:"#restore_fileName",
                restoreDialog_submitBtn:{
                    selector:'//div[@id="restoreDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Restore"]',
                    locateStrategy:'xpath'
                },
                restoreDialog_cancelBtn:{
                    selector:'//div[@id="restoreDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Cancel"]',
                    locateStrategy:'xpath'
                },

        rewriteDBDialog: '#rewriteDBDialog',
                rewriteDBDialog_submitBtn:{
                    selector:'//div[@id="rewriteDBDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Rewrite"]',
                    locateStrategy:'xpath'
                },
                rewriteDBDialog_cancelBtn:{
                selector:'//div[@id="rewriteDBDialog"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Cancel"]',
                    locateStrategy:'xpath'
                }
    }
};
