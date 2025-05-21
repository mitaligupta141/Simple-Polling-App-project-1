namespace Models.Items.Response
{
    public class OptionDto1
    {
       
            public int Id { get; set; }
            public string Text { get; set; }

            // ✅ Add this property
            public int VoteCount { get; set; }
        
    }
}
