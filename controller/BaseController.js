sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.BaseController", {
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("appHome", {}, true /*no history*/ );
			}
		},
		mobileDropdown: function() {
			var oFrametest = this.getView().byId("pnl_toggletab");
			$("#" + oFrametest.sId + "").hide();
		},
		goDown: function() {
			var oFrametest = this.getView().byId("pnl_toggletab");
			$("#" + oFrametest.sId + "").slideToggle("slow");
		}

	});

});