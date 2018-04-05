sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.OpenAccess", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.OpenAccess
		 */

		onInit: function() {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			var oModel = new sap.ui.model.json.JSONModel("json/OpenAccess.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();

			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Newconnection.ShortTermOpenAccess"].join("."), this);
			vbox.addItem(fragment1);

			this.oView.setModel(oViewModel, "OpenAccess");
			//  this.getRouter().getRoute("Calculator").attachPatternMatched(this._onObjectMatched, this);
			// this.oView.setModel(oViewModel, "CalculatorView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel();
		},
		onAddToLoadTab: function() {
			var oTable = sap.ui.getCore().byId("ApplyOlLoadTab");
			var oTemplate = oTable.getBindingInfo("items").template;
			// var PreFrm = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("PreFrm").getDateValue()));
			var PreFrm = sap.ui.getCore().byId("PreFrm").getValue();
			var PreTo = sap.ui.getCore().byId("PreTo").getValue();
			var timeFr = sap.ui.getCore().byId("timeFr").getValue();
			var timeFr1 = sap.ui.getCore().byId("timeFr").getDateValue();

			// var timeFr = formatter.TIME_hhmm(sap.ui.getCore().byId("timeFr").getValue());
			var timeTo = sap.ui.getCore().byId("timeTo").getValue();
			var timeTo1 = sap.ui.getCore().byId("timeTo").getDateValue();
			// this.timeFormatter.format(timeTo);
			var idCap = sap.ui.getCore().byId("idCap").getValue();
			var oData = [{
				CapPeriodFrom: PreFrm,
				CapPeriodTo: PreTo,
				CapTimeFrom: timeFr,
				CapTimeTo: timeTo,
				Capcity: idCap,
				tempfrm: timeFr1,
				tempto: timeTo1
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

		onRemoveLoadTab: function() {
			var oTable = sap.ui.getCore().byId("ApplyOlLoadTab");
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
		onPressGo: function(oEvent) {
			var oViewModel = this.oView.getModel("OpenAccess");
			var ConsumerNo = sap.ui.getCore().byId("cnntreeInput").getValue();

			var sPath = "/OpenAccessSet(Consumer='" + ConsumerNo + "'" + ",RegId=0)";
			this.oView.getModel("McfPortalModel").read(sPath, {
				async: true,
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					sap.ui.getCore().byId("applicant_name").setValue(oData.Fullname);
					sap.ui.getCore().byId("meter_no").setValue(oData.MeterNo);
					sap.ui.getCore().byId("phone_no").setValue(oData.PhoneNo);
					sap.ui.getCore().byId("fax_no").setValue(oData.FaxNumber);
					sap.ui.getCore().byId("email_id").setValue(oData.EmailId);
					sap.ui.getCore().byId("mobile_no").setValue(oData.MobileNo);
					sap.ui.getCore().byId("flat_no").setValue(oData.FltNoStoa);
					sap.ui.getCore().byId("building_name").setValue(oData.BuldNameStoa);
					sap.ui.getCore().byId("soc").setValue(oData.SocityStoa);
					sap.ui.getCore().byId("street").setValue(oData.StreetStoa);
					sap.ui.getCore().byId("city").setValue(oData.CityStoa);
					sap.ui.getCore().byId("post_code").setValue(oData.PostCodeStoa);
					sap.ui.getCore().byId("landmark").setValue(oData.LandMarkStoa);
					sap.ui.getCore().byId("conn_type").setValue(oData.ConnectionType);
					
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
		},
		onPressGoShort: function(oEvent) {
			this.onPressGo();
		},
		onPressGoLong: function(oEvent) {
			this.onPressGo();
		},
		onPressSave: function() {
			var oEntry = {};
			oEntry.flag = "1";
			this.SaveData(oEntry);
		},
		onPressSubmit: function() {
			var oEntry = {};
			oEntry.flag = "2";
			oEntry.TypeOa = "01"; //Short term open Access
			this.SaveData(oEntry);
		},
		onPressSaveLong: function() {
			var oEntry = {};
			oEntry.flag = "1";
			this.SaveData(oEntry);
		},
		onPressSubmitLong: function() {
			var oEntry = {};
			oEntry.flag = "2";
			oEntry.TypeOa = "03"; //Long term open Access
			this.SaveData(oEntry);
		},
		SaveData: function(oEntry) {

			var oViewModel = this.oView.getModel("OpenAccess");
			oViewModel.setProperty("/busy", true);

			oEntry.Consumer = sap.ui.getCore().byId("cnntreeInput").getValue();

			// oEntry.ApplTypeLm = sap.ui.getCore().byId("cnntreeInput").getValue();
			oEntry.Fullname = sap.ui.getCore().byId("applicant_name").getValue();
			if (sap.ui.getCore().byId("applNew").getSelected()) {

				oEntry.ApplType = "01";
			} else if (sap.ui.getCore().byId("applRnew").getSelected()) {

				oEntry.ApplType = "02";
			}
			oEntry.MeterNo = sap.ui.getCore().byId("inj_meter_no").getValue();
			oEntry.FltNoStoa = sap.ui.getCore().byId("flat_no").getValue();
			oEntry.BuldNameStoa = sap.ui.getCore().byId("building_name").getValue();
			oEntry.SocityStoa = sap.ui.getCore().byId("soc").getValue();
			oEntry.StreetStoa = sap.ui.getCore().byId("street").getValue();
			oEntry.CityStoa = sap.ui.getCore().byId("city").getValue();
			oEntry.PostCodeStoa = sap.ui.getCore().byId("post_code").getValue();
			oEntry.LandMarkStoa = sap.ui.getCore().byId("landmark").getValue();
			oEntry.PhoneNo = sap.ui.getCore().byId("phone_no").getValue();
			oEntry.FaxNumber = sap.ui.getCore().byId("fax_no").getValue();
			oEntry.EmailId = sap.ui.getCore().byId("email_id").getValue();
			oEntry.ConnectionType = sap.ui.getCore().byId("conn_type").getValue();
			oEntry.MobileNo = sap.ui.getCore().byId("mobile_no").getValue();
			oEntry.ExitSupplier = sap.ui.getCore().byId("ext_supp").getValue();
			if (sap.ui.getCore().byId("iBuyer").getSelected()) {

				oEntry.ApplicantType = "01";
			} else if (sap.ui.getCore().byId("iSeller").getSelected()) {

				oEntry.ApplicantType = "02";
			} else if (sap.ui.getCore().byId("iTrader").getSelected()) {

				oEntry.ApplicantType = "03";
			} else if (sap.ui.getCore().byId("iCaptive").getSelected()) {

				oEntry.ApplicantType = "04";
			} else if (sap.ui.getCore().byId("iRenew").getSelected()) {

				oEntry.ApplicantType = "05";
			}
			if (sap.ui.getCore().byId("iInter").getSelected()) {

				oEntry.GeneratorType = "01";
			} else if (sap.ui.getCore().byId("iInter").getSelected()) {

				oEntry.GeneratorType = "02";
			}

			oEntry.BuyerNo = sap.ui.getCore().byId("buyer_no").getValue();
			oEntry.BuyerDate = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("buyer_date").getDateValue()));
			oEntry.BuyerValidTo = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("buyer_valid_till").getDateValue()));
			oEntry.CapInBuyer = parseFloat(sap.ui.getCore().byId("buyer_cont").getValue()).toFixed(2);
			oEntry.BuyerCapSource = parseFloat(sap.ui.getCore().byId("buyer_oth_cont").getValue()).toFixed(2);
			oEntry.BuyerOpenAccess = sap.ui.getCore().byId("buyer_app_days").getValue();

			oEntry.SellerNo = sap.ui.getCore().byId("seller_no").getValue();
			oEntry.SellerDate = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("seller_date").getDateValue()));
			oEntry.SellerValidTo = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("seller_valid_till").getDateValue()));
			oEntry.CapInSeller = parseFloat(sap.ui.getCore().byId("seller_cont").getValue()).toFixed(2);
			oEntry.SellerCapSource = parseFloat(sap.ui.getCore().byId("seller_oth_cont").getValue()).toFixed(2);
			oEntry.SellerOpenAccess = sap.ui.getCore().byId("seller_app_days").getValue();

			oEntry.PowerChgNo = sap.ui.getCore().byId("package_exchange_no").getValue();
			oEntry.PowerExcDate = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("package_exchange_date").getDateValue()));
			oEntry.PowerExcValidTo = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("package_exchange_valid_till").getDateValue()));
			oEntry.CapInPowrExc = sap.ui.getCore().byId("package_exchange_cont").getValue();
			oEntry.PowrExcCapSource = sap.ui.getCore().byId("package_exchange_oth_cont").getValue();
			oEntry.PowrExcOpenAccess = sap.ui.getCore().byId("package_exchange_app_days").getValue();

			oEntry.CordName = sap.ui.getCore().byId("coord_name").getValue();
			oEntry.CordDesig = sap.ui.getCore().byId("coord_desgn").getValue();
			oEntry.CordPhoneNo = sap.ui.getCore().byId("coord_phone").getValue();
			oEntry.CordMobileNo = sap.ui.getCore().byId("coord_mobile_no").getValue();
			oEntry.CordFaxNumber = sap.ui.getCore().byId("coord_fax_no").getValue();
			oEntry.CordEmailId = sap.ui.getCore().byId("coord_email_id").getValue();

			oEntry.ReqContrDemand = sap.ui.getCore().byId("req_cont_demand").getValue();

			oEntry.PpaMouSeller = sap.ui.getCore().byId("Ppaseller").getValue();
			oEntry.PpaMouBuyer = sap.ui.getCore().byId("Ppabuyer").getValue();
			oEntry.PpaMouDate = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("ppa_mou_date").getDateValue()));
			oEntry.PpaMouCdate = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("val_per_comm").getDateValue()));
			oEntry.PpaMouExdate = formatter.formatDateToISOString(new Date(sap.ui.getCore().byId("val_per_expiry").getDateValue()));
			oEntry.PpaMouCapcity = parseFloat(sap.ui.getCore().byId("capacity_ppa").getValue()).toFixed(2);

			oEntry.InjeName = sap.ui.getCore().byId("inj_name").getValue();
			oEntry.InjePoint = sap.ui.getCore().byId("point_inj").getValue();
			oEntry.InjeLice = sap.ui.getCore().byId("con_dis_lic").getValue();
			oEntry.InjeDetails = sap.ui.getCore().byId("pdth_sub_stn").getValue();
			oEntry.InjeMeterno = sap.ui.getCore().byId("inj_meter_no").getValue();

			oEntry.DrawingName = sap.ui.getCore().byId("draw_name").getValue();
			oEntry.DrawingPoint = sap.ui.getCore().byId("point_draw").getValue();
			oEntry.DrawingLice = sap.ui.getCore().byId("draw_con_dis_lic").getValue();
			oEntry.DrawingDetails = sap.ui.getCore().byId("draw_pdth_sub_stn").getValue();
			oEntry.DrawingMeterno = sap.ui.getCore().byId("draw_meter_no").getValue();
			oEntry.Trader = sap.ui.getCore().byId("draw_trader").getValue();

			oEntry.DistLicRefno = sap.ui.getCore().byId("dist_lic_no").getValue();
			oEntry.DistLicAppvRefno = sap.ui.getCore().byId("dist_apprv_no").getValue();
			oEntry.DistRemark = sap.ui.getCore().byId("dist_remark").getValue();

			oEntry.MsldcRefno = sap.ui.getCore().byId("msldc_no").getValue();
			oEntry.MsldcApprRefno = sap.ui.getCore().byId("msldc_apprv_no").getValue();
			oEntry.MsldcRemark = sap.ui.getCore().byId("msldc_remark").getValue();

			// oEntry.flag = "1";

			var oTable = sap.ui.getCore().byId("ApplyOlLoadTab");
			var aData = (oTable.getItems() || []).map(function(oItem) { // assuming that you are using the default model  
				return oItem.getBindingContext().getObject();
			});
			if (aData.length > 0) {
				oEntry.CapDetailsSet = [];
				for (var i = 0; i < aData.length; i++) {
					var LoadModel = {};

					LoadModel.CapPeriodFrom = formatter.formatDateToISOString(new Date(aData[i].CapPeriodFrom));
					LoadModel.CapPeriodTo = formatter.formatDateToISOString(new Date(aData[i].CapPeriodTo));
					LoadModel.CapTimeFrom = formatter.ConvertTimeFormat(new Date(aData[i].tempfrm));
					LoadModel.CapTimeTo = formatter.ConvertTimeFormat(new Date(aData[i].tempto));
					LoadModel.Capcity = parseFloat(aData[i].Capcity).toFixed(2);
					if (LoadModel.__metadata !== undefined) {
						delete LoadModel.__metadata;
					}
					oEntry.CapDetailsSet.push(LoadModel);
				}
			}
			var sPath = "/OpenAccessSet";
			this.oView.getModel("McfPortalModel").create(sPath, oEntry, {
				async: true,
				success: function(oData) {
                     if	(oEntry.flag === "2")
                     {	
                     	var temp = "Your Service Number " + oData.ServiceNo + " created suceessfully";
                     	MessageBox.alert(temp);
                     }
                     if	(oEntry.flag === "1")
                     {	
                     	var temp1 = "Your Reg. Number " + oData.RegId + " created suceessfully";
                     	MessageBox.alert(temp1);
                     }
					oViewModel.setProperty("/busy", false);
				},
				error: function(error) {
					// MessageBox.error("Please enter correct Data.");
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
			if (evt.oSource.mProperties.text === "SHORT TERM") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.OpenAccess.ShortTermOpenAccess"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "LONG TERM") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.OpenAccess.LongTermOpenAccess"].join("."), this);
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