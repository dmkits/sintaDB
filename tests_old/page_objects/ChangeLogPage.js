

module.exports = {
    elements: {
        sysadmin_changeLog_ContentPaneDetailContainer:"#sysadmin_changeLog_ContentPaneDetailContainer",

        refreshBtn:{
            selector:"//*[@id='sysadmin_changeLog_ContentPaneDetailContainer']//input[@type='button']/ancestor::span[@role='presentation']//span[contains(text(), 'Обновить')]",
            locateStrategy:'xpath'
        }


        //  /ancestor::span[@role='presentation']
        //  //*[@id='sysadmin_changeLog_ContentPaneDetailContainer']
       // "//*[@class=\"dijitDialogTitleBar\"]//span[contains(text(), 'Restore from file')]/ancestor::*[@role=\"dialog\"][1]//*[@class=\"dijitReset dijitInline dijitButtonText\" and  contains(text(), 'Restore')]"
    }
};


////span[contains(text(), 'Обновить')