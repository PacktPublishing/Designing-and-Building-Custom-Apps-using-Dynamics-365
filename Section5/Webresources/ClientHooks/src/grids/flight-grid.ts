namespace sf365.Grids {

    export class FlightGrid {
       
        static getStatusIcon(rowData: string, userLCID: number) {
            debugger
            var flight: sf365_flight = JSON.parse(rowData);

            var imageName = "";
            switch (flight.statuscode_Value) {
                case "869190005":
                    imageName = "sf365_/imgs/delayed.svg";
                    break;
                default:
                    imageName = "sf365_/imgs/scheduled.svg";
                    break;
            }

            var statusInfo = [imageName, flight.statuscode];
            return statusInfo;
        }
    }


}