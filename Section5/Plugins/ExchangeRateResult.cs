using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace SF365.Plugins
{
    [DataContract]
    public class ExchangeRateResult
    {
        [DataMember]
        public Dictionary<string, double> rates { get; set; }


    }





}