/// <reference path="../../../node_modules/@types/knockout/index.d.ts" />
var sf365;
(function (sf365) {
    var CheckInViewModel = (function () {
        function CheckInViewModel() {
            this.isbusy = ko.observable(false);
        }
        CheckInViewModel.prototype.foo = function () {
            // Some change
        };
        return CheckInViewModel;
    }());
    sf365.CheckInViewModel = CheckInViewModel;
})(sf365 || (sf365 = {}));
//# sourceMappingURL=checkin.js.map