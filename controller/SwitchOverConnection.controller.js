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
	return Controller.extend("tatapower.dev.controller.SwitchOverConnection", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.SwitchOverConnection
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function(evt) {
					var oViewModel = new JSONModel({
					busy: false,
					delay: 0,
					Submit:"X"
					});
        
			
			this.getRouter().getRoute("SwitchOverConnection").attachPatternMatched(this._onObjectMatched, this);
			this.oView.setModel(oViewModel, "SwitchOverConnectionView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("McfPortalModel");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			
			var oModel = new sap.ui.model.json.JSONModel("json/SwitchOverConnection.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.SwitchoverConnection.Applicationforms"].join("."), this);
			vbox.addItem(fragment1);
			
			var that = this;
			var drpcatofsupply = '/ExistingUtilitySerachHelpSet';
			//get the Existing utility drop down value from odata
				this.oDataModel.read(drpcatofsupply, {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "ExistingUtilitydata");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});
				
				//get the Purpose of Supply drop down value from odata
					var drppurposeofsupply = '/PurposeOfSupplySerachHelpSet';
					this.oDataModel.read(drppurposeofsupply, {
						success: function(oData) {
							oViewModel.setProperty("/busy", false);
							that.oView.setModel(new JSONModel(oData), "PurposeOfSupplydata");
						},
						error: function(error) {
							oViewModel.setProperty("/busy", false);
						}
					});
				
					//get the Category of Supply drop down value from odata set
					var drpcatofsearch = '/SupplyCatSerachHelpSet';
					this.oDataModel.read(drpcatofsearch, {
						success: function(oData) {
							oViewModel.setProperty("/busy", false);
							that.oView.setModel(new JSONModel(oData), "SupplyCatSerachdata");
						},
						error: function(error) {
							oViewModel.setProperty("/busy", false);
						}
					});
			
			
		},
		_onObjectMatched: function() {
			var oModel1 = this.getOwnerComponent().getModel("McfPortalModel");
			//this.oView.getModel().metadataLoaded().then(function() {	
			oModel1.metadataLoaded().then(function() {
			this.onGetStreetSH();
			this.onGetSuburbanSH();
			this.onGetPostalCodeSH();
            this.onGetExistUtility();
            this.onGetSupplyPurpose();
            this.onGetSupplyCategory();
            this.onGetSupplyType();
				}.bind(this));
			},
				_onMetadataLoaded: function() {
				// Store original busy indicator delay for the detail view
				self = this;
				var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
					oViewModel = self.oView.getModel("SwitchOverConnectionView");
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

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.SwitchoverConnection.Applicationforms"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "FAQs") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.SwitchoverConnection.FAQs"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Procedure and Guidelines") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.SwitchoverConnection.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Apply Online") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.SwitchoverConnection.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},
			onMessageErrorDialogPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.information(
				"1. To take supply of electrical energy from the Tata power co. ltd at the aforesaid premises situated within their license area,not exceeding the sanctioned load of my/our installation as stated above. 2. To be bound by the MERC (Electricity Supply Code and Other conditions of supply) Regulations, 2005 and as amended from timeto time and to provide necessary security deposit as specified therein.3. To be bound by the provisions of MERC order dated 15th Oct.2009 in Case No. 50 of 2009 pertaining to interim arrangement forMumbai North area customer changeover by usage of network infrastructure of Existing Distribution License and any further MERCorders/regulations or otherwise regarding the same.4. To be bound by the provisions of the Power Suply greement (for all sanctioned load of 50 kW/63 kVA and more) & SubstationSpace Agreement (where substation is required) to be executed with Tata Power.5. To pay for the said supply at the prevailing tariff rates and also to pay the charges based on the Schedule of Charges asapproved by MERC for Tata Power from time to time.6. Customers agree to pay the necessary wheeling losses/wheeling charges as approved by MERC from time to time.7. There are no arrears pending against the premises for which I/we have applied for power supply. If any arrears are found tobe pending against the said premises, I/we shall be bound to make payment towards such arrears. Also, I/we have been informedand made aware that if any previous arrears are pending on the premises, I/we shall not receive any new connection for the saidpremises.8. I/We hereby certify that the electricity installation work at premises and the party mentioned above has been carried out byme/us in full conformity with the prevailing CEA (Measures Relating to Safety and Electric Supply) Regulations, 2010 or anyamendments thereof. The particulars of the installation and insulation test result obtained by me/us are given below.",
				{
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		},
		// start of code for changeover process
			onGetSupplyPurpose: function(){
			 var that = this;
		    var oViewModel = this.oView.getModel("SwitchOverConnectionView");
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
		    var oViewModel = this.oView.getModel("SwitchOverConnectionView");
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
		    var oViewModel = this.oView.getModel("SwitchOverConnectionView");
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
		    var oViewModel = this.oView.getModel("SwitchOverConnectionView");
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
		    var oViewModel = this.oView.getModel("SwitchOverConnectionView");
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
		    var oViewModel = this.oView.getModel("SwitchOverConnectionView");
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
		    var oViewModel = this.oView.getModel("SwitchOverConnectionView");
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
				this._valueHelpDialog = sap.ui.xmlfragment("tatapower.dev.fragments.SwitchoverConnection.SearchHelpStreet1",this);
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
	            sap.ui.getCore().byId("laneInputSWC").setValue(oContext.getObject().Street); 
	            return oContext.getObject().Street;    
	               
			 });
			}
		},
		onVHSubUrb1: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog1) {
				this._valueHelpDialog1 = sap.ui.xmlfragment("tatapower.dev.fragments.SwitchoverConnection.SearchHelpSubUrban1",this);
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
	            sap.ui.getCore().byId("localityInputSWC").setValue(oContext.getObject().CityPart); 
	            return oContext.getObject().CityPart;    
	               
			 });
			}
		},
			onCityValHelp: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog2) {
				this._valueHelpDialog2 = sap.ui.xmlfragment("tatapower.dev.fragments.SwitchoverConnection.SearchHelpCity1",this);
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
	            sap.ui.getCore().byId("cityInputSWC").setValue(oContext.getObject().CityName); 
	            return oContext.getObject().CityName;    
	               
			 });
			}
		},
			onPostalCodeHelp: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog3) {
				this._valueHelpDialog3 = sap.ui.xmlfragment("tatapower.dev.fragments.SwitchoverConnection.SearchHelpPostalCode",this);
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
	            sap.ui.getCore().byId("postInputSWC").setValue(oContext.getObject().PostCode); 
	            return oContext.getObject().PostCode;    
	               
			 });
			}
		},
		changeconsumer : function(){
			if(sap.ui.getCore().byId("RBGRP2_11SWC").getSelected()){
					$("#existingcondivSWC").css("display","block");
					$("#othercondivSWC").css("display","none");
					$("#blkdiv2SWC").css("display","none");
					sap.ui.getCore().byId("consumernoInputSWC").setValue('');
					sap.ui.getCore().byId("regnoInputSWC").setValue('');
					sap.ui.getCore().byId('btnSaveAsDraftSWC').setText('Save As Draft');
					$("#btnNextSWC").css("display","block");
			}else{
					$("#existingcondivSWC").css("display","none");
					$("#othercondivSWC").css("display","block");
					sap.ui.getCore().byId("consumernoInputSWC").setValue('');
					sap.ui.getCore().byId("regnoInputSWC").setValue('');
					sap.ui.getCore().byId('btnSaveAsDraftSWC').setText('Save As Draft');
					$("#btnNextSWC").css("display","block");
			}
		},
		changeregconsumer : function(){
			if(sap.ui.getCore().byId("RBGRPOTHR_1SWC").getSelected()){
					$("#regcondivSWC").css("display","block");
					$("#blkdiv2SWC").css("display","none");
					sap.ui.getCore().byId('btnSaveAsDraftSWC').setText('Save As Draft');
					$("#btnNextSWC").css("display","block");
			}else{
					$("#blkdiv2SWC").css("display","block");
					$("#regcondivSWC").css("display","none");
					sap.ui.getCore().byId('btnSaveAsDraftSWC').setText('Save As Draft');
					$("#btnNextSWC").css("display","block");
					//clear all data from input
				   sap.ui.getCore().byId("nameInputSWC").setValue('');
				   
			sap.ui.getCore().byId("fullnameInputSWC").setValue('');
			sap.ui.getCore().byId("flatInputSWC").setValue('');
			sap.ui.getCore().byId("buildInputSWC").setValue('');
			sap.ui.getCore().byId("societyInputSWC").setValue('');
			sap.ui.getCore().byId("laneInputSWC").setValue('');
			sap.ui.getCore().byId("postInputSWC").setValue('');
			sap.ui.getCore().byId("localityInputSWC").setValue('');
			sap.ui.getCore().byId("cityInputSWC").setValue('');
			sap.ui.getCore().byId("landInputSWC").setValue('');
			sap.ui.getCore().byId("mobInputSWC").setValue('');
			sap.ui.getCore().byId("landlineInputSWC").setValue('');
			sap.ui.getCore().byId("mailInputSWC").setValue('');
			sap.ui.getCore().byId("panInputSWC").setValue('');
					
			sap.ui.getCore().byId('rnameInputSWC').setValue('');
			sap.ui.getCore().byId('rflatInputSWC').setValue('');
			sap.ui.getCore().byId('rbuildInputSWC').setValue('');
			sap.ui.getCore().byId('rsocietyInputSWC').setValue('');
			sap.ui.getCore().byId('rlaneInputSWC').setValue('');
		    sap.ui.getCore().byId('rpostInputSWC').setValue('');
			sap.ui.getCore().byId('rlocalityInputSWC').setValue('');
			sap.ui.getCore().byId('rcityInputSWC').setValue('');
			sap.ui.getCore().byId('rlandInputSWC').setValue('');
			
			sap.ui.getCore().byId('aflatInputSWC').setValue('');
			sap.ui.getCore().byId('abuildInputSWC').setValue('');
			sap.ui.getCore().byId('asocietyInputSWC').setValue('');
			sap.ui.getCore().byId('alaneInputSWC').setValue('');
			sap.ui.getCore().byId('apostInputSWC').setValue('');
			sap.ui.getCore().byId('alocalityInputSWC').setValue('');
			sap.ui.getCore().byId('acityInputSWC').setValue('');
			sap.ui.getCore().byId('alandInputSWC').setValue('');
			sap.ui.getCore().byId('contractDemandInputSWC').setValue('');
			sap.ui.getCore().byId('connectedLoadInputSWC').setValue('');
			sap.ui.getCore().byId('consumptionInputSWC').setValue('');
			sap.ui.getCore().byId('billAmountInputSWC').setValue('');
			sap.ui.getCore().byId('typeOfSupplyInputSWC').setValue('');
		    sap.ui.getCore().byId('noOfMeterInputSWC').setValue('');
					//$("#selectiondiv").css("display","none");
			}
		},
		rbchange : function(){
			if(sap.ui.getCore().byId("RB11SWC").getSelected()){
					sap.ui.getCore().byId('rnameInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rflatInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rbuildInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rsocietyInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rlaneInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rlocalityInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rcityInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rlandInputSWC').setProperty("enabled",false);
					sap.ui.getCore().byId('rpostInputSWC').setProperty("enabled",false);
			}else{
				    sap.ui.getCore().byId('rnameInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rflatInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rbuildInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rsocietyInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rlaneInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rlocalityInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rcityInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rlandInputSWC').setProperty("enabled",true);
					sap.ui.getCore().byId('rpostInputSWC').setProperty("enabled",true);
			}
		},
			onConsumerDetails : function(){	
			var ChoConsNo = sap.ui.getCore().byId('consumernoInputSWC').getValue();
			var RegNo = sap.ui.getCore().byId('regnoInputSWC').getValue();
			if(ChoConsNo !== "" || RegNo !== ""){
				if(ChoConsNo === ""){
					ChoConsNo = 0;
				}
				if(RegNo === ""){
					RegNo = 0;
				}
				sap.ui.getCore().byId('btnSaveAsDraftSWC').setText('Submit');
				//$("#btnNext").css("display","none");
				/*$("#btnSaveAsDraft").css("display","none");
				$("#btnSubmit").css("display","block");*/
				//$("#btnClear").css("display","none");
				$("#blkdiv2SWC").css("display","block");
				//$("#selectiondiv").css("display","none");
					var that = this;
					var oViewModel = this.oView.getModel("SwitchOverConnectionView");
					var sPath = "/SwitchOverSet(RegNo="+RegNo+",ChoConsNo='"+ChoConsNo+"')";
					//alert(sPath);
					oViewModel.setProperty("/busy", true);
					this.oDataModel.read(sPath, {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "ConsumerDetails");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});
			}else{
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.alert(
				"Invalid Number.",
				{
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
				);
			}
		},
		onclickSameAsAbove : function(){
			//same of above fucntionality
			if(sap.ui.getCore().byId("IdSameAsAboveSWC").getSelected()){
			sap.ui.getCore().byId('aflatInputSWC').setValue(sap.ui.getCore().byId('rflatInputSWC').getValue());
			sap.ui.getCore().byId('abuildInputSWC').setValue(sap.ui.getCore().byId('rbuildInputSWC').getValue());
			sap.ui.getCore().byId('asocietyInputSWC').setValue(sap.ui.getCore().byId('rsocietyInputSWC').getValue());
			sap.ui.getCore().byId('alaneInputSWC').setValue(sap.ui.getCore().byId('rlaneInputSWC').getValue());
			sap.ui.getCore().byId('apostInputSWC').setValue(sap.ui.getCore().byId('rpostInputSWC').getValue());
			sap.ui.getCore().byId('alocalityInputSWC').setValue(sap.ui.getCore().byId('rlocalityInputSWC').getValue());
			sap.ui.getCore().byId('acityInputSWC').setValue(sap.ui.getCore().byId('rcityInputSWC').getValue());
			sap.ui.getCore().byId('alandInputSWC').setValue(sap.ui.getCore().byId('rlandInputSWC').getValue());
			}
		},
		onSaveAsDraft : function(){
			
			if(sap.ui.getCore().byId('IdagreetermSWC').getSelected()){
			var oViewModel = this.oView.getModel("SwitchOverConnectionView");
			oViewModel.setProperty("/busy", true);
			var oEntry={};
			var sPath = "/SwitchOverSet";
		//	oEntry.ConsumerNo = sap.ui.getCore().byId("consumernoInput").getValue();
			if(sap.ui.getCore().byId("nameInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Name( As per bill )");
				return false;
			}else{
			oEntry.NameBill = sap.ui.getCore().byId("nameInputSWC").getValue();}
			if(sap.ui.getCore().byId("fullnameInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Applicant Name (In full)");
				return false;
			}else{
			oEntry.ApplName = sap.ui.getCore().byId("fullnameInputSWC").getValue();}
			if(sap.ui.getCore().byId("flatInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Flat/Gala/shop No/ office No");
				return false;
			}else{
			oEntry.FlatNo = sap.ui.getCore().byId("flatInputSWC").getValue();}
			if(sap.ui.getCore().byId("buildInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Building Name/Plot No");
				return false;
			}else{
			oEntry.PlotNo = sap.ui.getCore().byId("buildInputSWC").getValue();}
			if(sap.ui.getCore().byId("societyInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Society");
				return false;
			}else{
			oEntry.Society = sap.ui.getCore().byId("societyInputSWC").getValue();}
			if(sap.ui.getCore().byId("laneInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Lane/Street");
				return false;
			}else{
			oEntry.Street = sap.ui.getCore().byId("laneInputSWC").getValue();}
			if(sap.ui.getCore().byId("postInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Postal Code");
				return false;
			}else{
			oEntry.PostalCode = sap.ui.getCore().byId("postInputSWC").getValue();}
				if(sap.ui.getCore().byId("localityInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Locality");
				return false;
			}else{
			oEntry.Locality = sap.ui.getCore().byId("localityInputSWC").getValue();}
				if(sap.ui.getCore().byId("cityInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter City");
				return false;
			}else{
			oEntry.City = sap.ui.getCore().byId("cityInputSWC").getValue();}
			if(sap.ui.getCore().byId("landInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Landmark");
				return false;
			}else{
			oEntry.Landmark = sap.ui.getCore().byId("landInputSWC").getValue();}
			var mobileno = sap.ui.getCore().byId("mobInputSWC").getValue();
			if(mobileno ===""){
					MessageBox.alert("Please Enter Mobile number");
				return false;
			}else if(isNaN(mobileno) || (mobileno.length > 10 || mobileno.length <10)){MessageBox.alert("Please Enter Valid Mobile number");
				return false;}else{
			oEntry.MobileNo = mobileno;}
			oEntry.LandlineNo = sap.ui.getCore().byId("landlineInputSWC").getValue();
				if(sap.ui.getCore().byId("mailInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Email ID");
				return false;
			}else{
			oEntry.EmailId = sap.ui.getCore().byId("mailInputSWC").getValue();}
			oEntry.PanNumber = sap.ui.getCore().byId("panInputSWC").getValue();
		
			if(sap.ui.getCore().byId('RB11SWC').getSelected()){
				oEntry.PremiseType = "1";
			}else if(sap.ui.getCore().byId('RB22SWC').getSelected()){
				oEntry.PremiseType = "2";
			}else if(sap.ui.getCore().byId('RB33SWC').getSelected()){
				oEntry.PremiseType = "3";
			}else if(sap.ui.getCore().byId('RB44SWC').getSelected()){
				oEntry.PremiseType = "4";
			}
			
			oEntry.PremiseName = sap.ui.getCore().byId('rnameInputSWC').getValue();
			oEntry.PremiseFlatNo = sap.ui.getCore().byId('rflatInputSWC').getValue();
			oEntry.PremisePlotNo = sap.ui.getCore().byId('rbuildInputSWC').getValue();
			oEntry.PremiseSociety = sap.ui.getCore().byId('rsocietyInputSWC').getValue();
			oEntry.PremiseStreet = sap.ui.getCore().byId('rlaneInputSWC').getValue();
			oEntry.PremisePostalCode = sap.ui.getCore().byId('rpostInputSWC').getValue();
			oEntry.PremiseLocality = sap.ui.getCore().byId('rlocalityInputSWC').getValue();
			oEntry.PremiseCity = sap.ui.getCore().byId('rcityInputSWC').getValue();
			oEntry.PremiseLandmark = sap.ui.getCore().byId('rlandInputSWC').getValue();
			if(sap.ui.getCore().byId("aflatInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address Flat/Gala/shop No/ office No");
				return false;
			}else{
			oEntry.CorrFlatNo = sap.ui.getCore().byId('aflatInputSWC').getValue();}
			if(sap.ui.getCore().byId("abuildInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address - Building Name/Plot No");
				return false;
			}else{
			oEntry.CorrPlotNo = sap.ui.getCore().byId('abuildInputSWC').getValue();}
			if(sap.ui.getCore().byId("asocietyInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address - Society");
				return false;
			}else{
			oEntry.CorrSociety = sap.ui.getCore().byId('asocietyInputSWC').getValue();}
			if(sap.ui.getCore().byId("alaneInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address - Lane/Street");
				return false;
			}else{
			oEntry.CorrStreet = sap.ui.getCore().byId('alaneInputSWC').getValue();}
				if(sap.ui.getCore().byId("apostInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address - Postal Code");
				return false;
			}else{
			oEntry.CorrPostalCode = sap.ui.getCore().byId('apostInputSWC').getValue();}
				if(sap.ui.getCore().byId("alocalityInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address - Locality");
				return false;
			}else{
			oEntry.CorrLocality = sap.ui.getCore().byId('alocalityInputSWC').getValue();}
				if(sap.ui.getCore().byId("acityInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address - City");
				return false;
			}else{
			oEntry.CorrCity = sap.ui.getCore().byId('acityInputSWC').getValue();}
			if(sap.ui.getCore().byId("alandInputSWC").getValue() ===""){
					MessageBox.alert("Please Enter Coresponding Address - Landmark");
				return false;
			}else{
			oEntry.CorrLandmark = sap.ui.getCore().byId('alandInputSWC').getValue();}
			
			if(sap.ui.getCore().byId('RBGRP2_1SWC').getSelected()){
				oEntry.Ebilling = "1";
			}else if(sap.ui.getCore().byId('RBGRP2_2SWC').getSelected()){
				oEntry.Ebilling = "2";	
			}
			if(sap.ui.getCore().byId('existingutilityInputSWC').getSelectedKey() ===""){
					MessageBox.alert("Please Enter Existing Utility");
				return false;
			}else{
			oEntry.ExistingUtility = sap.ui.getCore().byId('existingutilityInputSWC').getSelectedKey();}
			if(sap.ui.getCore().byId('existingutilitynoInputSWC').getValue() ===""){
					MessageBox.alert("Please Enter Existing Utility No");
				return false;
			}else{
			oEntry.ExistingUtilityNo = sap.ui.getCore().byId('existingutilitynoInputSWC').getValue();}
			if(sap.ui.getCore().byId('meternoInputSWC').getValue() ===""){
					MessageBox.alert("Please Enter Meter No");
				return false;
			}else{
			oEntry.MeterNo = sap.ui.getCore().byId('meternoInputSWC').getValue();}
			if(sap.ui.getCore().byId('purposeofsupplyInputSWC').getSelectedKey() ===""){
					MessageBox.alert("Please Enter Purpose of Supply");
				return false;
			}else{
			oEntry.PurposeSupply = sap.ui.getCore().byId('purposeofsupplyInputSWC').getSelectedKey();}
			if(sap.ui.getCore().byId('categoryofsupplyInputSWC').getSelectedKey() ===""){
					MessageBox.alert("Please Enter Category of Supply");
				return false;
			}else{
			oEntry.SupplyCategory = sap.ui.getCore().byId('categoryofsupplyInputSWC').getSelectedKey();}
			if(sap.ui.getCore().byId('ichoosemeterInputSWC').getValue() === "Tata Power"){
				oEntry.MeterChoice = "1";
			}else{
				oEntry.MeterChoice = "0";
			}
			if(sap.ui.getCore().byId('contractDemandInputSWC').getValue() ===""){
					MessageBox.alert("Please Enter Contract Demand");
				return false;
			}else{
			oEntry.ContractDmd = sap.ui.getCore().byId('contractDemandInputSWC').getValue();}
			oEntry.ConnLoad = sap.ui.getCore().byId('connectedLoadInputSWC').getValue();
			oEntry.Consumption = parseInt(sap.ui.getCore().byId('consumptionInputSWC').getValue());
			oEntry.BillAmount = sap.ui.getCore().byId('billAmountInputSWC').getValue();
			if(sap.ui.getCore().byId('typeOfSupplyInputSWC').getValue() ===""){
					MessageBox.alert("Please Enter Type Of Supply");
				return false;
			}else{
			oEntry.PhaseOfSupply = sap.ui.getCore().byId('typeOfSupplyInputSWC').getValue();}
			oEntry.NoOfMeters = parseInt(sap.ui.getCore().byId('noOfMeterInputSWC').getValue());
			if(sap.ui.getCore().byId("consumernoInputSWC").getValue() !== ''){
				oEntry.ConsumerNo = sap.ui.getCore().byId("consumernoInputSWC").getValue();
				oEntry.Flag = "2";//2 for submit
			}else if(sap.ui.getCore().byId("regnoInputSWC").getValue() !== ''){
				oEntry.RegNo = parseInt(sap.ui.getCore().byId("regnoInputSWC").getValue());
				oEntry.Flag = "2";//2 for submit
			}else{
				oEntry.Flag = "1";//1 for save and draft
			}
			
			
			oEntry.Bpkind = "SWO";
			//var myJSON = JSON.stringify(oEntry);
			//console.log(oEntry);
			this.oDataModel.create(sPath, oEntry, {
				async: true,
				success: function(oData) {
				//	MessageBox.alert("Saved as Draft");
						MessageBox.alert("Your Registration No. is:" + oData.RegNo +
						".");
					oViewModel.setProperty("/busy", false);
				},
				error: function(error) {
					// MessageBox.error("Please enter correct Data.");
					oViewModel.setProperty("/busy", false);
				}
			});
			}else{
				MessageBox.alert("Accept term and condition");
			}
			
		},
		onPressNext : function(){
			$("#nextpageSWC").css("display","block");
			$("#firstpageSWC").css("display","none");
		},
		onBackPage : function(){
			$("#nextpageSWC").css("display","none");
			$("#firstpageSWC").css("display","block");
		}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf tatapower.dev.view.SwitchOverConnection
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.SwitchOverConnection
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.SwitchOverConnection
		 */
		//	onExit: function() {
		//
		//	}

	});

});