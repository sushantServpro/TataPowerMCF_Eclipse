sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel,Filter, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Contract_Maximum_Demand_Enhancement", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.Contract_Maximum_Demand_Enhancement
		 */
		onInit: function() {
		    var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.oView.setModel(oViewModel, "CMDEnhancementView");
			// set explored app's demo model on this sample
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("Model1");
			this.oDataModel1 = this.getOwnerComponent().getModel();
			var oModel = new sap.ui.model.json.JSONModel("json/ContractMaximumDemandEnhancement.json");
// 			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			fragment.setModel(oModel);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();

			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContractMaximumDemandEnhancement.ApplyOnline"].join("."), this);
			vbox.addItem(fragment1);
            this.onGetExistUtility();
		},
		
		onGetExistUtility: function(){
			    var that = this;
		    var oViewModel = this.oView.getModel("CMDEnhancementView");
		    this.oDataModel2 = this.getOwnerComponent().getModel("McfPortalModel");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel2.read("/SupplyCatSerachHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "ExistUtility");
					},
					error: function(error) {
					oViewModel.setProperty("/busy", false);
					}
				}); 
			},
			
		onSaveMeterData: function() {
			//var oViewModel = this.oView.getModel("McfPortalModel");
			var mcmfmodel = this.getOwnerComponent().getModel("McfPortalModel");
			var oViewModel = this.oView.getModel("CMDEnhancementView");
			oViewModel.setProperty("/busy", true);
			var oEntry = {};
			var sPath = "/Zcrm_le_lr_cc_msSet";
			oEntry.CaNo = sap.ui.getCore().byId("contractacctInputCMDE").getValue();
			oEntry.BpNo = sap.ui.getCore().byId("bussinesspartnInputCMDE").getValue();
			oEntry.ConsTyp = sap.ui.getCore().byId("typeofconInputCMDE").getValue();
			oEntry.BpName = sap.ui.getCore().byId("bpartnernameInputCMDE").getValue();
			oEntry.Flat = sap.ui.getCore().byId("flatInputCMDE").getValue();
			oEntry.Building = sap.ui.getCore().byId("coCMDE").getValue();
			oEntry.Society = sap.ui.getCore().byId("street2InputCMDE").getValue();
			oEntry.Lane = sap.ui.getCore().byId("street3InputCMDE").getValue();
			oEntry.City = sap.ui.getCore().byId("cityInputCMDE").getValue();
			oEntry.Locality = sap.ui.getCore().byId("districtInputCMDE").getValue();
			oEntry.Pincode = sap.ui.getCore().byId("pcodeInputCMDE").getValue();
			oEntry.Landmark = sap.ui.getCore().byId("landmarkInputCMDE").getValue();
			oEntry.Mobile = sap.ui.getCore().byId("mphoneCMDE").getValue();
			oEntry.Email = sap.ui.getCore().byId("emailInputCMDE").getValue();
			//oEntry.LandMark = sap.ui.getCore().byId("landInput").getValue();
			oEntry.InstalNo = sap.ui.getCore().byId("installationInputCMDE").getValue();
			//oEntry.typeofsupplyInput = sap.ui.getCore().byId("typeofsupplyInput").getValue();
			oEntry.ExRateCat = sap.ui.getCore().byId("ratecategoryInputCMDE").getValue();
			oEntry.ExConLoad = "0.00";
			if(sap.ui.getCore().byId("existingconloadInputCMDE").getValue() !== ''){
				oEntry.ExConLoad = sap.ui.getCore().byId("existingconloadInputCMDE").getValue();
			}
			oEntry.ExCmd = "0.00";
			if(sap.ui.getCore().byId("existingcmdInputCMDE").getValue() !== ""){
			oEntry.ExCmd = sap.ui.getCore().byId("existingcmdInputCMDE").getValue();}
			oEntry.ReqConLoad = "0.00";
			if(sap.ui.getCore().byId("reqconloadInputCMDE").getValue() !==""){
			    oEntry.ReqConLoad = sap.ui.getCore().byId("reqconloadInputCMDE").getValue();
			}
			oEntry.ReqCmd = "0.00";
			if(sap.ui.getCore().byId("reqcmdInputCMDE").getValue() !==""){
			    oEntry.ReqCmd = sap.ui.getCore().byId("reqcmdInputCMDE").getValue();
			    
			}
			oEntry.ConnectLoad = "0.00";
			if(sap.ui.getCore().byId("newconnectedloadkwInputCMDE").getValue() !== ""){
			    oEntry.ConnectLoad = sap.ui.getCore().byId("newconnectedloadkwInputCMDE").getValue();
			    
			}
			oEntry.ContractDemand = "0.00";
			if(sap.ui.getCore().byId("newcontrctdemandInputCMDE").getValue() !== ""){
			    oEntry.ContractDemand = sap.ui.getCore().byId("newcontrctdemandInputCMDE").getValue();
			}
			// codeto get selected radio bt for premise type 

			if (sap.ui.getCore().byId("RB11CMDE").getSelected()) {
				oEntry.TypPremises = "0";
			} else if (sap.ui.getCore().byId("RB22CMDE").getSelected()) {
				oEntry.TypPremises = "1";
			} else if (sap.ui.getCore().byId("RB33CMDE").getSelected()) {
				oEntry.TypPremises = "2";
			} else if (sap.ui.getCore().byId("RB44CMDE").getSelected()) {
				oEntry.TypPremises = "3";
			}
			
			//  var EBilling1 = sap.ui.getCore().byId("msumInput").getValue();
			if (sap.ui.getCore().byId("LowVoltSingleCMDE").getSelected()) {
				oEntry.SinglePh = "X";
			//	oEntry.SingleoJSONModel = parseInt(sap.ui.getCore().byId("blankInput").getValue());
			}
			if (sap.ui.getCore().byId("LowVoltThreeCMDE").getSelected()) {
				oEntry.ThreePh = "X";
			//	oEntry.ThreeoJSONModel = parseInt(sap.ui.getCore().byId("ablankInput").getValue());
			}
			if (sap.ui.getCore().byId("HighVoltCMDE").getSelected()) {
				oEntry.HighVoltage = "X";
			//	oEntry.HighoJSONModel = parseInt(sap.ui.getCore().byId("bblankInput").getValue());

		
			}
		/*	if (sap.ui.getCore().byId("RBGRP3_1").getSelected()) {
				oEntry.oJSONModelType = "1";
			} else if (sap.ui.getCore().byId("RBGRP3_2").getSelected()) {
				oEntry.oJSONModelType = "2";
			}*/
			
			if (sap.ui.getCore().byId("RBGRP_ID1CMDE").getSelected()) {
				oEntry.Optn = "1";
			} else if (sap.ui.getCore().byId("RBGRP_ID2CMDE").getSelected()) {

				oEntry.Optn = "2";
			} else if (sap.ui.getCore().byId("RBGRP_ID3CMDE").getSelected()) {

				oEntry.Optn = "3";
			} else if (sap.ui.getCore().byId("RBGRP_ID4CMDE").getSelected()) {

				oEntry.Optn = "4";
			}else if (sap.ui.getCore().byId("RBGRP_ID5CMDE").getSelected()) {

				oEntry.Optn = "5";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID6CMDE").getSelected()) {

				oEntry.Optn = "6";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID7CMDE").getSelected()) {

				oEntry.Optn = "7";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID8CMDE").getSelected()) {

				oEntry.Optn = "8";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID9CMDE").getSelected()) {

				oEntry.Optn = "9";
			}

		/*	var oTable = sap.ui.getCore().byId("ApplyOlLoadTab");
			var aData = (oTable.getItems() || []).map(function(oItem) { // assuming that you are using the default model  
				return oItem.getBindingContext().getObject();
			});
			if (aData.length > 0) {
				oEntry.LoadDetailsSet = [];
				for (var i = 0; i < aData.length; i++) {
					var LoadModel = {};

					LoadModel.LoadDetail = aData[i].Apertures;
					LoadModel.NoOfPoints = parseFloat(aData[i].NoPoint).toFixed(2);
					LoadModel.WattagePoints = parseFloat(aData[i].WattPerPoint).toFixed(2);
					LoadModel.TotalWattage = parseFloat(aData[i].TotWatt).toFixed(2);

					if (LoadModel.__metadata !== undefined) {
						delete LoadModel.__metadata;
					}
					oEntry.LoadDetailsSet.push(LoadModel);
				}
			}*/
			/*oEntry.pointInput = sap.ui.getCore().byId("pointInput").getValue();
			oEntry.wattInput = sap.ui.getCore().byId("wattInput").getValue();*/
			

			//  oEntry.LoadDetails = sap.ui.getCore().byId("sumerInput").getValue();
			//  oEntry.NoOfPoints = sap.ui.getCore().byId("wconInput").getValue();
			//  oEntry.WattagePoints = sap.ui.getCore().byId("wpwdInput").getValue();
			oEntry.LecName = sap.ui.getCore().byId("nameInputIdCMDE").getValue();
			oEntry.LecLicenceNo = sap.ui.getCore().byId("liencenoInputIdCMDE").getValue();
			oEntry.LecLmobileNo1 = sap.ui.getCore().byId("mobilenoInputIdCMDE").getValue();
			oEntry.LecEmail = sap.ui.getCore().byId("emailidInputIdCMDE").getValue();
			
			
			//oEntry.ZcreateDate = new Date();
			//  oEntry.ZsiteVisitDate = sap.ui.getCore().byId("wpwdInput").getValue();
			//  oEntry.TimeSlot = sap.ui.getCore().byId("wpwdInput").getValue();
			//oEntry.Flag = "X";
			
			mcmfmodel.create(sPath, oEntry, {
				async: true,
				success: function(oData) {
					MessageBox.alert("Form successfully submited .");
					oViewModel.setProperty("/busy", false);
				},
				error: function(error) {
					// MessageBox.error("Please enter correct Data.");
					oViewModel.setProperty("/busy", false);
				}
			});
		},
		ValueHelpAcctsearch : function(oEvent){
			var that = this;
			var oViewModel = this.oView.getModel("CMDEnhancementView");
			var sPath = "/ContractAccounts";
			this.selectedObjectInput = oEvent.getSource();
			this._valueHelpDialog = sap.ui.xmlfragment(
				"tatapower.dev.fragments.TariffCategoryChange.ValueHelpAcctsearch",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
			
			oViewModel.setProperty("/busy", true);
				this.oDataModel.read(sPath, {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "Contract");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				}); 
			
			this._valueHelpDialog.open();
		},
		
		_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter1 = new Filter("ContractAccountID", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilter2 = new Filter("AccountID", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilters = new sap.ui.model.Filter({
				filters: [
					oFilter1,
					oFilter2
				],
				and: false
			});
			evt.getSource().getBinding("items").filter(oFilters, sap.ui.model.FilterType.Application);
		},
			_handleValueHelpClose: function(evt) {
		//	var oView = this.getView();
			var oSelectedItem = evt.getParameter("selectedItem");
			var aContexts = evt.getParameter("selectedContexts");
			if (oSelectedItem && aContexts.length) {
	            aContexts.map(function(oContext) { 
	            	var ContractAcId = oContext.getObject().ContractAccountID;
	            sap.ui.getCore().byId("contractacctInputCMDE").setValue(ContractAcId); 
	            //get address value
	             
	            return oContext.getObject().ContractAccountID;    
	               
			 });
			}
// 			this._valueHelpDialog.close();
			this.getAddressdata();
		},
		
		getAddressdata : function(){
// 			var oView = this.getView();
				var that = this;
				var ContractAcId = sap.ui.getCore().byId("contractacctInputCMDE").getValue();
					var oViewModel = this.oView.getModel("CMDEnhancementView");
					var sPath = "/GetAddressAndBpSet('"+ContractAcId+"')";
					//alert(sPath);
					oViewModel.setProperty("/busy", true);
					this.oDataModel1.read(sPath, {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "AddressDetails");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});
		},
			
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ContractMaximumDemandEnhancement.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.OpenAccess
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.OpenAccess
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.OpenAccess
		 */
		//	onExit: function() {
		//
		//	}

	});

});