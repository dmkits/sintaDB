var tnw= require('../testNW');
module.exports= {
    'Sysadmin Header Tests': function (browser) {



        tnw.start(browser, {url:'http://localhost:8080/sysadmin'})
            .findDojoStdDialog({title:'Title',content:'lsdfmklsdmfklmds'}).assertVisible()
            .findDojoButtonWithText('Login').assertEnabled().assertVisible().click()

    //    browser.element('link Text selector', 'PORT', function(res) {
    //        console.log(res)
    //    });
    //
    //    var mainHeader = browser.page.sysadminHeader();
    //
    //
    //    //var paramsPage = browser.page.startUpParams();
    //    //paramsPage.resetDBConfig();
    //    mainHeader.navigate()
    //        .waitForElementVisible('body', 1000);
    //
    //    browser.element('link Text selector', 'PORT', function(res) {
    //        console.log(res)
    //    });
    //
    //    mainHeader.assert.visible("@img")
    //        .assert.title('sinta')
    //        .assert.containsText('@mode', "MODE:test")
    //        .assert.containsText('@port', "PORT:8080")
    //        .assert.containsText('@dbName', "DB NAME:sample_sinta")
    //        .assert.containsText('@user', "USER:user")
    //        .assert.containsText('@dbConnectionState', 'Connected')
    //        .assert.visible('@StartUpParamsBtn')
    //        .click('@StartUpParamsBtn');
    //    browser.pause(2000);
    //},

        browser.end();
    }
};