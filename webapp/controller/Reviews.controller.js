sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/core/UIComponent",
	'sap/ui/core/Fragment',
	'sap/m/MessageBox'
], function (Controller, JSONModel, Filter, UIComponent,Fragment,MessageBox) {
	"use strict";

	return Controller.extend("com.airdit.TransportRequestManagement.controller.Reviews", {
		onInit: function () {
					
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
			this.showFragment("Display");
		},
		showFragment:function(mode){
			this.getView().byId("idFragment").removeAllItems();
			var sFragment="";
			if(mode==="Display")
			{
				sFragment="DisplayReview";
			}
			else
			{
				sFragment="EditReview";
			}
					var displayFragment = Fragment.load({
					id: this.getView().getId(),
					name: "com.airdit.TransportRequestManagement.view." + sFragment
				});
				displayFragment.then(function(oForm){this.getView().byId("idFragment").addItem(oForm);}.bind(this));
			
		},
		_handleRouteMatched: function (oEvent) {
			       var myModel = this.getOwnerComponent().getModel("globalModel");
				
			this.getView().setModel(myModel,"localModel");
		},
		onBack:function(oEvent)
		{
			var id = oEvent.getSource().getAggregation('content')[2].getAggregation('items')[0].getId();
			if(id==="__form2")
			{
			window.history.back();
			this.showFragment("Display");
			sap.ui.core.Fragment.byId(this.getView().getId(),"editId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"approvalId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"saveId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"cancelId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"changeReviewerId").setVisible(false);
			}
			else{
					window.history.back();
			}
		},
		onClickLoadEditFragment:function()
		{
		this.showFragment("edit");
		sap.ui.core.Fragment.byId(this.getView().getId(),"editId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"approvalId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"saveId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"cancelId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"changeReviewerId").setVisible(true);
		},
		onSave:function(){
			MessageBox.confirm("Please confirm the changes by clicking on OK");
			this.showFragment("Display");
			sap.ui.core.Fragment.byId(this.getView().getId(),"editId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"approvalId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"saveId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"cancelId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"changeReviewerId").setVisible(false);
		},
		onCancel:function()
		{
		this.showFragment("Display");
		sap.ui.core.Fragment.byId(this.getView().getId(),"editId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"approvalId").setVisible(true);
		sap.ui.core.Fragment.byId(this.getView().getId(),"saveId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"cancelId").setVisible(false);
		sap.ui.core.Fragment.byId(this.getView().getId(),"changeReviewerId").setVisible(false);
		}

	});
});