public class TransactionProduct
{
    public int TransactionProductId { get; set; }
    public int? TransactionId { get; set; }
    public int? ProductId { get; set; }
    public string? ProductName { get; set; }
    public float? Price { get; set; }
    public int? Quantity { get; set; }
}
