/// <reference path="../lib/dictionary.ts" />
/// <reference path="../../../node_modules/@types/knockout/index.d.ts" />
var sf365;
(function (sf365) {
    var Model;
    (function (Model) {
        var SeatsModel = /** @class */ (function () {
            function SeatsModel(settings) {
                this.settings = settings;
                this.init();
            }
            SeatsModel.prototype.init = function () {
                this.Rows = ko.observableArray();
                this.SeatIndex = {};
                // initialise the seats using the map
                var rowIndex = 0;
                var colIndex = 0;
                for (var _i = 0, _a = this.settings.SeatMap; _i < _a.length; _i++) {
                    var row = _a[_i];
                    colIndex = 0;
                    var rowItems = new Row();
                    for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                        var seat = row_1[_b];
                        var seatItem = new Seat();
                        seatItem.seatclass = seat;
                        if (seat !== '_') {
                            seatItem.name = (this.settings.RowNames ? this.settings.RowNames[rowIndex] : (rowIndex + 1).toString()) + this.settings.ColumnNames[colIndex];
                            colIndex++;
                        }
                        rowItems.Seats.push(seatItem);
                        this.SeatIndex[seatItem.name] = seatItem;
                    }
                    this.Rows.push(rowItems);
                    rowIndex++;
                }
            };
            return SeatsModel;
        }());
        Model.SeatsModel = SeatsModel;
        var Row = /** @class */ (function () {
            function Row() {
                this.Seats = ko.observableArray();
            }
            return Row;
        }());
        Model.Row = Row;
        var Seat = /** @class */ (function () {
            function Seat() {
                this.passengers = ko.observableArray();
                this.passengers.seat = this;
            }
            return Seat;
        }());
        Model.Seat = Seat;
    })(Model = sf365.Model || (sf365.Model = {}));
})(sf365 || (sf365 = {}));
//# sourceMappingURL=seatsmodel.js.map