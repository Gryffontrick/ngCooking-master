using Microsoft.AspNet.Identity.EntityFramework;
using NgCookingClasses;
using System.Data.Entity;

namespace NgCookingServices.Models
{
    public class NgCookingServicesContext : DbContext // : IdentityDbContext<Cook>
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public NgCookingServicesContext() : base("name=NgCookingServicesContext") // , throwIfV1Schema: false
        {
            //Configuration.ProxyCreationEnabled = false;
            //Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>()
            .HasMany(r => r.Ingredients)
            .WithMany(i => i.Recipes)
            .Map(m =>
            {
                m.ToTable("RecipesToIngredients");
                m.MapLeftKey("Recipes_Id");
                m.MapRightKey("Ingredients_Id");
            });

            modelBuilder.Entity<Ingredient>()
            .HasMany(i => i.Recipes)
            .WithMany(r => r.Ingredients)
            .Map(m =>
            {
                m.ToTable("RecipesToIngredients");
                m.MapLeftKey("Ingredients_Id");
                m.MapRightKey("Recipes_Id");
            });

            base.OnModelCreating(modelBuilder);
        }

        //public static NgCookingServicesContext Create()
        //{
        //    return new NgCookingServicesContext();
        //}

        public DbSet<Cook> Cooks { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<IngredientsCategory> IngredientsCategories { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipesCategory> RecipesCategories { get; set; }
    }
}