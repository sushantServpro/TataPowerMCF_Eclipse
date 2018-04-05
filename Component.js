sap.ui.define([
	"sap/ui/core/UIComponent",
	"tatapower/dev/model/models",
	"tatapower/dev/controller/ErrorHandler"
], function (UIComponent,models,ErrorHandler) {
	"use strict";

	return UIComponent.extend("tatapower.dev.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
		    this._oErrorHandler = new ErrorHandler(this);
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			// 	set the device model
				this.setModel(models.createDeviceModel(),"device");
				// set the FLP model
				this.setModel(models.createFLPModel(),"FLP");
			// create the views based on the url/hash
			    this.getRouter().initialize();
		}

	});

});