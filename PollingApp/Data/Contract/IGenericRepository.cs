
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Data.Contract
{


 
        public interface IGenericRepository<T> where T : class
        {
         
            Task<IEnumerable<T>> GetAllAsync();

         
            Task<T> GetByConditionAsync(Expression<Func<T, bool>> expression);

            
            Task CreateAsync(T entity);

            
            void Update(T entity);

            void Delete(T entity);

            
            Task SaveAsync();
        
    }
}
