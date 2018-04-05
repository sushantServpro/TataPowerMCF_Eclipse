sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/models"
], function(Controller,JSONModel,models) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.TariffDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.TariffDetails
		 */
		//	onInit: function() {
		//
		//	},
	onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/Tariff.json");
// 			this.getView().setModel(oModel);
            var oViewModel = new JSONModel({
					busy: false,
					delay: 0
					});
			this.oView.setModel(oViewModel, "TariffDetails");		
            this.getRouter().getRoute("MyAccounts").attachPatternMatched(this._onObjectMatched, this);
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel();
			this.getOwnerComponent().getModel().metadataLoaded().then(this.onMetadataLoaded.bind(this));
			
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.UpperBarButtons"].join("."), this);
			vbox1.addItem(fragment);
			fragment.setModel(oModel);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TarrifDetails.TariffSchedule"].join("."), this);
				vbox.addItem(fragment1);
				
		},
			_onObjectMatched: function() {

			    this.oView.getModel().metadataLoaded().then(function() {
				this.bindTariffChangeOverPlan();
				}.bind(this));
			},
			
		bindTariffChangeOverPlan: function(){
			  var filters = new Array();
			  var val = "'LTC'";
			filters.push(new sap.ui.model.Filter("ImConsumerCategory", sap.ui.model.FilterOperator.EQ,val));
			var oTable = sap.ui.getCore().byId("tableTariffDisp");
			oTable.bindRows({path:"/TariffChangeoverSet", filters:filters});
			
			var filters1 = new Array();
			var val1 = "'HTC'";
			filters1.push(new sap.ui.model.Filter("ImConsumerCategory", sap.ui.model.FilterOperator.EQ,val1));
			var oTable1 = sap.ui.getCore().byId("tableTariffHighTen");
			oTable1.bindRows({path:"/TariffChangeoverSet", filters:filters1});
			
			},
			
			bindTariffExistingPlan: function(){
			 var filters = new Array();
			 var val = "'LTC'";
			filters.push(new sap.ui.model.Filter("ImConsumerCategory", sap.ui.model.FilterOperator.EQ,val));
			var oTable = sap.ui.getCore().byId("DirectTariffLow");
			oTable.bindRows({path:"/TariffDirectSet", filters:filters});
			
			var filters1 = new Array();
			var val1 = "'HTC'";
			filters1.push(new sap.ui.model.Filter("ImConsumerCategory", sap.ui.model.FilterOperator.EQ,val1));
			var oTable1 = sap.ui.getCore().byId("DirectTariffHighTen");
			oTable1.bindRows({path:"/TariffDirectSet", filters:filters1});
			},
				onMetadataLoaded: function() {
				// Store original busy indicator delay for the detail view
				self = this;
				var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
					oViewModel = self.oView.getModel("TariffDetails");
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
			if (evt.oSource.mProperties.text === "Tariff Rates For Change Over Consumer") {
				
		var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TarrifDetails.TariffRatesForChangeoverConsumer"].join("."), this);
				vbox.addItem(fragment1);
				this.bindTariffChangeOverPlan();
			    
			}
			else if(evt.oSource.mProperties.text === "Tariff Rates For Existing Consumer") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TarrifDetails.TariffRatesForExistingConsumer"].join("."), this);
				vbox.addItem(fragment1);
				this.bindTariffExistingPlan();
			}
			else if(evt.oSource.mProperties.text === "Tariff Schedule") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.TarrifDetails.TariffSchedule"].join("."), this);
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
		 * @memberOf tatapower.dev.view.TariffDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.TariffDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.TariffDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});