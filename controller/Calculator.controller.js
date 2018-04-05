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

	return Controller.extend("tatapower.dev.controller.Calculator", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.Calculator
		 */
		//	onInit: function() {
		//
		//	},

		onInit: function() {

			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				block1: true,
				block2: true
			});

			this.getRouter().getRoute("Calculator").attachPatternMatched(this._onObjectMatched, this);
			this.oView.setModel(oViewModel, "CalculatorView");
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel();
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			var oModel = new sap.ui.model.json.JSONModel("json/Calculator.json");
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			fragment.setModel(oModel);
			vbox1.addItem(fragment);

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Calculator.bill_calculator"].join("."), this);
			// 	var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Calculator.energy_calculator"].join("."), this);
			vbox.addItem(fragment1);

		},

		_onObjectMatched: function() {

			var oViewModel = this.oView.getModel("CalculatorView");
			oViewModel.setProperty("/block1", false);
			oViewModel.setProperty("/block2", true);
			this.oView.getModel().metadataLoaded().then(function() {
				// **call following mtd for bill calculator testing  
				this.onTariffCategoryChange();
				this.getTariffCategory();
				this.getCustomerType();
				this.getSupplyVoltage();

				// **call following mtd for energy calculator 
				//   this.getEquipmentList();
				//   this.getWattageValues();
			}.bind(this));
		},

		handleValueHelp: function(oEvent) {
			this.selectedInput = oEvent.getSource();
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment("tatapower.dev.fragments.Calculator.Tariff_Dialog", this);
				this.getView().addDependent(this._valueHelpDialog);
			}
			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._valueHelpDialog.setRememberSelections(bRemember);

			this._valueHelpDialog.open();
		},

		_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter1 = new Filter("Aklasse", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilter2 = new Filter("Tariftyp", sap.ui.model.FilterOperator.Contains, sValue);
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
					sap.ui.getCore().byId("TarrifId").setValue(oContext.getObject().Tariftyp);
					return oContext.getObject().Tariftyp;

				});
			}
		},

		onTariffCategoryChange: function() {
			var that = this;
			var val = sap.ui.getCore().byId("select1");
			var key = val.getSelectedKey(),
				sPath;
			var oViewModel = this.oView.getModel("CalculatorView");

			if (key === "1") {
				sPath = "/TariffResiSet";
				oViewModel.setProperty("/block1", false);
				oViewModel.setProperty("/block2", true);

			} else if (key === "2") {
				sPath = "/TarrifLtSet";
				oViewModel.setProperty("/block2", false);
				oViewModel.setProperty("/block1", true);

			} else if (key === "3") {
				sPath = "/TariffHtSet";
				oViewModel.setProperty("/block2", false);
				oViewModel.setProperty("/block1", true);

			} else if (key === null || key === undefined || key === "") {
				sPath = "/TariffResiSet";
			}
			oViewModel.setProperty("/busy", true);
			that.oView.getModel().read(sPath, {
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "Tariff");
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});

		},

		getTariffCategory: function() {
			var oViewModel = this.oView.getModel("CalculatorView");
			var that = this;
			oViewModel.setProperty("/busy", true);
			that.oView.getModel().read("/TariffCategorySet", {
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "TariffCategory");
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});

		},
		getCustomerType: function() {
			var oViewModel = this.oView.getModel("CalculatorView");
			var that = this;
			oViewModel.setProperty("/busy", true);
			that.oView.getModel().read("/SupplyVoltageSet", {
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "SupplyVolt");
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
		},
		getSupplyVoltage: function() {
			var oViewModel = this.oView.getModel("CalculatorView");
			var that = this;
			oViewModel.setProperty("/busy", true);
			that.oView.getModel().read("/CustomerTypeSet", {
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "CustomerType");
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
		},

		onCalculate: function() {

			var oViewModel = this.oView.getModel("CalculatorView");
			oViewModel.setProperty("/busy", true);
			var val = sap.ui.getCore().byId("select1");
			var key = val.getSelectedKey();
			var oEntry = {};
			oEntry.TariffCategory = sap.ui.getCore().byId("select1").getSelectedKey();
			oEntry.TariffCategory.toString();
			oEntry.Tariff = sap.ui.getCore().byId("TarrifId").getValue();
			oEntry.Tariff.toString();
			oEntry.CustomerType = sap.ui.getCore().byId("select2").getSelectedKey();
			oEntry.CustomerType.toString();
			oEntry.SupplyLoad = sap.ui.getCore().byId("select-a").getSelectedKey();
			oEntry.SupplyLoad.toString();
			oEntry.ConnectLoad = sap.ui.getCore().byId("input-c").getValue();
			oEntry.ConnectLoad.toString();
			if (key === "1") {
				oEntry.KwhT = sap.ui.getCore().byId("input-q").getValue();
				oEntry.KwhT.toString();
			} else {
				oEntry.KwhT = sap.ui.getCore().byId("input-d").getValue();
				oEntry.KwhT.toString();
			}
			oEntry.KwhA = sap.ui.getCore().byId("input-e").getValue();
			oEntry.KwhA.toString();
			oEntry.KwhB = sap.ui.getCore().byId("input-f").getValue();
			oEntry.KwhB.toString();
			oEntry.KwhB2 = sap.ui.getCore().byId("input-g").getValue();
			oEntry.KwhB2.toString();
			oEntry.KwhC = sap.ui.getCore().byId("input-h").getValue();
			oEntry.KwhC.toString();
			oEntry.KwhD = sap.ui.getCore().byId("input-i").getValue();
			oEntry.KwhD.toString();
			oEntry.RkvahT = sap.ui.getCore().byId("input-j").getValue();
			oEntry.RkvahT.toString();
			oEntry.KvahA = sap.ui.getCore().byId("input-k").getValue();
			oEntry.KvahA.toString();
			oEntry.KvahB = sap.ui.getCore().byId("input-l").getValue();
			oEntry.KvahB.toString();
			oEntry.KvahB2 = sap.ui.getCore().byId("input-m").getValue();
			oEntry.KvahB2.toString();
			oEntry.KvahC = sap.ui.getCore().byId("input-n").getValue();
			oEntry.KvahC.toString();
			oEntry.KvahD = sap.ui.getCore().byId("input-o").getValue();
			oEntry.KvahD.toString();
			oEntry.Cmd = sap.ui.getCore().byId("input-p").getValue();
			if (oEntry.Cmd === "" || oEntry.Cmd === null || oEntry.Cmd === undefined) {
				oEntry.Cmd = "0.000";
			}
			oEntry.Cmd.toString();

			this.oView.getModel().create("/CalculateBillSet", oEntry, {
				async: true,
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					MessageBox.alert("The billing amount for your energy comsumption is approx. Rs. " + oData.LvBilltext);

				},
				error: function(error) {
					MessageBox.error("Please enter correct values.");
					oViewModel.setProperty("/busy", false);
				}
			});

		},

		onReset: function() {
			sap.ui.getCore().byId("select1").setSelectedKey("1");
			sap.ui.getCore().byId("TarrifId").setValue("");
			sap.ui.getCore().byId("select2").setSelectedKey("");
			sap.ui.getCore().byId("select-a").setSelectedKey("X");
			sap.ui.getCore().byId("input-c").setValue("");
			sap.ui.getCore().byId("input-d").setValue("");
			sap.ui.getCore().byId("input-e").setValue("");
			sap.ui.getCore().byId("input-f").setValue("");
			sap.ui.getCore().byId("input-g").setValue("");
			sap.ui.getCore().byId("input-h").setValue("");
			sap.ui.getCore().byId("input-i").setValue("");
			sap.ui.getCore().byId("input-j").setValue("");
			sap.ui.getCore().byId("input-k").setValue("");
			sap.ui.getCore().byId("input-l").setValue("");
			sap.ui.getCore().byId("input-m").setValue("");
			sap.ui.getCore().byId("input-n").setValue("");
			sap.ui.getCore().byId("input-o").setValue("");
			sap.ui.getCore().byId("input-p").setValue("");
			sap.ui.getCore().byId("input-q").setValue("");

			var oViewModel = this.oView.getModel("CalculatorView");
			oViewModel.setProperty("/block1", false);
			oViewModel.setProperty("/block2", true);
		},

		getEquipmentList: function() {
			var oViewModel = this.oView.getModel("CalculatorView");
			var that = this;
			oViewModel.setProperty("/busy", true);
			that.oView.getModel().read("/SearchEquipmentSet", {
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "EquipmentModel");
					sap.ui.getCore().byId("selectEquip").setSelectedKey(oData.results[0].ZzeuipNo);
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
		},
		OnValueChange: function() {
			var EqupKey = sap.ui.getCore().byId("selectEquip").getSelectedKey();
			parseInt(EqupKey);
			var WattageKey = sap.ui.getCore().byId("selectWattage").getSelectedItem().getText();
			parseInt(WattageKey);
			var NoEquip = sap.ui.getCore().byId("Slider1").getValue();
			parseInt(NoEquip);
			var NoHrs = sap.ui.getCore().byId("Slider2").getValue();
			parseInt(NoHrs);

			var path = "/CalcEnergySet(DailyHourUse=" + NoHrs + ",EquipNo=" + EqupKey + ",NoOfEquipment=" + NoEquip + ",MeaValue=" + WattageKey +
				")";
			var oViewModel = this.oView.getModel("CalculatorView");
			var that = this;
			oViewModel.setProperty("/busy", true);
			that.oView.getModel().read(path, {
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					sap.ui.getCore().byId("MonthlyCon").setTitle(oData.MonthlyConsumption);
					sap.ui.getCore().byId("DailyCon").setTitle(oData.DailyConsumption);

				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
		},
		onAddToList: function() {
			var oTable = sap.ui.getCore().byId("tblEquip");
			var oTemplate = oTable.getBindingInfo("items").template;
			var EqupName = sap.ui.getCore().byId("selectEquip").getSelectedItem().getText();
			var MonthlyCon = sap.ui.getCore().byId("MonthlyCon").getTitle();
			var DailyCon = sap.ui.getCore().byId("DailyCon").getTitle();
			var oData = [{
				EquipName: EqupName,
				DailyCon: DailyCon,
				MonthlyConCon: MonthlyCon
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
				oTableModel: oData
			}); // Set the data to the model using the JSON            
			oTable.setModel(oModel);
			oTable.bindItems({
				path: "/oTableModel",
				template: oTemplate
			});
			// this.doSum();
		},

		doSum: function() {
			var oTable = sap.ui.getCore().byId("tblEquip");
			var oSum = 0.00;
			var aData = (oTable.getItems() || []).map(function(oItem) { // assuming that you are using the default model  
				return oItem.getBindingContext().getObject();
			});

			if (aData.length > 0) {
				for (var i = 0; i < aData.length; i++) {
					oSum = (parseFloat(oSum) + parseFloat(aData[i].MonthlyConCon)).toFixed(2);
				}
				oSum.toString();
				var inpt = sap.ui.getCore().byId("TotEnConsume");
				inpt.setValue(oSum);
			}
		},

		onRemoveFromList: function() {
			var oTable = sap.ui.getCore().byId("tblEquip");
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
					path: "/oTableModel",
					template: oTemplate
				});

				// this.doSum();      
			}
		},

		onSave: function() {
			var selectedYear = sap.ui.getCore().byId("idYear1").getYear();
			var selectedMonth = sap.ui.getCore().byId("monthId1").getMonth();
			var energyCon = sap.ui.getCore().byId("TotEnConsume").getValue();
			var oViewModel = this.oView.getModel("CalculatorView");
			oViewModel.setProperty("/busy", true);
			var oEntry = {};
			oEntry.InVkonto = "457574748548";
			oEntry.InZzenergyCn = energyCon;
			selectedMonth = selectedMonth + 1;
			oEntry.InZzmonth = selectedMonth.toString();
			oEntry.InZzyear = selectedYear.toString();
			this.oView.getModel().create("/AddToDBSet", oEntry, {
				async: true,
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					MessageBox.alert("Data Saved Successfuly.");

				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
					// 		var body = JSON.parse(error.responseText);
					//         var errtxt = body.error.message.value;
					//         	MessageBox.error(errtxt);
				}
			});
			// 		 this._AddToDatabase.close();		
		},

		onClose: function() {
			this._AddToDatabase.close();
		},

		onAddDatabase: function() {

			if (!this._AddToDatabase) {
				this._AddToDatabase = sap.ui.xmlfragment("tatapower.dev.fragments.Calculator.AddToDataBase", this);
				this.getView().addDependent(this._AddToDatabase);
			}

			this._AddToDatabase.open();
			this.doSum();
		},

		onEquipmentChange: function() {
			var Key = sap.ui.getCore().byId("selectEquip").getSelectedKey();
			var oImage = sap.ui.getCore().byId("IdEquimg");
			var oSlider1 = sap.ui.getCore().byId("Slider1");
			var oSlider2 = sap.ui.getCore().byId("Slider2");
			oSlider1.setValue(0);
			oSlider2.setValue(0);
			sap.ui.getCore().byId("MonthlyCon").setTitle("0.00");
			sap.ui.getCore().byId("DailyCon").setTitle("0.00");

			switch (Key) {
				case "1":
					oImage.setSrc("images/Equipment_images/AIRCOOLER.bmp");
					break;
				case "2":
					oImage.setSrc("images/Equipment_images/CEILING_FAN.bmp");
					break;
				case "3":
					oImage.setSrc("images/Equipment_images/CEILINGFAN.bmp");
					break;
				case "4":
					oImage.setSrc("images/Equipment_images/CFLLAMP.bmp");
					break;
				case "5":
					oImage.setSrc("images/Equipment_images/COMPUTER.bmp");
					break;
				case "6":
					oImage.setSrc("images/Equipment_images/COOKER.bmp");
					break;
				case "7":
					oImage.setSrc("images/Equipment_images/CRT_21_ON_BY.bmp");
					break;
				case "8":
					oImage.setSrc("images/Equipment_images/CRT_21_STAND_BY.bmp");
					break;
				case "9":
					oImage.setSrc("images/Equipment_images/ELECTRIC_IRON.bmp");
					break;
				case "10":
					oImage.setSrc("images/Equipment_images/ELECTRIC_KETTLE.bmp");
					break;
				case "11":
					oImage.setSrc("images/Equipment_images/ELECTRIC_OVEN.bmp");
					break;
				case "12":
					oImage.setSrc("images/Equipment_images/ELECTRIC_FAN.bmp");
					break;
				case "13":
					oImage.setSrc("images/Equipment_images/FAX_TELEX.bmp");
					break;
				case "14":
					oImage.setSrc("images/Equipment_images/GEYSER.bmp");
					break;
				case "15":
					oImage.setSrc("images/Equipment_images/GLASS_BULB.bmp");
					break;
				case "16":
					oImage.setSrc("images/Equipment_images/HOT_PLAT.bmp");
					break;
				case "17":
					oImage.setSrc("images/Equipment_images/IMMERSION_HEATER.bmp");
					break;
				case "18":
					oImage.setSrc("images/Equipment_images/LCD_32_ON_BY.bmp");
					break;
				case "19":
					oImage.setSrc("images/Equipment_images/LCD_32_STAND_BY.bmp");
					break;
				case "20":
					oImage.setSrc("images/Equipment_images/LED_BULB.bmp");
					break;
				case "21":
					oImage.setSrc("images/Equipment_images/LED_TUBE.bmp");
					break;
				case "22":
					oImage.setSrc("images/Equipment_images/MICROWAVE_OVEN.bmp");
					break;
				case "23":
					oImage.setSrc("images/Equipment_images/MIXER_GRINDER.bmp");
					break;
				case "24":
					oImage.setSrc("images/Equipment_images/MONITOR.bmp");
					break;
				case "25":
					oImage.setSrc("images/Equipment_images/MUSIC_SYSTEM.bmp");
					break;
				case "26":
					oImage.setSrc("images/Equipment_images/PEDESTRAL_FAN.bmp");
					break;
				case "27":
					oImage.setSrc("images/Equipment_images/PHONE_ANS_MACHINE.bmp");
					break;
				case "28":
					oImage.setSrc("images/Equipment_images/PRINTER.bmp");
					break;
				case "29":
					oImage.setSrc("images/Equipment_images/PUMP_MOTOR.bmp");
					break;
				case "30":
					oImage.setSrc("images/Equipment_images/Refrigerator165LDC.bmp");
					break;
				case "31":
					oImage.setSrc("images/Equipment_images/Refrigerator165LFF.bmp");
					break;
				case "32":
					oImage.setSrc("images/Equipment_images/Refrigerator250LDC.bmp");
					break;
				case "33":
					oImage.setSrc("images/Equipment_images/Refrigerator250LFF.bmp");
					break;
				case "34":
					oImage.setSrc("images/Equipment_images/Refrigerator310LDC.bmp");
					break;
				case "35":
					oImage.setSrc("images/Equipment_images/Refrigerator310LFF.bmp");
					break;
				case "36":
					oImage.setSrc("images/Equipment_images/ROOM_HEATER.bmp");
					break;
				case "37":
					oImage.setSrc("images/Equipment_images/SEWING_MACHINE.bmp");
					break;
				case "38":
					oImage.setSrc("images/Equipment_images/SplitAC1TON.bmp");
					break;
				case "39":
					oImage.setSrc("images/Equipment_images/SplitAC1TONnonstar.bmp");
					break;
				case "40":
					oImage.setSrc("images/Equipment_images/SplitAC1.5TON.bmp");
					break;
				case "41":
					oImage.setSrc("images/Equipment_images/SplitAC1.5TONnonstar.bmp");
					break;
				case "42":
					oImage.setSrc("images/Equipment_images/SplitAC2TON.bmp");
					break;
				case "43":
					oImage.setSrc("images/Equipment_images/SplitAC2TONnonstar.bmp");
					break;
				case "44":
					oImage.setSrc("images/Equipment_images/TOASTER.bmp");
					break;
				case "45":
					oImage.setSrc("images/Equipment_images/TUBE_LIGHT.bmp");
					break;
				case "46":
					oImage.setSrc("images/Equipment_images/VACCUM_CLEANER.bmp");
					break;
				case "47":
					oImage.setSrc("images/Equipment_images/FULL_WM.bmp");
					break;
				case "48":
					oImage.setSrc("images/Equipment_images/SEMI_WM.bmp");
					break;
				case "49":
					oImage.setSrc("images/Equipment_images/WindowAC1TONfivestar.bmp");
					break;
				case "50":
					oImage.setSrc("images/Equipment_images/WindowAC1.5TONfivestar.bmp");
					break;
				case "51":
					oImage.setSrc("images/Equipment_images/WindowAC2TONfivestar.bmp");
					break;
				case "52":
					oImage.setSrc("images/Equipment_images/WindowAC1TONnonstar.bmp");
					break;
				case "53":
					oImage.setSrc("images/Equipment_images/WindowAC1.5TONnonstar.bmp");
					break;
				case "54":
					oImage.setSrc("images/Equipment_images/WindowAC2TONnonstar.bmp");
					break;
				default:
					oImage.setSrc("images/Equipment_images/AIRCOOLER.bmp");
					break;
			}

			this.getWattageValues();

		},

		getWattageValues: function() {
			var Key = sap.ui.getCore().byId("selectEquip").getSelectedKey();
			if (Key === "" || Key === null) {
				Key = "1";
			}
			parseInt(Key);
			var oViewModel = this.oView.getModel("CalculatorView");
			var that = this;
			var filters = new Array();
			filters.push(new sap.ui.model.Filter("EquipNo ", sap.ui.model.FilterOperator.EQ, Key));
			oViewModel.setProperty("/busy", true);
			that.oView.getModel().read("/GetWattageSet", {
				filters: filters,
				success: function(oData) {
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "WattageModel");
					sap.ui.getCore().byId("selectWattage").setSelectedKey(oData.results[0].EuipNo);
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
		},

		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			self = this;
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = self.oView.getModel("CalculatorView");
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

			if (evt.oSource.mProperties.text === "Bill Calculator") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Calculator.bill_calculator"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Energry CalCulator") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.Calculator.energy_calculator"].join("."), this);
				vbox.addItem(fragment1);
				this.getEquipmentList();
				this.getWattageValues();
			}

		}

		,
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}
			

	});

});