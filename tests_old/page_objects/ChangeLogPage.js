var changeLogCommands={
    //assertHeaderNumberWithTextVisible:function(headerNumber, text){
    //    this.elements.tableHeader={
    //        selector:"//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th["+headerNumber+"]//span[contains(text(), '"+text+"')]",
    //        locateStrategy:'xpath'
    //    };
    //    var instance=this;
    //    return instance
    //        .waitForElementVisible("@tableHeader");
    //},
    //
    //assertRowNumberColumnNumberWithTextVisible:function(RowNumber,ColumnNumber, text){
    //    this.elements.tableCell={
    //        selector:"//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr["+RowNumber+"]/td["+ColumnNumber+"] [contains(text(), '"+text+"')]",
    //        locateStrategy:'xpath'
    //    };
    //    var instance=this;
    //    return instance
    //        .waitForElementVisible("@tableCell");
    //},

    assertHeaderContainsText:function(headerNumber, text){
        this.elements.tableHeader={
            selector:"//div[@class='ht_clone_top handsontable']//table[@class='htCore']//thead/tr[2]/th["+headerNumber+"]",
            locateStrategy:'xpath'
        };
        var instance=this;
        return instance
            .waitForElementVisible("@tableHeader")
            .assert.containsText("@tableHeader", text);
    },

    assertCellContainsText:function(RowNumber,ColumnNumber, text){
        this.elements.tableCell={
            selector:"//div[@class='ht_master handsontable']//table[@class='htCore']//tbody/tr["+RowNumber+"]/td["+ColumnNumber+"]",
            locateStrategy:'xpath'
        };
        var instance=this;
        return instance
            .waitForElementVisible("@tableCell")
            .assert.containsText("@tableCell", text);
    }
};

module.exports = {
    commands:[changeLogCommands],
    elements: {
        sysadmin_changeLog_ContentPaneDetailContainer:"#sysadmin_changeLog_ContentPaneDetailContainer",

        refreshBtn:{
            selector:"//*[@id='sysadmin_changeLog_ContentPaneDetailContainer']//input[@type='button']/ancestor::span[@role='presentation']//span[contains(text(), 'Обновить')]",
            locateStrategy:'xpath'
        },

        totalRowLabel:{
            selector:"//*[@id='sysadmin_changeLog_ContentPaneDetailContainer']//label[contains(text(), 'ИТОГО строк: ')]",
            locateStrategy:'xpath'
        },

        totalRowValueInput:{
            selector:"//*[@id='sysadmin_changeLog_ContentPaneDetailContainer']//label[contains(text(), 'ИТОГО строк: ')]/ancestor::td//input[@type='hidden']",
            locateStrategy:'xpath'
        }
    }
};

