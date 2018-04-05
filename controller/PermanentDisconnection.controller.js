sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller,JSONModel,formatter,MessageBox) {
        
	"use strict";


	return Controller.extend("tatapower.dev.controller.PermanentDisconnection", {
		
		onInit: function() {
		        var oViewModel = new JSONModel({
					busy: false,
					delay: 0
					});
            
            this.getView().setModel(oViewModel, "PermanentDisconnection");
            var oModel = new sap.ui.model.json.JSONModel("json/PermanentDisconnection.json");
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			fragment.setModel(oModel);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PermanentDisconnection.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
				this.loadDetailsForPD();
			  
		},
			onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		      onSubmitPD: function()
		      {
		          var oViewModel= this.oView.getModel("McfPortalModel");
		         // var oViewModel= this.oView.getModel("PermanentDisconnection");
		          oViewModel.setProperty("/busy,true");
		          var oEntry ={};
		          var oPath = "/ZPerDisconnetionReqSet";
		      
		      //  var ConsumerNo = sap.ui.getCore().byId("IdCustNO").getValue();
			      oEntry.IBuagId = '500000000010';
			      
			if (sap.ui.getCore().byId("IdAgreePD").getSelected())
			 {
			          
			     oEntry.IBuagId = sap.ui.getCore().byId("consumerInput").getValue();
                 oEntry.IBuildgname = sap.ui.getCore().byId("buildInput").getValue();
                 oEntry.ICity = sap.ui.getCore().byId("cityInput").getValue();
                 oEntry.IDesc = sap.ui.getCore().byId("descriptionInput").getValue();
                 oEntry.IEmail = sap.ui.getCore().byId("emailInput").getValue();
                 oEntry.IFlatno = sap.ui.getCore().byId("flatInput").getValue();
                 oEntry.IMobile = sap.ui.getCore().byId("contactInput").getValue();
                 oEntry.IName = sap.ui.getCore().byId("nameInput").getValue();
                 oEntry.IPostalcode = sap.ui.getCore().byId("postalInput").getValue();
                 oEntry.IStreet = sap.ui.getCore().byId("streetInput").getValue();
                  
                  if(sap.ui.getCore().byId("refundInput").getValue() === "Refund Cheque")
                  oEntry.IRefund = '1';
                  else if (sap.ui.getCore().byId("refundInput").getValue() === "RTGS")
                  oEntry.IRefund = '2';
                 
                 
                // oEntry.LvMsg = sap.ui.getCore().byId("text_s_radio3").getValue();
                
                oViewModel.create(oPath,oEntry,
                {
                    async : true,
                    success: function(oEntry)
                    {
                          alert(oEntry.LvMsg);
                          
                          oViewModel.selectProperty("/busy",false);
                    },
                    error: function(error)
                    {
                        // alert(oEntry.LvMsg);
                        var sMessage = JSON.parse(error.responseText).error.message.value;
                        alert(sMessage);
                        oViewModel.setProperty("/busy", false);
                    }
                });
			 }
    			      else
    			     {
    			         alert("Please agree terms and conditions to submit the form by checking the box");
    			     }
		      },
		
		    loadDetailsForPD: function(){
		        
		        var oViewModel = this.oView.getModel("PermanentDisconnection");  
		        var that = this;
		        
		        oViewModel.setProperty("busy", true);
		        var sPath = "/GetAddressAndBpSet('500000000534')";
		       
		        var oModel = that.getOwnerComponent().getModel();
		        oModel.read(sPath,{
		            success:function(oData)
		            {
		                 oViewModel.setProperty("/busy",false) ;
		                 
		               // oModel.setPorperty("/busy",false);
		               
		                sap.ui.getCore().byId("consumerInput").setValue(oData.IContractNo);
		                sap.ui.getCore().byId("consumerInput").setEnabled(false);
		                sap.ui.getCore().byId("streetInput").setValue(oData.DefLane);
		                sap.ui.getCore().byId("streetInput").setEnabled(false);
		                sap.ui.getCore().byId("flatInput").setValue(oData.DefFlat);
		                sap.ui.getCore().byId("flatInput").setEnabled(false);
		                sap.ui.getCore().byId("buildInput").setValue(oData.DefBuilding);
		                sap.ui.getCore().byId("buildInput").setEnabled(false);
		                sap.ui.getCore().byId("cityInput").setValue(oData.DefCity);
		                sap.ui.getCore().byId("cityInput").setEnabled(false);
		                sap.ui.getCore().byId("postalInput").setValue(oData.DefPostal);
		                sap.ui.getCore().byId("postalInput").setEnabled(false);
		         
		            
		                
		            },
		            
		            error: function(error){
		                oViewModel.setProperty("/busy", false);
		            }
		            
		            
		        }) ;
		        
		        
		     //  sap.ui.getCore().byId("descriptionInput").getValue();
		        sap.ui.getCore().byId("refundInput").setValue("Refund Cheque");
		        sap.ui.getCore().byId("refundInput").setEnabled(false);
		        
		        var oPath = "/AdvanceBillPaymentSet('500000000534')";
		        
		        var oModel = that.getOwnerComponent().getModel("McfPortalModel"); 
		        
		        
		        // that.oView.getModel("McfPortalModel").read(oPath,
		        oModel.read(oPath,
		        {
		            success:function(oData)
		            {
		                oViewModel.setProperty("/busy",false);
		               
		                sap.ui.getCore().byId("nameInput").setValue(oData.EName);
		                sap.ui.getCore().byId("nameInput").setEnabled(false);
		                sap.ui.getCore().byId("appNameInput").setValue(oData.EName);
		                sap.ui.getCore().byId("contactInput").setValue(oData.EMobile);
		                sap.ui.getCore().byId("emailInput").setValue(oData.EApplEmail);
		                
		            },
		            
		            error: function(error){
		                oViewModel.setProperty("/busy", false);
		            }
		            
		            
		        }) ;
		        
		            
		          
		      },
		     
			handleButtonPress: function(evt) {
		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Apply Online") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PermanentDisconnection.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
				this.loadDetailsForPD();
				
			}
			else if (evt.oSource.mProperties.text === "Procedure and Guidlines") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PermanentDisconnection.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if (evt.oSource.mProperties.text === "Instructions for Submitting form") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PermanentDisconnection.InstructionsForSubmittingForm"].join("."), this);
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