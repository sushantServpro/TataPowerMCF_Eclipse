sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/models"
], function(Controller, MessageBox, JSONModel, models) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.SeniorLeadership", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.SeniorLeadership
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function(evt) {
			
				var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			// var oModel = new sap.ui.model.json.JSONModel("json/SeniorLeadership.json");
			// this.getView().setModel(oModel);
			var vbox = this.getView().byId("FlexboxProcedure");
			var oView = this.getView();
			
			this.oView.setModel(oViewModel, "SeniorLeadership");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Pages.senior_leadership"].join("."), this);
			vbox.addItem(fragment1);
			sap.ui.require(["tatapower/dev/controller/captcha"], function(captcha) {
				var sCaptcha = captcha.customMethod();
				sap.ui.getCore().byId("wInput").setValue(sCaptcha);
			});
			// this.oDataModel = this.getOwnerComponent().getModel("McfPortalModel");
			var oModel2 = this.getOwnerComponent().getModel("McfPortalModel");
			oModel2.read("/SalutationDDSet", {
				async: true,
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					var model3 = new sap.ui.model.json.JSONModel(oData);
					oView.setModel(model3, "SeniorLeaderModel");
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});

		},
		onRefreshCaptcha: function() {
			sap.ui.require(["tatapower/dev/controller/captcha"], function(captcha) {
				var rCaptcha = captcha.customMethod();
				sap.ui.getCore().byId("wInput").setValue(rCaptcha);
			});
		},
		validateForm: function() {
			var isValid = true;
			var CunName = sap.ui.getCore().byId("consm_name").getValue().trim();
			var CunNo = sap.ui.getCore().byId("consm_num").getValue().trim();
			var landNo = sap.ui.getCore().byId("land_num").getValue().trim();
			var MobNo = sap.ui.getCore().byId("mobile_num").getValue().trim();
			var EmailId = sap.ui.getCore().byId("email_id").getValue().trim();
			var CaptchCompare = sap.ui.getCore().byId("captcha1").getValue().trim();
			var OrigCaptcha = sap.ui.getCore().byId("wInput").getValue();
			if (CunName === "" || CunNo === "" || landNo === "" || MobNo === "" || EmailId === "") {
				isValid = false;
				MessageBox.error("Please fill in all required fields.");
				return isValid;
			}
			if (CaptchCompare !== OrigCaptcha) {
				isValid = false;
				MessageBox.error("Please enter correct captcha.");
				return isValid;
			}
			return isValid;
		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		onPressSubmit: function() {
			try {
				if (this.validateForm()) 
				{
					// var oViewModel = this.oView.getModel("SeniorLeadership");
						var oViewModel = this.oView.getModel("SeniorLeadership");
					oViewModel.setProperty("/busy", true);
					var CunName = sap.ui.getCore().byId("consm_name").getValue().trim();
					var CunNo = sap.ui.getCore().byId("consm_num").getValue().trim();
					var landNo = sap.ui.getCore().byId("land_num").getValue().trim();
					var MobNo = sap.ui.getCore().byId("mobile_num").getValue().trim();
					var EmailId = sap.ui.getCore().byId("email_id").getValue().trim();
					
					var AreaSel = sap.ui.getCore().byId("idSal").getSelectedKey();
					
					// var AreaSel2 = sap.ui.getCore().byId("idSal").getValue().trim;
					if (sap.ui.getCore().byId("IdQuery").getSelected()) {
						var QueryCat = "1";
					} else if (sap.ui.getCore().byId("IdComplaint").getSelected()) {
						var QueryCat = "2";
					} else if (sap.ui.getCore().byId("IdRequest").getSelected()) {
						var QueryCat = "3";
					} else if (sap.ui.getCore().byId("IdFeedback").getSelected()) {
						var QueryCat = "4";
					} else if (sap.ui.getCore().byId("IdAppreciation").getSelected()) {
						var QueryCat = "5";
					}
					var oEntry = {};
					oEntry.ConsName = CunName;
					oEntry.ConsNumber = CunNo;
					oEntry.LandLine = landNo;
					oEntry.MobileNumber = MobNo;
					oEntry.Email = EmailId;
					oEntry.QuerryCate = QueryCat;
					oEntry.Salutation = AreaSel;

	var oModel2 = this.getOwnerComponent().getModel("McfPortalModel");
					oModel2.create("/EscalateToSeniorsSet",oEntry,
				{
					async : true,
					success:function(oData)
					{
						oViewModel.setProperty("/busy", false);
						MessageBox.alert(oData.LvMsg);
				
					},
					error:function(error)
					{
					// var body = JSON.parse(error.responseText);
					// 	var errorcode = body.error.message.value;
					// 	MessageBox.error(errorcode);
						oViewModel.setProperty("/busy", false);
					}
				});
				}
			} catch (err) {
				// oViewModel.setProperty("/busy", false);
			}
		},
		handleValueHelp_aggre: function() {

		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}

	});

});