/// <reference path="../../node_modules/@types/knockout/index.d.ts" />
var sf365;
(function (sf365) {
    var checkin;
    (function (checkin) {
        var CheckInViewModel = (function () {
            function CheckInViewModel() {
                this.isbusy = ko.observable(false);
            }
            CheckInViewModel.prototype.foo = function () {
                // Some change
                alert("bar");
            };
            return CheckInViewModel;
        }());
    })(checkin = sf365.checkin || (sf365.checkin = {}));
})(sf365 || (sf365 = {}));
//# sourceMappingURL=checkin.js.map