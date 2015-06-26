using System.Collections.Generic;
using System.Linq;
using eStore.Models;

namespace eStore.Queries
{
    public class ProductsQuery
    {
        private readonly eStoreContext context = new eStoreContext();

        public ProductsResult Execute(ProductsParameters parameters)
        {
            var categories = context.Categories
                .Select(c => new CategoryResult { ID = c.CategoryID, Name = c.CategoryName })
                .ToArray();

            return new ProductsResult
            {
                Categories = categories
            };
        }
    }

    public class ProductsParameters
    {
    }

    public class ProductsResult
    {
        public IEnumerable<CategoryResult> Categories { get; set; }
    }

    public class CategoryResult
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}