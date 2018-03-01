/// <reference path="../../node_modules/@types/qunit/index.d.ts" />
/// <reference path="../../ClientUI/src/ViewModel/seatselectionviewmodel.ts" />
/// <reference path="../../clientui/src/model/seatsmodel.ts" />
/// <reference path="../../clientui/src/viewmodel/seatselectionviewmodel.ts" />

QUnit.module("Select Seats Tests");
QUnit.test("Seat settings", function (assert) {
    assert.expect(2);

    let settings: sf365.Model.SeatsModelSettings = {
        ColumnNames: ["A", "B", "C", "D", "E"],
        SeatMap: [
            "aa_aaa_aa",
            "aa_aaa_aa",
            "aa_aaa_aa"
        ]
    };

    var seats = new sf365.Model.SeatsModel(settings);

    assert.equal(seats.Rows().length, 3);
    assert.equal(seats.Rows()[0].Seats().length, 9);
});

QUnit.test("Seat assignment", function (assert) {
    assert.expect(2);

    let settings: sf365.Model.SeatsModelSettings = {
        ColumnNames: ["A", "B", "C", "D", "E"],
        SeatMap: [
            "aa_aaa_aa",
            "aa_aaa_aa",
            "aa_aaa_aa"
        ]
    };

    var seats = new sf365.Model.SeatsModel(settings);
    var vm = new sf365.ViewModels.SelectSeatsViewModel();
    vm.Seats(seats);

    var passenger1: sf365.Model.Passenger = {
        sf365_passengerid: "1",
        sf365_fullname: "Bob"
    };
    var passenger2: sf365.Model.Passenger = {
        sf365_passengerid: "2",
        sf365_fullname: "Julie"
    };
    var row1 = seats.Rows()[1];

    var canAccept = vm.canSeatAcceptPassenger(row1.Seats()[1], passenger1);

    vm.assignSeat(row1.Seats()[1], passenger1);

    var canAcceptAgain = vm.canSeatAcceptPassenger(row1.Seats()[1], passenger2);

    assert.equal(canAccept, true);
    assert.equal(canAcceptAgain, false);
});