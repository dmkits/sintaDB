/**
 * Created by ianagez on 23.06.17.
 */
module.exports= {
    start: function(browser, params){
        if(params&&params.url) browser.url(params.url);
        this.browser= browser;
        return this;
    },
    /*
     * params = { title, content }
     */
    findDojoStdDialog: function(params){
        this.browser.pause(5000);
        var dlg= this.browser.element('partial link text', 'PORT', function(res) {
            console.log("\n \n RES=",res)
        });

        //console.log("findDojoStdDialog=",dlg);

        return this;
    },
    findDojoButtonWithText: function(params){

        return this;
    },
    assertEnabled: function(){

        return this;
    },
    assertVisible: function(){

        return this;
    },
    click: function(){

        return this;
    }
};