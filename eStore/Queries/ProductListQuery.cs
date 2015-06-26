using System;
using System.Collections.Generic;
using System.Linq;
using eStore.Models;

namespace eStore.Queries
{
    public class ProductListQuery
    {
        private readonly eStoreContext context = new eStoreContext();

        public ProductListResult Execute(ProductListParameters parameters)
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

            if (!String.IsNullOrEmpty(parameters.Category))
            {
                products = products.Where(p => p.Category == parameters.Category);
            }

            return new ProductListResult { Products = products.ToArray() };
        }
    }

    public class ProductListParameters
    {
        public string Category { get; private set; }

        public ProductListParameters(string category)
        {
            Category = category;
        }
    }

    public class ProductListResult
    {
        public IEnumerable<ProductResult> Products { get; set; }
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