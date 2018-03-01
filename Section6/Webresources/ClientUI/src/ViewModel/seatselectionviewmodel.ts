/// <reference path="../lib/sortable.ts" />
/// <reference path="../../../node_modules/@types/xrm/index.d.ts" />
/// <reference path="../lib/guid.ts" />

namespace sf365.ViewModels {

    export class SelectSeatsViewModel {
        constructor() {
            this.Seats = ko.observable<Model.SeatsModel>();
            this.Passengers = ko.observableArray<Model.Passenger>();
            this.EditedPassengers = ko.observableArray<Model.Passenger>();
            this.IsBusy = ko.observable(false);
            this.PassengerEdited = ko.observable<Model.Passenger>();


        }
        IsBusy: KnockoutObservable<boolean>;
        Seats: KnockoutObservable<Model.SeatsModel>;
        Passengers: KnockoutObservableArray<Model.Passenger>;
        EditedPassengers: KnockoutObservableArray<Model.Passenger>;
        PassengerEdited: KnockoutObservable<Model.Passenger>;

        canSeatAcceptPassenger(seat: Model.Seat, passenger: Model.Passenger): boolean {
            return !this.isSeatOccupied(seat.passengers);
        }

        isSeatOccupied(passengers: KnockoutObservableArray<Model.Passenger>): boolean {
            return passengers().length !== 0;
        }
        isSeatUnoccupied(passengers: KnockoutObservableArray<Model.Passenger>): boolean {
            return passengers().length == 0;
        }
        assignSeat(seat: Model.Seat, passenger: Model.Passenger) {

            if (this.canSeatAcceptPassenger(seat, passenger)) {
                passenger.sf365_seat = seat.name;
                this.Seats().SeatIndex[passenger.sf365_seat].passengers.push(passenger);
            } else {
                throw new Error("Cannot assign seat");
            }
        }

        afterAssign() {
            return (args: AfterMoveEventArgs<Model.Passenger, any>) => {
                this.EditedPassengers.push(args.item);
                var parent = args.targetParent;
                args.item.sf365_seat = parent.seat.name;
                this.PassengerEdited(args.item);
            };
        }
        afterUnAssign() {
            return (args: AfterMoveEventArgs<Model.Passenger, any>) => {
                this.EditedPassengers.push(args.item);
                args.item.sf365_seat = "";
                this.PassengerEdited(args.item);
            };
        }

        async loadSeats(flightId: string, bookingId: string) {
            this.IsBusy(true);
            let results = await Promise.all([
                // Get the seat configuration
                Xrm.WebApi.retrieveRecord("sf365_flight",
                    flightId,
                    "?$select=sf365_flightnumber&$expand=sf365_AssignedSpacecraftId($select=sf365_seatconfiguration)"),

                // Get the existing seat assignments
                Xrm.WebApi.retrieveMultipleRecords("sf365_passenger",
                    encodeURI(`?fetchXml=<fetch version="1.0" output-format="xml-platform" mapping="logical">
                              <entity name="sf365_passenger">
                                <attribute name="sf365_passengerid" />
                                <attribute name="sf365_fullname" />
                                <attribute name="sf365_seat" />
                                <attribute name="sf365_bookingid" />
                                <order attribute="sf365_fullname" descending="false" />
                                <link-entity name="sf365_booking" from="sf365_bookingid" to="sf365_bookingid" link-type="inner" alias="aa">
                                  <filter type="and">
                                    <condition attribute="sf365_flightid" operator="eq" uitype="sf365_flight" value="${flightId}" />
                                  </filter>
                                </link-entity>
                              </entity>
                            </fetch>`))
            ]
            );
            let seatConfiguration = results[0];
            let existingSeatAssignments = results[1];

            let seatConfig: string = seatConfiguration
                .sf365_AssignedSpacecraftId.sf365_seatconfiguration;

            // Split by line break
            let seats = seatConfig.split('\n');
            let settings: Model.SeatsModelSettings = {
                ColumnNames: ["A", "B", "C", "D", "E", "F", "G", "H"],
                SeatMap: seats
            };
            let seatsData = new Model.SeatsModel(settings);
            this.Seats(seatsData);

            // Set the seats occupied already
            for (let passengerRecord of
                <Model.Passenger[]>existingSeatAssignments.entities) {

                if (passengerRecord.sf365_seat != null) {
                    // Get seat
                    let seat = seatsData.SeatIndex[passengerRecord.sf365_seat];
                    if (seat != null) {
                        this.assignSeat(seat, passengerRecord);
                    }
                } else if (libs.Guid
                    .compare(passengerRecord._sf365_bookingid_value, bookingId)) {
                    this.Passengers.push((passengerRecord));
                }
            }
            this.IsBusy(false);
        }

        async saveSeatAssignments() {
           
            let updates = new Array<any>();
            for (let passenger of this.EditedPassengers()) {
                let updatePassenger: Model.Passenger = {};
                updatePassenger.sf365_passengerid = passenger.sf365_passengerid;
                updatePassenger.sf365_seat = passenger.sf365_seat;

                // Update seat assignment
                updates.push(
                    this.savePassenger(updatePassenger));
            }

            this.EditedPassengers.removeAll();
            await Promise.all(updates);
            
        }

        async savePassenger(passenger: Model.Passenger) {
            await Xrm.WebApi.updateRecord("sf365_passenger",
                passenger.sf365_passengerid,
                passenger); 
        }
    }
}