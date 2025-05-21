using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;


namespace Data
{
 
    public class Poll
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public DateTime ExpirationDate { get; set; } = DateTime.Now.AddDays(7);
        public ICollection<Option> Options { get; set; }
        public ICollection<Vote> Votes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string CreatedById { get; set; }

        public ApplicationUser CreatedBy { get; set; }
    }
}
