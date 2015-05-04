using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using eStore.Models;

namespace eStore.Controllers
{
    public class ProductCatalogueController : ApiController
    {
        private readonly eStoreContext context = new eStoreContext();

        [HttpGet]
        public BrowseResult Get(string category = null)
        {
            var categories = context.Categories
                .Select(c => new CategoryResult { ID = c.CategoryID, Name = c.CategoryName })
                .ToArray();

            return new BrowseResult
            {
                Categories = categories
            };
        }
    }

    public class BrowseResult
    {
        public IEnumerable<CategoryResult> Categories { get; set; }
        public IEnumerable<ProductResult> Products { get; set; }
    }

    public class ListResult
    {
        public IEnumerable<ProductResult> Products { get; set; }
    }

    public class CategoryResult
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public class ProductResult
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CategoryID { get; set; }
        public string Category { get; set; }
        public int SupplierID { get; set; }
        public string Supplier { get; set; }
        public string QuantityPerUnit { get; set; }
        public decimal Price { get; set; }
    }
}
