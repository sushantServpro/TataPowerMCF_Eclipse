sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel,Filter, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Tariff_Category_Change", {

		onInit: function(evt) {
            var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});

			this.oView.setModel(oViewModel, "TariffCategoryChangeView");
			// set explored app's demo model on this sample
// 			this.getView().setModel(oModel);
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("Model1");
			this.oDataModel1 = this.getOwnerComponent().getModel();
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/Tariff_Category_Change.json");
// 			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			fragment.setModel(oModel);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TariffCategoryChange.ApplyOnline"].join("."), this);
			vbox.addItem(fragment1);
		
		     this.onGetExistUtility();
		},
		
		onGetExistUtility: function(){
			    var that = this;
		    var oViewModel = this.oView.getModel("TariffCategoryChangeView");
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
			
			onAddLoadDetails : function(){
			var oTable = sap.ui.getCore().byId("ApplyOlLoadTabTCC");
			var oTemplate = oTable.getBindingInfo("items").template;
			
			var Apertures = '';
			if (sap.ui.getCore().byId("RBGRP_ID1TCC").getSelected()) {
				Apertures = "LED lights/Tube lights/Bulbs";
			} else if (sap.ui.getCore().byId("RBGRP_ID2TCC").getSelected()) {
				Apertures = "Fans";
			}else if (sap.ui.getCore().byId("RBGRP_ID3TCC").getSelected()) {
				Apertures = "Geysers";
			}else if (sap.ui.getCore().byId("RBGRP_ID4TCC").getSelected()) {
				Apertures = "Oven/Micro Wave";
			}else if (sap.ui.getCore().byId("RBGRP_ID5TCC").getSelected()) {
				Apertures = "Chiller/Air Conditioners";
			}else if (sap.ui.getCore().byId("RBGRP_ID6TCC").getSelected()) {
				Apertures = "Refrigerator";
			}else if (sap.ui.getCore().byId("RBGRP_ID7TCC").getSelected()) {
				Apertures = "Television";
			}else if (sap.ui.getCore().byId("RBGRP_ID8TCC").getSelected()) {
				Apertures = "Machinery/Apparatus";
			}else if (sap.ui.getCore().byId("RBGRP_ID9TCC").getSelected()) {
				Apertures = "Miscellaneous";
			}
			
			
		//	var Apertures = sap.ui.getCore().byId("apprtinput").getValue();
			var NoPoint = sap.ui.getCore().byId("pointInputTCC").getValue();
			var WattPerPoint = sap.ui.getCore().byId("wattInputTCC").getValue();
			var TotWatt = parseInt(NoPoint) * parseInt(WattPerPoint);
			var oData = [{
				Apertures: Apertures,
				NoPoint: NoPoint,
				WattPerPoint: WattPerPoint,
				TotWatt: TotWatt
			}];
			var aData = (oTable.getItems() || []).map(function(oItem) { // assuming that you are using the default model  
				return oItem.getBindingContext().getObject();
			});
			if (aData.length > 0) {
				for (var i = 0; i < aData.length; i++) {
					oData.push(aData[i]);
				}
			}
			var oModel = new sap.ui.model.json.JSONModel(); // created a JSON model      
			oModel.setData({
				oLoadTableModel: oData
			}); // Set the data to the model using the JSON            
			oTable.setModel(oModel);
			oTable.bindItems({
				path: "/oLoadTableModel",
				template: oTemplate
			});
		},
		
			onRemoveLoadDetails: function() {
			var oTable = sap.ui.getCore().byId("ApplyOlLoadTabTCC");
			var oTemplate = oTable.getBindingInfo("items").template;
			var oSelectedItem = oTable.getSelectedItem();
			if (oSelectedItem === null || oSelectedItem === undefined || oSelectedItem === "") {
				MessageBox.alert("Please select at least one row.");
			} else {
				var index = oTable.indexOfItem(oSelectedItem);
				var aData = (oTable.getItems() || []).map(function(oItem) { // assuming that you are using the default model  
					return oItem.getBindingContext().getObject();
				});
				aData.splice(index, 1);
				var oModel = new sap.ui.model.json.JSONModel(); // created a JSON model      
				oModel.setData({
					oTableModel: aData
				}); // Set the data to the model using the JSON            
				oTable.setModel(oModel);
				oTable.bindItems({
					path: "/oLoadTableModel",
					template: oTemplate
				});
			}
		},
		
		onSaveMeterData: function() {
			//var oViewModel = this.oView.getModel("McfPortalModel");
			var mcmfmodel = this.getOwnerComponent().getModel("McfPortalModel");
			var oViewModel = this.oView.getModel("TariffCategoryChangeView");
			oViewModel.setProperty("/busy", true);
			var oEntry = {};
			var sPath = "/Zcrm_le_lr_cc_msSet";
			oEntry.CaNo = sap.ui.getCore().byId("contractacctInputTCC").getValue();
			oEntry.BpNo = sap.ui.getCore().byId("bussinesspartnInputTCC").getValue();
			oEntry.ConsTyp = sap.ui.getCore().byId("typeofconInputTCC").getValue();
			oEntry.BpName = sap.ui.getCore().byId("bpartnernameInputTCC").getValue();
			oEntry.Flat = sap.ui.getCore().byId("flatInputTCC").getValue();
			oEntry.Building = sap.ui.getCore().byId("coTCC").getValue();
			oEntry.Society = sap.ui.getCore().byId("street2InputTCC").getValue();
			oEntry.Lane = sap.ui.getCore().byId("street3InputTCC").getValue();
			oEntry.City = sap.ui.getCore().byId("cityInputTCC").getValue();
			oEntry.Locality = sap.ui.getCore().byId("districtInputTCC").getValue();
			oEntry.Pincode = sap.ui.getCore().byId("pcodeInputTCC").getValue();
			oEntry.Landmark = sap.ui.getCore().byId("landmarkInputTCC").getValue();
			oEntry.Mobile = sap.ui.getCore().byId("mphoneTCC").getValue();
			oEntry.Email = sap.ui.getCore().byId("emailInputTCC").getValue();
			//oEntry.LandMark = sap.ui.getCore().byId("landInput").getValue();
			oEntry.InstalNo = sap.ui.getCore().byId("installationInputTCC").getValue();
			//oEntry.typeofsupplyInput = sap.ui.getCore().byId("typeofsupplyInput").getValue();
			oEntry.ExRateCat = sap.ui.getCore().byId("ratecategoryInputTCC").getValue();
			oEntry.ExConLoad = "0.00";
			if(sap.ui.getCore().byId("existingconloadInputTCC").getValue() !== ''){
				oEntry.ExConLoad = sap.ui.getCore().byId("existingconloadInputTCC").getValue();
			}
			oEntry.ExCmd = "0.00";
			if(sap.ui.getCore().byId("existingcmdInputTCC").getValue() !== ""){
			oEntry.ExCmd = sap.ui.getCore().byId("existingcmdInputTCC").getValue();}
			oEntry.ReqConLoad = "0.00";
			if(sap.ui.getCore().byId("reqconloadInputTCC").getValue() !==""){
			    oEntry.ReqConLoad = sap.ui.getCore().byId("reqconloadInputTCC").getValue();
			}
			oEntry.ReqCmd = "0.00";
			if(sap.ui.getCore().byId("reqcmdInputTCC").getValue() !==""){
			    oEntry.ReqCmd = sap.ui.getCore().byId("reqcmdInputTCC").getValue();
			    
			}
			oEntry.ConnectLoad = "0.00";
			if(sap.ui.getCore().byId("newconnectedloadkwInputTCC").getValue() !== ""){
			    oEntry.ConnectLoad = sap.ui.getCore().byId("newconnectedloadkwInputTCC").getValue();
			    
			}
			oEntry.ContractDemand = "0.00";
			if(sap.ui.getCore().byId("newcontrctdemandInputTCC").getValue() !== ""){
			    oEntry.ContractDemand = sap.ui.getCore().byId("newcontrctdemandInputTCC").getValue();
			}
			// codeto get selected radio bt for premise type 

			if (sap.ui.getCore().byId("RB11TCC").getSelected()) {
				oEntry.TypPremises = "0";
			} else if (sap.ui.getCore().byId("RB22TCC").getSelected()) {
				oEntry.TypPremises = "1";
			} else if (sap.ui.getCore().byId("RB33TCC").getSelected()) {
				oEntry.TypPremises = "2";
			} else if (sap.ui.getCore().byId("RB44TCC").getSelected()) {
				oEntry.TypPremises = "3";
			}
			
			//  var EBilling1 = sap.ui.getCore().byId("msumInput").getValue();
			if (sap.ui.getCore().byId("LowVoltSingleTCC").getSelected()) {
				oEntry.SinglePh = "X";
			//	oEntry.SingleoJSONModel = parseInt(sap.ui.getCore().byId("blankInput").getValue());
			}
			if (sap.ui.getCore().byId("LowVoltThreeTCC").getSelected()) {
				oEntry.ThreePh = "X";
			//	oEntry.ThreeoJSONModel = parseInt(sap.ui.getCore().byId("ablankInput").getValue());
			}
			if (sap.ui.getCore().byId("HighVoltTCC").getSelected()) {
				oEntry.HighVoltage = "X";
			//	oEntry.HighoJSONModel = parseInt(sap.ui.getCore().byId("bblankInput").getValue());

		
			}
		/*	if (sap.ui.getCore().byId("RBGRP3_1").getSelected()) {
				oEntry.oJSONModelType = "1";
			} else if (sap.ui.getCore().byId("RBGRP3_2").getSelected()) {
				oEntry.oJSONModelType = "2";
			}*/
			
			if (sap.ui.getCore().byId("RBGRP_ID1TCC").getSelected()) {
				oEntry.Optn = "1";
			} else if (sap.ui.getCore().byId("RBGRP_ID2TCC").getSelected()) {

				oEntry.Optn = "2";
			} else if (sap.ui.getCore().byId("RBGRP_ID3TCC").getSelected()) {

				oEntry.Optn = "3";
			} else if (sap.ui.getCore().byId("RBGRP_ID4TCC").getSelected()) {

				oEntry.Optn = "4";
			}else if (sap.ui.getCore().byId("RBGRP_ID5TCC").getSelected()) {

				oEntry.Optn = "5";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID6TCC").getSelected()) {

				oEntry.Optn = "6";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID7TCC").getSelected()) {

				oEntry.Optn = "7";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID8TCC").getSelected()) {

				oEntry.Optn = "8";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID9TCC").getSelected()) {

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
			oEntry.LecName = sap.ui.getCore().byId("nameInputIdTCC").getValue();
			oEntry.LecLicenceNo = sap.ui.getCore().byId("liencenoInputIdTCC").getValue();
			oEntry.LecLmobileNo1 = sap.ui.getCore().byId("mobilenoInputIdTCC").getValue();
			oEntry.LecEmail = sap.ui.getCore().byId("emailidInputIdTCC").getValue();
			
			
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
			var oViewModel = this.oView.getModel("TariffCategoryChangeView");
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
	            sap.ui.getCore().byId("contractacctInputTCC").setValue(ContractAcId); 
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
				var ContractAcId = sap.ui.getCore().byId("contractacctInputTCC").getValue();
					var oViewModel = this.oView.getModel("TariffCategoryChangeView");
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
		
		
		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TariffCategoryChange.ApplyOnline"].join("."), this);
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