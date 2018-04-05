sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.ContactUs", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.ContactUs
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/ContactUs.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContactUs.HODCustomerServices"].join("."), this);
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
				if (evt.oSource.mProperties.text === "Vigilance Head") {

					var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContactUs.AssessmentOfficerVigilance"].join("."), this);
					vbox.addItem(fragment1);
				} else if (evt.oSource.mProperties.text === "Call Center Number") {

					var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContactUs.CallCenterNumber"].join("."), this);
					vbox.addItem(fragment1);
				} else if (evt.oSource.mProperties.text === "Customer Relations Center") {

					var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContactUs.CustomerRelation"].join("."), this);
					vbox.addItem(fragment1);
				} else if (evt.oSource.mProperties.text === "HOD Customer Services") {

					var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContactUs.HODCustomerServices"].join("."), this);
					vbox.addItem(fragment1);
				} else if (evt.oSource.mProperties.text === "Zonal Head") {
					var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContactUs.ZonalManagers"].join("."), this);
					vbox.addItem(fragment1);
				} else if (evt.oSource.mProperties.text === "HOD Commercial") {

					var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContactUs.HODCommercial"].join("."), this);
					vbox.addItem(fragment1);
				}

			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf tatapower.dev.view.ContactUs
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.ContactUs
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.ContactUs
		 */
		//	onExit: function() {
		//
		//	}

	});

});