namespace Models.Items.Response
{
    public class CreatePollDto
    {
        public string Question { get; set; }
        public DateTime? ExpirationDate { get; set; } = DateTime.Now.AddDays(7);
        public List<string> Options { get; set; }
    }

}
