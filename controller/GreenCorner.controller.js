sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.GreenCorner", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.GreenCorner
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/GreenCorner.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.Explore"].join("."), this);
			vbox.addItem(fragment1);
		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		pressGreenBuildings: function(oEvent) {
			this.getRouter().navTo("GreenBuildings");
		},
		pressCombatClimateChange: function(oEvent) {
			this.getRouter().navTo("CombatClimateChange");
		},
		pressEnergyEfficientDevices: function(oEvent) {
			this.getRouter().navTo("EnergyEfficientDevices");
		},
		pressPowerConsumptionGuidelines: function(oEvent) {
			this.getRouter().navTo("PowerConsumptionGuidelines");
		},
		pressReducingyourBill: function(oEvent) {
			this.getRouter().navTo("ReducingyourBill");
		},
		pressDSM: function(oEvent) {
			this.getRouter().navTo("BeGreen");
		},
		pressEnergySavingTips: function(oEvent) {
			this.getRouter().navTo("FAQ");
		},
		pressEnergyCal:function(oEvent) {
			this.getRouter().navTo("Calculator");
		},
		pressBillCal:function(oEvent) {
			this.getRouter().navTo("Calculator");
		},
		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Explore") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.Explore"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Conserve") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.Conserve"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Green Buildings") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.demoGreenBuild"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Combat Climate Change") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.demoCombatClimateChange"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Energy Efficient Devices") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.demoEnergyEfficientDevice"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Power Consumption Guidelines") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.demoPowerConsumption"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Reducing your Bill") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.GreenCorner.demoReduceYourBill"].join("."), this);
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