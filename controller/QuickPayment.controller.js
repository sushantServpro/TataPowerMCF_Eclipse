sap.ui.define(["sap/ui/core/mvc/Controller",
	"tatapower/dev/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, MessageToast, BaseController, JSONModel) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.QuickPayment", {
		onDisplayNotFound: function(oEvent) {
			// display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {
				fromTarget: "home"
			});
		},

		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/NewConnection.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);

		},

		handleButtonPress: function(evt) {
		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Procedure and Guidelines") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "Application forms") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.Applicationforms"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "FAQs") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.FAQs"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.text === "Apply Online") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}
				
		

		},
		onBeforeRendering: function() {

		
		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.ui.core.demo.nav.view.PaymentHistory
		 */
		onAfterRendering: function() {

		
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.ui.core.demo.nav.view.PaymentHistory
		 */
		onExit: function() {

		
		}

	});

});