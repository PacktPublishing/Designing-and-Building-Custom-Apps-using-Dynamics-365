/// <reference path="../../../node_modules/@types/xrm/index.d.ts" />

namespace sf365.forms {
    export class booking {
       
        
        
        static onload(executionContext: Xrm.Page.EventContext) {

            var formContext = executionContext.getFormContext();
            const flightAttribute = formContext.data.entity.attributes
                .get<Xrm.Page.LookupAttribute>(sf365_booking._meta.attributes.sf365_flightid);

            flightAttribute.addOnChange(sf365.forms.booking.flight_onchange);

            const passengerGrid = <Xrm.Controls.GridControl>formContext
                .getControl("Passengers");
            passengerGrid.addOnLoad(() => booking.passengerGrid_OnLoad(formContext));
        }

        static passengerGrid_OnLoad(formContext : Xrm.FormContext): any {

            var totalPrice = formContext
                .getAttribute<Xrm.Page.NumberAttribute>(sf365_booking
                    ._meta.attributes.sf365_totalprice);

            const passengerGrid = <Xrm.Controls.GridControl>formContext
                .getControl("Passengers");
            var total = 0;

            passengerGrid.getGrid().getRows().forEach((row) => {
                var priceAttribute = row.data.entity.attributes
                    .get(sf365_passenger._meta.attributes.sf365_price);
                if (priceAttribute != null) {
                    var value = priceAttribute.getValue();
                    total += value;
                }
            });

            if (totalPrice.getValue() != total) {

                formContext.ui
                    .setFormNotification(
                    "Price has changed",
                    "WARNING",
                    "price");


            }
            else {
                formContext.ui.clearFormNotification("price");
            }
            
        }

        static flight_onchange(executionContext: Xrm.Page.EventContext) {
            var formContext = executionContext.getFormContext();

            const flightAttribute = formContext.data.entity.attributes
                .get<Xrm.Page.LookupAttribute>(sf365_booking._meta.attributes.sf365_flightid);

            const flight = flightAttribute.getValue();

            if (flight != null) {
                // Populate the flight from the route
                Xrm.WebApi.retrieveRecord(sf365_flight._meta.logicalname, flight[0].id,
                    "?$select=" + sf365_flight._meta.attributes.sf365_routeid_value
                ).then((flightRecord: sf365_flight) => {
               
                    const routeAttribute =
                        formContext.data.entity.attributes
                            .get<Xrm.Page.LookupAttribute>(sf365_booking._meta.attributes.sf365_routeid);

                    routeAttribute.setValue([{
                        entityType: <string>flightRecord[sf365_flight._meta.attributes.sf365_routeid_logicalname],
                        name: <string>flightRecord[sf365_flight._meta.attributes.sf365_routeid_name],
                        id: flightRecord._sf365_routeid_value
                    }]);

                });

            }

        }
    }
}