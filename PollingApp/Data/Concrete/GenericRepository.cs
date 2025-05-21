using System;
using Data.Contract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;


namespace Data.Concrete
{
  

   
        public class GenericRepository<T> : IGenericRepository<T> where T : class
        {
            private readonly ApplicationDbContext _context;
            private readonly DbSet<T> _dbSet;

            public GenericRepository(ApplicationDbContext context)
            {
                _context = context;
                _dbSet = _context.Set<T>();
            }

          
            public async Task<IEnumerable<T>> GetAllAsync()
            {
                return await _dbSet.ToListAsync();
            }

            
            public async Task<T> GetByConditionAsync(Expression<Func<T, bool>> expression)
            {
                return await _dbSet.FirstOrDefaultAsync(expression);
            }

           
            public async Task CreateAsync(T entity)
            {
                await _dbSet.AddAsync(entity);
            }

         
            public void Update(T entity)
            {
                _dbSet.Update(entity);
            }

       
            public void Delete(T entity)
            {
                _dbSet.Remove(entity);
            }

            public async Task SaveAsync()
            {
                await _context.SaveChangesAsync();
            }
        }
    }


