/// <reference path="../../node_modules/@types/knockout/index.d.ts" />
namespace sf365.checkin
{
    class CheckInViewModel
    {
        isbusy: KnockoutObservable<boolean>;
        constructor() {
            this.isbusy = ko.observable(false);
            
        }
        public foo() {
            // Some change
            alert("bar");
        }

    }


}