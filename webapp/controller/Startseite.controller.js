sap.ui.define([
    'sap/ui/core/Fragment',
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/m/MessageToast',
	"sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Fragment, Controller, JSONModel, ODataModel, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("projectapi.controller.Startseite", {
            onInit: function () {
                var oRegionModel = new sap.ui.model.json.JSONModel();
                oRegionModel.loadData("Region.json");


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
                var that = this;
                MessageBox.warning("Ihre Änderungen gehen verloren wollen Sie trotzdem weiterfahren?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if(sAction == "OK"){
                            that._toggleButtonsAndView(false);
                        }else{
                        }
                    }
                });
            },
    
            handleSavePress : function () {
                var that = this;
                var oEntry = {};
                oEntry.AddressInfo = {
                    City: that.getView().byId("stadtInput").getValue(), 
                    PostalCode: that.getView().byId("plzInput").getValue(), 
                    Street: that.getView().byId("strasseInput").getValue(), 
                    HouseNo: that.getView().byId("nrInput").getValue(), 
                    CountryID: that.getView().byId("landIDInput").getValue(), 
                    Region: that.getView().byId("regionInput").getSelectedKey(),
                    TimeZone: that.getView().byId("ZzInput").getValue(), 
                    LanguageID: that.getView().byId("spracheInput").getSelectedKey()
                };
                
                that.getView().getModel().update("/AccountAddresses(AccountID='713',AddressID='26505')", oEntry, {
                    success: function(data) {
                     alert("success");
                    },
                    error: function(e) {
                     alert("error");
                    }
                   });

                that._toggleButtonsAndView(false);
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