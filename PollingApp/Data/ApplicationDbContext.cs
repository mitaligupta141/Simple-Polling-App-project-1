using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Poll>()
                .HasOne(p => p.CreatedBy)
                .WithMany()
                .HasForeignKey(p => p.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Option>()
                .HasOne(o => o.Poll)
                .WithMany(p => p.Options)
                .HasForeignKey(o => o.PollId)
                .OnDelete(DeleteBehavior.Cascade);

            

            builder.Entity<Vote>()
           .HasOne(v => v.Poll)
           .WithMany(p => p.Votes)
           .HasForeignKey(v => v.PollId)
           .OnDelete(DeleteBehavior.NoAction);  

          
            builder.Entity<Vote>()
                .HasOne(v => v.Option)
                .WithMany(o => o.Votes)
                .HasForeignKey(v => v.OptionId)
                .OnDelete(DeleteBehavior.NoAction); 

            builder.Entity<Vote>()
                .HasOne(v => v.User)
                .WithMany()
                .HasForeignKey(v => v.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }


        public DbSet<Poll> Polls { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Vote> Votes { get; set; }

    }
}
