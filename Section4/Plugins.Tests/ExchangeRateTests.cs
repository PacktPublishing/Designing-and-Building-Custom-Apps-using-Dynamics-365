using System;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using Microsoft.Crm.Sdk.Fakes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using sf365;
using SF365.Plugins;

namespace Plugins.Tests
{
    [TestClass]
    public class ExchangeRateTests
    {

        [TestMethod]
        [TestCategory("Unit Tests")]
        public void TestUpdateExchangeRates()
        {

            using (var pipeline = new PluginPipeline(
                "sf365_updateexchangerates", FakeStages.PreOperation, new Entity("sf365_updateexchangerates")))
            {
                pipeline.FakeService.ExpectExecute((OrganizationRequest request) =>
                {

                    return new RetrieveMultipleResponse()
                    {
                        ["EntityCollection"] = new Microsoft.Xrm.Sdk.EntityCollection(
                        new Entity[]
                        {
                            new TransactionCurrency()
                            {
                                TransactionCurrencyId = Guid.NewGuid(),
                                CurrencyName = "CAD",
                                CurrencySymbol ="CAD"
                            },
                            new TransactionCurrency()
                            {
                                TransactionCurrencyId=Guid.NewGuid(),
                                CurrencyName ="GBP",
                                CurrencySymbol = "GBP"
                            }
                        })
                    };
                });

                pipeline.FakeService.ExpectUpdate((Entity record) => { });
                pipeline.FakeService.ExpectUpdate((Entity record) => { });

                var plugin = new ExchangeRateActionPlugin();

                pipeline.Execute(plugin);

                pipeline.FakeService.AssertExpectedCalls();




            }
        }
    }
}
