sap.ui.define([
	"tatapower/dev/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("tatapower.dev.controller.Home", {

		_iCarouselTimeout: 0, // a pointer to the current timeout
		_iCarouselLoopTime: 5000, // loop to next picture after 8 seconds

		onDisplayNotFound: function(oEvent) {
			// display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {
				fromTarget: "home"
			});
		},

		onInit: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();

			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf view.MyAccount
			 */
		},
		onBeforeRendering: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf view.MyAccount
		 */
		onAfterRendering: function() {
			this.mobileDropdown();
			this.onCarouselPageChanged();
			//$("#__panel0").hide();
		},

		onCarouselPageChanged: function() {
			clearTimeout(this._iCarouselTimeout);
			this._iCarouselTimeout = setTimeout(function() {
				var oWelcomeCarousel = this.byId("mainSlider");
				if (oWelcomeCarousel) {
					oWelcomeCarousel.next();
					this.onCarouselPageChanged();
				}
			}.bind(this), this._iCarouselLoopTime);
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf view.MyAccount
		 */
		onExit: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},
		pressOnlineApplication: function(oEvent) {
			this.getRouter().navTo("OnlineApplications");
		},
		onNavToMyAccount: function(oEvent) {
			this.getRouter().navTo("MyAccount");
		},
		onNavToQuickBill: function(oEvent) {
			this.getRouter().navTo("PaymentHistory");
		},
		onNavToPaybill: function(oEvent) {
			this.getRouter().navTo("QuickPayment");
		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		OnNewCustomer: function(oEvent) {
			this.getRouter().navTo("NewCustomer");
		},
		pressTariff: function() {
			this.getRouter().navTo("TariffDetails");
		},
		pressPowerFailure: function() {
			this.getRouter().navTo("RegisterPowerFailure");
		},

		pressBeGreen: function() {
			this.getRouter().navTo("BeGreen");
		},
		pressSafeAtHome: function() {
			this.getRouter().navTo("home");
		},
		pressEaseOfBusinessDoing: function() {
			this.getRouter().navTo("EaseOfDoingBusiness");
		},
		pressCustomercare: function() {
			this.getRouter().navTo("Writetocustomercare");
		},
		pressLoginpage: function() {
			this.getRouter().navTo("Loginpage");
		},
		pressBillcalulator: function() {
			this.getRouter().navTo("Calculator");
		},
		pressFAQ: function() {

			this.getRouter().navTo("LandingFAQs");
		},
		pressGrievances: function() {
			this.getRouter().navTo("Grievances");
		},
		pressDigitalServices: function() {
			this.getRouter().navTo("Landingdigitalservice");
		},
		pressApplicationForms: function() {
			this.getRouter().navTo("ApplicationForms");
		},
		pressPaymentOptions: function() {
			this.getRouter().navTo("PaymentOptions");
		},
		pressGreenCorner: function() {
			this.getRouter().navTo("GreenCorner");
		},
		pressKnowledgeCenter: function() {

			this.getRouter().navTo("LandingKnowledgeCenter");

		},
		pressShedulepoweroutage: function() {

			this.getRouter().navTo("Shedulepoweroutage");

		},
		pressRegulatoryInformation: function() {
			this.getRouter().navTo("RegulatoryInformation");
		},
		pressTrainedWireman: function() {
			this.getRouter().navTo("Wireman");
		},
		pressCalulator: function() {
			this.getRouter().navTo("Calculator");
		},
		pressVideoGallery: function() {
			this.getRouter().navTo("VideoGallery");
		},
		pressLatestAdCampaigns: function() {
			this.getRouter().navTo("LatesAds");
		},
		pressNewsletter: function() {
			this.getRouter().navTo("Newsletter");
		},
		pressNewsforyou: function() {
			window.open('https://www.tatapower.com/media/media-releases.aspx', '_blank');
		},
		pressSeniorLeadership: function() {
			this.getRouter().navTo("SeniorLeadership");
		},
		pressSafetyathome: function() {

			this.getRouter().navTo("Safetyathome");
		},

		pressAboutUs: function() {
			this.getRouter().navTo("AboutUs");
		},

		pressContactUs: function() {
			this.getRouter().navTo("ContactUs");
		},
		pressDigitalChampions: function() {
		this.getRouter().navTo("DigitalChampions");
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}

	});

});