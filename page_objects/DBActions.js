//{ class:'', tag:'', id=''. name:'', text:''}
var DBActionCommands = {
    findDojoStdDialog: function(params){
        //if (params&&params.title) ...
        //if (params&&params.content)...
        var dlg=null; ///
        return dlg;
    },
    findDojoButtonWithText: function(text){
        var dlg=null; ///
        return dlg;
    },

    submitDialog: function (dialog) {
        var instance=this;
        this.api.pause(1000);
        return instance.waitForElementVisible(dialog,1000)
               .assert.visible(dialog+'_submitBtn',1000)
               .click(dialog+'_submitBtn')
               .waitForElementNotVisible(dialog,1000);
    },
    cancelDialog: function (dialog) {
        var instance=this;
        this.api.pause(1000);
        return instance.waitForElementVisible(dialog+'_cancelBtn',1000)
            .click(dialog+'_cancelBtn');
    },
    authorizeAsAdmin:function(){
        var instance=this;
        this.api.pause(1000);
        return instance.waitForElementVisible('@authAdminDialog',1000)
            .assert.containsText('@authAdminDialog', 'Admin authorisation')
            .assert.visible('@authAdminName')
            .assert.valueContains('@authAdminName', 'root')
            .assert.visible('@authAdminPas')
            .assert.valueContains('@authAdminPas', '')
            .setValue('@authAdminPas','Rty1988')
            .click('@authAdminDialog_submitBtn')
            .waitForElementNotVisible('@authAdminDialog',1000);
    }
};

module.exports={
    commands:[DBActionCommands],
    elements:{
        createDBBtn:'#create_db_btn',
        dropDBBtn:'#drop_db_btn',
        backupBtn:'#backup_db_btn',
        restoreBtn:'#restore_db_btn',

        createDBResultField:"#create_db_result",
        dropDBResultField:'#drop_db_result',
        backupDBResultField:'#backup_db_result',
        restoreDBResultField:'#restore_db_result',

        authAdminName:'input[id="admin_name"]',
        authAdminPas:'#admin_password',

        authAdminDialog: '#adminAuthDialog',
        authAdminDialog_submitBtn:{
            selector:'//div[@id="adminAuthDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Login"]',
            locateStrategy:'xpath'
        },
        authAdminDialog_cancelBtn:{
            selector:'//div[@id="adminAuthDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Cansel"]',
            locateStrategy:'xpath'
        },


        backupDialog: '#backupDialog',
        backupFileName:"#backup_fileName",
        backupDialog_submitBtn:{
            selector:'//div[@id="backupDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Create"]',
            locateStrategy:'xpath'
        },
        backupDialog_cancelBtn:{
            selector:'//div[@id="backupDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Cansel"]',
            locateStrategy:'xpath'
        },

        rewriteBackupDialog: '#rewriteBackupDialog',
        rewriteBackupDialog_submitBtn:{
          //  selector:'//div[@id="rewriteBackupDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Rewrite"]',
            selector:'/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Rewrite"]',
            locateStrategy:'xpath'
        },
        rewriteBackupDialog_cancelBtn:{
            selector:'//div[@id="rewriteBackupDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Cansel"]',
            locateStrategy:'xpath'
        },

        restoreDialog: '#restoreDialog',
        restoreFileName:"#restore_fileName",
        restoreDialog_submitBtn:{
            selector:'//div[@id="restoreDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Restore"]',
            locateStrategy:'xpath'
        },
        restoreDialog_cancelBtn:{
            selector:'//div[@id="restoreDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Cansel"]',
            locateStrategy:'xpath'
        },

        rewriteDBDialog: '#rewriteDBDialog',
        rewriteDBDialog_submitBtn:{
            selector:'//div[@id="rewriteDBDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Rewrite"]',
            locateStrategy:'xpath'
        },
        rewriteDBDialog_cancelBtn:{
            selector:'//div[@id="rewriteDBDialog"]/div[@class="dijitDialogPaneActionBar"]/span/span/span/span[text()="Cansel"]',
            locateStrategy:'xpath'
        }
    }
};
