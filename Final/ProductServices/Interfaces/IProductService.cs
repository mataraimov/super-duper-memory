using System;
using Final.Models;

namespace Final.ProductServices.Interfaces
{
	public interface IProductService
    {
        ProductModel Create(ProductModel model);

        ProductModel Update(ProductModel model);

        ProductModel Get(int id);

        List<ProductModel> Get();

        void Delete(int id);
    }
}

