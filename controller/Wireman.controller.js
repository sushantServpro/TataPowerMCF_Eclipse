sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/models"
], function(Controller,MessageBox,JSONModel,models) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.Wireman", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.Wireman
		 */
		//	onInit: function() {
		//
		//	},
	onInit: function(evt) {

			// set explored app's demo model on this sample
			var  oViewModel = new JSONModel({
					busy: false,
					delay: 0
					});
			this.oView.setModel(oViewModel, "WiremanView");
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			var oModel = new sap.ui.model.json.JSONModel("json/TrainedWireman.json");
			fragment.setModel(oModel);
			vbox1.addItem(fragment);
				var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TrainedWireman.TrainYourWireman"].join("."), this);
				vbox.addItem(fragment1);
            
            sap.ui.require(["tatapower/dev/controller/Captcha"], function(captcha) {
            var sCaptcha = captcha.customMethod();	
            sap.ui.getCore().byId("wInput").setValue(sCaptcha);
            });
            
		},
		onRefreshCaptcha: function(){
            sap.ui.require(["tatapower/dev/controller/Captcha"], function(captcha) {
            var rCaptcha = captcha.customMethod();
            sap.ui.getCore().byId("wInput").setValue(rCaptcha);
            });  
		},
		validateForm: function(){
		    var isValid = true;
		    var CunName = sap.ui.getCore().byId("sumInput").getValue().trim();
		    var CunNo = sap.ui.getCore().byId("msumInput").getValue().trim();
		    var WrName = sap.ui.getCore().byId("sumerInput").getValue().trim();
		    var WrNo = sap.ui.getCore().byId("wconInput").getValue().trim();
		    var LicNo = sap.ui.getCore().byId("wpwdInput").getValue().trim();
		    var CaptchCompare = sap.ui.getCore().byId("wmInput").getValue().trim();
		    var OrigCaptcha = sap.ui.getCore().byId("wInput").getValue(); 
		    
		    if(CunName === "" || CunNo === "" || WrName === "" || WrNo === "" || LicNo === "") {
		       isValid = false;
				MessageBox.error("Please fill in all required fields.");
				return isValid;
		    }
		    if(CaptchCompare !== OrigCaptcha) {
		       isValid = false;
				MessageBox.error("Please enter correct captcha.");
				return isValid;
		    }
		   return isValid; 
		},
		onSaveTraine: function(){
		    try {
				if (this.validateForm()) {
		    var oViewModel = this.oView.getModel("WiremanView");
		    oViewModel.setProperty("/busy", true);
		    var CunName = sap.ui.getCore().byId("sumInput").getValue();
		    var CunNo = sap.ui.getCore().byId("msumInput").getValue();
		    var WrName = sap.ui.getCore().byId("sumerInput").getValue();
		    var WrNo = sap.ui.getCore().byId("wconInput").getValue();
		    var LicNo = sap.ui.getCore().byId("wpwdInput").getValue();
		    
		    
		    var oEntry = {};
		    oEntry.ZcustNm = CunName;
		    oEntry.ZcustNo = CunNo;
		    oEntry.ZpwdLic = LicNo;
		    oEntry.Zwireman = WrName;
		    oEntry.ZwireMob = WrNo;
		    
		    	this.oView.getModel().create("/TrainWiremanSet",oEntry,
				{
					async : true,
					success:function(oData)
					{
						oViewModel.setProperty("/busy", false);
						MessageBox.alert(oData.LvMsg);
				
					},
					error:function(error)
					{
						oViewModel.setProperty("/busy", false);
					}
				});
				}
			} catch (err) {
				oViewModel.setProperty("/busy", false);
			}
		},
		onCancle: function(){
		    sap.ui.getCore().byId("sumInput").setValue("");
		    sap.ui.getCore().byId("msumInput").setValue("");
		    sap.ui.getCore().byId("sumerInput").setValue("");
		    sap.ui.getCore().byId("wconInput").setValue("");
		    sap.ui.getCore().byId("wpwdInput").setValue("");
		    sap.ui.getCore().byId("wmInput").setValue("");
		    sap.ui.require(["tatapower/dev/controller/captcha"], function(captcha) {
            var rCaptcha = captcha.customMethod();
            sap.ui.getCore().byId("wInput").setValue(rCaptcha);
            });
            
		},
		getWiremanData: function(){
		 var oTable = sap.ui.getCore().byId("idWiremanTab");
                var oTemplate = oTable.getBindingInfo("items").template;
                var filters = new Array();
                var AreaSel = sap.ui.getCore().byId("idArea").getSelectedKey();
                AreaSel = "'" + AreaSel + "'";
                if(AreaSel === "" || AreaSel === null || AreaSel === undefined){
                    oTable.bindItems({path:"/RegWiremanSet",template:oTemplate}); 
                }
                else{
                filters.push(new sap.ui.model.Filter("LvZpcArea", sap.ui.model.FilterOperator.EQ, AreaSel));
                oTable.bindItems({path:"/RegWiremanSet",template:oTemplate, filters:filters}); 
                }

		},
		onPressGo: function(){
		    this.getWiremanData();
		},
		onPressCancle: function(){
		    sap.ui.getCore().byId("idArea").setSelectedKey("");
		    this.getWiremanData();
		},
		
		getAreaList: function(){
			    var oViewModel = this.oView.getModel("WiremanView");
				var that = this;
				oViewModel.setProperty("/busy", true);
				that.oView.getModel().read("/WireManAreaDDSet", {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "AreaModel");
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
		
			if (evt.oSource.mProperties.text === "Train your wireman") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TrainedWireman.TrainYourWireman"].join("."), this);
				vbox.addItem(fragment1);
				this.onRefreshCaptcha(); 
			}
			else if(evt.oSource.mProperties.text === "Trained wireman") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TrainedWireman.TrainedWireman"].join("."), this);
				vbox.addItem(fragment1);
				this.getAreaList();
				this.getWiremanData();
			}
		
				
		

		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.view.Wireman
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.Wireman
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.Wireman
		 */
		//	onExit: function() {
		//
		//	}

	});

});