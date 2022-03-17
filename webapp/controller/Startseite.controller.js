sap.ui.define([
    'sap/ui/core/Fragment',
    "sap/ui/core/mvc/Controller", 
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Fragment, Controller, JSONModel, ODataModel, MessageToast) {
        "use strict";

        return Controller.extend("projectapi.controller.Startseite", {
            onInit: function () {
                //Binding
			    this.getView().bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");

			    this._formFragments = {};

                // Set the initial form to be the display one
			    this._showFormFragment("Display");
            },

            handleEditPress : function () {
                this._toggleButtonsAndView(true);
            },
    
            handleCancelPress : function () {
                this._toggleButtonsAndView(false);
            },
    
            handleSavePress : function () {
                var oInput = {};
                oInput.AccountID = "713";
                oInput.AddressID = "26505";
                oInput.AddressInfo = {
                    City: this.getView().byId("stadtInput").getValue(), 
                    PostalCode: this.getView().byId("plzInput").getValue(), 
                    Street: this.getView().byId("strasseInput").getValue(), 
                    HouseNo: this.getView().byId("nrInput").getValue(), 
                    CountryID: "CH", 
                    TimeZone: "CET", 
                    LanguageID: this.getView().byId("spracheInput").getSelectedKey()
                };
                
                this.getView().getModel().update("/AccountAddresses", oInput, {
                    method: "PUT",
                    success: function(data) {
                     alert("success");
                    },
                    error: function(e) {
                     alert("error");
                    }
                   });
                this._toggleButtonsAndView(false);
            },
    
            _toggleButtonsAndView : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
    
                // Set the right form type
                this._showFormFragment(bEdit ? "Change" : "Display");
            },
    

            _getFormFragment: function (sFragmentName) {
                var pFormFragment = this._formFragments[sFragmentName],
                    oView = this.getView();
    
                if (!pFormFragment) {
                    pFormFragment = Fragment.load({
                        id: oView.getId(),
                        name: "projectapi.view." + sFragmentName
                    });
                    this._formFragments[sFragmentName] = pFormFragment;
                }
    
                return pFormFragment;
            },

            _showFormFragment : function (sFragmentName) {
                var oPage = this.byId("page");
    
                oPage.removeAllContent();
                this._getFormFragment(sFragmentName).then(function(oVBox){
                    oPage.insertContent(oVBox);
                });
            }
        });
    });