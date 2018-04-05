sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.AboutUs", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.AboutUs
		 */
		//	onInit: function() {
		//
		//	},
	onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/AboutUs.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AboutUs.about_power_supply"].join("."), this);
				vbox.addItem(fragment1);
		},
			handleButtonPress: function(evt) {
		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "About Power Supply") {
				
		var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AboutUs.about_power_supply"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "About Tata Power Customer Portal") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AboutUs.about_tata_power_cust_portal"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "Milestones") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AboutUs.Milestones"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.text === "Future Intiatives") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.AboutUs.FutureIntiatives"].join("."), this);
				vbox.addItem(fragment1);
			}
				
		

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.AboutUs
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.AboutUs
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.AboutUs
		 */
		//	onExit: function() {
		//
		//	}

	});

});