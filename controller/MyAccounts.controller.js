sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.MyAccounts", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.MyAccounts
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.MyAccounts
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/MyAccount.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.RegisterEbill"].join("."), this);
			vbox.addItem(fragment1);
		},

		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();

			if (evt.oSource.mProperties.text === "Register For E-Bill") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.RegisterEbill"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Register For E-Service") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.RegisterEservice"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Change Password") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.ChangePassword"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "My Account Statement") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.MyAccountStatement"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Online Payment Receipt") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.OnlinePaymentReceipt"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "View And Pay Bill Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.ViewandPayBillOnline"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Please Share your feedback") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.PleaseShareYourFeedback"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Write to SL form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.WriteToSlForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Short Term Open Access") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.ShortTermOpenAccess"].join("."), this);
				vbox.addItem(fragment1);
			}

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