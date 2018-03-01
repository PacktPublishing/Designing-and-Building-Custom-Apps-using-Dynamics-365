var sf365;
(function (sf365) {
    var ViewModels;
    (function (ViewModels) {
        var SelectSeatsViewModel = /** @class */ (function () {
            function SelectSeatsViewModel() {
            }
            SelectSeatsViewModel.prototype.foo = function () {
                return "not bar";
            };
            return SelectSeatsViewModel;
        }());
        ViewModels.SelectSeatsViewModel = SelectSeatsViewModel;
    })(ViewModels = sf365.ViewModels || (sf365.ViewModels = {}));
})(sf365 || (sf365 = {}));
/// <reference path="../../node_modules/@types/qunit/index.d.ts" />
/// <reference path="../../ClientUI/src/ViewModel/seatselectionviewmodel.ts" />
QUnit.module("Select Seats Tests");
QUnit.test("Seat settings", function (assert) {
    assert.expect(1);
    var vm = new sf365.ViewModels.SelectSeatsViewModel();
    assert.equal("bar", vm.foo());
});
//# sourceMappingURL=common.js.map