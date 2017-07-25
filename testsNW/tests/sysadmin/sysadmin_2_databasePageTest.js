var fs=require('fs');

module.exports= {

//'@disabled': true,

    before: function (browser) {
        fs.createReadStream('./test.cfg').pipe(fs.createWriteStream('./test_temp_copy.cfg'));
    },

    'Sysadmin Header If  All Elements Visible Tests': function (browser) {
        browser.pause(2000);
        var mainHeader = browser.page.sysadminHeader();
        var startUpParams = browser.page.startUpParams();

        mainHeader
            .navigate()
            .waitForElementVisible("@img")
            .waitForElementVisible("@btnDatabase")
        ;
         /*   .click('@StartUpParamsBtn');

        startUpParams.createTempDB();
*/
        mainHeader
            .waitForElementVisible('@btnDatabase')
            .click('@btnDatabase')
            .assert.attributeContains('@btnDatabase', 'aria-pressed', 'true');
    },

    'Sysadmin ChangeLogTable Tests': function(browser) {

        var sysadminHeader = browser.page.sysadminHeader();
        var database = browser.page.database();

        database
            .waitForElementVisible('@sysadmin_database_ContentPaneDetailContainer')
            .assertTableTitleHasText('@currentChangesTable', 'Current Changes')
            .waitForElementVisible('@currentChangesTable')
            .assertTotalRowContainsValue('@currentChangesTable', '66');

        browser.useXpath()
            .waitForElementVisible('//*[@class="handsontable htColumnHeaders"]/div[1]/div/div/div/table[@class="htCore"]');
            //.waitForElementVisible('//*[@class="handsontable htColumnHeaders"]/div[1]/div/div/div/table[@class="htCore"]', 500, false, function (result) {
            //    if (result.value) {
            //        console.log("result.value=", result.value);
            //    }
            //});

      // database.scrollTable('@currentChangesTable');
        database.scrollTableToValue('@currentChangesTable','chl__1' ); //'dir_products_collections__5'

        //.waitForElementPresent("//div[@class='wtHolder']/div[@class='wtHider']/div[@class='wtSpreader']/table[@class='htCore']");
        //.waitForElementPresent("//div[@id='sysadmin_database_Tabledatabasecurrent_changes']../div//div[@class='ht_master handsontable innerBorderTop']//table[@class='htCore']");

        //browser.useXpath()
        //    .pause(2000)
        //    .waitForElementPresent("//div[@id='sysadmin_database_Tabledatabasecurrent_changes']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody//td[contains(text(), 'dir_products_collections__5')]", 1000);


     /*   browser.execute(function() {
            var table=document.evaluate('//*[@id="sysadmin_database_Tabledatabasecurrent_changes"]//*[@class="handsontable htColumnHeaders"]/div[1]/div[@class="wtHolder"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            //var lastRow="//div[@id='sysadmin_database_Tabledatabasecurrent_changes']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody//td[contains(text(), 'dir_products_collections__5')];
            //var circle=0;
            table.scrollTop=0;
            //function scrollDiv(circle) { console.log("scrollDiv", circle);
            //    if(circle==20){
            //        return browser
            //            .useXpath()
            //            .waitForElementVisible("//div[@id='sysadmin_database_Tabledatabasecurrent_changes']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody//td[contains(text(), 'dir_products_collections__5')]");
            //    }
                    setTimeout(function () {
                        table.scrollTop =table.scrollTop+ 2000;

                    }, 500);
         //   }
          //  scrollDiv(0);
        }, [], function(){
                //browser
                //    .useXpath()
                //    .waitForElementVisible("//div[@id='sysadmin_database_Tabledatabasecurrent_changes']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody//td[contains(text(), 'dir_products_collections__5')]", 500, false, function (result) {
                //        if(result.value){
                //            console.log("result.value=",result.value);
                //            return;
                //        }
                //        scrollDiv(circle++);
                //    });
        });


*/


    /*    browser.pause(2000);
           browser.execute(function () {
              // console.log("execute");
               var element = document.evaluate( "//div[@id='sysadmin_database_Tabledatabasecurrent_changes']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody//td[contains(text(), 'dir_products_collections__5')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

               element.scrollIntoView();

               //  window.document.getElementById("ht_f6f2836bfa1b4ce2").scrollBy(0, 10000000);
               //var objDiv =
                   //document.getElementById("HTableSimpleFiltered_0").scrollTop -=10000;
             //  console.log("objDiv=", objDiv);
            //   objDiv.scrollTop = objDiv.scrollHeight;
           },[]);
           */
            //.moveToLastRow('@currentChangesTable');

            /*.assertTableTitleHasText('@currentChangesTable', 'Current Changes')
            .assertHeaderContainsText('@currentChangesTable', '1', 'changeID')
            .assertHeaderContainsText('@currentChangesTable', '2', 'changeDatetime')
            .assertHeaderContainsText('@currentChangesTable', '3', 'changeObj')
            .assertHeaderContainsText('@currentChangesTable', '4', 'changeVal')
            .assertHeaderContainsText('@currentChangesTable', '5', 'type')
            .assertHeaderContainsText('@currentChangesTable', '6', 'message')

            .assertCellContainsText('@currentChangesTable', '1', '1', 'chl__1')
            .assertCellContainsText('@currentChangesTable', '1', '2', '2016-08-29T09:01:00.000')
            .assertCellContainsText('@currentChangesTable', '1', '3', 'change_log')
            .assertCellContainsText('@currentChangesTable', '1', '4', 'CREATE TABLE change_log')
            .assertCellContainsText('@currentChangesTable', '1', '5', 'new')
            .assertCellContainsText('@currentChangesTable', '1', '6', 'not applied')

            .moveToCell('@currentChangesTable', '1', '1')
            .mouseButtonDown("left")
            .moveToCell('@currentChangesTable', '3', '3')
            .mouseButtonUp("left")
            .mouseButtonClick('right')
            .waitForElementVisible('@applyChangesDialog')
            .click('@applyChangesDialog')
            .clickRefreshBtn("@currentChangesTable")
            .waitForElementVisible("@currentChangesTable");
        browser.pause(2000);

        database.assertCellContainsText('@currentChangesTable', '1', '1', 'dir_units__1')
            .assertCellContainsText('@currentChangesTable', '1', '2', '2016-08-29T11:41:00.000')
            .assertCellContainsText('@currentChangesTable', '1', '3', 'dir_units')
            .assertCellContainsText('@currentChangesTable', '1', '4', 'CREATE TABLE dir_units')
            .assertCellContainsText('@currentChangesTable', '1', '5', 'new')
            .assertCellContainsText('@currentChangesTable', '1', '6', 'not applied')
            .waitForElementVisible('@currentChangesTable')
            .assertTotalRowContainsValue('@currentChangesTable', '63')

            .click('@changeLogBtn')
            .waitForElementVisible('@changeLogTable')
            .assertTableTitleHasText('@changeLogTable', 'Change Logs')
            .assertHeaderContainsText('@changeLogTable', '1', 'changeID')
            .assertHeaderContainsText('@changeLogTable', '2', 'changeDatetime')
            .assertHeaderContainsText('@changeLogTable', '3', 'changeObj')
            .assertHeaderContainsText('@changeLogTable', '4', 'changeVal')

            .assertCellContainsText('@changeLogTable', '1', '1', 'chl__1')
            .assertCellContainsText('@changeLogTable', '1', '2', '2016-08-29T06:01:00.000Z')
            .assertCellContainsText('@changeLogTable', '1', '3', 'change_log')
            .assertCellContainsText('@changeLogTable', '1', '4', 'CREATE TABLE change_log')
            .assertTotalRowContainsValue('@changeLogTable', '3')

            .click('@currentChangesBtn')
            .waitForElementVisible('@currentChangesTable')
            .moveToCell('@currentChangesTable', '1', '1')
            .mouseButtonDown("left")
           // .moveToCell('@currentChangesTable', '63', '3')

            .moveToLastRow('@currentChangesTable')
            .mouseButtonUp("left")
        */
          /*  .mouseButtonClick('right')
            .waitForElementVisible('@applyChangesDialog')
            .click('@applyChangesDialog');
            browser.pause(10000);
        //database
        //    .assertCellContainsText('@currentChangesTable', '1', '6', 'applied')

        database .click('@changeLogBtn')
            .clickRefreshBtn("@changeLogTable");
        browser.pause(2000);

        database.assertTotalRowContainsValue('@changeLogTable', '66');

        sysadminHeader
            .click('@StartUpParamsBtn');
    },
        'Delete Test DB and reconnect': function(browser) {
            var startUpParams = browser.page.startUpParams();
            startUpParams.dropTempDBAndReconnect();
                browser.end();
            */
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

