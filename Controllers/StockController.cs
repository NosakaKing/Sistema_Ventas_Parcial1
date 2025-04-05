using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_Ventas.Data;
using Sistema_Ventas.Models;

namespace Sistema_Ventas.Controllers
{
    [Authorize(Roles = "Admin")]
    public class StockController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StockController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            var lista = _context.Stocks
                .Include(s => s.Product)
                .ToList();

            return Json(lista);
        }

        [HttpPost]
        public IActionResult Add([FromBody] StockModel stock)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Stocks.Add(stock);
            _context.SaveChanges();
            return Ok(new { message = "Stock agregado correctamente." });
        }

        [HttpPut]
        public IActionResult Edit([FromBody] StockModel stock)
        {
            var existente = _context.Stocks.Find(stock.Id);
            if (existente == null)
                return NotFound();

            existente.Cantidad = stock.Cantidad;
            existente.FechaFabricacion = stock.FechaFabricacion;
            existente.FechaVencimiento = stock.FechaVencimiento;
            existente.FechaIngreso = stock.FechaIngreso;
            existente.PrecioUnitario = stock.PrecioUnitario;
            existente.PrecioVenta = stock.PrecioVenta;
            existente.ProductId = stock.ProductId;

            _context.SaveChanges();
            return Ok(new { message = "Stock actualizado correctamente." });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var stock = _context.Stocks.Find(id);
            if (stock == null)
                return NotFound();

            _context.Stocks.Remove(stock);
            _context.SaveChanges();
            return Ok(new { message = "Stock eliminado correctamente." });
        }

        [HttpGet]
        public IActionResult ListarProductos()
        {
            var productos = _context.Products
                .Select(p => new { p.Id, p.NombreProducto })
                .ToList();

            return Json(productos);
        }
    }
}
