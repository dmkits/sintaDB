var databaseCommands={

    assertHeaderContainsText:function(table,headerNumber, text){ console.log("table=",table);
        var instance=this;
        getTableID(table, function(id){
            instance.elements.tableHeader={
                selector:"//div[@id='"+id+"']//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th["+headerNumber+"]",
                locateStrategy:'xpath'
            };
        });
        return instance
            .waitForElementVisible("@tableHeader")
            .assert.containsText("@tableHeader", text);

    },
    assertCellContainsText:function(table,RowNumber,ColumnNumber, text){
        var instance=this;
        getTableID(table, function(id){
            instance.elements.tableCell={
                selector:"//div[@id='"+id+"']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr["+RowNumber+"]/td["+ColumnNumber+"]",
                locateStrategy:'xpath'
            };
        });
        return instance
            .waitForElementVisible("@tableCell")
            .assert.containsText("@tableCell", text);
    },
    moveToCell:function(table,RowNumber,ColumnNumber){
        var instance=this;
        getTableID(table, function(id){
            instance.elements.tableCell={
                selector:"//div[@id='"+id+"']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr["+RowNumber+"]/td["+ColumnNumber+"]",
                locateStrategy:'xpath'
            };
        });
        return instance
        .moveToElement("@tableCell",15,15);
    },
    scrollTable:function(table,scrollTopValue){
        var instance=this;

        getTableID(table, function(id){
            instance.api.execute(function(args) {    console.log("execute");
                var table=document.evaluate('//*[@id="'+args+'"]//*[@class="handsontable htColumnHeaders"]/div[1]/div[@class="wtHolder"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                console.log("table=",table);
                setTimeout(function () {
                    console.log("setTimeout");
                    table.scrollTop = scrollTopValue;
                }, 1000);
            },[id]);
        });
        return instance;
    },

    scrollTableToValue: function (table, value) {
        var instance = this;
        var scrollTopValue = 0;
        var xpath = "//div[@id='sysadmin_database_Tabledatabasecurrent_changes']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody//td[contains(text(), '" + value + "')]";
        instance
            .api.useXpath();
        var cont = true;
      //  while (cont) {
            instance.waitForElementVisible(xpath, 1000, false, function (result) {
                if (!result.value) {
                    scrollTopValue = scrollTopValue + 380;
                    instance.scrollTable(table, scrollTopValue)
                }
                else {
                    cont = false;
                }
            });
     //   }
        return instance;
    },

    //moveToLastRow:function(table){
    //    var xpath;
    //    var instance=this;
    //    getTableID(table, function(id){
    //        xpath="//div[@id='"+id+"']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr[last()]/td[1]";
    //    });
    //    this.api.perform(function () {
    //        instance.api.useXpath()
    //            .waitForElementPresent(xpath)
    //            .moveTo(xpath,15,15)
    //            .waitForElementVisible(xpath)
    //            .useCss();
    //    });
    //    return instance;
    //       // .moveToElement("@tableCell",15,15);
    //},
    //moveToLastRow:function(table){
    //
    //    var instance=this;
    //
    //this.api.execute(function () {                                                             console.log("execute");
    //  //  window.document.getElementById("ht_f6f2836bfa1b4ce2").scrollBy(0, 10000000);
    //    var objDiv = document.getElementById("ht_master handsontable");                       console.log("objDiv=",objDiv);
    //    objDiv.scrollTop = objDiv.scrollHeight;
    //
    //    getTableID(table, function(id){
    //        instance.elements.tableCell={
    //            selector:"//div[@id='"+id+"']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr[last()]/td[1]",
    //            locateStrategy:'xpath'
    //        };
    //
    //    });
    //});
    //    //var instance=this;
    //    //getTableID(table, function(id){
    //    //    instance.elements.tableCell={
    //    //        selector:"//div[@id='"+id+"']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr[last()]/td[1]",
    //    //        locateStrategy:'xpath'
    //    //    };
    //    //});
    //
    //    this.api.perform(function () {
    //        instance.moveToElement("@tableCell",15,15);
    //
    //    });
    //
    //    return instance;
    //},
    clickRefreshBtn:function(table){
        this.api.pause(3000);
        var instance=this;
        getTableID(table, function(id){
            instance.elements.refreshBtn={
                selector:"//*[@id='"+id+"']//input[@type='button']/ancestor::span[@role='presentation']//span[contains(text(), 'Обновить')]",
                locateStrategy:'xpath'
            };
        });
        return instance
            .waitForElementVisible("@refreshBtn")
            .click("@refreshBtn");
    },

    assertTableTitleHasText:function(table,text){
        var instance=this;
        getTableID(table, function(id){
            instance.elements.tableTitle={
                selector:"//*[@id='"+id+"']//td/h1",
                locateStrategy:'xpath'
            };
        });
        return instance
            .waitForElementVisible("@tableTitle")
            .assert.containsText("@tableTitle", text);
},
    assertTotalRowContainsValue:function(table,value){
        var instance=this;
        getTableID(table, function(id){
            instance.elements.totalRowInput={
                selector:"//*[@id='"+id+"']//label[contains(text(), 'ИТОГО строк:')]/ancestor::td//input[@type='hidden']",
                locateStrategy:'xpath'
            };
        });
        return instance
            .waitForElementPresent("@totalRowInput")
            .assert.valueContains("@totalRowInput", value);
    },

    mouseButtonDown:function(btn){
        var instance=this;
        this.api.mouseButtonDown(btn);
        return instance;
    },
    mouseButtonUp:function(btn){
        var instance=this;
        this.api.mouseButtonUp(btn);
        return instance;
    },
    mouseButtonClick:function(btn){
        var instance=this;
        this.api.mouseButtonClick(btn);
        return instance;
    },
};

module.exports = {
    commands: [databaseCommands],
    elements: {
        sysadmin_database_ContentPaneDetailContainer: "#sysadmin_database_ContentPaneDetailContainer",

        currentChangesBtn: '#current_changes',
        changeLogBtn: '#change_log',

        currentChangesTable:{
            selector: "//*[@id='sysadmin_database_Tabledatabasecurrent_changes']//div[@class='ht_master handsontable']//table[@class='htCore']",
            locateStrategy: 'xpath'
        } ,

        changeLogTable:{
            selector: "//*[@id='sysadmin_database_Tabledatabasechange_log']//div[@class='ht_master handsontable']//table[@class='htCore']",
            locateStrategy: 'xpath'
        } ,

        applyChangesDialog: {
            selector: "//div[contains(text(), 'Apply selected changes')]/../..",
            locateStrategy: 'xpath'
        }
    }
};

function getTableID(table, callback) {
    if (table == '@currentChangesTable') {
        callback('sysadmin_database_Tabledatabasecurrent_changes');
    }
    if (table == '@changeLogTable') {
        callback('sysadmin_database_Tabledatabasechange_log');
    }
}

