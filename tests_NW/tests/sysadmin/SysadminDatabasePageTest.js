

module.exports= {
//'@disabled': true,

    'Sysadmin Header If  All Elements Visible Tests': function (browser) {
        var mainHeader = browser.page.sysadminHeader();
        mainHeader
            .navigate()
            .waitForElementVisible("@img")
            .waitForElementVisible("@btnDatabase")
            .click('@btnDatabase')
            .assert.attributeContains('@btnDatabase', 'aria-pressed', 'true');
    },

    'Sysadmin ChangeLogTable Tests': function(browser){
        //var totalTabelRows=getTableRowsQTY(browser);

        var Database=browser.page.Database();
        Database
            .waitForElementVisible('@sysadmin_database_ContentPaneDetailContainer')
            .waitForElementVisible('@refreshBtn')
            .assert.containsText('@sysadmin_database_ContentPaneDetailContainer',"Show Change Logs");

        browser.useXpath()
            .waitForElementVisible("//div[@id='sysadmin_database_Tabledatabasechange_log']//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th[1]")
        Database
            .assertHeaderContainsText('@showChangeLogTable','1', 'changeID')
            .assertHeaderContainsText('@showChangeLogTable','2', 'changeDatetime')
            .assertHeaderContainsText('@showChangeLogTable','3', 'changeObj')
            .assertHeaderContainsText('@showChangeLogTable','4', 'changeVal')

            .assertCellContainsText('@showChangeLogTable','1','1','chl__1')
            .assertCellContainsText('@showChangeLogTable','1','2','2016-08-29T09:01:00.000')
            .assertCellContainsText('@showChangeLogTable','1','3','change_log')
            .assertCellContainsText('@showChangeLogTable','1','4','CREATE TABLE change_log')
            .waitForElementVisible('@totalRowLabel')
            .waitForElementPresent('@totalRowValueInput')
            .assert.valueContains('@totalRowValueInput','13')

            .waitForElementVisible('@currentChangesBtn')
            .click('@currentChangesBtn')

            .assertHeaderContainsText('@currentChangesTable','1', 'changeID')
            .assertHeaderContainsText('@currentChangesTable','2', 'changeDatetime')
            .assertHeaderContainsText('@currentChangesTable','3', 'changeObj')
            .assertHeaderContainsText('@currentChangesTable','4', 'changeVal')
            .assertHeaderContainsText('@currentChangesTable','5', 'type')
            .assertHeaderContainsText('@currentChangesTable','6', 'message')

            .assertCellContainsText('@currentChangesTable','1','1','chl__1')
            .assertCellContainsText('@currentChangesTable','1','2','2016-08-29T09:01:00.000')
            .assertCellContainsText('@currentChangesTable','1','3','change_log')
            .assertCellContainsText('@currentChangesTable','1','4','CREATE TABLE change_log')
            .assertCellContainsText('@currentChangesTable','1','5','new')
            .assertCellContainsText('@currentChangesTable','1','6','not applied')

            .moveToCell('@currentChangesTable','1','1')
            .mouseButtonDown("left")
            .moveToCell('@currentChangesTable','3','3')
            .mouseButtonUp("left")
            .mouseButtonClick('right')
            .waitForElementVisible('@applyChangesDialog')
            .click('@applyChangesDialog')
            .waitForElementVisible('@refreshCurrentChangesBtn')
            .click('@refreshCurrentChangesBtn')
            .waitForElementVisible('@currentChangesTable')
            .assertCellContainsText('@currentChangesTable','1','1','dir_units__1');








       // ;browser.end();
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

