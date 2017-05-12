namespace NgCookingServices.Migrations
{
    using NgCookingClasses;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Web.Script.Serialization;

    internal sealed class Configuration : DbMigrationsConfiguration<Models.NgCookingServicesContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(NgCookingServices.Models.NgCookingServicesContext context)
        {
            var communityJson = System.IO.File.ReadAllText(@"C:\Users\C17 Developer\Documents\Visual Studio 2015\Projects\ngCooking-master\NgCookingServices\community.json");
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<Cook> users = serializer.Deserialize<List<Cook>>(communityJson);

            if (!context.Cooks.Any())
            {
                foreach (Cook user in users)
                {
                    context.Cooks.AddOrUpdate(user);
                }
                context.SaveChanges();
            }

            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
