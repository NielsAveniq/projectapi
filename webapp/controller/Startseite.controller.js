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
                var counter = 1.
                this.getView().byId("KundeGroup").bindElement("/Accounts('713')");
                this.getView().byId("SFTel").bindElement("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')");
                this.getView().byId("SFMail").bindElement("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')");
                this.getView().byId("AddresseGroup").bindElement("/AccountAddresses(AccountID='713',AddressID='26505')")
            },
            handleEditToggled: function () {
                if (counter != 1) {
                    
                }
            }
        });
    });