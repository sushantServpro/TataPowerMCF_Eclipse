sap.ui.define([
	"tatapower/dev/controller/BaseController",
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.PaymentHistory", {
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		onInit: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();

		},

		onBeforeRendering: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},
		pressbilldesk: function() {
			window.location.href = 'https://pgi.billdesk.com/pgidsk/PGIMerchantPayment';
		},

		pressTechprocess: function() {
			window.location.href = 'https://www.tpsl-india.in/PaymentGateway/txnreq.pg?';
		},

		pressCitrus: function() {
			window.location.href = 'https://checkout.citruspay.com/ssl/checkout/';
		},
		
		pressPaytm: function() {
			window.location.href = 'https://secure.paytm.in/oltp-web/processTransaction';
		},

		pressItzcash: function() {
			window.location.href = 'http://demo.itzcash.com/payment/merchant/jsp/Process.jsp';
		},
		
		pressUpi: function() {
			window.location.href = 'http://180.92.171.239:7031/UPITataPower/merchantPaymentGateway.html';
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf view.MyAccount
		 */
		onAfterRendering: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf view.MyAccount
		 */
		onExit: function() {
			this.mobileDropdown();
			//$("#__panel0").hide();
		},
		pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
		},
		pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
		}

	});

});