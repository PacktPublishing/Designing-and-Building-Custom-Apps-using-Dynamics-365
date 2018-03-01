/// <reference path="../node_modules/@types/qunit/index.d.ts" />
/// <reference path="../webresources/sf365_/js/checkin.ts" />

QUnit.module("ClientUnitTests");
QUnit.test("Checkin Test", (assert) => {
    assert.expect(1);

    var vm = new sf365.checkin.CheckInViewModel();

    vm.foo();

    assert.equal(1, 1, "Dummy Test");

});