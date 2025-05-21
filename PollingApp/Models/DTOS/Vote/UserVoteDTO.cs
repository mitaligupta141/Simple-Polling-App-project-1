namespace Models.Items.Response
{
    public class UserVoteDto
    {
        public string Question { get; set; }
        public string OptionText { get; set; }
        public DateTime VotedAt { get; set; }
    }

}
