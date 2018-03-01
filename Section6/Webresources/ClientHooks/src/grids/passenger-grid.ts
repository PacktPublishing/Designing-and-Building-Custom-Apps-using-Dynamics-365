namespace sf365.Grids {

    export class PassengerGrid {

        static onRecordSelect(executionContext: Xrm.Page.EventContext) {
            var formContext = executionContext.getFormContext();

            var seatclassid = formContext.data.entity
                .attributes
                .get<Xrm.Page.LookupAttribute>(sf365_passenger
                    ._meta.attributes.sf365_seatclassid);

            seatclassid.addOnChange(sf365.forms.passenger.flight_onchange);
        }

        static onSave(executionContext: Xrm.Page.EventContext) {
           

        }

        static onChange(executionContext: Xrm.Page.EventContext) {
           
            

        }
    }

}