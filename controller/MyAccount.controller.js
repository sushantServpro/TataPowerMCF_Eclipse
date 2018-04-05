sap.ui.define([
	"tatapower/dev/controller/BaseController",
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	jQuery.sap.includeStyleSheet("css/MyAccount.css");

	return Controller.extend("tatapower.dev.controller.MyAccount", {
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		onInit: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},

		onBeforeRendering: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},

		OnMyAccount: function(oEvent) {
			this.getRouter().navTo("MyAccounts");
		},
		OnPayBill: function(oEvent) {

			this.getRouter().navTo("PayBill");
		},

		OnQuickPayment: function(oEvent) {
			this.getRouter().navTo("PaymentHistory");
		},
		OnShareFeedback: function(oEvent) {

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
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}

	});

});