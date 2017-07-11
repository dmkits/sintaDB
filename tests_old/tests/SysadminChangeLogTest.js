

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
        //var totalTabelRows=getTableRowsQTY(browser);

        var ChangeLogPage=browser.page.ChangeLogPage();
        ChangeLogPage
            .waitForElementVisible('@sysadmin_changeLog_ContentPaneDetailContainer')
            .waitForElementVisible('@refreshBtn')
            .assert.containsText('@sysadmin_changeLog_ContentPaneDetailContainer',"Show Change Logs")

            .assertHeaderContainsText('1', 'changeID')
            .assertHeaderContainsText('2', 'changeDatetime')
            .assertHeaderContainsText('3', 'changeObj')
            .assertHeaderContainsText('4', 'changeVal')

            .assertCellContainsText('1','1','chl__1')
            .assertCellContainsText('1','2','2016-08-29T09:01:00.000+0300')
            .assertCellContainsText('1','3','change_log')
            .assertCellContainsText('1','4','CREATE TABLE change_log')
            .waitForElementVisible('@totalRowLabel')
            .waitForElementPresent('@totalRowValueInput')
            .assert.valueContains('@totalRowValueInput','13')


        ;browser.end();
    }
};

//function getTableRowsQTY(browser){
//    browser.elements('xpath',"//div[@class=\'ht_master handsontable\']//table[@class=\'htCore\']//tbody/tr", function(result){
//
//
//        console.log("result.value.length=",result.value.length);
//        return result.value.length;
//
//    } )
//}

