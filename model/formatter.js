sap.ui.define([
	], function () {
		"use strict";

		return {
			/**
			 * Rounds the currency value to 2 digits
			 *
			 * @public
			 * @param {string} sValue value to be formatted
			 * @returns {string} formatted currency value with 2 digits
			 */
			currencyValue : function (sValue) {
				if (!sValue) {
					return "";
				}
			    return	Math.trunc(sValue);                    
			},

			formatDateToISOString: function(formatdate) {
				if (formatdate) {
					var oDepartureDateUTC = new Date();
					oDepartureDateUTC.setUTCDate(formatdate.getDate());
					oDepartureDateUTC.setUTCMonth(formatdate.getMonth());
					oDepartureDateUTC.setUTCFullYear(formatdate.getFullYear());
					oDepartureDateUTC.setUTCHours(formatdate.getHours());
					oDepartureDateUTC.setUTCMinutes(formatdate.getMinutes());
					oDepartureDateUTC.setUTCSeconds(formatdate.getSeconds());
					oDepartureDateUTC.setUTCMilliseconds(0);
					return oDepartureDateUTC.toISOString().substr(0, 22);
				}
				return "";
		},
		
		formatDate: function(formatdate) {
			if (formatdate) {
				var oDateCreatedOn = "";
				var oType = new sap.ui.model.type.Date({
					style: "medium"
				});
				if (formatdate) {
					oDateCreatedOn = oType.oOutputFormat.format(formatdate, true);
				}
				return oDateCreatedOn;
			} else {
				var oDateCreatedOn = "";
				var oType = new sap.ui.model.type.Date({
					style: "medium"
				});
				if (formatdate) {
					oDateCreatedOn = oType.oOutputFormat.format(new Date(), true);
				}
				return oDateCreatedOn;
			}
		}
		};

	}
);