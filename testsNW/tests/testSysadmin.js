var tnw= require('../testNW');
module.exports= {
    'Sysadmin Header Tests': function (browser) {

        tnw.start(browser, {url:'http://localhost:8080/sysadmin'})
            .assertElementVisible({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'img'})
            .assertElementVisible({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'b',text:'MODE'})
            .assertElementVisible({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'b',text:'PORT'})
            .assertElementVisible({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'b',text:'DB NAME'})
            .assertElementVisible({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'b',text:'USER'})
            .assertElementVisible({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'b',text:'DB CONNECTION STATE'})

            .assertElementVisible({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'span',text:'Startup params'})
            .clickDojoButton({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'span',text:'Startup params'})
            .checkDojoToggleButtonSelected({parentClass:'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag:'span',text:'Startup params'})

            .assertElementVisible({class:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"b",
                text:'system startup parameters'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"b",
                text:'Configuration loaded.'})

            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"label",
                text:'db.host'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"b",
                text:'Configuration loaded.'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"label",
                text:'db.name'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"label",
                text:'db.user'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"label",
                text:'db.password'})

            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"span",
                text:'Load settings'})
            .clickDojoButton({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:'span',text:'Load settings'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"b",
                text:'Configuration reloaded.'})

            .assertElementContainsValue()

            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"span",
                text:'Store settings & reconnect to database'})
            .clickDojoButton({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:'span',text:'Store settings & reconnect to database'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"b",
                text:'Configuration saved.'})
            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"b",
                text:'Reconnected to database.'})

            .assertElementVisible({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:"span",
                text:'Create DB'})
            .clickDojoButton({parentClass:'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag:'span',text:'Create DB'})

            .assertElementVisible({
                tag:"div",
                class:'dijitDialog dijitDialogFocused dijitFocused'})

        ;






        //dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild





            //.assertVisible();
            //.findDojoButtonWithText('Login').assertVisible().click();

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