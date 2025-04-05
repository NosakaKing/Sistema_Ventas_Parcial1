using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_Ventas.Data;
using Sistema_Ventas.Models;

namespace Sistema_Ventas.Controllers
{
    [Authorize(Roles = "Admin, Vendedor")]
    public class SalesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SalesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ListarClientes()
        {
            var clientes = _context.Clients
                .Select(c => new { c.Id, Nombre = c.Nombres + " " + c.Apellidos })
                .ToList();
            return Json(clientes);
        }

        [HttpGet]
        public IActionResult ListarMetodosPago()
        {
            var metodos = _context.PaymentMehods
                .Select(p => new { p.Id, p.Nombre })
                .ToList();
            return Json(metodos);
        }

        [HttpGet]
        public IActionResult ObtenerStockPorProducto(int productoId)
        {
            var stocks = _context.Stocks
                .Include(s => s.Product)
                .Where(s => s.ProductId == productoId)
                .Select(s => new
                {
                    s.Id,
                    s.Cantidad,
                    s.PrecioUnitario,
                    s.PrecioVenta,
                    s.FechaIngreso,
                    s.FechaVencimiento,
                    Producto = s.Product.NombreProducto
                })
                .ToList();

            return Json(stocks);
        }



        [HttpPost]
        public IActionResult RegistrarVenta([FromBody] VentaRequestModel data)
        {
            if (!ModelState.IsValid || data.Detalles.Count == 0)
                return BadRequest("Datos inválidos o sin detalles");

            var venta = new SalesModel
            {
                FechaIngreso = data.FechaIngreso,

                NumeroFactura = _context.Sales.Any() ? _context.Sales.Max(v => v.NumeroFactura) + 1 : 1,
                ClientesModelId = data.ClienteId,
                PaymentMehodModelId = data.MetodoPagoId
            };

            _context.Sales.Add(venta);
            _context.SaveChanges();

            foreach (var detalle in data.Detalles)
            {
                var detalleVenta = new DetailsSalesModel
                {
                    SalesModelId = venta.Id,
                    ProductModelId = detalle.ProductoId,
                    StockModelId = detalle.StockId,
                    Cantidad = detalle.Cantidad,
                    Valor = detalle.Valor
                };

                _context.DetailsSales.Add(detalleVenta);

                var stock = _context.Stocks.Find(detalle.StockId);
                if (stock != null)
                {
                    stock.Cantidad -= detalle.Cantidad;
                }
            }

            _context.SaveChanges();

            return Ok(new { message = "Venta registrada correctamente" });
        }

        public class VentaRequestModel
        {
            public int ClienteId { get; set; }
            public int MetodoPagoId { get; set; }
            public DateOnly FechaIngreso { get; set; }
            public int NumeroFactura { get; set; }
            public List<DetalleVentaDTO> Detalles { get; set; } = new();
        }

        public class DetalleVentaDTO
        {
            public int ProductoId { get; set; }
            public int StockId { get; set; }
            public int Cantidad { get; set; }
            public float Valor { get; set; }
        }
    }
}
