sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel,Filter, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Meter_Shifting", {

		onInit: function(evt) {
				var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.oView.setModel(oViewModel, "Meter_ShiftingView");
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/MeterShifting.json");
			this.getView().setModel(oModel);
			
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("Model1");
			this.oDataModel1 = this.getOwnerComponent().getModel();
			this.oDataModel2 = this.getOwnerComponent().getModel("McfPortalModel");
			var that = this;
			//get the Purpose of Supply drop down value from odata
					var drpcatofsearch = '/SupplyCatSerachHelpSet';
					this.oDataModel2.read(drpcatofsearch, {
						success: function(oData) {
							oViewModel.setProperty("/busy", false);
							that.oView.setModel(new JSONModel(oData), "SupplyCatSerachdata");
						},
						error: function(error) {
							oViewModel.setProperty("/busy", false);
						}
					});
			
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterShifting.ApplyOnline"].join("."), this);
			vbox.addItem(fragment1);
		},
		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.MeterShifting.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onAddLoadDetails : function(){
			var oTable = sap.ui.getCore().byId("ApplyOlLoadTabMS");
			var oTemplate = oTable.getBindingInfo("items").template;
			
			var Apertures = '';
			if (sap.ui.getCore().byId("RBGRP_ID1MS").getSelected()) {
				Apertures = "LED lights/Tube lights/Bulbs";
			} else if (sap.ui.getCore().byId("RBGRP_ID2MS").getSelected()) {
				Apertures = "Fans";
			}else if (sap.ui.getCore().byId("RBGRP_ID3MS").getSelected()) {
				Apertures = "Geysers";
			}else if (sap.ui.getCore().byId("RBGRP_ID4MS").getSelected()) {
				Apertures = "Oven/Micro Wave";
			}else if (sap.ui.getCore().byId("RBGRP_ID5MS").getSelected()) {
				Apertures = "Chiller/Air Conditioners";
			}else if (sap.ui.getCore().byId("RBGRP_ID6MS").getSelected()) {
				Apertures = "Refrigerator";
			}else if (sap.ui.getCore().byId("RBGRP_ID7MS").getSelected()) {
				Apertures = "Television";
			}else if (sap.ui.getCore().byId("RBGRP_ID8MS").getSelected()) {
				Apertures = "Machinery/Apparatus";
			}else if (sap.ui.getCore().byId("RBGRP_ID9MS").getSelected()) {
				Apertures = "Miscellaneous";
			}
			
			
		//	var Apertures = sap.ui.getCore().byId("apprtinput").getValue();
			var NoPoint = sap.ui.getCore().byId("pointInputMS").getValue();
			var WattPerPoint = sap.ui.getCore().byId("wattInputMS").getValue();
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
			var oTable = sap.ui.getCore().byId("ApplyOlLoadTabMS");
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
			var oViewModel = this.oView.getModel("Meter_ShiftingView");
			oViewModel.setProperty("/busy", true);
			var oEntry = {};
			var sPath = "/Zcrm_le_lr_cc_msSet";
			oEntry.CaNo = sap.ui.getCore().byId("contractacctInputMS").getValue();
			oEntry.BpNo = sap.ui.getCore().byId("bussinesspartnInputMS").getValue();
			oEntry.ConsTyp = sap.ui.getCore().byId("typeofconInputMS").getValue();
			oEntry.BpName = sap.ui.getCore().byId("bpartnernameInputMS").getValue();
			oEntry.Flat = sap.ui.getCore().byId("flatInputMS").getValue();
			oEntry.Building = sap.ui.getCore().byId("coMS").getValue();
			oEntry.Society = sap.ui.getCore().byId("street2InputMS").getValue();
			oEntry.Lane = sap.ui.getCore().byId("street3InputMS").getValue();
			oEntry.City = sap.ui.getCore().byId("cityInputMS").getValue();
			oEntry.Locality = sap.ui.getCore().byId("districtInputMS").getValue();
			oEntry.Pincode = sap.ui.getCore().byId("pcodeInputMS").getValue();
			oEntry.Landmark = sap.ui.getCore().byId("landmarkInputMS").getValue();
			var no = sap.ui.getCore().byId("mphoneMS").getValue();
			 if(no ==""){
		        sap.m.MessageBox.alert("Please enter your Phone Number");
		        return false;
		    }
		    else if(isNaN(no) || (no.length > 10 || no.length < 10)){
		        sap.m.MessageBox.alert("Enter valid number");
		        return false;
		    }
			oEntry.Mobile = no;
			oEntry.Email = sap.ui.getCore().byId("emailInputMS").getValue();
			//oEntry.LandMark = sap.ui.getCore().byId("landInput").getValue();
			oEntry.InstalNo = sap.ui.getCore().byId("installationInputMS").getValue();
			//oEntry.typeofsupplyInput = sap.ui.getCore().byId("typeofsupplyInput").getValue();
			oEntry.ExRateCat = sap.ui.getCore().byId("ratecategoryInputMS").getValue();
			oEntry.ExConLoad = "0.00";
			if(sap.ui.getCore().byId("existingconloadInputMS").getValue() !== ''){
				oEntry.ExConLoad = sap.ui.getCore().byId("existingconloadInputMS").getValue();
			}
			oEntry.ExCmd = "0.00";
			if(sap.ui.getCore().byId("existingcmdInputMS").getValue() !== ""){
			oEntry.ExCmd = sap.ui.getCore().byId("existingcmdInputMS").getValue();}
			oEntry.ReqConLoad = "0.00";
			if(sap.ui.getCore().byId("reqconloadInputMS").getValue() !==""){oEntry.ReqConLoad = sap.ui.getCore().byId("reqconloadInputMS").getValue();}
			oEntry.ReqCmd = "0.00";
			if(sap.ui.getCore().byId("reqcmdInputMS").getValue() !==""){oEntry.ReqCmd = sap.ui.getCore().byId("reqcmdInputMS").getValue();}
			oEntry.ConnectLoad = "0.00";
			if(sap.ui.getCore().byId("newconnectedloadkwInputMS").getValue() !== ""){oEntry.ConnectLoad = sap.ui.getCore().byId("newconnectedloadkwInputMS").getValue();}
			oEntry.ContractDemand = "0.00";
			if(sap.ui.getCore().byId("newcontrctdemandInputMS").getValue() !== ""){ oEntry.ContractDemand = sap.ui.getCore().byId("newcontrctdemandInputMS").getValue();
			}
			// codeto get selected radio bt for premise type 

			if (sap.ui.getCore().byId("RB11MS").getSelected()) {
				oEntry.TypPremises = "0";
			} else if (sap.ui.getCore().byId("RB22MS").getSelected()) {
				oEntry.TypPremises = "1";
			} else if (sap.ui.getCore().byId("RB33MS").getSelected()) {
				oEntry.TypPremises = "2";
			} else if (sap.ui.getCore().byId("RB44MS").getSelected()) {
				oEntry.TypPremises = "3";
			}
			

			/*if (sap.ui.getCore().byId("RBGRP2_1").getSelected()) {
				oEntry.EBilling = "0";
			} else if (sap.ui.getCore().byId("RBGRP2_2").getSelected()) {
				oEntry.EBilling = "1";
			}*/
			//  var EBilling1 = sap.ui.getCore().byId("msumInput").getValue();
			if (sap.ui.getCore().byId("LowVoltSingleMS").getSelected()) {
				oEntry.SinglePh = "X";
			//	oEntry.SingleoJSONModel = parseInt(sap.ui.getCore().byId("blankInput").getValue());
			}
			if (sap.ui.getCore().byId("LowVoltThreeMS").getSelected()) {
				oEntry.ThreePh = "X";
			//	oEntry.ThreeoJSONModel = parseInt(sap.ui.getCore().byId("ablankInput").getValue());
			}
			if (sap.ui.getCore().byId("HighVoltMS").getSelected()) {
				oEntry.HighVoltage = "X";
			//	oEntry.HighoJSONModel = parseInt(sap.ui.getCore().byId("bblankInput").getValue());

		
			}
		/*	if (sap.ui.getCore().byId("RBGRP3_1").getSelected()) {
				oEntry.oJSONModelType = "1";
			} else if (sap.ui.getCore().byId("RBGRP3_2").getSelected()) {
				oEntry.oJSONModelType = "2";
			}*/
			
			if (sap.ui.getCore().byId("RBGRP_ID1MS").getSelected()) {
				oEntry.Optn = "1";
			} else if (sap.ui.getCore().byId("RBGRP_ID2MS").getSelected()) {

				oEntry.Optn = "2";
			} else if (sap.ui.getCore().byId("RBGRP_ID3MS").getSelected()) {

				oEntry.Optn = "3";
			} else if (sap.ui.getCore().byId("RBGRP_ID4MS").getSelected()) {

				oEntry.Optn = "4";
			}else if (sap.ui.getCore().byId("RBGRP_ID5MS").getSelected()) {

				oEntry.Optn = "5";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID6MS").getSelected()) {

				oEntry.Optn = "6";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID7MS").getSelected()) {

				oEntry.Optn = "7";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID8MS").getSelected()) {

				oEntry.Optn = "8";
			}
			else if (sap.ui.getCore().byId("RBGRP_ID9MS").getSelected()) {

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
			oEntry.LecName = sap.ui.getCore().byId("nameInputIdMS").getValue();
			oEntry.LecLicenceNo = sap.ui.getCore().byId("liencenoInputIdMS").getValue();
			oEntry.LecLmobileNo1 = sap.ui.getCore().byId("mobilenoInputIdMS").getValue();
			oEntry.LecEmail = sap.ui.getCore().byId("emailidInputIdMS").getValue();
			
			
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
			var oViewModel = this.oView.getModel("Meter_ShiftingView");
			var sPath = "/ContractAccounts";
			this.selectedObjectInput = oEvent.getSource();
			this._valueHelpDialog = sap.ui.xmlfragment(
				"tatapower.dev.fragments.MeterShifting.ValueHelpAcctsearch",
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
		
		OnApplicationChange : function(){
		if(sap.ui.getCore().byId("RBAPPL1MS").getSelected()){
				sap.ui.getCore().byId('reqratecatInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('installationInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('typeofsupplyInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('ratecategoryInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingcmdInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newconnectedloadkwInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newcontrctdemandInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqconloadInputMS').setProperty("enabled",true);
				sap.ui.getCore().byId('reqcmdInputMS').setProperty("enabled",true);
			}else if(sap.ui.getCore().byId("RBAPPL2MS").getSelected()){
				sap.ui.getCore().byId('reqratecatInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('installationInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('typeofsupplyInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('ratecategoryInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingcmdInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newconnectedloadkwInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newcontrctdemandInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqconloadInputMS').setProperty("enabled",true);
				sap.ui.getCore().byId('reqcmdInputMS').setProperty("enabled",true);
			}else if(sap.ui.getCore().byId("RBAPPL3MS").getSelected()){
				sap.ui.getCore().byId('reqratecatInputMS').setProperty("enabled",true);
				sap.ui.getCore().byId('installationInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('typeofsupplyInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('ratecategoryInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingcmdInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newconnectedloadkwInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newcontrctdemandInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqcmdInputMS').setProperty("enabled",false);
			}else if(sap.ui.getCore().byId("RBAPPL4MS").getSelected()){
				sap.ui.getCore().byId('reqratecatInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('installationInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('typeofsupplyInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('ratecategoryInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingcmdInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newconnectedloadkwInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newcontrctdemandInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqcmdInputMS').setProperty("enabled",false);
			}else if(sap.ui.getCore().byId("RBAPPL5MS").getSelected()){
				sap.ui.getCore().byId('reqratecatInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('installationInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('typeofsupplyInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('ratecategoryInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingcmdInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newconnectedloadkwInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newcontrctdemandInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqcmdInputMS').setProperty("enabled",true);
			}else if(sap.ui.getCore().byId("RBAPPL6MS").getSelected()){
				sap.ui.getCore().byId('reqratecatInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('installationInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('typeofsupplyInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('ratecategoryInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('existingcmdInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newconnectedloadkwInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('newcontrctdemandInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqconloadInputMS').setProperty("enabled",false);
				sap.ui.getCore().byId('reqcmdInputMS').setProperty("enabled",true);
			}
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
	            sap.ui.getCore().byId("contractacctInputMS").setValue(ContractAcId); 
	            //get address value
	             
	            return oContext.getObject().ContractAccountID;    
	               
			 });
			}
			 this.getAddressdata();
		},
		getAddressdata : function(){
			var oView = this.getView();
				var that = this;
				var ContractAcId = sap.ui.getCore().byId("contractacctInputMS").getValue();
					var oViewModel = this.oView.getModel("Meter_ShiftingView");
					var sPath = "/GetAddressAndBpSet('"+ContractAcId+"')";
					//alert(sPath);
					oViewModel.setProperty("/busy", true);
					this.oDataModel1.read(sPath, {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						oView.setModel(new JSONModel(oData), "AddressDetails");
					},
					error: function(error) {
					//	oViewModel.setProperty("/busy", false);
					}
				});
		}

	});

});