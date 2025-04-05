using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_Ventas.Data;
using Sistema_Ventas.Models;

namespace Sistema_Ventas.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Index()
        {
            return View();
        }

        // GET: Listar productos con su categoría
        public IActionResult Listar()
        {
            var productos = _context.Products
                .Include(p => p.Categoria)
                .Select(p => new
                {
                    p.Id,
                    p.NombreProducto,
                    p.Presentacion,
                    p.CodigoBarras,
                    Categoria = p.Categoria != null ? p.Categoria.Nombre : ""
                })
                .ToList();

            return Json(productos);
        }

        // Listar sin categoría
        public List<ProductModel> ListarSinCategoria()
        {
            return _context.Products.ToList();
        }

        [HttpPost]
        public IActionResult Add([FromBody] ProductModel producto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { errors });
            }

            _context.Products.Add(producto);
            _context.SaveChanges();
            return Ok(new { message = "Producto agregado correctamente" });
        }


        [HttpPut]
        public IActionResult Edit([FromBody] ProductModel producto)
        {
            var existente = _context.Products.Find(producto.Id);
            if (existente == null)
                return NotFound();

            existente.NombreProducto = producto.NombreProducto;
            existente.Presentacion = producto.Presentacion;
            existente.CodigoBarras = producto.CodigoBarras;
            existente.CategoriaId = producto.CategoriaId;

            _context.SaveChanges();
            return Ok(new { message = "Producto actualizado correctamente" });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var producto = _context.Products.Find(id);
            if (producto == null)
                return NotFound();

            _context.Products.Remove(producto);
            _context.SaveChanges();
            return Ok(new { message = "Producto eliminado correctamente" });
        }

        // Listar categorías para llenar el select
        [HttpGet]
        public IActionResult ListarCategorias()
        {
            var categorias = _context.Categorias
                .Select(c => new { c.Id, c.Nombre })
                .ToList();

            return Json(categorias);
        }

        //Select de Productos
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
