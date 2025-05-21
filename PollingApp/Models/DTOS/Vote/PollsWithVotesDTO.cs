namespace Models.Items.Response
{

    public class PollWithVotesDto
    {
        public int PollId { get; set; }
        public string Question { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpirationDate { get; set; }
        public List<OptionVoteDto> Options { get; set; }
    }

}
