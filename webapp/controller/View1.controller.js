sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/core/UIComponent"
], function (Controller, JSONModel, Filter, UIComponent) {
	"use strict";

	return Controller.extend("com.airdit.TransportRequestManagement.controller.View1", {
		onInit: function () {
			this.aFilter = [];
			this.ofilter = "";
			this.getRequests();

		},
		getRequests: function () {
			var localModel = new JSONModel();
			this.getOwnerComponent().getModel().read("/RequestSet", {
				filters: this.oFilter,
				success: function (odata, response) {
					localModel.setData(odata.results);
					this.getView().byId("idProductsTable").setModel(localModel, "localModel");
				}.bind(this)
			});
		},
		onSearchTR: function () {
			if (!this.oDialog) {
				var localModel2 = new JSONModel();
				this.oDialog = new sap.ui.xmlfragment(this.getView().getId(), "com.airdit.TransportRequestManagement.view.SearchTr", this);
				this.getOwnerComponent().getModel().read("/F4_TrNumberSet", {

					success: function (odata, response) {
						// localModel.setData(odata.results);
						// this.getView().byId("idProductsTable").setModel(localModel, "localModel");
						localModel2.setData(odata.results);
						
						this.oDialog.setModel(localModel2, "localModel2");
					}.bind(this)
				});

				this.getView().getModel().refresh();
				
				this.getView().addDependent(this.oDialog);
			}

			this.oDialog.open();

		},
		onSearchOwner: function () {
			if (!this.oDialog1) {
				var localModel3 = new JSONModel();
				this.getOwnerComponent().getModel().read("/F4_OwnerSet", {

					success: function (odata, response) {
						// localModel.setData(odata.results);
						// this.getView().byId("idProductsTable").setModel(localModel, "localModel");
						localModel3.setData(odata.results);
						this.oDialog1.setModel(localModel3, "localModel3");
					}.bind(this)
				});

				this.getView().getModel().refresh();
				this.oDialog1 = new sap.ui.xmlfragment(this.getView().getId(), "com.airdit.TransportRequestManagement.view.SearchOwner", this);
				this.getView().addDependent(this.oDialog1);
			}

			this.oDialog1.open();
			//this.oDialog1.setModel(this.getView().byId("idProductsTable").getModel("localModel"), "localModel");
		},
		pressonCloseDialog: function (oEvent) {
			this.oDialog.close();

		},
		onListTrPressed: function (oEvent) {
		// 	var selectedItem = oEvent.getParameter("listItem").getProperty('title');
		// 	this.getView().byId("transportId").setValue(selectedItem);
		// 	this.oDialog.close();
			// var selectedItem = oEvent.getParameter("selectedItem").getProperty("title");
			// this.getView().byId("transportId").setValue(selectedItem);
		oEvent.getParameter("selectedContexts")[0].getObject();
		 },
		onListOwnerPressed: function (oEvent) {
			var selectedItem = oEvent.getParameter("listItem").getProperty('title');
			this.getView().byId("idCreatedBy").setValue(selectedItem);
			this.oDialog1.close();
		},
		pressOnCloseDialog: function (oEvent) {
			this.oDialog1.close();
		},
		onRequestType: function (oEvent) {

			//	this.oDialog3.setModel(this.getView().byId("idProductsTable").getModel("localModel"), "localModel");
			if (!this.oDialog2) {
				var localModel4 = new JSONModel();
				this.getOwnerComponent().getModel().read("/F4_RequestTypeSet", {

					success: function (odata, response) {
						// localModel.setData(odata.results);
						// this.getView().byId("idProductsTable").setModel(localModel, "localModel");
						localModel4.setData(odata.results);
						this.oDialog2.setModel(localModel4, "localModel4");
					}.bind(this)
				});

				this.getView().getModel().refresh();
				this.oDialog2 = new sap.ui.xmlfragment(this.getView().getId(), "com.airdit.TransportRequestManagement.view.SearchReqType", this);
				this.getView().addDependent(this.oDialog2);
			}

			this.oDialog2.open();
		},
		pressOnCloseDialog2: function (oEvent) {
			this.oDialog2.close();
		},
		onListTypePressed: function (oEvent) {
			var selectedItem = oEvent.getParameter("listItem").getProperty('title');
			this.getView().byId("idRequestType").setValue(selectedItem);
			this.oDialog2.close();
		},
		onNavigate: function (oEvent) {
			var owner = oEvent.getSource().getBindingContext("localModel").getProperty("Owner");
			var type = oEvent.getSource().getBindingContext("localModel").getProperty("Type");
			var requestNumber = oEvent.getSource().getBindingContext("localModel").getProperty("Number");
			var date = oEvent.getSource().getBindingContext("localModel").getProperty("Erdat");
			var description = oEvent.getSource().getBindingContext("localModel").getProperty("Description");
			var prReviewerId = oEvent.getSource().getBindingContext("localModel").getProperty("PrReviewerId");
			var prReviewer =oEvent.getSource().getBindingContext("localModel").getProperty("PrReviewer");
			var grReviewerId=oEvent.getSource().getBindingContext("localModel").getProperty("GrReviewerId");
			var grReviewer=oEvent.getSource().getBindingContext("localModel").getProperty("GrReviewer");
			var atcCheck=oEvent.getSource().getBindingContext("localModel").getProperty("AtcCheck");
			var extendedCheck=oEvent.getSource().getBindingContext("localModel").getProperty("ExtendedCheck");
			var otherCheck=oEvent.getSource().getBindingContext("localModel").getProperty("OtherCheck");
			var comment=oEvent.getSource().getBindingContext("localModel").getProperty("Comment");
			var solution=oEvent.getSource().getBindingContext("localModel").getProperty("Solution");
			var referenceType=oEvent.getSource().getBindingContext("localModel").getProperty("Description");
			var prStatus=oEvent.getSource().getBindingContext("localModel").getProperty("ReferenceType");
			var grStatus=oEvent.getSource().getBindingContext("localModel").getProperty("PrStatus");
			var dependentTr=oEvent.getSource().getBindingContext("localModel").getProperty("GrStatus");
			var position=oEvent.getSource().getBindingContext("localModel").getProperty("DependentTr");
			var obj = {
				Owner: owner,
				Type: type,
				RequestNumber: requestNumber,
				Date: date,
				Description: description,
				PrReviewerId:prReviewerId,
				PrReviewer:prReviewer,
				GrReviewerId:grReviewerId,
				GrReviewer:grReviewer,
				AtcCheck:atcCheck,
				ExtendedCheck:extendedCheck,
				OtherCheck:otherCheck,
				Comment:comment,
				Solution:solution,
				ReferenceType:referenceType,
				PrStatus:prStatus,
				GrStatus:grStatus,
				DependentTr:dependentTr,
				Position:position
			};
			this.getOwnerComponent().getModel("globalModel").setData(obj);
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.getOwnerComponent().getRouter().navTo("RouteView2");
		},
		onClickGo: function (oEvent) {
			this.aFilter = [];
			if (this.getView().byId("transportId").getValue() != "") {
				var reqFilter = new Filter("Number", "EQ", this.getView().byId("transportId").getValue());
				this.aFilter.push(reqFilter);
			}
			if (this.getView().byId("createdOn").getValue() != "") {
				var dateFilter = new Filter("Erdat", "Contains", this.getView().byId("createdOn").getValue());
				this.aFilter.push(dateFilter);
			}
			if (this.getView().byId("idCreatedBy").getValue() != "") {
				var ownerFilter = new Filter("Owner", "Contains", this.getView().byId("idCreatedBy").getValue());
				this.aFilter.push(ownerFilter);
			}
			if (this.getView().byId("idRequestType").getValue() != "") {
				var typeFilter = new Filter("Type", "Contains", this.getView().byId("idRequestType").getValue());
				this.aFilter.push(typeFilter);

			}
			this.oFilter = [new Filter(this.aFilter, true)];
			this.getRequests();
			//	this.getView().byId("idProductsTable").getBinding("items").filter(this.aFilter);         

		}

	});
});