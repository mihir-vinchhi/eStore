using System.Web.Http;
using eStore.Queries;

namespace eStore.Controllers
{
    public class ProductListController : ApiController
    {
        [HttpGet]
        public ProductListResult Get(string category = null)
        {
            return new ProductListQuery().Execute(new ProductListParameters(category));
        }
    }
}