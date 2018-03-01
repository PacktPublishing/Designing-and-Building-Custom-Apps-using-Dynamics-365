using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Crm.Sdk.Fakes;
using Microsoft.Xrm.Sdk;
using SF365.Plugins;

namespace Plugins.Tests
{
    [TestClass]
    public class AccountPluginTests
    {
        [TestMethod]
        [TestCategory("Unit Test")]
        public void TestAccountPlugin()
        {
            using (var pipline = new PluginPipeline(
                FakeMessageNames.Create, FakeStages.PreOperation, new Entity("contact")))
            {
                var plugin = new AccountPlugin();

                try
                {
                    pipline.Execute(plugin);
                    Assert.Fail("Exception not thrown");
                }
                catch (InvalidPluginExecutionException ex)
                {
                    Assert.IsTrue(ex.Message.Contains("Working on it")
                        , "Must throw exeception");
                }
            }
        }
    }
}
