using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOS.Vote
{
    public class CastVoteDto
    {
        public int PollId { get; set; }
        public int OptionId { get; set; }
    }
}
