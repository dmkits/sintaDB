var DBActionCommands = {
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
            .assert.visible('@authAdminPas')
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

        authAdminDialog: '#adminAuthDialog',  //'div[id="adminAuthDialog"]'
        authAdminDialog_submitBtn:'#adminAuthDialog span[widgetid="dijit_form_Button_0"]',
        authAdminDialog_cancelBtn:'#adminAuthDialog span[widgetid="dijit_form_Button_1"]',

        backupDialog: '#backupDialog',
        backupDialog_submitBtn:'#backupDialog span[widgetid="dijit_form_Button_0"]',
        backupDialog_cancelBtn:'#backupDialog span[widgetid="dijit_form_Button_1"]',

        rewriteBackupDialog: '#rewriteBackupDialog',
        rewriteBackupDialog_submitBtn:'#rewriteBackupDialog span[widgetid="dijit_form_Button_0"]',
        rewriteBackupDialog_cancelBtn:'#rewriteBackupDialog span[widgetid="dijit_form_Button_1"]',

        restoreDialog: '#restoreDialog',
        restoreDialog_submitBtn:'#restoreDialog span[widgetid="dijit_form_Button_0"]',
        restoreDialog_cancelBtn:'#restoreDialog span[widgetid="dijit_form_Button_1"]',

        rewriteDBDialog: '#rewriteDBDialog',
        rewriteDBDialog_submitBtn:'#rewriteDBDialog span[widgetid="dijit_form_Button_0"]',
        rewriteDBDialog_cancelBtn:'#rewriteDBDialog span[widgetid="dijit_form_Button_1"]'
    }
};
