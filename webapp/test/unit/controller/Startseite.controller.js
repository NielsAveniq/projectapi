/*global QUnit*/

sap.ui.define([
	"projectapi/controller/Startseite.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Startseite Controller");

	QUnit.test("I should test the Startseite controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
