sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.OnlineApplications", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.OnlineApplications
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.OnlineApplications
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		pressNewConnection: function(oEvent) {
			this.getRouter().navTo("NewConnections");
		},
		pressSwitchOverConnection: function(oEvent) {
			this.getRouter().navTo("SwitchOverConnection");
		},
 
		pressChangeOverConnection: function(oEvent) {
			this.getRouter().navTo("ChangeOverConnection");
		},
		pressNetMetering: function(oEvent) {
			this.getRouter().navTo("NetMetering");
		},
		pressTariffDetails: function(oEvent) {
			this.getRouter().navTo("TariffDetails");
		},
		pressAdvanceBillPayment: function(oEvent) {
			this.getRouter().navTo("AdvanceBillPayment");
		},
		pressTariff_Category_Change: function(oEvent) {
			this.getRouter().navTo("Tariff_Category_Change");
		},
		pressMeter_Shifting: function(oEvent) {
			this.getRouter().navTo("Meter_Shifting");
		},
		pressMeter_testing: function(oEvent) {
			this.getRouter().navTo("Meter_testing");
		},
		pressLoad_Reduction: function(oEvent) { 
			this.getRouter().navTo("Load_Reduction");
		},
		pressLoad_Enhancement: function(oEvent) {
			this.getRouter().navTo("Load_Enhancement");
		},
		pressRegisterNow_andGetRewarded: function(oEvent) {
			this.getRouter().navTo("RegisterNow_andGetRewarded");
		},
		pressContract_Maximum_Demand_Enhancement: function(oEvent) {
			this.getRouter().navTo("Contract_Maximum_Demand_Enhancement");
		},
		pressContract_Maximum_Demand_Reduction: function(oEvent) {
			this.getRouter().navTo("Contract_Maximum_Demand_Reduction");
		},
		pressPermanentDisconnection: function(oEvent) {
			this.getRouter().navTo("PermanentDisconnection"); 
		},
		pressReconnection: function(oEvent) {
			this.getRouter().navTo("Reconnection");
		},
		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			}
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf tatapower.dev.view.OnlineApplications
			 */
			//	onAfterRendering: function() {
			//
			//	},
			,
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		}

		,
		onOpenAccess: function(oEvent) {
			this.getRouter().navTo("OpenAccess");
		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.OnlineApplications
		 */
		//	onExit: function() {
		//
		//	}

	});

});