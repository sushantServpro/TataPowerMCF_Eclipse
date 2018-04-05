sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.ChangePassword", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.controller.view.ChangePassword
		 */
		onInit: function() {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.oView.setModel(oViewModel, "ChangePassword");
		},
		onSave: function() {
			var oViewModel = this.oView.getModel("ChangePassword");
			var password = this.getView().byId("idpassword").getValue();
			var cpassword = this.getView().byId("idcpassword").getValue();
			var epassword = this.getView().byId("idepassword").getValue();
			var username = this.getView().byId("username").getValue();

			if (password !== cpassword) {
				MessageBox.Error("Please check password ,  confirm password dont match");
			}
			var oEntry = {};
			// var that = this;
			oEntry.UserName = username;
			oEntry.Password = password;
			oEntry.CurrentPassword = epassword;
			var serviceURI = "/sap/opu/odata/IWBEP/USERMANAGEMENT/";
			var uname = "C01001";
			var pword = "sptl$123";
			this.ERPModel = new sap.ui.model.odata.ODataModel(serviceURI, true, uname, pword);
			this.ERPModel.setHeaders({
				"X-Requested-With": "XMLHttpRequest"
			});
			var path = "/CredentialCollection('" + username + "')";
			var that = this;
			this.ERPModel.update(path, oEntry, {
				async: true,
				success: function(oData) {
					oViewModel.setProperty("/busy", true);
					sap.ui.core.BusyIndicator.show();
					var LvMsg = "Password changed successfully";
					MessageBox.alert(LvMsg);
					oViewModel.setProperty("/busy", true);
					sap.ui.core.BusyIndicator.hide();
					that.getRouter().navTo("Login");
				},
				error: function(error) {
					var body = JSON.parse(error.response.body);
					var errorcode = body.error.message.value;
					MessageBox.error(errorcode);
					// oViewModel.setProperty("/busy", false);
				}
			});

		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onReset: function() {
			this.getView().byId("idpassword").setValue("");
			this.getView().byId("idcpassword").setValue("");
			this.getView().byId("idepassword").setValue("");
			this.getView().byId("username").setValue("");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.controller.view.ChangePassword
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.controller.view.ChangePassword
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.controller.view.ChangePassword
		 */
		//	onExit: function() {
		//
		//	}

	});

});