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
                //this.getView().byId("page").bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");
            }
        });
    });
