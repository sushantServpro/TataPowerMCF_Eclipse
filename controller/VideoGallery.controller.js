sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.VideoGallery", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.TataPowerMCF_Final..view.VideoGallery
		 */
		//	onInit: function() {
		//
		//	},
onInit: function(evt) {

		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Pages.Videogallery"].join("."), this);
				vbox.addItem(fragment1);

		},
			onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}
		
	});

});