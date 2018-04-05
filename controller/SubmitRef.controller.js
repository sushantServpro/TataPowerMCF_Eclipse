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

	return Controller.extend("tatapower.dev.controller.SubmitRef", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.AboutUs
		 */
		//  onInit: function() {
		//
		//  },
		onInit: function(evt) {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				Submit: "X"
			});
			this.oView.setModel(oViewModel, "SubmitRefView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("McfPortalModel");
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/SubmitRef.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.InternalSubmitRefBeGreen.ProgrammeDetails"].join("."), this);
			vbox.addItem(fragment1);
		},
		handleButtonPress: function(evt) {
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Programme Details") {
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.InternalSubmitRefBeGreen.ProgrammeDetails"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Models Available") {
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.InternalSubmitRefBeGreen.ModelsAvailable"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Faq") {
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.InternalSubmitRefBeGreen.Faq"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Register Here") {
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.InternalSubmitRefBeGreen.RegisterHere"].join("."), this);
				vbox.addItem(fragment1);
			}

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},
			onSelectAgree : function(){
			if(sap.ui.getCore().byId("IdAgreetermRef").getSelected()){
				$("#frmblock").css("display","block");
			}else{
				$("#frmblock").css("display","none");
			}	
		},
		onNextSearch : function(){
			
			if(sap.ui.getCore().byId("conNoInputIdRef").getValue() !== "" && sap.ui.getCore().byId("conNoInputIdRef").getValue()){
			var that = this;
			var cono = sap.ui.getCore().byId("conNoInputIdRef").getValue();
			var oViewModel = this.oView.getModel("SubmitRefView");
		    oViewModel.setProperty("/busy", true);
		    var camid = localStorage.getItem("Campid");
			var campcode = localStorage.getItem("Campidcode");
			if(camid != null && campcode != null){
			var drpcatofsupply = "/ConsumerOnNextDetailSet(Campid='"+camid+"',Campidcode='"+campcode+"',CaNo='"+cono+"')";
			//get the Existing utility drop down value from odata
				this.oDataModel.read(drpcatofsupply, {
					success: function(oData) {
					if(oData.LvMessage !== ""){
								MessageBox.alert(oData.LvMessage);
								$("#hideblock").css("display","none");
						}else{
							$("#hideblock").css("display","block");
							that.oView.setModel(new JSONModel(oData), "RefData");
							$("#blockConRef").css("display","block");
						}
					/*	$("#hideblockRef").css("display","block");
							that.oView.setModel(new JSONModel(oData), "RefData");
							$("#blockConRef").css("display","block");*/
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});}}else{
					MessageBox.alert("Please enter consumer name and consumer number");
				}
			
		},
		onSubmitBeGreen : function(){
				var oEntry={};
				var sPath = "/BeGreenSubmitSet";
				var camid = localStorage.getItem("Campid");
				var campcode = localStorage.getItem("Campidcode");
				
				var contactNoInputId = sap.ui.getCore().byId("contactNoInputIdRef").getValue();
				var altContactNoInputId = sap.ui.getCore().byId("altContactNoInputIdRef").getValue();
				var emailid = sap.ui.getCore().byId("ContactEmailInputIdRef").getValue();
				var conNoInputId = sap.ui.getCore().byId("conNoInputIdRef").getValue();
				var capacity = sap.ui.getCore().byId("capacityInputIdRef").getValue();
				var qty = sap.ui.getCore().byId("qtyInputIdRef").getValue();
				var conname = sap.ui.getCore().byId("conBillNameInputIdRef").getValue();
				/*var contactNoInputId = "9012345678";
				var altContactNoInputId = "9012345678";
				var emailid = "abc@gmail.com";
				var conNoInputId = "500000000000";
				var capacity = "11";
				var qty = "1";*/
				
				var oViewModel = this.oView.getModel("SubmitRefView");
				oViewModel.setProperty("/busy", true);
				oEntry.ImAltTelNumber = altContactNoInputId;
				oEntry.ImBuagId =   conNoInputId;
				oEntry.ImCampid =  camid;
				oEntry.ImCampidcode =  campcode;
				oEntry.ImCapacity =  capacity;
				oEntry.ImEmailIdAddr = emailid;
				oEntry.ImGuid  = camid;
			//	oEntry.ImManufacturer = "1";
				oEntry.ImPortalCname = conname;
				oEntry.ImQty =  qty;
				oEntry.ImTelNumber = contactNoInputId;
				
				this.oDataModel.create(sPath, oEntry, {
				async: true,
				success: function(oData) {
					if(oData.TransId !== ""){
						MessageBox.alert("Your Transaction No. is:" + oData.TransId +
						".");
					}else if(oData.Message !== ""){
							MessageBox.alert(oData.Message);
					}else{
						MessageBox.alert("Problem with submit");
					}
					 sap.ui.getCore().byId('btnSaveCeiling').setProperty("enabled",false);
						//sap.ui.getCore().byId("btnSaveCeiling").setEnable("")
					oViewModel.setProperty("/busy", false);
				},
				error: function(error) {
					// MessageBox.error("Please enter correct Data.");
					oViewModel.setProperty("/busy", false);
				}
			});
				
		}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf tatapower.dev.view.AboutUs
			 */
			//  onBeforeRendering: function() {
			//
			//  },

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.AboutUs
		 */
		//  onAfterRendering: function() {
		//
		//  },

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.AboutUs
		 */
		//  onExit: function() {
		//
		//  }

	});

});