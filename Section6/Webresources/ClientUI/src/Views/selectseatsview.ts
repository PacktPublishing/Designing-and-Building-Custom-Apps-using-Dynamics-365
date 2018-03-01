/// <reference path="../viewmodel/seatselectionviewmodel.ts" />
/// <reference path="../../../node_modules/@types/xrm/index.d.ts" />

namespace sf365.Views {
    export class SelectSeatsView {
        static vm: ViewModels.SelectSeatsViewModel;
        static inSave: boolean;

        static async init() {
            this.vm = new ViewModels.SelectSeatsViewModel()

            var flightid = Xrm.Page.
                getAttribute<Xrm.Attributes.LookupAttribute>("sf365_flightid")
                .getValue();

            var bookingid = Xrm.Page.data.entity.getId();

            // Load Data
            await this.vm.loadSeats(
                flightid[0].id,
                bookingid);

            this.vm.PassengerEdited.subscribe(() => {
                console.debug("edited");
                parent.Xrm.Page
                    .getAttribute("sf365_seatsmodified")
                    .setValue(Date.now().toString());
            });

            parent.Xrm.Page.data.entity.addOnSave(SelectSeatsView.onSave);

            ko.applyBindings(this.vm);
        }

        static async onSave(context: Xrm.Page.SaveEventContext) {

           

            try {
                await SelectSeatsView.vm.saveSeatAssignments()
            }
            catch (ex) {
                context.getEventArgs().preventDefault();
                Xrm.Navigation.openAlertDialog({ text: ex.message }, null);
            }
            
        }
    }

}