/// <reference path="../node_modules/@types/qunit/index.d.ts" />
/// <reference path="../webresources/sf365_/js/checkin.ts" />
QUnit.module("Check In Tests");
QUnit.test("Empty Test", function (assert) {
    // Assemble
    var vm = new sf365.CheckInViewModel();
    // Act
    assert.expect(1);
    vm.foo();
    // Asert
    assert.equal(true, true);
    // Tidy Up   
});
//# sourceMappingURL=checkin-tests.js.map