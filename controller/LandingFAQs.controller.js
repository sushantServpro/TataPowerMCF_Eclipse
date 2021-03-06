sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.LandingFAQs", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.LandingFAQs
		 */
		//	onInit: function() {
		//
		//	},
		pressFAQ: function(oEvent) {
			this.getRouter().navTo("FAQ");
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
		onBillingRelatedQueries: function(oEvent) {
			this.getRouter().navTo("FAQ");
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}
		

	});

});