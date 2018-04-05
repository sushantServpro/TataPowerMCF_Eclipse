sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.AdvanceBillPayment", {

	
		onInit: function(evt) {

			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/AdvanceBillPayment.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AdvanceBillPayment.InstructionsForSubmittingForm"].join("."), this);
			vbox.addItem(fragment1);
			this.oView.setModel(oViewModel, "AdvanceBillPayment");
			//  this.getRouter().getRoute("Calculator").attachPatternMatched(this._onObjectMatched, this);
			// this.oView.setModel(oViewModel, "CalculatorView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel();
		},
		onPressGo: function() {
			var oViewModel = this.oView.getModel("AdvanceBillPayment");
			var ConsumerNo = sap.ui.getCore().byId("consumernoInput").getValue();

			var sPath = "/AdvanceBillPaymentSet('" + ConsumerNo + "')";
			this.oView.getModel("McfPortalModel").read(sPath, {
				async: true,
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					sap.ui.getCore().byId("nameInput").setValue(oData.EName);
					sap.ui.getCore().byId("flatshopInput").setValue(oData.EFlatNo);
					sap.ui.getCore().byId("buildingnameInput").setValue(oData.EBuildingName);
					sap.ui.getCore().byId("streetInput").setValue(oData.EStreet);
					sap.ui.getCore().byId("cityInput").setValue(oData.ECity);
					sap.ui.getCore().byId("postalcodeInput").setValue(oData.EPostalCode);
					sap.ui.getCore().byId("applicantnameInput").setValue(oData.EName);
					sap.ui.getCore().byId("emailidInput").setValue(oData.EApplEmail);
					sap.ui.getCore().byId("maxamtInput").setValue(oData.EAbp);
					sap.ui.getCore().byId("minamtInput").setValue(oData.EMinAmt);
					sap.ui.getCore().byId("pannoInput").setValue(oData.EPanNo);
					sap.ui.getCore().byId("contactnoInput").setValue(oData.EMobile);
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});

		},
		onSaveNContinue: function() {
			try {
				if (this.validateForm()) {
					var oViewModel = this.oView.getModel("AdvanceBillPayment");
					oViewModel.setProperty("/busy", true);

					var oEntry = {};
					oEntry.IConNo = sap.ui.getCore().byId("consumernoInput").getValue().trim();
					oEntry.EAbp = sap.ui.getCore().byId("maxamtInput").getValue().trim();
					oEntry.EApplEmail = sap.ui.getCore().byId("emailidInput").getValue().trim();
					oEntry.EApplMobile = sap.ui.getCore().byId("contactnoInput").getValue().trim();
					oEntry.EApplName = sap.ui.getCore().byId("applicantnameInput").getValue().trim();
					oEntry.EMinAmt = sap.ui.getCore().byId("minamtInput").getValue().trim();
					oEntry.EPanNo = sap.ui.getCore().byId("pannoInput").getValue().trim();
					oEntry.Amount = sap.ui.getCore().byId("advancebillpaymentInput").getValue().trim();
					oEntry.InterestRate = sap.ui.getCore().byId("currentrateofinterestInput").getValue().trim();

					this.oView.getModel("McfPortalModel").create("/AdvanceBillPaymentSet", oEntry, {
						async: true,
						success: function(oData) {
							oViewModel.setProperty("/busy", false);
							MessageBox.alert(oData.LvMsg);
						},
						error: function(error) {
							var body = JSON.parse(error.responseText);
							var errorcode = body.error.message.value;
							MessageBox.error(errorcode);
							oViewModel.setProperty("/busy", false);
						}
					});
				}
			} catch (err) {
				oViewModel.setProperty("/busy", false);
			}

		},
		validateForm: function() {
			var isValid = true;
			var applName = sap.ui.getCore().byId("applicantnameInput").getValue().trim();
			var ConNo = sap.ui.getCore().byId("contactnoInput").getValue().trim();
			var adcAmt = sap.ui.getCore().byId("advancebillpaymentInput").getValue().trim();

			if (applName === "" || ConNo === "" || adcAmt === "") {
				isValid = false;
				MessageBox.error("Please fill in all required fields.");
				return isValid;
			}
			if (sap.ui.getCore().byId("IdSameAsAbove").getSelected()) {
				isValid = true;
			} else {
				isValid = false;
				MessageBox.error("Please agree terms & conditions to submit the form.");
				return isValid;
			}
			return isValid;
		},
		handleButtonPress: function(evt) {
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AdvanceBillPayment.AdvanceBillPayment"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Procedure And Guidelines") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AdvanceBillPayment.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Instructions For Submitting Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AdvanceBillPayment.InstructionsForSubmittingForm"].join("."), this);
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