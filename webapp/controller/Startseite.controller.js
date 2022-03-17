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
                // set explored app's demo model on this sample
			    var oModel = new JSONModel(sap.ui.require.toUrl("sap/opu/odata/sap/ERP_ISU_UMC/"));
                oModel.attachRequestCompleted(function() {
                    this.byId('edit').setEnabled(true);
                }.bind(this));

			    this.getView().bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");

			    this._formFragments = {};

                // Set the initial form to be the display one
			    this._showFormFragment("Display");
            },

            handleEditPress : function () {
			    //this._oAddress = Object.assign({}, this.getView().getModel().getData());
                this._toggleButtonsAndView(true);
            },
    
            handleCancelPress : function () {
                //Restore the data
			    //var oModel = this.getView().getModel();
			    //var oData = oModel.getData();

			    //oData.SupplierCollection[0] = this._oSupplier;

			    //oModel.setData(oData);
                this._toggleButtonsAndView(false);
            },
    
            handleSavePress : function () {
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