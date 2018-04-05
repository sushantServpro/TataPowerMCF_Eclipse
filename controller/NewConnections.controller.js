sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/formatter",
	"tatapower/dev/model/models",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator"
], function(Controller,JSONModel,formatter, models, Filter, MessageToast, MessageBox, FilterOperator) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.NewConnections", {
		
		onInit: function() {
		    
		    var oViewModel = new JSONModel({
					busy: false,
					delay: 0,
					Submit:"X"
					});
            
            this.oView.setModel(oViewModel, "NewConnectionView");
            this.oDataModel = this.getOwnerComponent().getModel();
			var oModel = new sap.ui.model.json.JSONModel("json/NewConnection.json");
			
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			fragment.setModel(oModel);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
            
		},
			onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		onAddToLoadTab: function(){
		 var oTable =  sap.ui.getCore().byId("ApplyOlLoadTab");
	     var oTemplate = oTable.getBindingInfo("items").template;
	     var Apertures = sap.ui.getCore().byId("apprtinput").getValue();
	    var NoPoint = sap.ui.getCore().byId("pointInput").getValue();
	    var WattPerPoint = sap.ui.getCore().byId("wattInput").getValue();
	    var TotWatt = parseInt(NoPoint) * parseInt(WattPerPoint);
        var oData = [{LoadDetail:Apertures, NoOfPoints:NoPoint, WattagePoints:WattPerPoint, TotalWattage:TotWatt}];
        var aData = (oTable.getItems() || []).map(function(oItem){ // assuming that you are using the default model  
            return oItem.getBindingContext().getObject();
            });
        if(aData.length > 0){
            for(var i = 0; i < aData.length ; i++ ){
                 oData.push(aData[i]);     
            }
        }         
        var oModel = new sap.ui.model.json.JSONModel();             // created a JSON model      
        oModel.setData({LoadDetailsSet: oData});                     // Set the data to the model using the JSON            
        oTable.setModel(oModel);  
        oTable.bindItems({path:"/LoadDetailsSet",template:oTemplate});  
		},
		
		onRemoveLoadTab: function(){
	     var oTable =  sap.ui.getCore().byId("ApplyOlLoadTab");
	     var oTemplate = oTable.getBindingInfo("items").template;
	     var oSelectedItem = oTable.getSelectedItem();
	     if(oSelectedItem === null || oSelectedItem === undefined || oSelectedItem === "" ){
					MessageBox.alert("Please select at least one row.");
	     }
	     else{
	   	 var index = oTable.indexOfItem(oSelectedItem);
	   	 var aData = (oTable.getItems() || []).map(function(oItem){ // assuming that you are using the default model  
            return oItem.getBindingContext().getObject();
            });
        aData.splice(index,1); 
        var oModel = new sap.ui.model.json.JSONModel();             // created a JSON model      
        oModel.setData({LoadDetailsSet: aData});                     // Set the data to the model using the JSON            
        oTable.setModel(oModel);  
        oTable.bindItems({path:"/LoadDetailsSet",template:oTemplate});
	     }
	   },
	   
	   onGetDraftData: function(){
	     var oViewModel = this.oView.getModel("NewConnectionView");
	     var RegId = sap.ui.getCore().byId("IdRegNo1").getValue();
	     var that = this;
	     var sObjectPath = "/OnlineApplicationSet(RegId='" + RegId + "')"; 
	     that.oView.getModel().read( sObjectPath,{
					urlParameters: {"$expand": "LoadDetailsSet"},
					success:function(oData)
					{   
					    oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "NewConnectionModel");
					    
					    var oTable =  sap.ui.getCore().byId("ApplyOlLoadTab");
	                    var oTemplate = oTable.getBindingInfo("items").template;
                        var aData = oData.LoadDetailsSet;
                        var oModel = new sap.ui.model.json.JSONModel();             // created a JSON model      
                        oModel.setData({LoadDetailsSet: aData});                     // Set the data to the model using the JSON            
                        oTable.setModel(oModel);  
                        oTable.bindItems({path:"/LoadDetailsSet",template:oTemplate});
					    
						if(oData.TypePremises === "0"){
						    sap.ui.getCore().byId("RB11").setSelected(true);
						}
						 else if(oData.TypePremises === "1"){
						    sap.ui.getCore().byId("RB22").setSelected(true);
						}
						 else if(oData.TypePremises === "2"){
						    sap.ui.getCore().byId("RB33").setSelected(true);
						}
						 else if(oData.TypePremises === "3"){
						    sap.ui.getCore().byId("RB44").setSelected(true);
						}
						
						if(oData.EBilling === "0"){
						    sap.ui.getCore().byId("RBGRP2_1").setSelected(true);
						}
						else if(oData.EBilling === "1"){
						    sap.ui.getCore().byId("RBGRP2_2").setSelected(true);
						}
						
					    if(oData.SinglePhase === "X"){
					        sap.ui.getCore().byId("LowVoltSingle").setSelected(true);
					    }
					    if(oData.ThreePhase === "X"){
					        sap.ui.getCore().byId("LowVoltThree").setSelected(true);
					    }
					    if(oData.HighVoltage === "X"){
					        sap.ui.getCore().byId("HighVolt").setSelected(true);
					    }
					    
					    if(oData.MeterType === "1"){
					        sap.ui.getCore().byId("RBGRP3_1").setSelected(true);
					    }
					    else if(oData.MeterType === "2"){
					        sap.ui.getCore().byId("RBGRP3_2").setSelected(true);
					    }
					    
					    if(oData.MeterType === "1"){
					        sap.ui.getCore().byId("RBGRP4_1").setSelected(true);
					    }
					    else if(oData.MeterType === "2"){
					        sap.ui.getCore().byId("RBGRP4_2").setSelected(true);
					    }
					    else if(oData.MeterType === "3"){
					        sap.ui.getCore().byId("RBGRP4_3").setSelected(true);
					    }
					    else if(oData.MeterType === "4"){
					        sap.ui.getCore().byId("RBGRP4_4").setSelected(true);
					    }
					    
					    
						
						
					},
					error:function(error)
					{
							oViewModel.setProperty("/busy", false);
					}
				});
	     
	   },
	   
		onSaveInDraft: function(){
		    var oViewModel = this.oView.getModel("NewConnectionView");
		    oViewModel.setProperty("/Submit", "");
		    this.onSaveNContinue();
		},
		
		onSaveNContinue: function(){
		  var oViewModel = this.oView.getModel("NewConnectionView");
		    oViewModel.setProperty("/busy", true);
		    var IsSubmit = oViewModel.getProperty("/Submit");
		    var oEntry = {}; 
		    if(IsSubmit === ""){
		      oEntry.Flag = "";
		  } 
		  else {
		      oEntry.Flag = "X";
		  }
		    var RegId = sap.ui.getCore().byId("IdRegNo1").getValue();
		    if(RegId !== "" || RegId !== null){
		        oEntry.RegId = RegId;
		    }
		    var sPath = "/OnlineApplicationSet";
		    oEntry.Title = sap.ui.getCore().byId("IdSelectTitle").getSelectedItem().getText();
		    oEntry.FirstName = sap.ui.getCore().byId("nameInput").getValue();
		    oEntry.MiddleName = sap.ui.getCore().byId("middleInput").getValue();
		    oEntry.LastName = sap.ui.getCore().byId("lastInput").getValue();
		    oEntry.Mobile = sap.ui.getCore().byId("mobInput").getValue();
		    oEntry.Email = sap.ui.getCore().byId("mailInput").getValue();
		    oEntry.PancardNo = sap.ui.getCore().byId("panInput").getValue();
		    oEntry.FlatNo = sap.ui.getCore().byId("flatInput").getValue();
		    oEntry.BuildName = sap.ui.getCore().byId("buildInput").getValue();
		    oEntry.Society = sap.ui.getCore().byId("societyInput").getValue();
		    oEntry.Street = sap.ui.getCore().byId("laneInput").getValue();
		    oEntry.Suburb = sap.ui.getCore().byId("subuInput").getValue();
		    oEntry.City1 = sap.ui.getCore().byId("cityInput").getValue();
		    oEntry.PostCode1 = sap.ui.getCore().byId("postInput").getValue();
		    oEntry.LandMark = sap.ui.getCore().byId("landInput").getValue();
		     // code to get selected radio bt for premise type 
		    
		    if (sap.ui.getCore().byId("RB11").getSelected()){
		     oEntry.TypePremises = "0";
		    }
		    else if(sap.ui.getCore().byId("RB22").getSelected()){
		        oEntry.TypePremises = "1";
		    }
		    else if(sap.ui.getCore().byId("RB33").getSelected()){
		        oEntry.TypePremises = "2";
		    }
		    else if(sap.ui.getCore().byId("RB44").getSelected()){
		        oEntry.TypePremises = "3";
		    }
             //end of code to get selected radio bt for premise type     
		    if(sap.ui.getCore().byId("IdSameAsAbove").getSelected()){
		    oEntry.FlatNo1 = oEntry.FlatNo;
		    oEntry.BuildName1 = oEntry.BuildName;
		    oEntry.Society1 = oEntry.Society;
		    oEntry.Street1 = oEntry.Street;
		    oEntry.Suburb1 = oEntry.Suburb;
		    oEntry.City11 = oEntry.City1;
		    oEntry.PostCode11 = oEntry.PostCode1;
		    oEntry.LandMark1 = oEntry.LandMark;   
		    }
		    else {
		    oEntry.FlatNo1 = sap.ui.getCore().byId("aflatInput").getValue();
		    oEntry.BuildName1 = sap.ui.getCore().byId("abuildInput").getValue();
		    oEntry.Society1 = sap.ui.getCore().byId("asocietyInput").getValue();
		    oEntry.Street1 = sap.ui.getCore().byId("alaneInput").getValue();
		    oEntry.Suburb1 = sap.ui.getCore().byId("asubuInput").getValue();
		    oEntry.City11 = sap.ui.getCore().byId("acityInput").getValue();
		    oEntry.PostCode11 = sap.ui.getCore().byId("apostInput").getValue();
		    oEntry.LandMark1 = sap.ui.getCore().byId("alandInput").getValue();   
		    }
		    oEntry.NameOwner = sap.ui.getCore().byId("OwenerName").getValue();
		  
		    if (sap.ui.getCore().byId("RBGRP2_1").getSelected()){
		     oEntry.EBilling = "0";
		    }
		    else if(sap.ui.getCore().byId("RBGRP2_2").getSelected()){
		        oEntry.EBilling = "1";
		    }
		  //  var EBilling1 = sap.ui.getCore().byId("msumInput").getValue();
		  if(sap.ui.getCore().byId("LowVoltSingle").getSelected()){
		      oEntry.SinglePhase = "X";
		      oEntry.SingleMeter = parseInt(sap.ui.getCore().byId("blankInput").getValue());
		  }
		    if(sap.ui.getCore().byId("LowVoltThree").getSelected()){
		      oEntry.ThreePhase = "X";  
		      oEntry.ThreeMeter = parseInt(sap.ui.getCore().byId("ablankInput").getValue());
		    }
		     if(sap.ui.getCore().byId("HighVolt").getSelected()){
		      oEntry.HighVoltage = "X";  
		      oEntry.HighMeter = parseInt(sap.ui.getCore().byId("bblankInput").getValue());
		    }
		    
		    oEntry.SupplyDate = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("DP1").getDateValue()));
		    if(sap.ui.getCore().byId("RBGRP3_1").getSelected()){
		    
		        oEntry.MeterType = "1";
		    }
		    else if(sap.ui.getCore().byId("RBGRP3_2").getSelected()){
		    
		        oEntry.MeterType = "2";
		    }
		    
		    if(sap.ui.getCore().byId("RBGRP4_1").getSelected()){
		    
		        oEntry.Category = "1";
		    }
		    else if(sap.ui.getCore().byId("RBGRP4_2").getSelected()){
		    
		        oEntry.Category = "2";
		    }
		    else if(sap.ui.getCore().byId("RBGRP4_3").getSelected()){
		    
		        oEntry.Category = "3";
		    }
		    else if(sap.ui.getCore().byId("RBGRP4_4").getSelected()){
		    
		        oEntry.Category = "4";
		    }
		    
		    var oTable =  sap.ui.getCore().byId("ApplyOlLoadTab");
		    var aData = (oTable.getItems() || []).map(function(oItem){ // assuming that you are using the default model  
            return oItem.getBindingContext().getObject();
            });
        if(aData.length > 0){
            oEntry.LoadDetailsSet = [];
            for(var i = 0; i < aData.length ; i++ ){
                 var LoadModel = {}; 
                 LoadModel.SerId = i + 1;
                 LoadModel.SerId.toString();
                 LoadModel.LoadDetail = aData[i].LoadDetail;
                 LoadModel.NoOfPoints = parseFloat(aData[i].NoOfPoints).toFixed(2);
                 LoadModel.WattagePoints = parseFloat(aData[i].WattagePoints).toFixed(2);
                 LoadModel.TotalWattage = parseFloat(aData[i].TotalWattage).toFixed(2);
                 
                 	if (LoadModel.__metadata !== undefined) {
								delete LoadModel.__metadata;
                 	}
                 oEntry.LoadDetailsSet.push(LoadModel);	
            }
        } 
		    oEntry.ConnectLoad = sap.ui.getCore().byId("connectInput").getValue();
		    oEntry.SanctionLoad = sap.ui.getCore().byId("sectionInput").getValue();
		    oEntry.ContractDemand = sap.ui.getCore().byId("demandInput").getValue();
		    
		  //  oEntry.LoadDetails = sap.ui.getCore().byId("sumerInput").getValue();
		  //  oEntry.NoOfPoints = sap.ui.getCore().byId("wconInput").getValue();
		  //  oEntry.WattagePoints = sap.ui.getCore().byId("wpwdInput").getValue();
		    oEntry.LecName = sap.ui.getCore().byId("lecnameInput").getValue();
		    oEntry.FlatNo2 = sap.ui.getCore().byId("galaInput").getValue();
		    oEntry.BuildName2 = sap.ui.getCore().byId("bnameInput").getValue();
		    oEntry.Society2 = sap.ui.getCore().byId("socInput").getValue();
		    oEntry.Street2 = sap.ui.getCore().byId("streeInput").getValue();
		    oEntry.Suburb2 = sap.ui.getCore().byId("banInput").getValue();
		    oEntry.City12 = sap.ui.getCore().byId("placInput").getValue();
		    
		    oEntry.PostCode12 = sap.ui.getCore().byId("psInput").getValue();
		    oEntry.LandMark2 = sap.ui.getCore().byId("lmInput").getValue();
		    oEntry.LecLicenceNo = sap.ui.getCore().byId("seciInput").getValue();
		  //  oEntry.LecVaildUpto = sap.ui.getCore().byId("wconInput").getValue();
		    oEntry.LecLmobileNo1 = sap.ui.getCore().byId("mnInput").getValue();
		    oEntry.LecEmail = sap.ui.getCore().byId("inputemail").getValue();
		  //  oEntry.TotalWattage = sap.ui.getCore().byId("sumInput").getValue();
		  //  oEntry.OtherCategory = sap.ui.getCore().byId("msumInput").getValue();
		  //  oEntry.ZregFirst = sap.ui.getCore().byId("sumerInput").getValue();
		    oEntry.ZcreateDate = new Date();
		  //  oEntry.ZsiteVisitDate = sap.ui.getCore().byId("wpwdInput").getValue();
		  //  oEntry.TimeSlot = sap.ui.getCore().byId("wpwdInput").getValue();
		  //  oEntry.Flag = "X";
            
            this.oView.getModel().create(sPath,oEntry,
				{
					async : true,
					success:function(oData)
					{   
					    if(oData.SERV_REQ_NO === "" || oData.BUSINEE_PARTNER === ""){
					      MessageBox.alert("Your Registration No. for new connection is " + oData.RegId + ".");   
					    }
					    else{
					      MessageBox.alert("Your service request No. is:" + oData.SERV_REQ_NO + " and business Partner No. is:" + oData.BUSINEE_PARTNER + ".");   
					    }
						oViewModel.setProperty("/busy", false);
					},
					error:function(error)
					{
						oViewModel.setProperty("/busy", false);
					}
				});    
		},
		
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
			handleButtonPress: function(evt) {
		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Procedure and Guidelines") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "Application forms") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.Applicationforms"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.text === "FAQs") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.FAQs"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "Standard Drawings") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.StandardDrawings"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.text === "Apply Online") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}
				
		

		}


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.NewConnections
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.NewConnections
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.NewConnections
		 */
		//	onExit: function() {
		//
		//	}

	});

});