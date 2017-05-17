using Newtonsoft.Json;
using NgCookingClasses.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace NgCookingClasses
{
    [JsonObject(MemberSerialization.OptIn)]
    public class Comment
    {
        [JsonProperty(PropertyName = "userId")]
        public int UserId { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "comment")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "mark")]
        public CommentMark Mark { get; set; }

        public int Id { get; set; }

        [ForeignKey("UserId")]
        public virtual Cook Cook { get; set; }
    }
}