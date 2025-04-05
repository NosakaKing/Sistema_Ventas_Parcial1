namespace Sistema_Ventas.Models
{
    public class DetailsSalesModel
    {
        public int Id { get; set; }
        public int Cantidad { get; set; }
        public float Valor { get; set; }

        public int ProductModelId { get; set; }
        public ProductModel? ProductModel { get; set; }

       public int SalesModelId { get; set; }
        public SalesModel? SalesModel { get; set; }

        public int StockModelId { get; set; }
        public StockModel? StockModel { get; set; }
    }
}
