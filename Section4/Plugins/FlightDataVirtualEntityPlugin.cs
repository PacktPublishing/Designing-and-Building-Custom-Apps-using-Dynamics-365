using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SF365.Plugins
{
    public class FlightDataVirtualEntityPlugin : PluginBase
    {
        public FlightDataVirtualEntityPlugin() : base(typeof(FlightDataVirtualEntityPlugin))
        {

        }

        protected override void ExecuteCrmPlugin(LocalPluginContext localcontext)
        {
            switch (localcontext.PluginExecutionContext.MessageName)
            {
                case "RetrieveMultiple":
                    RetrieveMultiple(localcontext);
                    break;
                case "Retrieve":
                    Retrieve(localcontext);
                    break;
            }
        }

        private void Retrieve(LocalPluginContext localcontext)
        {
            var target = (EntityReference)localcontext.PluginExecutionContext.InputParameters["Target"];
            var record = GetFlightData(target.Id, null).FirstOrDefault();
            localcontext.PluginExecutionContext.OutputParameters["BusinessEntity"] = record;
        }

        private void RetrieveMultiple(LocalPluginContext localcontext)
        {
            var query = (QueryBase)localcontext.PluginExecutionContext.InputParameters["Query"];
            if (query == null)
                return;

            // Get the flight number query

            var expression = query as QueryExpression;
            var filter = expression.Criteria.Conditions.Where(c => c.AttributeName == "sf365_name").FirstOrDefault();
            var flightnumber = filter?.Values[0].ToString();

            var data = GetFlightData(null, flightnumber);

            localcontext.PluginExecutionContext.OutputParameters["BusinessEntityCollection"] =
                new EntityCollection(data);
        }

        private List<Entity> GetFlightData(Guid? flightid, string flightnumber)
        {
            var random = new Random();

            var data = new List<Entity>
                {

                    new Entity("sf365_flightdata")
                    {
                        ["sf365_flightdataid"] = new Guid("00000000-0000-0000-0000-000000000111"),
                        ["sf365_name"] = "111",
                        ["sf365_latitude"] = (Decimal) random.NextDouble(),
                        ["sf365_longitude"] = (Decimal) random.NextDouble()
                    },
                    new Entity("sf365_flightdata")
                    {
                        ["sf365_flightdataid"] = new Guid("00000000-0000-0000-0000-000000000112"),
                        ["sf365_name"] = "112",
                        ["sf365_latitude"] = (Decimal) random.NextDouble(),
                        ["sf365_longitude"] = (Decimal) random.NextDouble()
                    }
            };

            if (flightid != null)
            {
                return data
                    .Where(d => d.GetAttributeValue<Guid>("sf365_flightdataid") == flightid)
                    .ToList();
            }
            else if (!string.IsNullOrEmpty(flightnumber))
            {
                return data
                    .Where(d => d.GetAttributeValue<string>("sf365_name")
                        .EndsWith(flightnumber))
                    .ToList();
            }

            return data;


        }

    }

}
