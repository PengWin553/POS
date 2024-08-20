using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Data.Sqlite;

namespace simple_pos_backend2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionHistoryApiController : ControllerBase
    {
        private SqliteConnection _connection = new SqliteConnection("Data source = simple_pos.db");

        // get all transaction history
        [HttpGet("GetAllTransactionHistory")]
        public async Task<IActionResult> GetAllTransactionHistory(){

            const string query = "Select * from TransactionHistory order by TransactionId desc";
            var result  = await _connection.QueryAsync<TransactionHistory>(query);
            
            if(result.Count() == 0)
                return BadRequest("Bad Request");

            return Ok(result);
        }

        // get specified transaction history
        [HttpGet("GetTransactionHistory{transactionId}")]
        public async Task<ActionResult<TransactionHistory>> GetTransactionHistory(int transactionId){

            const string query = "Select * from TransactionHistory where TransactionId = @TransactionId LIMIT 1";
            var result  = await _connection.QueryAsync<TransactionHistory>(query, new {TransactionId = transactionId});
            
            if(result == null)
                return BadRequest("Bad Request");

            return Ok(result);
        }

        // create transaction history
        [HttpPost("SaveTransaction")]
        public async Task<IActionResult> SaveTransactionAsync(TransactionHistory transactionHistory){
            const string query = "Insert into TransactionHistory (TransactionDate, TotalAmount) Values (@TransactionDate, @TotalAmount); Select * from TransactionHistory order by TransactionId desc Limit 1";
            var result  = await _connection.QueryAsync<TransactionHistory>(query, transactionHistory);
            return Ok(result);
        }
    }
}