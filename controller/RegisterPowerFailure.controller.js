sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/models"
], function(Controller, MessageBox, JSONModel, models) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.RegisterPowerFailure", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.RegisterPowerFailure
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function(evt) {

			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			// this.oView.setModel(oViewModel, "RegisterPowerFailure");
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Pages.register_power_failure"].join("."), this);
			vbox.addItem(fragment1);
			// this.getRouter().getRoute("MyAccount").attachPatternMatched(this._onObjectMatched, this);

			this.oView.setModel(oViewModel, "RegisterPowerFailure");
			//  this.getRouter().getRoute("Calculator").attachPatternMatched(this._onObjectMatched, this);
			// this.oView.setModel(oViewModel, "CalculatorView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel();
			// this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			// var oModel = new sap.ui.model.json.JSONModel("json/PowerFailure.json");

		},
		// 	_onObjectMatched: function(oEvent) {
		// 	this.oView.getModel("ComModel1").metadataLoaded().then(function() {

		// 		// var sObjectPath = "ModelCom1>/";
		// 		// // 	?$expand=AccountAddresses/AccountAddressDependentMobilePhones,AccountAddresses/AccountAddressDependentEmails,ContractAccounts,ContractAccounts/Contracts/Devices";
		// 		// // this._bindView("/" + sObjectPath);
		// 		// this._bindView(sObjectPath);

		// 	}.bind(this));
		// },
		// 	_onMetadataLoaded: function() {
		// 	// Store original busy indicator delay for the detail view
		// 	self = this;
		// 	var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
		// 		oViewModel = self.oView.getModel("RegisterPowerFailure");

		// 	// Make sure busy indicator is displayed immediately when
		// 	// detail view is displayed for the first time
		// 	oViewModel.setProperty("/delay", 0);

		// 	// Binding the view will set it to not busy - so the view is always busy if it is not bound
		// 	oViewModel.setProperty("/busy", true);
		// 	// Restore original busy indicator delay for the detail view
		// 	oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		// },

		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		onPressGo: function() {
			this.getPowerFailureData();
		},
		getPowerFailureData: function() {
			var oViewModel = this.oView.getModel("RegisterPowerFailure");
			var ConsumerNo = sap.ui.getCore().byId("cnInput").getValue();

			var sPath = "/EbillRegisterSet(ConsumerNo='" + ConsumerNo + "')";
			this.oView.getModel("McfPortalModel").read(sPath, {
				async: true,
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					sap.ui.getCore().byId("ncInput").setValue(oData.ConsumerName);
					sap.ui.getCore().byId("emidInput").setValue(oData.Email);
					sap.ui.getCore().byId("mobnumberInput").setValue(oData.Mobile);

				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});

		},
		validateForm: function() {
			var isValid = true;
			var CunName = sap.ui.getCore().byId("ncInput").getValue().trim();
			var MobNo = sap.ui.getCore().byId("mobnumberInput").getValue().trim();
			var EmailId = sap.ui.getCore().byId("emidInput").getValue().trim();

			if (CunName === "" || MobNo === "" || EmailId === "") {
				isValid = false;
				// MessageBox.error("Please fill in all required fields.");
				return isValid;
			}
			return isValid;
		},
		OnPressSubmit: function()
		{
			try {
				if (this.validateForm()) {
		    var oViewModel = this.oView.getModel("RegisterPowerFailure");
		    oViewModel.setProperty("/busy", true);
			var CunNo = sap.ui.getCore().byId("cnInput").getValue().trim();
			var CunName = sap.ui.getCore().byId("ncInput").getValue().trim();
			var MobNo = sap.ui.getCore().byId("mobnumberInput").getValue().trim();
			var EmailId = sap.ui.getCore().byId("emidInput").getValue().trim();
		    var ProDec = sap.ui.getCore().byId("IdProDec").getValue();
		    var LandMark = sap.ui.getCore().byId("nlInput").getValue();
		    
		    
		    var oEntry = {};
		    oEntry.ConsumerNo = CunNo;
		    // oEntry.ConsumerName = CunName;
		    // oEntry.MobileNo = MobNo;
		    // oEntry.EmailId = EmailId;
		    oEntry.IProbDesc = ProDec;
		    oEntry.Landmark = LandMark;
		    
		    	this.oView.getModel("ComModel1").create("/TechnicalCompSet",oEntry,
				{
					async : true,
					success:function(oData)
					{
						oViewModel.setProperty("/busy", false);
						MessageBox.alert(oData.LvMsg);
				
					},
					error:function(error)
					{
					var body = JSON.parse(error.responseText);
						var errorcode = body.error.message.value;
						MessageBox.error(errorcode);
						oViewModel.setProperty("/busy", false);
					}
				});
				}
			} catch (err) {
				oViewModel.setProperty("/busy", false);
			}
		},
		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf tatapower.dev.view.RegisterPowerFailure
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.RegisterPowerFailure
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.RegisterPowerFailure
		 */
		//	onExit: function() {
		//
		//	}

	});

});