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
    clickRefreshBtn:function(table){
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

        //totalRowLabel: {
        //    selector: "//*[@id='sysadmin_database_ContentPaneDetailContainer']//label[contains(text(), 'ИТОГО строк: ')]",
        //    locateStrategy: 'xpath'
        //},
        //
        //totalRowValueInput: {
        //    selector: "//*[@id='sysadmin_database_ContentPaneDetailContainer']//label[contains(text(), 'ИТОГО строк: ')]/ancestor::td//input[@type='hidden']",
        //    locateStrategy: 'xpath'
        //},


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
        //return;
    }
    if (table == '@changeLogTable') {
        callback('sysadmin_database_Tabledatabasechange_log');
        // return;
    }
}

