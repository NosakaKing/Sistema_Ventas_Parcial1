namespace Sistema_Ventas.DTOs
{
    public class DetalleVentaDTO
    {
        public int StockModelId { get; set; }
        public int Cantidad { get; set; }
        public float Valor { get; set; }
    }

    public class RegistrarVentaDTO
    {
        public int ClientesModelId { get; set; }
        public int PaymentMehodModelId { get; set; }
        public DateOnly FechaIngreso { get; set; }
        public List<DetalleVentaDTO> Detalles { get; set; }
    }
}
