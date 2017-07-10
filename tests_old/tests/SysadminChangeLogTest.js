
module.exports= {

    'Sysadmin Header If  All Elements Visible Tests': function (browser) {
        var mainHeader = browser.page.sysadminHeader();
        mainHeader
            .navigate()
            .waitForElementVisible("@img")
            .waitForElementVisible("@btnChangeLog")
            .click('@btnChangeLog')
            .assert.attributeContains('@btnChangeLog', 'aria-pressed', 'true');
    },

    'Sysadmin ChangeLogTable Tests': function(browser){
        var ChangeLogPage=browser.page.ChangeLogPage();
        ChangeLogPage
            .waitForElementVisible('@sysadmin_changeLog_ContentPaneDetailContainer')
            .waitForElementVisible('@refreshBtn')
            .assert.containsText('@sysadmin_changeLog_ContentPaneDetailContainer',"Show Change Logs")

        ;browser.end();
    }
};

