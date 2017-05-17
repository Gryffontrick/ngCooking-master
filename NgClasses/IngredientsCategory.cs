using Newtonsoft.Json;

namespace NgCookingClasses
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class IngredientsCategory
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "displayname")]
        public string DisplayName { get; set; }
    }
}