/// <reference path="../lib/dictionary.ts" />
/// <reference path="../../../node_modules/@types/knockout/index.d.ts" />
namespace sf365.Model {

    export interface SeatsModelSettings {
        ColumnNames?: string[];
        RowNames?: string[];
        SeatMap: string[];
    }


    export class SeatsModel {
        settings: SeatsModelSettings;
        constructor(settings: SeatsModelSettings) {
            this.settings = settings;
            this.init();

        }
        Rows: KnockoutObservableArray<Row>;
        SeatIndex: Lib.Dictionary<Seat>;

        init(): void {
            this.Rows = ko.observableArray<Row>();
            this.SeatIndex = {};

            // initialise the seats using the map
            let rowIndex = 0;
            let colIndex = 0;
            for (let row of this.settings.SeatMap) {
                colIndex = 0;

                let rowItems = new Row();
                for (let seat of row) {
                    let seatItem = new Seat();

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
        }
    }

    export class Row {
        constructor() {
            this.Seats = ko.observableArray<Seat>();
        }
        Seats: KnockoutObservableArray<Seat>;
    }

    export class Seat {
        constructor() {
            this.passengers = ko.observableArray<Passenger>();
            this.passengers.seat = this;
        }
        seatclass: string;
        avalable: boolean;
        name: string;
        passengers: KnockoutObservableArray<Passenger>;

    }


    export interface Passenger {
        edited?: boolean;
        sf365_passengerid?: string;
        sf365_fullname?: string;
        sf365_seat?: string;
        _sf365_bookingid_value?: string;

    }



}