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
       // this.browser.pause(5000);
       // var dlg= this.browser.element('link text', 'PORT', function(res) {
       //     console.log("\n \n RES=",res)
       // });

        this.browser
            .pause(5000)
            .useXpath().assert.elementPresent("//*[contains(text(), 'params')]");  //

        //console.log("findDojoStdDialog=",dlg);

        return this;
    },
    findDojoButtonWithText: function(params){

        return this;
    },
    /*
     * params = { parentClass, tag, class, text }
     */
    assertElementVisible: function(params) {
        var pathToElement=getXpath(params);

        this.browser
            .useXpath()
            .waitForElementVisible(pathToElement,1000)
            .assert.visible(pathToElement);
            //.expect.element(pathToElement).to.be.visible;
        return this;
    },
    assertElementContainsValue: function(params) {
       // var pathToElement=getXpath(params);

        this.browser
            .useXpath()
       //.elements('xpath', 'input', function(res) {
       //     console.log("assertElementContainsValue res=",res)
       // });
           // .waitForElementVisible("//*input[@value='localhost']",1000)
            .waitForElementVisible("//input[contains(value(), 'localhost')]",1000);
           // .assert.visible("//*input[@value='localhost']");
          // .expect.element(pathToElement).to.have.attribute('value').equals(params.value);
        return this;
    },


    clickDojoButton: function(params){
        var pathToElement=getXpath(params);

        this.browser
            .useXpath()
            .waitForElementVisible(pathToElement,1000)
           // .expect.element(pathToElement).to.be.visible
            .assert.visible(pathToElement)
            .click(pathToElement);
        return this;
    },
    checkDojoToggleButtonSelected: function(params){
        var pathToElement=getXpath(params)+"/..";
       // var pathToElement=getParentNode(params);

        this.browser
            .pause(1000)
            .useXpath()
            .expect.element(pathToElement).to.have.attribute('aria-pressed').equals('true');
        return this;
    }
};
function getXpath(params) {
    var xpathStr = "";
    if (params.parentClass)xpathStr = "//*[@class=\"" + xpathStr + params.parentClass + "\"]";
    if (params.tag) {
        xpathStr = xpathStr + "//" + params.tag
    } else {
        xpathStr = xpathStr + "//*"
    }
    if (params.class) {
        xpathStr = xpathStr + "[@class=\"" + params.class + "\"";
        if (params.text) {
            xpathStr = xpathStr + "  and contains(text(), '" + params.text + "')] "
        }else{
            xpathStr=xpathStr+"] "
        }
    }
    if(params.text &&!params.class){
        xpathStr=xpathStr+"[contains(text(), '"+params.text+"')] "
    }
    return xpathStr;
}