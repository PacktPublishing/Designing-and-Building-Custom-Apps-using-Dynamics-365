namespace sf365.Ribbon {

    export class BookingCommands {
        static cancelCommand(commandId: CommandProperties, formContext: Xrm.Page) {
            Xrm.Navigation.openConfirmDialog({
                text: ResourceStrings.AreYouSure
            },
                null,
            ).then((result) => {
                if (result.confirmed) {
                    // TODO: Cancel
                }
            });
        }

        static async canCancel(commandId: string, selectedRecordId: string) {
            
            // In Unified Client can return Promise
            var result = true;
            var booking: sf365_booking = await Xrm.WebApi.retrieveRecord(
                sf365_booking._meta.logicalname,
                selectedRecordId,
                "");

            return booking.statuscode != sf365_bookingStatus.Paid;
        }

        static populateUpgradeFlyout(commandProperties: CommandProperties, formContext: Xrm.FormContext) {

            // Get Flight Attribute
            var flightid = formContext.data.entity.attributes
                .get<Xrm.Page.LookupAttribute>(sf365_booking._meta.attributes.sf365_flightid)
                .getValue();

            commandProperties.PopulationXML = BookingCommands.getUpgradeOptionsXml(flightid);

        }

        static async getUpgradeOptionsXml(flightId: Xrm.LookupValue[]) {
            var flight: sf365_flight = await Xrm.WebApi.retrieveRecord(
                sf365_flight._meta.logicalname,
                flightId[0].id,
                "?$select=" + sf365_flight._meta.attributes.sf365_routeid_value);
            const ribbonMenuSection = new RibbonMenu("sf365.BookingActions");
            const actionSection = new RibbonMenuSection("Section1", "Actions", 1, "Menu16");
            actionSection.addButton(new RibbonButton(
                "sf365_booking.Upgrade1",
                1,
                "Confirm - " + flight[sf365_flight._meta.attributes.sf365_routeid_name],
                "sf365.sf365_booking.Upgrade.Command",
                "/_imgs/ribbon/Activate_16.png",
                ""));
            ribbonMenuSection.addSection(actionSection);
            return ribbonMenuSection.serialiseToRibbonXml();
        }



        static upgradeCommand(commandId: CommandProperties, formContext: Xrm.Page) {
            Xrm.Navigation.openAlertDialog(
                {
                    text: "Clicked : " + formContext.getAttribute("sf365_bookingreference").getValue(),
                    confirmButtonLabel: "Done!"
                },
                { height: 100, width: 200 });
        }
    }

}