using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Data.Sqlite;

namespace simple_pos_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductApiController : ControllerBase
    {
        private SqliteConnection _connection = new SqliteConnection("Data source = simple_pos.db");

        // get all products
        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts(){

            const string query = "Select * from Products order by ProductId desc";
            var result  = await _connection.QueryAsync<Product>(query);
            
            if(result.Count() == 0)
                return BadRequest("Bad Request");

            return Ok(result);
        }

        // get specified product
        [HttpGet("GetProduct{productId}")]
        public async Task<ActionResult<Product>> GetProduct(int productId){

            const string query = "Select * from Products where ProductId = @ProductId LIMIT 1";
            var result  = await _connection.QueryAsync<Product>(query, new {ProductId = productId});
            
            if(result == null)
                return BadRequest("Bad Request");

            return Ok(result);
        }

        // create product
        [HttpPost("SaveProduct")]
        public async Task<IActionResult> SaveProductAsync(Product product){
            const string query = "Insert into Products (ProductName, Price, Stock, Unit, Sku, CategoryId) Values (@ProductName, @Price, @Stock, @Unit, @Sku, @CategoryId); Select * from Products order by ProductId desc Limit 1";
            var result  = await _connection.QueryAsync<Product>(query, product);
            return Ok(result);
        }

        // update product
        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProductAsync(int id, Product product){
            const string query = "Update Products set ProductName = @ProductName, Price = @Price, Stock = @Stock, Unit = @Unit, Sku = @Sku, CategoryId = @CategoryId where ProductID = @ProductId; Select * from Products where ProductID = @ProductId limit 1";
            
            var result  = await _connection.QueryAsync<Product>(query, new {
                ProductId = id,
                product.ProductName,
                product.Price,
                product.Stock,
                product.Unit,
                product.Sku,
                product.CategoryId
            });

            if (!result.Any())
                return NotFound($"Product with ID {id} not found");

            return Ok(result);
        }

        // Method to update stock for a product (handle them individually; utilized effectively by multiple server requests in frontend)
        [HttpPut("UpdateProductStock")]
        public async Task<IActionResult> UpdateProductStockAsync(int id, int quantity){
            const string query = "Update Products Set Stock = Stock - @Quantity Where ProductId = @ProductId";
            var result = await _connection.ExecuteAsync(query, new { ProductId = id, Quantity = quantity });

            if (result > 0)
                return Ok("Stock updated successfully.");
            else
                return BadRequest("Failed to update stock.");
        }

        // gets list of products to update (handle the batch)
        [HttpPut("UpdateProductStocks")]
        public async Task<IActionResult> UpdateProductStocks(List<ProductStockUpdate> updates)
        {
            const string query = "Update Products Set Stock = Stock - @Quantity Where ProductId = @ProductId";

            foreach (var update in updates)
            {
                var result = await _connection.ExecuteAsync(query, new { ProductId = update.ProductId, Quantity = update.Quantity });
            }

            return Ok();
        }

        // delete product
        [HttpDelete("DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(int id){
            const string query = "Delete From Products where ProductId = @productId; ";
            await _connection.QueryAsync<Product>(query, new { productId = id });
            return Ok();
        }
    }
}