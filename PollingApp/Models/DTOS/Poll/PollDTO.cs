namespace Models.Items.Response
{
    public class PollDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Question { get; set; }
        public DateTime ExpirationDate { get; set; }
        public List<OptionDto> Options { get; set; }

        public int TotalVotes { get; set; }
    }

}
