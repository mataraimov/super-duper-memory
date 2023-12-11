namespace SimpleTODOLesson.Models
{
    public class PostModel
    {
        public int Id { get; set; }



        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string Name { get; set; } = ""; 
        public string ImageUrl { get; set; } = ""; 
        public string Description { get; set; } = "";
    }
}
