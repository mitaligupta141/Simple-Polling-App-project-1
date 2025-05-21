using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Vote
    {
       

        public int Id { get; set; }
        public string UserId { get; set; }
       

        public int OptionId { get; set; }
        public Option Option { get; set; }

        public int PollId { get; set; }
        public Poll Poll { get; set; }

        public ApplicationUser User { get; set; }
    }
}
