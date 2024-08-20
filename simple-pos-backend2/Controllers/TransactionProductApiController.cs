using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Mvc;

namespace simple_pos_backend2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionProductApiController : ControllerBase
    {
        private SqliteConnection _connection = new SqliteConnection("Data source = simple_pos.db");

        // get specified transaction's products
        [HttpGet("GetTransactionProducts")]
        public async Task<ActionResult<TransactionProduct>> GetTransactionProducts(int transactionId){

            const string query = "Select tp.TransactionProductId, tp.TransactionId, tp.ProductId, p.ProductName, p.Price, tp.Quantity from TransactionProducts tp Inner Join Products p on tp.ProductId = p.ProductId Where tp.TransactionId = @TransactionId";
            var result  = await _connection.QueryAsync<TransactionProduct>(query, new {TransactionId = transactionId});
            
            if(result == null)
                return BadRequest("Bad Request");

            return Ok(result);
        }

        // create transaction product
        // [HttpPost("SaveTransactionProduct")]
        // public async Task<IActionResult> SaveTransactionProductAsync(TransactionProduct transactionProduct)
        // {
        //     const string query = "Insert into TransactionProducts (TransactionId, ProductId, Quantity) Values (@TransactionId, @ProductId, @Quantity); Select tp.TransactionProductId, tp.TransactionId, tp.ProductId, p.ProductName, p.Price, tp.Quantity from TransactionProducts tp Inner Join Products p on tp.ProductId = p.ProductId Where tp.TransactionId = @TransactionId";

        //     var result = await _connection.QueryAsync<TransactionProduct>(query, transactionProduct);
        //     return Ok(result);
        // }

        [HttpPost("SaveTransactionProductsBatch")]
        public async Task<IActionResult> SaveTransactionProductsBatchAsync(List<TransactionProduct> transactionProducts)
        {
            const string query = "INSERT INTO TransactionProducts (TransactionId, ProductId, Quantity) VALUES (@TransactionId, @ProductId, @Quantity)";
            var affectedRows = await _connection.ExecuteAsync(query, transactionProducts);

            if (affectedRows > 0)
            {
                return Ok("Transaction products saved successfully.");
            }
            else
            {
                return BadRequest("Failed to save transaction products.");
            }
        }
    }
}