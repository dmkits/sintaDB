var tnw= require('../testNW');
module.exports= {
    'Sysadmin Header Tests': function (browser) {

        tnw.start(browser, {url: 'http://localhost:8080/sysadmin'})
            .assertElementVisible({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'img'
            })
            .assertElementVisible({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'b', text: 'MODE'
            })
            .assertElementVisible({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'b', text: 'PORT'
            })
            .assertElementVisible({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'b', text: 'DB NAME'
            })
            .assertElementVisible({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'b', text: 'USER'
            })
            .assertElementVisible({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'b', text: 'DB CONNECTION STATE'
            })

            .assertElementVisible({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'span', text: 'Startup params'
            });
    },
    'Sysadmin Startup params tests': function (browser) {
        tnw
            .clickDojoButton({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'span', text: 'Startup params'
            })
            .checkDojoToggleButtonSelected({
                parentClass: 'dijitBorderContainer dijitContainer sysadmin_TopContent dijitBorderContainer-child dijitBorderContainer-dijitBorderContainer dijitBorderContainerPane dijitAlignTop dijitLayoutContainer',
                tag: 'span', text: 'Startup params'
            })

            .assertElementVisible({class: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild'})
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "b",
                text: 'system startup parameters'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "b",
                text: 'Configuration loaded.'
            })


            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "label",
                text: 'db.host'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "b",
                text: 'Configuration loaded.'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "label",
                text: 'db.name'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "label",
                text: 'db.user'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "label",
                text: 'db.password'
            })


            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "span",
                text: 'Load settings'
            })
            .clickDojoButton({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: 'span', text: 'Load settings'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "b",
                text: 'Configuration reloaded.'
            })


            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "span",
                text: 'Store settings & reconnect to database'
            })
            .clickDojoButton({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: 'span', text: 'Store settings & reconnect to database'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "b",
                text: 'Configuration saved.'
            })
            .assertElementVisible({
                parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                tag: "b",
                text: 'Reconnected to database.'
            });
    },

        'Sysadmin DB Buttons tests': function (browser) {
            tnw
                .assertElementVisible({
                    parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                    tag: "span",
                    text: 'Create DB'
                })
                .clickDojoButton({
                    parentClass: 'dijitContentPane dijitStackContainer-child dijitStackContainer-dijitContentPane dijitContentPaneSingleChild',
                    tag: 'span', text: 'Create DB'
                })

                .assertElementVisible({
                    tag: "div",
                    class: 'dijitDialog dijitDialogFocused dijitFocused'
                })

                .assertInputContainsValue("root")
                .enterPasswordToInput("Rty1988")
                .clickDojoButton({
                    parentClass: "dijit dijitReset dijitInline dijitButton",
                    text: "Login", tag: 'span'
                });

                browser.end();

        }
};