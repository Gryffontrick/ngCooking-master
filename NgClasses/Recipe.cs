using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NgCookingClasses
{
    [JsonObject(MemberSerialization.OptIn)]
    public class Recipe : MarshalByRefObject
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "creatorId")]
        [Required]
        public int CookId { get; set; }

        [JsonProperty(PropertyName = "creationDate")]
        public DateTime CreationDate { get; set; }

        [JsonProperty(PropertyName = "isAvailable")]
        public bool IsAvailable { get; set; }

        [JsonProperty(PropertyName = "category")]
        [Required]
        public string CategoryId { get; set; }

        [JsonProperty(PropertyName = "picture")]
        public string Picture { get; set; }

        [JsonProperty(PropertyName = "calories")]
        public int Calories { get; set; }

        [JsonProperty(PropertyName = "ingredients")]
        [Required]
        public virtual List<Ingredient> Ingredients { get; set; }

        [JsonProperty(PropertyName = "preparation")]
        public string Preparation { get; set; }

        [JsonProperty(PropertyName = "comments")]
        public virtual List<Comment> Comments { get; set; }

        [ForeignKey("CategoryId")]
        public virtual RecipesCategory Category { get; set; }

        [ForeignKey("CookId")]
        public virtual Cook Cook { get; set; }
    }
}