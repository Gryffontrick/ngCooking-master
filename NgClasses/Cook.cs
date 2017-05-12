using Newtonsoft.Json;
using NgCookingClasses.Enums;
using System;

namespace NgCookingClasses
{
    [JsonObject(MemberSerialization.OptIn)]
    public class Cook
    {
        [JsonProperty(PropertyName = "firstname")]
        public string Firstname { get; set; }

        [JsonProperty(PropertyName = "surname")]
        public string Surname { get; set; }

        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "level")]
        public CookLevel Level { get; set; }

        [JsonProperty(PropertyName = "picture")]
        public string Picture { get; set; }

        [JsonProperty(PropertyName = "city")]
        public string City { get; set; }

        [JsonProperty(PropertyName = "birth")]
        public int Birth { get; set; }

        [JsonProperty(PropertyName = "bio")]
        public string Bio { get; set; }
    }
}