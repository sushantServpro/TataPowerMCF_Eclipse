sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.ApplicationForms", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.TATAPOWER..view.FAQ
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/ApplicationForms.json");

			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.NewConnection"].join("."), this);
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
			if (evt.oSource.mProperties.text === "New Connection") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.NewConnection"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Changeover Connection") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ChangeoverConnection"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Switchover Connection") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.SwitchoverConnection"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Extension/Reduction of Load") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ExtRedLoad"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Shifting of service") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ApplicationForShiftingOfService"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Change of Name") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ChangeOfName"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Address Correction") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.AddressCorrectionForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Extension/Reduction of Contract Demand") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ExtRedCotractDemand"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Tariff Category Change") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.TariffCatChange"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "NACH") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.NACH"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "IGR Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.IGRForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Meter Testing") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.MeterTestingRequestForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Permanent Disconnection") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.PermanentDisconnectionForm"].join("."), this);
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