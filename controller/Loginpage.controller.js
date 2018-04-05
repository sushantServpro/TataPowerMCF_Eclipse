sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Loginpage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.LandingFAQs
		 */
		//	onInit: function() {
		//
		//	},
		
			
		pressFAQ: function(oEvent) {
			this.getRouter().navTo("MyAccounts");
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
		},
			onInit: function() {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.oView.setModel(oViewModel, "Login");
		},
		OnLogin: function() {
			var oViewModel = this.oView.getModel("Login");
			var serviceURI = "/sap/opu/odata/sap/ZLOGIN_SRV/";
			var username = this.getView().byId("username").getValue();
			var password = this.getView().byId("password").getValue();
			this.ERPModel = new sap.ui.model.odata.ODataModel(serviceURI, true);
			this.ERPModel.setHeaders({
				"X-CSRF-Token": "Fetch"
			});
			this.ERPModel.setHeaders({
				"X-Requested-With": "XMLHttpRequest"
			});
			var oEntry = {};
			var that = this;
			oEntry.Bname = username;
			oEntry.Password = password;
			var path = "/loginSet";
			if (username === "") {
				MessageBox.error('Please enter User Name');
			}
			if (password === "") {
				MessageBox.error('Please enter Password');
			} else {
				this.ERPModel.create(path, oEntry, {
					async: true,
					success: function(oData) {
						that.getRouter().navTo("home");
						var uname = that.getView().byId("username").getValue();
						var pword = that.getView().byId("password").getValue();
						
                            localStorage.setItem("UsrNm",uname);
				// 		var sURI = "/sap/opu/odata/sap/ZCMCF_PORTAL_SRV/";
				// 		var McfPortalModel = new sap.ui.model.odata.ODataModel(sURI, true, uname, pword);
				// 		that.getOwnerComponent().setModel(McfPortalModel, "McfPortalModel");
				// 		var sURI1 = "/sap/opu/odata/sap/ZERP_UTILITIES_UMC_EXT_SRV/";
				// 		var NewModel = new sap.ui.model.odata.ODataModel(sURI1, true, uname, pword);
				// 		that.getOwnerComponent().setModel(NewModel, "NewModel");
				// 		var sURI2 = "/sap/opu/odata/sap/ZCRM_COMPLAINT_SRV/";
				// 		var ComplaintModel = new sap.ui.model.odata.ODataModel(sURI2, true, uname, pword);
				// 		that.getOwnerComponent().setModel(ComplaintModel, "ComplaintModel");
				// 		var sURI3 = "/sap/opu/odata/sap/ZCRM_PF_COMPLAINTS_SRV/";
				// 		var ComModel1 = new sap.ui.model.odata.ODataModel(sURI3, true, uname, pword);
				// 		that.getOwnerComponent().setModel(ComModel1, "ComModel1");
				// 		var sURI4 = "/sap/opu/odata/sap/ERP_UTILITIES_UMC/";
				// 		var Model1 = new sap.ui.model.odata.ODataModel(sURI4, true, uname, pword);
				// 		that.getOwnerComponent().setModel(Model1, "Model1");
					},
					error: function(error) {

						var body = JSON.parse(error.response.body);
						var errorcode = body.error.code;
						if (errorcode === "13/013") {
							MessageBox.error("this is Initial Password please change it");
							oViewModel.setProperty("/busy", false);
							that.getRouter().navTo("ChangePassword");
						} else if (errorcode === "02/002") {
							MessageBox.alert("Name or password is incorrect (repeat logon)");
						} else if (errorcode === "03/003") {
							MessageBox.alert("User is locked. Please notify the person responsible");
						} else if (errorcode === "05/005") {
							MessageBox.alert("User account not in validity date");
						} else if (errorcode === "06/006") {
							MessageBox.alert("SNC required for this connection");
						} else if (errorcode === "07/007") {
							MessageBox.alert("This system does not let you log on using a password");
						} else if (errorcode === "08/008") {
							MessageBox.alert("The initial password has expired (request a new one)");
						} else if (errorcode === "09/009") {
							MessageBox.alert("You have no password; you cannot log on using a password");
						} else if (errorcode === "10/010") {
							MessageBox.alert("This operation was canceled because the user has no password");
						} else if (errorcode === "11/011") {
							MessageBox.alert("Password was not used for a long period and therefore deactivated");
						} else if (errorcode === "12/012") {
							MessageBox.alert("Program error occurred (notify SAP)");
						} else if (errorcode === "14/014") {
							MessageBox.alert("Password logon no longer possible - too many failed attempts");
						}
					}
				});
			}
			// this.getRouter().navTo("NewUserRegister");
		},
// 		getRouter: function() {
// 			return sap.ui.core.UIComponent.getRouterFor(this);
// 		},

		onNewUser: function() {
			this.getRouter().navTo("NewUserRegister");
		},
		onForgotPassword: function() {
				var serviceURI = "/sap/opu/odata/sap/ERP_UTILITIES_UMC_URM/";
				var username = "C01001";
				var password = "sptl$123";
				this.ERPModel = new sap.ui.model.odata.ODataModel(serviceURI, true, username, password);
				this.ERPModel.setHeaders({
					"X-Requested-With": "XMLHttpRequest"
				});
				var uname = this.getView().byId("username").getValue();
				if (uname === "") {
					MessageBox.error('Please enter correct User Name');
				} else {
					var path = "/ResetUserCredential?UserName='" + uname + "'";
					this.ERPModel.create(path,null, {
						async: true,
						success: function(oData) {
							var LvMsg = "Password has been sent to resepective Mail-id";
							MessageBox.alert(LvMsg);
						},
						error: function(error) {
							var body = JSON.parse(error.response.body);
							var errorcode = body.error.message.value;
							MessageBox.error(errorcode);
						}
					});
				}
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.LandingFAQs
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.LandingFAQs
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.LandingFAQs
		 */
		//	onExit: function() {
		//
		//	}

	});

});