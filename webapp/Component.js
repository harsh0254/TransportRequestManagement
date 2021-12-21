sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/airdit/TransportRequestManagement/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.airdit.TransportRequestManagement.Component", {

		metadata: {
			manifest: "json",config: { fullWidth: true }
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			var jsonModel = new sap.ui.model.json.JSONModel();
			this.setModel(jsonModel,"globalModel");
			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});