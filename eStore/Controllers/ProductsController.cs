using System.Web.Http;
using eStore.Queries;

namespace eStore.Controllers
{
    public class ProductsController : ApiController
    {
        [HttpGet]
        public ProductsResult Get()
        {
            return new ProductsQuery().Execute(new ProductsParameters());
        }
    }
}
