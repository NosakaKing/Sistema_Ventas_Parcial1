namespace Sistema_Ventas.Models
{
    public class SalesModel
    {
        public int Id { get; set; }
        public DateOnly FechaIngreso { get; set; }
        public int NumeroFactura { get; set; }

        public int ClientesModelId { get; set; }
        public ClientModel? ClientesModel { get; set; }

        public int PaymentMehodModelId { get; set; }
        public PaymentMehodModel? PaymentMehodModel { get; set; }
    }
}
