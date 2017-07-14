var fs=require('fs');

module.exports= {

//'@disabled': true,

    before: function (browser) {
        fs.createReadStream('./test.cfg').pipe(fs.createWriteStream('./test_temp_copy.cfg'));
    },
    after: function (browser) {
        fs.unlink('./test.cfg', function (err) {
            if (err && err.code == 'ENOENT') {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
            } else if (err) {
                // maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
            }
            fs.rename('./test_temp_copy.cfg', './test.cfg', function (err) {
                if (err) console.log('ERROR: ' + err);

                //else {
                    var startUpParams = browser.page.startUpParams();
                    startUpParams.dropTempDBAndReconnect('./test.cfg');
                    // console.info('File "test_temp_copy.cfg" removed');
               // }

            });
        })
    },

    'Sysadmin Header If  All Elements Visible Tests': function (browser) {
        var mainHeader = browser.page.sysadminHeader();
        var startUpParams = browser.page.startUpParams();

        mainHeader
            .navigate()
            .waitForElementVisible("@img")
            .waitForElementVisible("@btnDatabase")
            .click('@StartUpParamsBtn');

        startUpParams.createTempDB();

        mainHeader
            .waitForElementVisible('@btnDatabase')
            .click('@btnDatabase')
            .assert.attributeContains('@btnDatabase', 'aria-pressed', 'true');
    },

    'Sysadmin ChangeLogTable Tests': function(browser){
        //var totalTabelRows=getTableRowsQTY(browser);
        var sysadminHeader=browser.page.sysadminHeader();
        var startUpParams=browser.page.startUpParams();
        var database=browser.page.database();
browser.pause(5000);
        database
            .waitForElementVisible('@sysadmin_database_ContentPaneDetailContainer')
            .assertTableTitleHasText('@currentChangesTable','Current Changes')
            .waitForElementVisible('@currentChangesTable')
            .assertTotalRowContainsValue('@currentChangesTable','13')
            .assertTableTitleHasText('@currentChangesTable','Current Changes')
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

            .moveToCell('@currentChangesTable', '1', '1')
            .mouseButtonDown("left")
            .moveToCell('@currentChangesTable', '3', '3')
            .mouseButtonUp("left")
            .mouseButtonClick('right')
            .waitForElementVisible('@applyChangesDialog')
            .click('@applyChangesDialog')
            .clickRefreshBtn("@currentChangesTable")
            .waitForElementVisible("@currentChangesTable")
            .assertCellContainsText('@currentChangesTable', '1', '1', 'dir_units__1')
            .assertCellContainsText('@currentChangesTable', '1', '2', '2016-08-29T11:41:00.000')
            .assertCellContainsText('@currentChangesTable', '1', '3', 'dir_units')
            .assertCellContainsText('@currentChangesTable', '1', '4', 'CREATE TABLE dir_units')
            .assertCellContainsText('@currentChangesTable', '1', '5', 'new')
            .assertCellContainsText('@currentChangesTable', '1', '6', 'not applied')
            .waitForElementVisible('@currentChangesTable')
            .assertTotalRowContainsValue('@currentChangesTable','10')

            .click('@changeLogBtn')
            .waitForElementVisible('@changeLogTable')
            .assertTableTitleHasText('@changeLogTable','Change Logs')
            .assertHeaderContainsText('@changeLogTable','1', 'changeID')
            .assertHeaderContainsText('@changeLogTable','2', 'changeDatetime')
            .assertHeaderContainsText('@changeLogTable','3', 'changeObj')
            .assertHeaderContainsText('@changeLogTable','4', 'changeVal')

            .assertCellContainsText('@changeLogTable','1','1','chl__1')
            .assertCellContainsText('@changeLogTable','1','2','2016-08-29T06:01:00.000Z')
            .assertCellContainsText('@changeLogTable','1','3','change_log')
            .assertCellContainsText('@changeLogTable','1','4','CREATE TABLE change_log')
            .assertTotalRowContainsValue('@changeLogTable','3');
        sysadminHeader
            .click('@StartUpParamsBtn');
        //startUpParams
        //    .dropTempDBAndReconnect();

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

