var databaseCommands={

    assertHeaderContainsText:function(table,headerNumber, text){ console.log("table=",table);
        var instance=this;

        getTableID(table, function(id){        console.log("id=", id);
            instance.elements.tableHeader={
                selector:"//div[@id='"+id+"']//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th["+headerNumber+"]",
                //selector:"//div[@id='sysadmin_database_Tabledatabasechange_log']//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th[1]",
                locateStrategy:'xpath'
            };

        });
        return instance
            .waitForElementVisible("@tableHeader")
            .assert.containsText("@tableHeader", text);

    },
    assertCellContainsText:function(table,RowNumber,ColumnNumber, text){
        var instance=this;

        getTableID(table, function(id){        console.log("id=", id);
            instance.elements.tableCell={
                selector:"//div[@id='"+id+"']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr["+RowNumber+"]/td["+ColumnNumber+"]",
                //selector:"//div[@id='sysadmin_database_Tabledatabasechange_log']//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th[1]",
                locateStrategy:'xpath'
            };

        });
        return instance
            .waitForElementVisible("@tableCell")
            .assert.containsText("@tableCell", text);
    },

    moveToCell:function(table,RowNumber,ColumnNumber){
        var instance=this;

        getTableID(table, function(id){        console.log("id=", id);
            instance.elements.tableCell={
                selector:"//div[@id='"+id+"']//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr["+RowNumber+"]/td["+ColumnNumber+"]",
                //selector:"//div[@id='sysadmin_database_Tabledatabasechange_log']//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th[1]",
                locateStrategy:'xpath'
            };

        });
        return instance
        .moveToElement("@tableCell",3,3);

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

    doubleClick:function(btn){
        var instance=this;
        this.api.doubleClick(btn);
        return instance;
    }
};

module.exports = {
    commands: [databaseCommands],
    elements: {
        sysadmin_database_ContentPaneDetailContainer: "#sysadmin_database_ContentPaneDetailContainer",

        refreshBtn: {
            selector: "//*[@id='sysadmin_database_ContentPaneDetailContainer']//input[@type='button']/ancestor::span[@role='presentation']//span[contains(text(), 'Обновить')]",
            locateStrategy: 'xpath'
        },
//sysadmin_database_Tabledatabasecurrent_changes

        refreshCurrentChangesBtn: {
            selector: "//*[@id='sysadmin_database_Tabledatabasecurrent_changes']//input[@type='button']/ancestor::span[@role='presentation']//span[contains(text(), 'Обновить')]",
            locateStrategy: 'xpath'
        },

        currentChangesBtn: '#current_changes',
        showChangeLogBtn: '#change_log',

        totalRowLabel: {
            selector: "//*[@id='sysadmin_database_ContentPaneDetailContainer']//label[contains(text(), 'ИТОГО строк: ')]",
            locateStrategy: 'xpath'
        },

        totalRowValueInput: {
            selector: "//*[@id='sysadmin_database_ContentPaneDetailContainer']//label[contains(text(), 'ИТОГО строк: ')]/ancestor::td//input[@type='hidden']",
            locateStrategy: 'xpath'
        },
        currentChangesTable: '#sysadmin_database_Tabledatabasecurrent_changes',
        showChangeLogTable: "#sysadmin_database_Tabledatabasechange_log",

        applyChangesDialog: {
            selector: "//div[contains(text(), 'Apply selected changes')]/../..",
            locateStrategy: 'xpath'
        }
    }
};
function getTableID(table, callback) {  console.log("getTableID");
    if (table == '@currentChangesTable') {
        callback('sysadmin_database_Tabledatabasecurrent_changes');
    return;
}
    if (table == '@showChangeLogTable') {
        callback('sysadmin_database_Tabledatabasechange_log');
       // return;
    }
   // if(table=='@showChangeLogTable') return'sysadmin_database_Tabledatabasechange_log';
}
