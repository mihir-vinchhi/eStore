using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using eStore.Models;

namespace eStore.Controllers
{
    public class ProductSearchController : ApiController
    {
        private readonly eStoreContext context = new eStoreContext();

        [HttpGet]
        public ListResult Get(string category = null)
        {
            return new ListResult
            {
                Products = GetProducts(category)
            };
        }

        private IEnumerable<ProductResult> GetProducts(string category)
        {
            var products = context.Products
                .Select(
                    p =>
                        new ProductResult
                        {
                            ID = p.ProductID,
                            Name = p.ProductName,
                            CategoryID = p.CategoryID ?? 0,
                            Category = p.Category.CategoryName,
                            SupplierID = p.SupplierID ?? 0,
                            Supplier = p.Supplier.CompanyName,
                            QuantityPerUnit = p.QuantityPerUnit,
                            Price = p.UnitPrice ?? 0
                        });

            if (!String.IsNullOrEmpty(category))
            {
                products = products.Where(p => p.Category == category);
            }

            return products.ToArray();
        } 
    }
}