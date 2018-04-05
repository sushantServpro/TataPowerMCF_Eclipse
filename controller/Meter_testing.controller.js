sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Meter_testing", {

		onInit: function(evt) {
            var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});

			this.oView.setModel(oViewModel, "MeterTestingView");
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/MeterTesting.json");
// 			this.getView().setModel(oModel);
            this.oComponent = this.getOwnerComponent();
            this.oDataModel1 = this.getOwnerComponent().getModel();
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			fragment.setModel(oModel);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.ProcedureAndGuidlines"].join("."), this);
			vbox.addItem(fragment1);
		},
		
		getConsumerData: function(){
		   var ContractAcId = localStorage.getItem("UsrNm"); 
		   var that = this;
		   var oViewModel = this.oView.getModel("MeterTestingView");
		   if(ContractAcId !== null || ContractAcId !== ""){
		       	var sPath = "/GetAddressAndBpSet('"+ContractAcId+"')";
					//alert(sPath);
					oViewModel.setProperty("/busy", true);
					this.oDataModel1.read(sPath, {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "AddressDetails");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});
		   }
		   else{
		       MessageBox.error("Please login to Apply for Meter Testing.");
		   }
				
		},
		
		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Instructions For Submitting Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.InstructionsForSubmittingForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Procedure And Guidelines") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.ApplyOnline"].join("."), this);
				this.getConsumerData();
				vbox.addItem(fragment1);
			}

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}

	});

});