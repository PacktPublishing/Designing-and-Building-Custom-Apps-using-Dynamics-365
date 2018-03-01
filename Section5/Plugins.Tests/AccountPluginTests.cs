using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Xrm.Sdk;
using Microsoft.Crm.Sdk.Fakes;
using SF365.Plugins;

namespace Plugins.Tests
{
    [TestClass]
    public class AccountPluginTests
    {
        [TestMethod]
        [TestCategory("Unit Tests")]
        public void ThrowsException()
        {
            using (var pipeline = new PluginPipeline(
                FakeMessageNames.Create, FakeStages.PreOperation, new Entity("contact")))
            {

                try
                {
                    // Act
                    var plugin = new AccountPlugin();
                    pipeline.Execute(plugin);
                    Assert.Fail("No exception thrown");
                }
                catch (Exception ex)
                {
                    // Assert
                    Assert.AreEqual("Working on it...", ex.Message);
                }

                pipeline.FakeService.AssertExpectedCalls();
            }

        }
    }
}
