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
		
			//$("#__panel0").hide();
			this.GetCheckSumValue();

		},

		onBeforeRendering: function() {
		
			//$("#__panel0").hide();
		},
	

		GetCheckSumValue:function(Checksumurl)
		{
		        jQuery.ajax({
			        type: "POST",
			        url: "http://northwind.servicestack.net/customers?format=json",
			        data: "",
			        dataType : "json",
			        async: false, 
			        success: function(response) { 
			        	  alert(response.Customers[0].Id);
			        	},
			        error: function() { 
			        	alert('Failed!'); 
			        	}
			    });	
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
			
			//$("#__panel0").hide();
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf view.MyAccount
		 */
		onExit: function() {
		
			//$("#__panel0").hide();
		}

	});

});