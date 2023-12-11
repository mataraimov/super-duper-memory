using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Final.Models;
namespace Final.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
        [HttpPost]
		public object Create(ProductModel model)
		{
		}
        [HttpPatch]
        public object Update(ProductModel model)
        {
        }
        [HttpGet("{id}")]
        public object Get(int id)
        {
        }
        [HttpGet]
        public object GetAll()
        {
        }
        [HttpDelete("{id}")]
        public object Delete(int id)
        {
        }
    }
}

