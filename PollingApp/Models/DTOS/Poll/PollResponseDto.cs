namespace Models.Items.Response
{
    public class PollResponseDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpirationDate { get; set; }

        public string CreatedByUserName { get; set; }
         public int TotalVotes { get; set; } // <-- must be set
        public List<OptionDto> Options { get; set; }
    }


}
