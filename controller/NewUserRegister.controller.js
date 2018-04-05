sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, MessageBox , JSONModel ) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.NewUserRegister", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.LatesAds
		 */
		onInit: function() {
         	var oViewModel = new sap.ui.model.json.JSONModel({
				busy: false,
				delay: 0
			});
				this.oView.setModel(oViewModel, "NewUserRegister");
		},
		onRegister: function()
		{
			var oViewModel = this.oView.getModel("NewUserRegister");
			
		    var serviceURI = "/sap/opu/odata/sap/ERP_UTILITIES_UMC_URM/";
		    var username = "C01001";
			var password = "sptl$123";
			this.ERPModel = new sap.ui.model.odata.ODataModel(serviceURI, true, username, password);
			// this.ERPModel.//setHeaders({"Accept" : "application/json"});//Setting the Headers "Content Type"
			this.ERPModel.setHeaders({"X-Requested-With" : "XMLHttpRequest"});
        // odatamodel.setHeaders({"Cache-Control" : "NO-CACHE"});// For controlling Cache   
         	
         	var oEntry = {};
					oEntry.UserName  = this.getView().byId("username").getValue().trim();
					oEntry.AccountID  = this.getView().byId("idaccno").getValue().trim();
					oEntry.ContractAccountID = this.getView().byId("idcano").getValue().trim();
					oEntry.FirstName = this.getView().byId("idfname").getValue().trim();
					oEntry.LastName = this.getView().byId("idlname").getValue().trim();
					oEntry.EmailAddress = this.getView().byId("idemail").getValue().trim();
					oEntry.PhoneNumber = this.getView().byId("idphnno").getValue().trim();
					oEntry.UsrCategory = this.getView().byId("idusrcat").getValue().trim();
					var password1 = this.getView().byId("idpassword").getValue();
					var cpassword = this.getView().byId("idcpassword").getValue();
				    // oEntry = JSON.parse(oEntry);
				    // oEntry = JSON.stringify(oEntry);
				    if (password1 !== cpassword) {
						sap.m.MessageBox.Error("Please check password ,  confirm password dont match");
					}
					else {
						oEntry.Password = password1;
					}
					var that = this.
					this.ERPModel.create("/UserRequestCollection", oEntry, {
						async: true,
						success: function(oData) {
							oViewModel.setProperty("/busy", false);
							sap.ui.core.BusyIndicator.show();
							var LvMsg = "User registered and activated Successfully";
							sap.m.MessageBox.alert(LvMsg);
							sap.ui.core.BusyIndicator.hide();
							oViewModel.setProperty("/busy", true);
							that.getRouter().navTo("Login");
						},
						error: function(error) {
							var body = JSON.parse(error.response.body);
							var errorcode = body.error.message.value;
							sap.m.MessageBox.error(errorcode);
							oViewModel.setProperty("/busy", true);
						}
					});
		
		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onReset: function() {
			 this.getView().byId("username").setValue("");
			 this.getView().byId("idaccno").setValue("");
			 this.getView().byId("idcano").setValue("");
			 this.getView().byId("idfname").setValue("");
			 this.getView().byId("idlname").setValue("");
			 this.getView().byId("idemail").setValue("");
			 this.getView().byId("idphnno").setValue("");
			 this.getView().byId("idusrcat").setValue("");
			 this.getView().byId("idpassword").setValue("");
			 this.getView().byId("idcpassword").setValue("");

			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.LatesAds
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.LatesAds
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.LatesAds
		 */
		//	onExit: function() {
		//
		//	}

	});

});