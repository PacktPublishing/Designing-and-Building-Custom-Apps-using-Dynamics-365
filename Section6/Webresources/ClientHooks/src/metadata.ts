namespace sf365 {
    export enum sf365_bookingStatus
    {
        Enquiry = 1,
        Confirmed = 869190000,
        Paid = 869190001
    }

    export class sf365_booking {
        static _meta = {
            logicalname: "sf365_booking",
            attributes: {
                sf365_routeid: "sf365_routeid",
                sf365_flightid: "sf365_flightid",
                sf365_totalprice: "sf365_totalprice"
            }
        };
        [key: string]: string | number;
        statuscode: sf365_bookingStatus
    }

    export class sf365_flight {
        static _meta = {
            logicalname: "sf365_flight",
            attributes: {
                sf365_routeid: "sf365_routeid",
                sf365_routeid_value: "_sf365_routeid_value",
                sf365_routeid_name: "_sf365_routeid_value@OData.Community.Display.V1.FormattedValue",
                sf365_routeid_logicalname: "_sf365_routeid_value@Microsoft.Dynamics.CRM.lookuplogicalname"
            }
        };
        [key: string]: string | number;
        sf365_flightid?: string;
        _sf365_routeid_value?: string;
        statuscode: string;
        statuscode_Value: string;
        
    }

    export class sf365_passenger {
        static _meta = {
            logicalname: "sf365_passenger",
            attributes: {
                sf365_flightid: "sf365_routeid",
                sf365_seatclassid: "sf365_seatclassid",
                sf365_seatclassid_value: "_sf365_seatclassid_value",
                sf365_price : "sf365_price"
            }
        };
        [key: string]: string | number;
        sf365_flightid?: string;
        sf365_price?: number;
    }

    export class sf365_seat {
        static _meta = {
            logicalname: "sf365_seat",
            attributes: {
                sf365_price: "sf365_price"
            }
        };
        [key: string]: string | number;
        sf365_price?: number;
    }
}
