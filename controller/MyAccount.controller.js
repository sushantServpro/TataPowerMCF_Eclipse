sap.ui.define([
	"tatapower/dev/controller/BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/models"
], function(Controller, Filter, MessageToast, MessageBox, FilterOperator, JSONModel, models) {
	"use strict";
	 jQuery.sap.includeStyleSheet("css/MyAccount.css");

	return Controller.extend("tatapower.dev.controller.MyAccount", {
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
			onInit: function() {
			this.mobileDropdown();

			var oViewModel = new sap.ui.model.json.JSONModel({
				busy: false,
				delay: 0,
				Accounts: false

			});

			this.getRouter().getRoute("MyAccount").attachPatternMatched(this._onObjectMatched, this);

			this.oView.setModel(oViewModel, "MyAccountView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("Model1");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));

		},
		
		_onObjectMatched: function(oEvent) {
			this.oView.getModel("Model1").metadataLoaded().then(function() {

				var sObjectPath = "Model1>/Accounts('7000009254')";
				// 	?$expand=AccountAddresses/AccountAddressDependentMobilePhones,AccountAddresses/AccountAddressDependentEmails,ContractAccounts,ContractAccounts/Contracts/Devices";
				// this._bindView("/" + sObjectPath);
				this._bindView(sObjectPath);

			}.bind(this));
		},
		
		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			self = this;
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = self.oView.getModel("MyAccountView");

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},
		
		_bindView: function(sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.oView.getModel("MyAccountView");
			var oView = this.getView();
			var that = this;
			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			oViewModel.setProperty("/busy", true);
			this.getView().bindElement({
				path: sObjectPath,
				// parameters: {expand:"AccountAddresses,ContractAccounts,AccountAddressDependentMobilePhones,AccountAddressDependentEmails"},
				parameters: {
					expand: "AccountAddresses/AccountAddressDependentMobilePhones,AccountAddresses/AccountAddressDependentEmails,ContractAccounts/Contracts"
				},
				events: {
					// 	change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function(oEvent) {

						if (oEvent.getParameters().data) {
							sap.ui.getCore().setModel(new  sap.ui.model.json.JSONModel(oEvent.getParameters().data), "DataViewModel");
						}
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new  sap.ui.model.json.JSONModel(oEvent), "DataModel");
				// 		var lable = that.getView().byId("Text_Fname1");
						var address = that.getView().byId("Text_Fname2");
						var mobile = that.getView().byId("Text_mobile");
						var ConsumerNo = that.getView().byId("Text_ConNo");
				// 		var AccountNo = that.getView().byId("Text_accno");
						var MeterNo = that.getView().byId("Text_MeterNo");
						var addr = oEvent.mParameters.data.AccountAddresses["0"].AddressInfo.HouseNo +
						oEvent.mParameters.data.AccountAddresses["0"].AddressInfo.Floor + ', ' +
						oEvent.mParameters.data.AccountAddresses["0"].AddressInfo.Building + ', ' +
						oEvent.mParameters.data.AccountAddresses["0"].AddressInfo.District + ', ' +
						oEvent.mParameters.data.AccountAddresses["0"].AddressInfo.City + ', ' +
						oEvent.mParameters.data.AccountAddresses["0"].AddressInfo.PostalCode + '.';
					
					   address.setText(addr);
					   //lable.setText(oEvent.mParameters.data.FirstName);
					   mobile.setText(oEvent.mParameters.data.AccountAddresses["0"].AccountAddressDependentMobilePhones["0"].CompletePhoneNo);
					   //ConsumerNo.setText(oEvent
					   //MeterNo.setText(oEvent
					   //AccountNo.setText(oEvent.mParameters.data.AccountID);
					}
				}
			});

		},
		
		
			
		onBeforeRendering: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},
	
	OnMyAccount: function(oEvent) {
			this.getRouter().navTo("MyAccounts");
		},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf view.MyAccount
		 */
		onAfterRendering: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf view.MyAccount
		 */
		onExit: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		}

	});

});