

namespace Data
{
    public class Option
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int PollId { get; set; }
        public Poll Poll { get; set; }

  
        public ICollection<Vote> Votes { get; set; }
    }
}
