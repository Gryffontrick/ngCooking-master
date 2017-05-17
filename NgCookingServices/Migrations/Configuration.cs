namespace NgCookingServices.Migrations
{
    using Converters;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using Newtonsoft.Json;
    using NgCookingClasses;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Models.NgCookingServicesContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(NgCookingServicesContext context)
        {
            //var manager = new UserManager<Cook>(new UserStore<Cook>(new NgCookingServicesContext()));

            // 1. Reading the Json Files
            // ---------------------------------
            var communityJson = File.ReadAllText(@"C:\Users\C17 Developer\Documents\Visual Studio 2015\Projects\ngCooking-master\NgCookingServices\JsonResources\community.json");
            var ingredientsCategoriesJson = File.ReadAllText(@"C:\Users\C17 Developer\Documents\Visual Studio 2015\Projects\ngCooking-master\NgCookingServices\JsonResources\ingredients-categories.json");
            var ingredientsJson = File.ReadAllText(@"C:\Users\C17 Developer\Documents\Visual Studio 2015\Projects\ngCooking-master\NgCookingServices\JsonResources\ingredients.json");
            var recipesCategoriesJson = File.ReadAllText(@"C:\Users\C17 Developer\Documents\Visual Studio 2015\Projects\ngCooking-master\NgCookingServices\JsonResources\recipes-categories.json");
            var recipesJson = File.ReadAllText(@"C:\Users\C17 Developer\Documents\Visual Studio 2015\Projects\ngCooking-master\NgCookingServices\JsonResources\recipes.json");

            // 2. Deserializing files
            // ---------------------------------
            List<Cook> users = JsonConvert.DeserializeObject<List<Cook>>(communityJson);
            List<IngredientsCategory> ingredientsCategories = JsonConvert.DeserializeObject<List<IngredientsCategory>>(ingredientsCategoriesJson);
            List<Ingredient> ingredients = JsonConvert.DeserializeObject<List<Ingredient>>(ingredientsJson);
            List<RecipesCategory> recipesCategories = JsonConvert.DeserializeObject<List<RecipesCategory>>(recipesCategoriesJson);
            List<Recipe> recipes = JsonConvert.DeserializeObject<List<Recipe>>(recipesJson, new RecipeConverter(ingredients));

            // 3. Deserializing files
            // ---------------------------------
            // Cooks
            if (!context.Cooks.Any())
            {
                foreach (Cook user in users)
                {
                    context.Cooks.AddOrUpdate(user);
                    //manager.Create(user, "c17");
                }
                //context.SaveChanges();
            }

            // IngredientsCategories
            if (!context.IngredientsCategories.Any())
            {
                foreach (IngredientsCategory iCategory in ingredientsCategories)
                {
                    context.IngredientsCategories.AddOrUpdate(iCategory);
                }
                //context.SaveChanges();
            }

            //// RecipesCategories
            if (!context.RecipesCategories.Any())
            {
                foreach (RecipesCategory rCategory in recipesCategories)
                {
                    context.RecipesCategories.AddOrUpdate(rCategory);
                }
                //context.SaveChanges();
            }

            // Ingredients
            if (!context.Ingredients.Any())
            {
                foreach (Ingredient ingredient in ingredients)
                {
                    context.Ingredients.AddOrUpdate(ingredient);
                }
                //context.SaveChanges();
            }

            // Recipes & Comments
            if (!context.Recipes.Any())
            {
                foreach (Recipe recipe in recipes)
                {
                    context.Recipes.AddOrUpdate(recipe);

                    if (!context.Comments.Any())
                    {
                        foreach (Comment comment in recipe.Comments)
                        {
                            context.Comments.AddOrUpdate(comment);
                  //          context.SaveChanges();
                        }
                    }
                }
                //context.SaveChanges();
            }

            // 4 Saving & applying modifications to the database
            // ---------------------------------
            context.SaveChanges();
        }
    }
}