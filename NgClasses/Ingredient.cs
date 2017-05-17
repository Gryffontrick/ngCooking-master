using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NgCookingClasses
{
    [JsonObject(MemberSerialization.OptIn)]
    public class Ingredient : MarshalByRefObject
    {
        public Ingredient()
        {
            Recipes = new List<Recipe>();
        }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "isavailable")]
        public bool IsAvailable { get; set; }

        [JsonProperty(PropertyName = "picture")]
        public string Picture { get; set; }

        [JsonProperty(PropertyName = "category")]
        [Required]
        public string CategoryId { get; set; }
        
        [JsonProperty(PropertyName = "calories")]
        public int Calories { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [ForeignKey("CategoryId")]
        public virtual IngredientsCategory Category { get; set; }

        public virtual List<Recipe> Recipes { get; set; }
    }
}