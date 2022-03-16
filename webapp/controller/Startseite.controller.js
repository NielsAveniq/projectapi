sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("projectapi.controller.Startseite", {
            onInit: function () {
                /*var oForm = this.getView().byId("smartform");
                oForm.bindElement("/AccountAddresses(AccountID='42',AddressID='23980')");*/
            }
        });
    });
