sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.OpenAccess", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.OpenAccess
		 */
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel("json/OpenAccess.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();

			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.OpenAccess.ShortTermOpenAccess"].join("."), this);
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
			if (evt.oSource.mProperties.text === "SHORT TERM") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.OpenAccess.ShortTermOpenAccess"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "LONG TERM") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.OpenAccess.LongTermOpenAccess"].join("."), this);
				vbox.addItem(fragment1);
			}
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}

		

	});

});