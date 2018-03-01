namespace sf365.forms {
    export class passenger {
        
        static onload(executionContext: Xrm.Page.EventContext) {
            var formContext = executionContext.getFormContext();

            var seatclassid = formContext.data.entity
                .attributes.get<Xrm.Page.LookupAttribute>(sf365_passenger
                    ._meta.attributes.sf365_seatclassid);

            seatclassid.addOnChange(passenger.flight_onchange);
        
        }

        static async flight_onchange(executionContext: Xrm.Page.EventContext) {

            var formContext = executionContext.getFormContext();
            var seatclassid = formContext.data.entity.attributes
                .get<Xrm.Page.LookupAttribute>(sf365_passenger.
                    _meta.attributes.sf365_seatclassid).getValue();

            if (seatclassid != null) {
                var seatclass: sf365_seat = await Xrm.WebApi.retrieveRecord(
                    sf365_seat._meta.logicalname,
                    seatclassid[0].id,
                    "?$select=" + sf365_seat._meta.attributes.sf365_price
                );

                var priceAttribute = formContext.data.entity
                    .attributes.get<Xrm.Page.NumberAttribute>(sf365_passenger
                        ._meta.attributes.sf365_price);

                priceAttribute.setValue(seatclass.sf365_price);
            }
           
        }
    }
}