sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.PaymentOptions", {

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
			var oModel = new sap.ui.model.json.JSONModel("json/PaymentOptions.json");

			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.NACH"].join("."), this);
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
			if (evt.oSource.mProperties.text === "NACH") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.NACH"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "NACH Application Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.NachApplicationForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Online Payment") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.OnlinePayment"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Payment Status") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.PaymentStatus"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Offline Payment Options") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.OfflinePaymentOptions"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Online Payment Receipt") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.OnlinePaymentReceipt"].join("."), this);
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