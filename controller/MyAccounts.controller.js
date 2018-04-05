sap.ui
		.define(
				[ "sap/ui/core/mvc/Controller", "sap/ui/model/Filter",
						"sap/m/MessageToast", "sap/m/MessageBox",
						"sap/ui/model/FilterOperator",
						"sap/ui/model/json/JSONModel",
						"tatapower/dev/model/models" ],
				function(Controller, Filter, MessageToast, MessageBox,
						FilterOperator, JSONModel, models) {
					"use strict";

					return Controller
							.extend(
									"tatapower.dev.controller.MyAccounts",
									{

										onInit : function() {

											// set explored app's demo model on
											// this sample
											var oModel1 = new sap.ui.model.json.JSONModel(
													"json/MyAccount.json");
											// this.getView().setModel(oModel1,
											// "worklistView");

											var oViewModel = new JSONModel({
												busy : false,
												delay : 0
											});
											this.getView().setModel(oViewModel,
													"worklistView");
											this
													.getRouter()
													.getRoute("MyAccounts")
													.attachPatternMatched(
															this._onObjectMatched,
															this);
											this.oView.setModel(oViewModel,
													"MyAccountsView");
											this.oComponent = this
													.getOwnerComponent();
											this.oDataModel = this
													.getOwnerComponent()
													.getModel("McfPortalModel");
											this
													.getOwnerComponent()
													.getModel()
													.metadataLoaded()
													.then(
															this.onMetadataLoaded
																	.bind(this));

											var vbox1 = this.getView().byId(
													"Flexboxview");
											var fragment = sap.ui
													.xmlfragment(
															[ "tatapower.dev.fragments.NewConnection.NewConnectionSideMenu" ]
																	.join("."),
															this);
											fragment.setModel(oModel1);
											vbox1.addItem(fragment);
											var vbox = this.getView().byId(
													"FlexboxProcedure");
											vbox.destroyItems();
											var fragment1 = sap.ui
													.xmlfragment(
															[ "tatapower.dev.fragments.MyAccount.RegisterEbill" ]
																	.join("."),
															this);
											// var fragment1 =
											// sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.OnlinePaymentReceipt"].join("."),
											// this);
											// var fragment1 =
											// sap.ui.xmlfragment(["tatapower.dev.fragments.MyAccount.ViewandPayBillOnline"].join("."),
											// this);
											vbox.addItem(fragment1);

											// this.getPaymentHistory();

										},

										onDataExportPDF : function() {
											var oViewModel = this.oView
													.getModel("worklistView");
											var that = this;
											// var path =
											// "/AppSmartformSet(AppraisalID='"
											// + AppId + "',Is_Skilled='" +
											// is_sklld + "')";
											var path = "/InvoicePDFSet(BillingNumber='EXT000030001963 20151219',Partnertype='01',AccountID='7000009254',ContractAccountID='500000000008')";
											that.oView
													.getModel("NewModel")
													.read(
															path,
															{
																success : function(
																		oData) {
																	if (oData.PDF_Data) {
																		var string = "data:application/pdf;base64,"
																				+ oData.PDF_Data;
																		var iframe = "<iframe width='100%' height='100%' src='"
																				+ string
																				+ "'></iframe>";
																		var x = window
																				.open();
																		x.document
																				.open();
																		x.document
																				.write(iframe);
																		x.document
																				.close();

																	} else {
																		MessageBox
																				.error("Unlable to open pdf");
																	}
																},
																error : function(
																		error) {
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																}
															});
										},

										_onObjectMatched : function() {

											this.oView.getModel()
													.metadataLoaded().then(
															function() {
																// this.getPaymentHistory();
																// this.getBillHistory();

															}.bind(this));
										},

										getPaymentHistory : function() {
											var oTable = sap.ui.getCore().byId(
													"IdViewPaymentTab");
											var oTemplate = oTable
													.getBindingInfo("items").template;
											var filters = new Array();
											filters
													.push(new sap.ui.model.Filter(
															"AccountID",
															sap.ui.model.FilterOperator.EQ,
															"7000009254"));
											filters
													.push(new sap.ui.model.Filter(
															"ContractAccountID",
															sap.ui.model.FilterOperator.EQ,
															"500000000008"));
											oTable.bindItems({
												path : "NewModel>/PaymentSet",
												template : oTemplate,
												filters : filters
											});
										},

										getBillHistory : function() {
											var oTable = sap.ui.getCore().byId(
													"IdViewBillTab");
											var oTemplate = oTable
													.getBindingInfo("items").template;
											var filters = new Array();
											filters
													.push(new sap.ui.model.Filter(
															"AccountID",
															sap.ui.model.FilterOperator.EQ,
															"7000009254"));
											filters
													.push(new sap.ui.model.Filter(
															"ContractAccountID",
															sap.ui.model.FilterOperator.EQ,
															"500000000008"));
											oTable.bindItems({
												path : "NewModel>/InvoiceSet",
												template : oTemplate,
												filters : filters
											});
										},
										onPressSubmit : function() {
											var oEntry = {};
											var oViewModel = this.oView
													.getModel("worklistView");
											var ConsumerNo = sap.ui.getCore()
													.byId("IdCustNO")
													.getValue();

											if (sap.ui.getCore().byId(
													"RDBAgree").getSelected()) {
												var EbillOpt = "X";
											} else if (sap.ui.getCore().byId(
													"RDBNotAgree")
													.getSelected()) {
												var EbillOpt = "";
											}
											var sPath = "/RegisterForEbillSet(ConsumerNo='"
													+ ConsumerNo
													+ "',LEbillOpt='"
													+ EbillOpt + "')";
											this.oView
													.getModel("McfPortalModel")
													.read(
															sPath,
															{
																async : true,
																success : function(
																		oData) {
																	MessageBox
																			.alert(oData.LsText);
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																},
																error : function(
																		error) {
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																}
															});
										},
										onPressReset : function() {
											sap.ui.getCore().byId("IdCustNO")
													.setValue("");
											sap.ui.getCore().byId("IdCustName")
													.setValue("");
											sap.ui.getCore()
													.byId("IdCustEmail")
													.setValue("");
											sap.ui.getCore()
													.byId("IdCustMobNo")
													.setValue("");
											sap.ui.getCore().byId("RDBAgree")
													.setSelected(true);
										},

										onPressGo : function() {
											var Custmr = sap.ui.getCore().byId(
													"IdCustNO").getValue();
											var oViewModel = this.oView
													.getModel("worklistView");
											var that = this;
											oViewModel.setProperty("/busy",
													true);
											var sPath = "/EbillRegisterSet(ConsumerNo='"
													+ Custmr + "')";
											that.oView
													.getModel("McfPortalModel")
													.read(
															sPath,
															{
																success : function(
																		oData) {
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																	sap.ui
																			.getCore()
																			.byId(
																					"IdCustName")
																			.setValue(
																					oData.ConsumerName);
																	sap.ui
																			.getCore()
																			.byId(
																					"IdCustEmail")
																			.setValue(
																					oData.Email);
																	sap.ui
																			.getCore()
																			.byId(
																					"IdCustMobNo")
																			.setValue(
																					oData.Mobile);
																},
																error : function(
																		error) {
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																}
															});

										},

										onSubmitFeedback : function() {
											var oEntry = {};
											var oViewModel = this.oView
													.getModel("worklistView");
											oViewModel.setProperty("/busy",
													true);
											oEntry.Custnumb = sap.ui.getCore()
													.byId("IdAcc_no")
													.getValue();
											oEntry.Custname = sap.ui.getCore()
													.byId("IdConsm_name")
													.getValue();
											oEntry.Email = sap.ui.getCore()
													.byId("IdEmail").getValue();
											oEntry.Phone = sap.ui.getCore()
													.byId("IdMob_no")
													.getValue();

											if (sap.ui.getCore().byId(
													"RDB_UsageType1")
													.getSelected()) {
												oEntry.Usagetype = "1";
											} else if (sap.ui.getCore().byId(
													"RDB_UsageType2")
													.getSelected()) {
												oEntry.Usagetype = "2";
											} else if (sap.ui.getCore().byId(
													"RDB_UsageType3")
													.getSelected()) {
												oEntry.Usagetype = "3";
											} else if (sap.ui.getCore().byId(
													"RDB_UsageType4")
													.getSelected()) {
												oEntry.Usagetype = "4";
											}

											if (sap.ui.getCore().byId(
													"RDB_LookFeel1")
													.getSelected()) {
												oEntry.Lookfeel = 0;
											} else if (sap.ui.getCore().byId(
													"RDB_LookFeel2")
													.getSelected()) {
												oEntry.Lookfeel = 1;
											} else if (sap.ui.getCore().byId(
													"RDB_LookFeel3")
													.getSelected()) {
												oEntry.Lookfeel = 2;
											} else if (sap.ui.getCore().byId(
													"RDB_LookFeel4")
													.getSelected()) {
												oEntry.Lookfeel = 3;
											}

											if (sap.ui.getCore().byId(
													"RDB_EaseNav1")
													.getSelected()) {
												oEntry.Easeofnav = 0;
											} else if (sap.ui.getCore().byId(
													"RDB_EaseNav2")
													.getSelected()) {
												oEntry.Easeofnav = 1;
											} else if (sap.ui.getCore().byId(
													"RDB_EaseNav3")
													.getSelected()) {
												oEntry.Easeofnav = 2;
											} else if (sap.ui.getCore().byId(
													"RDB_EaseNav4")
													.getSelected()) {
												oEntry.Easeofnav = 3;
											}

											if (sap.ui.getCore().byId(
													"CHB_BillPay")
													.getSelected()) {
												oEntry.BillPayment = "X";
											}
											if (sap.ui.getCore().byId(
													"CHB_ViewNDwn")
													.getSelected()) {
												oEntry.ViewBill = "X";
											}
											if (sap.ui.getCore().byId(
													"CHB_RegComp")
													.getSelected()) {
												oEntry.Complaints = "X";
											}
											if (sap.ui.getCore().byId(
													"CHB_DSMReg").getSelected()) {
												oEntry.Dsm = "X";
											}
											if (sap.ui.getCore().byId(
													"CHB_TariffInfo")
													.getSelected()) {
												oEntry.Tariff = "X";
											}
											if (sap.ui.getCore().byId(
													"CHB_Queries")
													.getSelected()) {
												oEntry.Tpfeedback = "X";
											}
											if (sap.ui.getCore().byId(
													"CHB_Others").getSelected()) {
												oEntry.Other = "X";
											}

											oEntry.Sugges = sap.ui.getCore()
													.byId("SuggestBoxId")
													.getValue();
											oEntry.Createdon = new Date();
											this.oDataModel.setHeaders({
												"X-CSRF-Token" : "Fetch"
											});
											this.oDataModel
													.create(
															"/FeedBackSet",
															oEntry,
															null,
															// this.oView.getModel("McfPortalModel").create("/FeedBackSet",
															// oEntry, null,
															{
																async : true,
																success : function(
																		oData) {
																	MessageBox
																			.alert("Thank you for your feedback.");
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																},
																error : function(
																		error) {
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																}
															});

										},
										onGetConsDetails : function() {
											var Custmr = localStorage
													.getItem("UsrNm");
											var oViewModel = this.oView
													.getModel("worklistView");
											var that = this;
											if (Custmr !== null) {
												oViewModel.setProperty("/busy",
														true);
												var sPath = "/EbillRegisterSet(ConsumerNo='"
														+ Custmr + "')";
												that.oView
														.getModel(
																"McfPortalModel")
														.read(
																sPath,
																{
																	success : function(
																			oData) {
																		oViewModel
																				.setProperty(
																						"/busy",
																						false);
																		sap.ui
																				.getCore()
																				.byId(
																						"IdConsm_name")
																				.setValue(
																						oData.ConsumerName);
																		sap.ui
																				.getCore()
																				.byId(
																						"IdEmail")
																				.setValue(
																						oData.Email);
																		sap.ui
																				.getCore()
																				.byId(
																						"IdMob_no")
																				.setValue(
																						oData.Mobile);
																		sap.ui
																				.getCore()
																				.byId(
																						"IdAcc_no")
																				.setValue(
																						oData.ConsumerNo);

																	},
																	error : function(
																			error) {
																		oViewModel
																				.setProperty(
																						"/busy",
																						false);
																	}
																});
											} else {
												MessageBox
														.error("Please login to Share your feedback.");
											}

										},

										onPressESubmit : function() {

											var oViewModel = this.oView
													.getModel("McfPortalModel");
											oViewModel
													.setProperty("/busy,true");

											var oEntry = {};
											var oPath = "/RegisterEservicesSet";

											// var ConsumerNo =
											// sap.ui.getCore().byId("IdCustNO").getValue();
											oEntry.CustomerNo = '500000000009';

											if (sap.ui.getCore().byId(
													"on_bill_email")
													.getSelected()) {
												oEntry.ChkBillGenEmail = 'X';
											} else {
												oEntry.ChkBillGenEmail = '';
											}
											if (sap.ui.getCore().byId(
													"pay_receipt_email")
													.getSelected()) {
												oEntry.ChkPaymentReceivedEmail = 'X';
											} else {
												oEntry.ChkPaymentReceivedEmail = '';
											}
											if (sap.ui.getCore().byId(
													"disc_dt_email")
													.getSelected()) {
												oEntry.ChkDiscDateReminderEmail = 'X';
											} else {
												oEntry.ChkDiscDateReminderEmail = '';
											}
											if (sap.ui.getCore().byId(
													"due_dt_email")
													.getSelected()) {
												oEntry.ChkDueDateReminderEmail = 'X';
											} else {
												oEntry.ChkDueDateReminderEmail = '';
											}

											if (sap.ui.getCore().byId(
													"em_radio1").getSelected()) {

												oEntry.RdoFlagEmail = '1';
											} else if (sap.ui.getCore().byId(
													"em_radio2").getSelected()) {

												oEntry.RdoFlagEmail = '2';
											} else if (sap.ui.getCore().byId(
													"em_radio3").getSelected()) {

												oEntry.RdoFlagEmail = '3';
											}

											if (sap.ui.getCore().byId(
													"on_bill_sms")
													.getSelected()) {
												oEntry.ChkBillGenSms = 'X';
											} else {
												oEntry.ChkBillGenSms = '';
											}
											if (sap.ui.getCore().byId(
													"pay_receipt_sms")
													.getSelected()) {
												oEntry.ChkPaymentReceivedSms = 'X';
											} else {
												oEntry.ChkPaymentReceivedSms = '';
											}
											if (sap.ui.getCore().byId(
													"disc_dt_sms")
													.getSelected()) {
												oEntry.ChkDiscDateReminderSms = 'X';
											} else {
												oEntry.ChkDiscDateReminderSms = '';
											}
											if (sap.ui.getCore().byId(
													"due_dt_sms").getSelected()) {
												oEntry.ChkDueDateReminderSms = 'X';
											} else {
												oEntry.ChkDueDateReminderSms = '';
											}

											if (sap.ui.getCore().byId(
													"sms_radio1").getSelected()) {

												oEntry.RdoFlagMobile = '1';
											} else if (sap.ui.getCore().byId(
													"sms_radio2").getSelected()) {

												oEntry.RdoFlagMobile = '2';
											} else if (sap.ui.getCore().byId(
													"sms_radio3").getSelected()) {

												oEntry.RdoFlagMobile = '3';
											}

											oEntry.InputEmail1 = sap.ui
													.getCore().byId(
															"text_e_radio1")
													.getValue();
											oEntry.InputEmail2 = sap.ui
													.getCore().byId(
															"text_e_radio2")
													.getValue();
											oEntry.InputEmail3 = sap.ui
													.getCore().byId(
															"text_e_radio3")
													.getValue();
											oEntry.InputMobile1 = sap.ui
													.getCore().byId(
															"text_s_radio1")
													.getValue();
											oEntry.InputMobile2 = sap.ui
													.getCore().byId(
															"text_s_radio2")
													.getValue();
											oEntry.InputMobile3 = sap.ui
													.getCore().byId(
															"text_s_radio3")
													.getValue();
											/*
											 * oEntry.InputEmail1 =
											 * sap.getCore().byId("text_e_radio1").getText();
											 * oEntry.InputEmail2 =
											 * sap.getCore().byId("text_e_radio2").getText();
											 * oEntry.InputEmail3 =
											 * sap.getCore().byId("text_e_radio3").getText();
											 * oEntry.InputMobile1 =
											 * sap.getCore().byId("text_s_radio1").getText();
											 * oEntry.InputMobile2 =
											 * sap.getCore().byId("text_s_radio2").getText();
											 * oEntry.InputMobile3 =
											 * sap.getCore().byId("text_s_radio3").getText();
											 */
											// var oViewModel1 =
											// this.getOwnerComponent().getModel("McfPortalModel");
											oViewModel
													.create(
															oPath,
															oEntry,
															{
																async : true,
																success : function(
																		oEntry) {
																	MessageBox
																			.alert(oEntry.LvMsg);
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																},
																error : function() {
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																}

															});

										},
										getServiceDetails : function() {

											var oViewModel = this.oView
													.getModel("worklistView");
											var that = this;
											oViewModel.setProperty("/busy",
													true);
											var sPath = "/GetEserviceContactsSet('500000000009')";
											//(ConsumerNo='" + Custmr + "')";
											//	that.oDataModel = this.getOwnerComponent().getModel("McfPortalModel");
											//that.oDataModel.read(sPath, {

											that.oView
													.getModel("McfPortalModel")
													.read(
															sPath,
															{
																success : function(
																		oData) {

																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																	sap.ui
																			.getCore()
																			.byId(
																					"text_e_radio1")
																			.setValue(
																					oData.TxtEmail1);
																	sap.ui
																			.getCore()
																			.byId(
																					"text_e_radio2")
																		.setValue(
																					oData.TxtEmail2);
																	sap.ui
																			.getCore()
																			.byId(
																					"text_e_radio3")
																			.setValue(
																					oData.TxtEmail3);

																	/*         that.getView().byId("em_radio1").setValue(oData.TxtEmail1);
																	         that.getView().byId("em_radio2").setValue(oData.TxtEmail2);
																	         that.getView().byId("em_radio3").setValue(oData.TxtEmail3);
																	 */

																	sap.ui
																			.getCore()
																			.byId(
																					"text_s_radio1")
																			.setValue(
																					oData.TxtMobile1);
																	sap.ui
																			.getCore()
																			.byId(
																					"text_s_radio2")
																			.setValue(
																					oData.TxtMobile2);
																	sap.ui
																			.getCore()
																			.byId(
																					"text_s_radio3")
																			.setValue(
																					oData.TxtMobile3);
																},
																error : function(
																		error) {
																	oViewModel
																			.setProperty(
																					"/busy",
																					false);
																}
															});

										},

										onPressResetRE : function() {

											sap.ui.getCore().byId(
													"text_e_radio1").setValue(
													"");
											sap.ui.getCore().byId(
													"text_e_radio2").setValue(
													"");
											sap.ui.getCore().byId(
													"text_e_radio3").setValue(
													"");

											sap.ui.getCore().byId(
													"text_s_radio1").setValue(
													"");
											sap.ui.getCore().byId(
													"text_s_radio2").setValue(
													"");
											sap.ui.getCore().byId(
													"text_s_radio3").setValue(
													"");
										},
										onMetadataLoaded : function() {
											// Store original busy indicator delay for the detail view
											self = this;
											var iOriginalViewBusyDelay = this
													.getView()
													.getBusyIndicatorDelay(), oViewModel = self.oView
													.getModel("MyAccountsView");
											// Make sure busy indicator is displayed immediately when
											// detail view is displayed for the first time
											oViewModel.setProperty("/delay", 0);
											// Binding the view will set it to not busy - so the view is always busy if it is not bound
											oViewModel.setProperty("/busy",
													true);
											// Restore original busy indicator delay for the detail view
											oViewModel.setProperty("/delay",
													iOriginalViewBusyDelay);
										},

										handleButtonPress : function(evt) {

											var vbox = this.getView().byId(
													"FlexboxProcedure");
											vbox.destroyItems();

											if (evt.oSource.mProperties.text === "Register For E-Bill") {

												var fragment1 = sap.ui
														.xmlfragment(
																[ "tatapower.dev.fragments.MyAccount.RegisterEbill" ]
																		.join("."),
																this);
												vbox.addItem(fragment1);
											} else if (evt.oSource.mProperties.text === "Register For E-Service") {

												var fragment1 = sap.ui
														.xmlfragment(
																[ "tatapower.dev.fragments.MyAccount.RegisterEservice" ]
																		.join("."),
																this);
												this.getServiceDetails();
												vbox.addItem(fragment1);
											} else if (evt.oSource.mProperties.text === "Change Password") {

												var fragment1 = sap.ui
														.xmlfragment(
																[ "tatapower.dev.fragments.MyAccount.ChangePassword" ]
																		.join("."),
																this);
												vbox.addItem(fragment1);
											} else if (evt.oSource.mProperties.text === "My Account Statement") {

												var fragment1 = sap.ui
														.xmlfragment(
																[ "tatapower.dev.fragments.MyAccount.MyAccountStatement" ]
																		.join("."),
																this);
												vbox.addItem(fragment1);
											} else if (evt.oSource.mProperties.text === "Online Payment Receipt") {

												var fragment1 = sap.ui
														.xmlfragment(
																[ "tatapower.dev.fragments.MyAccount.OnlinePaymentReceipt" ]
																		.join("."),
																this);
												vbox.addItem(fragment1);

												this.getPaymentHistory();
											} else if (evt.oSource.mProperties.text === "View And Pay Bill Online") {

												var fragment1 = sap.ui
														.xmlfragment(
																[ "tatapower.dev.fragments.MyAccount.ViewandPayBillOnline" ]
																		.join("."),
																this);
												vbox.addItem(fragment1);

												this.getBillHistory();

											} else if (evt.oSource.mProperties.text === "Please Share your feedback") {

												var fragment1 = sap.ui
														.xmlfragment(
																[ "tatapower.dev.fragments.MyAccount.PleaseShareYourFeedback" ]
																		.join("."),
																this);
												vbox.addItem(fragment1);
												this.onGetConsDetails();
											}

										},

										onHomePress : function(oEvent) {
											this.getRouter().navTo("home");
										},

										getRouter : function() {
											return sap.ui.core.UIComponent
													.getRouterFor(this);
										}
									/**
									 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
									 * This hook is the same one that SAPUI5 controls get after being rendered.
									 * @memberOf tatapower.dev.view.MyAccounts
									 */
									//	onAfterRendering: function() {
									//
									//	},
									/**
									 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
									 * @memberOf tatapower.dev.view.MyAccounts
									 */
									//	onExit: function() {
									//
									//	}
									});

				});