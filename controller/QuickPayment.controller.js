sap.ui.define(["sap/ui/core/mvc/Controller",
	"tatapower/dev/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, MessageToast, BaseController, JSONModel) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.QuickPayment", {
		onDisplayNotFound: function(oEvent) {
			// display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {
				fromTarget: "home"
			});
		},

		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/NewConnection.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);

		},

		handleButtonPress: function(evt) {
		
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Procedure and Guidelines") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.ProcedureAndGuidlines"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "Application forms") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.Applicationforms"].join("."), this);
				vbox.addItem(fragment1);
			}
			else if(evt.oSource.mProperties.text === "FAQs") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.FAQs"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.text === "Apply Online") {
				
				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.ApplyOnline"].join("."), this);
				vbox.addItem(fragment1);
			}
				
		

		},
		onBeforeRendering: function() {

		
		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},
		
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.ui.core.demo.nav.view.PaymentHistory
		 */
		onAfterRendering: function() {

		
		},
         
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.ui.core.demo.nav.view.PaymentHistory
		 */
		onExit: function() {

		
		}

		
		if (sel_METHOD.equalsIgnoreCase(Constants.NET_BANKING)) {
            String bank_code_billdesk = "";
            String bank_code_lt = (selected_bank.split(":"))[1];
            String code_lt[] = bank_code_lt.split(",");
            for (int i = 0; i < code_lt.length; i++) {
                if ((code_lt[i].split("-")[0]).equals("B")) {
                    bank_code_billdesk = code_lt[i].split("-")[1];
                }
            }
            url = "https://www.billdesk.com/pgidsk/PGIMerchantRequestHandler?hidRequestId=PGIME1000&hidOperation=ME100";

            c = "TATAPOWERN|" + randomString + "|NA|" + /amt.toPlainString().toString()/ "1.0" + "|"
                    + bank_code_billdesk/selected_bank.split(",")[1]/ + "|NA|NA|" + "INR" + "|DIRECT|R|tatapowern|NA|NA|F|"
                    + accountDetails + "|" + bill_number
                    + "|MOBILEAPP|NA|NA|NA|NA|https://pgi.billdesk.com/pgidsk/pgmerc/TATAPOWERResponse.jsp";
        } else {
            //  url = "https://www.billdesk.com/pgidsk/PGICommonGateway";
            url = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment";
            c = "TATAPOWERN|" + randomString + "|NA|" + /amt.toPlainString().toString()/"1.00" + "|" + "CMP" + "|NA|NA|" + "INR"
                    + "|DIRECT|R|tatapowern|NA|NA|F|" + accountDetails + "|" + bill_number
                    + "|MOBILEAPP|NA|NA|NA|NA|https://pgi.billdesk.com/pgidsk/pgmerc/TATAPOWERResponse.jsp";
        }
//https://uat.billdesk.com/pgidsk/pgmerc/TATAPOWERResponse.jsp
        String checksum1 = Billdesk_logic_checksum.HmacSHA256(c, "JQpGGa1ygw8c");
        String sendBody = c + "|" + checksum1;// http://servpro70.servpro.in/Demo/HtmlPage.html
        
        
		
		
        public static String HmacSHA256(String message, String secret)
        {
           MessageDigest md = null;
           try
           {

              Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
              SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
              sha256_HMAC.init(secret_key);

              byte raw[] = sha256_HMAC.doFinal(message.getBytes());

              StringBuffer ls_sb = new StringBuffer();
              for (int i = 0; i < raw.length; i++)
                 ls_sb.append(char2hex(raw[i]));
              return ls_sb.toString(); //step 6
           }
           catch (Exception e)
           {
              e.printStackTrace();
              return null;
           }
        }
		
		
		
		
		
		
		
	});

});