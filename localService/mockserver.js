sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
// 		var oMockServer,
	     var _sAppModulePath = "tatapower/dev/",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	return {

		init: function () {
			var sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
			    oUriParameters = jQuery.sap.getUriParameters(),
			   
				sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.employeeRemote,
				sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml");
                // ensure there is a trailing slash
				// sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";
// 			create
            	// configure mock server with a delay of 1s
            	
				MockServer.config({
					autoRespond : true,
					autoRespondAfter : (oUriParameters.get("serverDelay") || 1000)
				});
				
			var oMockServer = new MockServer({
				rootUri: oMainDataSource.uri
			
			});

			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 1000
			});

			// simulate
			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl : sJsonFilesUrl,
				bGenerateMissingMockData : true
			});
			
				// handling the metadata error test
				 var aRequests = oMockServer.getRequests(),
				 	fnResponse = function (iErrCode, sMessage, aRequest) {
						aRequest.response = function(oXhr){
							oXhr.respond(iErrCode, {"Content-Type": "text/plain;charset=utf-8"}, sMessage);
						};
					};

				if (oUriParameters.get("metadataError")) {
					aRequests.forEach( function ( aEntry ) {
						if (aEntry.path.toString().indexOf("$metadata") > -1) {
							fnResponse(500, "metadata Error", aEntry);
						}
					});
				}

			// start
			oMockServer.start();
		}

	};

});
