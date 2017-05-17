using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using NgCookingClasses;
using NgCookingClasses.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NgCookingServices.Converters
{
    public class RecipeConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return true;
        }

        public override bool CanRead
        {
            get { return true; }
        }

        static List<Ingredient> persistedIngredients = new List<Ingredient>();
        static string JsonText;
        public RecipeConverter(List<Ingredient> ings)
        {
            persistedIngredients = ings;
        }

        public RecipeConverter(List<Ingredient> ings, string jsonText)
        {
            persistedIngredients = ings;
            JsonText = jsonText;
        }

        private static readonly DateTime _epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Local);
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jrecipes = JObject.Load(reader);
            JArray a = JArray.Parse(jrecipes["recipes"].ToString());

            List<Recipe> recipes = new List<Recipe>();
            Recipe recipe;
            JToken comments, ingredients;

            foreach (JToken jObject in a.Children<JToken>())
            {
                recipe = new Recipe
                {
                    Id = (string)jObject["id"],
                    Name = (string)jObject["name"],
                    CategoryId = (string)jObject["category"],
                    Calories = (int)jObject["calories"],
                    Comments = new List<Comment>(),
                    CookId = (int)jObject["creatorId"],
                    CreationDate = _epoch.AddMilliseconds((long)jObject["creationDate"]),
                    Ingredients = new List<Ingredient>(),
                    Preparation = (string)jObject["preparation"],
                    IsAvailable = (bool)jObject["isAvailable"],
                    Picture = (string)jObject["picture"]
                };

                ingredients = jObject["ingredients"];
                if (ingredients != null)
                {
                    foreach (JToken ingredient in ingredients.Children<JToken>())
                    {
                        recipe.Ingredients.Add(
                            persistedIngredients.Find(i => i.Id.Equals((string)ingredient))
                        );
                    }
                }

                comments = jObject["comments"];
                if (comments != null)
                {
                    foreach (JToken comment in comments.Children<JToken>())
                    {
                        recipe.Comments.Add(
                            new Comment
                            {
                                UserId = (int)comment["userId"],
                                Mark = ((CommentMark)((int)comment["mark"])),
                                Text = (string)comment["comment"],
                                Title = (string)comment["title"],
                            }
                        );
                    }
                }

                recipes.Add(recipe);
            }

            return recipes;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}