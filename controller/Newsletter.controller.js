sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Newsletter", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.Newsletter
		 */
		//	onInit: function() {
		//
		//	},
	onInit: function(evt) {

			// set explored app's demo model on this sample
		
			
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
		
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Newsletter.NewsLetter"].join("."), this);
				vbox.addItem(fragment1);
		
				
		

		},
			onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
			handleButtonPress: function(evt) {
		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
		
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Newsletter.NewsLetter"].join("."), this);
				vbox.addItem(fragment1);
		
				
		

		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}
		
	});

});