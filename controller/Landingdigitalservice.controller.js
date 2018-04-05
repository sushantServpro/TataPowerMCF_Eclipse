sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Landingdigitalservice", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.LandingFAQs
		 */
		//	onInit: function() {
		//
		//	},
		pressDigitalservice: function(oEvent) {
			this.getRouter().navTo("Digitalservice");
		},
		pressSms: function(oEvent) {
			window.location.href="mailto:customercare@tatapower.com";
		},
		pressAndroid: function(oEvent) {
			window.location.href="https://play.google.com/store/apps/details?id=com.tata.tatapower";
		},
		pressIos: function(oEvent) {
			window.location.href="https://itunes.apple.com/in/app/tata-power-mobile-app/id1136636873?mt=8";
		},
		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			}
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf tatapower.dev.view.OnlineApplications
			 */
			//	onAfterRendering: function() {
			//
			//	},
			,
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}

		

	});

});