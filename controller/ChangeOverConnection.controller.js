sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/models",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator"
	
], function(Controller, JSONModel, models, Filter, MessageToast, MessageBox, FilterOperator) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.ChangeOverConnection", {

	onInit: function(evt) {

			// set explored app's demo model on this sample
			var oViewModel = new JSONModel({
					busy: false,
					delay: 0,
					Submit:"X"
					});
            
            this.getRouter().getRoute("ChangeOverConnection").attachPatternMatched(this._onObjectMatched, this);
            this.oView.setModel(oViewModel, "ChangeOverView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("McfPortalModel");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			
			var oModel = new sap.ui.model.json.JSONModel("json/ChangeOverConnection.json");
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			fragment.setModel(oModel);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ChangeoverConnection.Applicationforms"].join("."), this);
				vbox.addItem(fragment1);
		},
		
			_onObjectMatched: function() {

		      //  var oViewModel = this.oView.getModel("ChangeOverView");
			    this.oView.getModel().metadataLoaded().then(function() {
					
			this.onGetStreetSH();
			this.onGetSuburbanSH();
			this.onGetPostalCodeSH();
            this.onGetExistUtility();
            this.onGetSupplyPurpose();
            this.onGetSupplyCategory();
            this.onGetSupplyType();
				}.bind(this));
			},
			// start of code for changeover process
			onGetSupplyPurpose: function(){
			 var that = this;
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel.read("/PurposeOfSupplySerachHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "SupplyPurpose");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});    
			},
			onGetSupplyType: function(){
			var that = this;
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel.read("/TypeOfSupplySerachHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "SupplyType");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});     
			},
			onGetSupplyCategory:  function(){
			 var that = this;
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel.read("/SupplyCatSerachHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "SupplyCategory");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});    
			},
			
			onGetExistUtility: function(){
			    var that = this;
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel.read("/ExistingUtilitySerachHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "ExistUtility");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				}); 
			},
	    	onGetStreetSH: function(){
		    var that = this;
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel.read("/StreetSerchHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "LaneStreet");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				}); 
		},
		    onGetSuburbanSH: function(){
		    var that = this;
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel.read("/CitySerchHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "SubUrban");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				}); 
		},
		onGetPostalCodeSH: function(){
		    var that = this;
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    this.oDataModel.read("/PinCodeSerchHelpSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "PostalCode");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				}); 
		},
		
		 onVHLaneStreet1: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment("tatapower.dev.fragments.ChangeoverConnection.SearchHelpStreet1",this);
				this.getView().addDependent(this._valueHelpDialog);
			}
			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._valueHelpDialog.setRememberSelections(bRemember);
			this._valueHelpDialog.open();
		},
			_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter1 = new Filter("Street", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilter2 = new Filter("CityPart", sap.ui.model.FilterOperator.Contains, sValue);
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
			var oSelectedItem = evt.getParameter("selectedItem");
			var aContexts = evt.getParameter("selectedContexts");
			if (oSelectedItem && aContexts.length) {
	            aContexts.map(function(oContext) { 
	            sap.ui.getCore().byId("LaneStreetId").setValue(oContext.getObject().Street); 
	            return oContext.getObject().Street;    
	               
			 });
			}
		},
		
		 onVHSubUrb1: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog1) {
				this._valueHelpDialog1 = sap.ui.xmlfragment("tatapower.dev.fragments.ChangeoverConnection.SearchHelpSubUrban1",this);
				this.getView().addDependent(this._valueHelpDialog1);
			}
			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._valueHelpDialog1.setRememberSelections(bRemember);
			this._valueHelpDialog1.open();
		},
			_handleValueHelpSearch1: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter1 = new Filter("CityName", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilter2 = new Filter("CityPart", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilters = new sap.ui.model.Filter({
				filters: [
					oFilter1,
					oFilter2
				],
				and: false
			});
			evt.getSource().getBinding("items").filter(oFilters, sap.ui.model.FilterType.Application);
		},
		_handleValueHelpClose1: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var aContexts = evt.getParameter("selectedContexts");
			if (oSelectedItem && aContexts.length) {
	            aContexts.map(function(oContext) { 
	            sap.ui.getCore().byId("SubUrbIdCO").setValue(oContext.getObject().CityPart); 
	            return oContext.getObject().CityPart;    
	               
			 });
			}
		},
		
		onCityValHelp: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog2) {
				this._valueHelpDialog2 = sap.ui.xmlfragment("tatapower.dev.fragments.ChangeoverConnection.SearchHelpCity1",this);
				this.getView().addDependent(this._valueHelpDialog2);
			}
			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._valueHelpDialog2.setRememberSelections(bRemember);
			this._valueHelpDialog2.open();
		},
			_handleValueHelpSearch2: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter1 = new Filter("CityName", sap.ui.model.FilterOperator.Contains, sValue);
// 			var oFilter2 = new Filter("CityPart", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilters = new sap.ui.model.Filter({
				filters: [
					oFilter1
				// 	oFilter2
				],
				and: false
			});
			evt.getSource().getBinding("items").filter(oFilters, sap.ui.model.FilterType.Application);
		},
		_handleValueHelpClose2: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var aContexts = evt.getParameter("selectedContexts");
			if (oSelectedItem && aContexts.length) {
	            aContexts.map(function(oContext) { 
	            sap.ui.getCore().byId("IdCityValHlp").setValue(oContext.getObject().CityName); 
	            return oContext.getObject().CityName;    
	               
			 });
			}
		},
		onPostalCodeHelp: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog3) {
				this._valueHelpDialog3 = sap.ui.xmlfragment("tatapower.dev.fragments.ChangeoverConnection.SearchHelpPostalCode",this);
				this.getView().addDependent(this._valueHelpDialog3);
			}
			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._valueHelpDialog3.setRememberSelections(bRemember);
			this._valueHelpDialog3.open();
		},
			_handleValueHelpSearch3: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter1 = new Filter("PostCode", sap.ui.model.FilterOperator.Contains, sValue);
// 			var oFilter2 = new Filter("CityPart", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilters = new sap.ui.model.Filter({
				filters: [
					oFilter1
				// 	oFilter2
				],
				and: false
			});
			evt.getSource().getBinding("items").filter(oFilters, sap.ui.model.FilterType.Application);
		},
		_handleValueHelpClose3: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var aContexts = evt.getParameter("selectedContexts");
			if (oSelectedItem && aContexts.length) {
	            aContexts.map(function(oContext) { 
	            sap.ui.getCore().byId("IDPostalCodeVH").setValue(oContext.getObject().PostCode); 
	            return oContext.getObject().PostCode;    
	               
			 });
			}
		},
		
		onGetDraftData: function(){
	     var oViewModel = this.oView.getModel("ChangeOverView");
	     var RegId = sap.ui.getCore().byId("IdRegNo1Change").getValue();
	     
	     var that = this;
	     var sObjectPath = "/ChangeOverSet(RegNo=" + parseInt(RegId) + ")"; 
	     that.oDataModel.read( sObjectPath,{
					success:function(oData)
					{   
					    oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "ChangeOverModel");
						if(oData.PremiseType === "0"){
						    sap.ui.getCore().byId("RB11Change").setSelected(true);
						}
						 else if(oData.PremiseType === "1"){
						    sap.ui.getCore().byId("RB22Change").setSelected(true);
						}
						 else if(oData.PremiseType === "2"){
						    sap.ui.getCore().byId("RB33Change").setSelected(true);
						}
						 else if(oData.PremiseType === "3"){
						    sap.ui.getCore().byId("RB44Change").setSelected(true);
						}
						
						if(oData.Ebilling === "0"){
						    sap.ui.getCore().byId("RBGRP2_1Change").setSelected(true);
						}
						else if(oData.Ebilling === "1"){
						    sap.ui.getCore().byId("RBGRP2_2Change").setSelected(true);
						}

					    if(oData.MeterChoice === "1"){
					        sap.ui.getCore().byId("RBGRP3_1Change").setSelected(true);
					    }
					    else if(oData.MeterChoice === "2"){
					        sap.ui.getCore().byId("RBGRP3_2Change").setSelected(true);
					    }
					    else if(oData.MeterChoice === "3"){
					        sap.ui.getCore().byId("RBGRP3_3Change").setSelected(true);
					    }
						
					},
					error:function(error)
					{
							oViewModel.setProperty("/busy", false);
					}
				});
	   },
	   
	   	onSaveInDraft: function(){
		    var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/Submit", "");
		    this.onSaveNContinue();
		},
	   
	   	onSaveNContinue: function(){
		  var oViewModel = this.oView.getModel("ChangeOverView");
		    oViewModel.setProperty("/busy", true);
		    var IsSubmit = oViewModel.getProperty("/Submit");
		    var oEntry = {}; 
		    if(IsSubmit === ""){
		      oEntry.Flag = "";
		  } 
		  else {
		      oEntry.Flag = "X";
		  }
		    var RegId = sap.ui.getCore().byId("IdRegNo1Change").getValue();
		    if(RegId !== "" || RegId !== null){
		        oEntry.RegNo = parseInt(RegId);
		      // parseInt(oEntry.RegNo);
		    }
		    var sPath = "/ChangeOverSet";
		    
		  //  oEntry.Title = sap.ui.getCore().byId("IdSelectTitle").getSelectedItem().getText();
		    oEntry.NameBill = sap.ui.getCore().byId("nameAsBillInChange").getValue();
		    oEntry.ApplName = sap.ui.getCore().byId("ApplNameInput").getValue();
		    oEntry.PanNumber = sap.ui.getCore().byId("panInputChange").getValue();
		    oEntry.MobileNo = sap.ui.getCore().byId("mobInputChange").getValue();
		    oEntry.EmailId = sap.ui.getCore().byId("mailInputChange").getValue();
		    oEntry.PremiseFlatNo = sap.ui.getCore().byId("flatInputChange").getValue();
		    oEntry.PremisePlotNo = sap.ui.getCore().byId("buildInputChange").getValue();
		    oEntry.PremiseSociety = sap.ui.getCore().byId("societyInputChange").getValue();
		    oEntry.PremiseStreet = sap.ui.getCore().byId("LaneStreetId").getValue();
		    oEntry.PremiseLocality = sap.ui.getCore().byId("SubUrbIdCO").getValue();
		    oEntry.PremiseCity = sap.ui.getCore().byId("IdCityValHlp").getValue();
		    oEntry.PremisePostalCode = sap.ui.getCore().byId("IDPostalCodeVH").getValue();
		    oEntry.PremiseLandmark = sap.ui.getCore().byId("landInputChange").getValue();
		  //  oEntry.LandMark = sap.ui.getCore().byId("landInput").getValue();
		     // code to get selected radio bt for premise type 
		    
		    if (sap.ui.getCore().byId("RB11Change").getSelected()){
		     oEntry.PremiseType = "0";
		    }
		    else if(sap.ui.getCore().byId("RB22Change").getSelected()){
		        oEntry.PremiseType = "1";
		    }
		    else if(sap.ui.getCore().byId("RB33Change").getSelected()){
		        oEntry.PremiseType = "2";
		    }
		    else if(sap.ui.getCore().byId("RB44Change").getSelected()){
		        oEntry.PremiseType = "3";
		    }
             //end of code to get selected radio bt for premise type     
		    if(sap.ui.getCore().byId("IdSameAsAboveChange").getSelected()){
		    oEntry.CorrFlatNo = oEntry.PremiseFlatNo;
		    oEntry.CorrPlotNo = oEntry.PremisePlotNo;
		    oEntry.CorrSociety = oEntry.PremiseSociety;
		    oEntry.CorrStreet = oEntry.PremiseStreet;
		    oEntry.CorrLocality = oEntry.PremiseLocality;
		    oEntry.CorrCity = oEntry.PremiseCity;
		    oEntry.CorrPostalCode = oEntry.PremisePostalCode;
		    oEntry.CorrLandmark = oEntry.PremiseLandmark;   
		    }
		    else {
		    oEntry.CorrFlatNo = sap.ui.getCore().byId("aflatInputChange").getValue();
		    oEntry.CorrPlotNo = sap.ui.getCore().byId("abuildInputChange").getValue();
		    oEntry.CorrSociety = sap.ui.getCore().byId("asocietyInputChange").getValue();
		    oEntry.CorrStreet = sap.ui.getCore().byId("alaneInputChange").getValue();
		    oEntry.CorrLocality = sap.ui.getCore().byId("asubuInputChange").getValue();
		    oEntry.CorrCity = sap.ui.getCore().byId("acityInpuChanget").getValue();
		    oEntry.CorrPostalCode = sap.ui.getCore().byId("apostInputChange").getValue();
		    oEntry.CorrLandmark = sap.ui.getCore().byId("alandInputChange").getValue();   
		    }
		  //  oEntry.NameOwner = sap.ui.getCore().byId("OwenerName").getValue();
		  
		    if (sap.ui.getCore().byId("RBGRP2_1Change").getSelected()){
		     oEntry.Ebilling = "0";
		    }
		    else if(sap.ui.getCore().byId("RBGRP2_2Change").getSelected()){
		        oEntry.Ebilling = "1";
		    }
		    
		    if(sap.ui.getCore().byId("RBGRP3_1Change").getSelected()){
		    
		        oEntry.MeterChoice = "1";
		    }
		    else if(sap.ui.getCore().byId("RBGRP3_2Change").getSelected()){
		    
		        oEntry.MeterChoice = "2";
		    }
		    else if(sap.ui.getCore().byId("RBGRP3_3Change").getSelected()){
		    
		        oEntry.MeterChoice = "3";
		    }
		   
		    oEntry.ExistingUtility = sap.ui.getCore().byId("IdExistUtil").getSelectedKey();
		    oEntry.ExistingUtilityNo = sap.ui.getCore().byId("seciInputChange").getValue();
		    oEntry.MeterNo = sap.ui.getCore().byId("galaInputChange").getValue();
		    oEntry.PurposeSupply = sap.ui.getCore().byId("IdPurposeSuply").getSelectedKey();
		    oEntry.SupplyCategory = sap.ui.getCore().byId("IdSuplyCat").getSelectedKey();
		    oEntry.ConnLoad = sap.ui.getCore().byId("streeInputChange").getValue();
		    oEntry.BillAmount = sap.ui.getCore().byId("banInputChange").getValue();
		    oEntry.ContractDmd = sap.ui.getCore().byId("placInputChange").getValue();
		    oEntry.Consumption = parseInt(sap.ui.getCore().byId("psInputChange").getValue());
		  //  parseInt(oEntry.Consumption);
		    oEntry.PhaseOfSupply = sap.ui.getCore().byId("IdTypeSuply").getSelectedKey();
		    oEntry.NoOfMeters = parseInt(sap.ui.getCore().byId("inputemailChange").getValue());
		    oEntry.Bpkind = "CHO";
		  //  parseInt(oEntry.NoOfMeters);
            this.oDataModel.create(sPath,oEntry,
				{
					async : true,
					success:function(oData)
					{  
					    MessageBox.alert("Your Registration No. for Changeover connection is " + oData.LvRegNo + ".");
						oViewModel.setProperty("/busy", false);
					},
					error:function(error)
					{
						oViewModel.setProperty("/busy", false);
					}
				});    
		},
			// end of code for changeover process
			_onMetadataLoaded: function() {
				// Store original busy indicator delay for the detail view
				self = this;
				var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
					oViewModel = self.oView.getModel("ChangeOverView");
				// Make sure busy indicator is displayed immediately when
				// detail view is displayed for the first time
				oViewModel.setProperty("/delay", 0);
				// Binding the view will set it to not busy - so the view is always busy if it is not bound
				oViewModel.setProperty("/busy", true);
				// Restore original busy indicator delay for the detail view
				oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
			},
	
			handleButtonPress: function(evt) {
		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Application forms") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ChangeoverConnection.Applicationforms"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "FAQs") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ChangeoverConnection.FAQs"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Procedure and Guidelines") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ChangeoverConnection.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ChangeoverConnection.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}
				
		

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.ChangeOverConnection
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.ChangeOverConnection
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.ChangeOverConnection
		 */
		//	onExit: function() {
		//
		//	}

	});

});