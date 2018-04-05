sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Meter_testing", {

		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/MeterTesting.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.ProcedureAndGuidlines"].join("."), this);
			vbox.addItem(fragment1);
		},
		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Instructions For Submitting Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.InstructionsForSubmittingForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Procedure And Guidelines") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterTesting.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}

	});

});