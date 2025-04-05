using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sistema_Ventas.Data;
using Sistema_Ventas.Models;

namespace Sistema_Ventas.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin, Vendedor")]
        public IActionResult Index()
        {
            return View();
        }

        // GET: Listar categorías
        public List<CategoryModel> Listar()
        {
            return _context.Categorias.ToList();
        }

        // POST: Agregar nueva categoría
        [HttpPost]
        public IActionResult Add([FromBody] CategoryModel categoria)
        {
            if (ModelState.IsValid)
            {
                _context.Categorias.Add(categoria);
                _context.SaveChanges();
                return Ok(new { message = "Categoría agregada correctamente" });
            }

            return BadRequest(ModelState);
        }

        // PUT: Editar categoría
        [HttpPut]
        public IActionResult Edit([FromBody] CategoryModel categoria)
        {
            var existente = _context.Categorias.Find(categoria.Id);
            if (existente == null)
                return NotFound();

            existente.Nombre = categoria.Nombre;
            existente.Descripcion = categoria.Descripcion;

            _context.SaveChanges();
            return Ok(new { message = "Categoría actualizada correctamente" });
        }

        // DELETE: Eliminar categoría
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var categoria = _context.Categorias.Find(id);
            if (categoria == null)
                return NotFound();

            _context.Categorias.Remove(categoria);
            _context.SaveChanges();
            return Ok(new { message = "Categoría eliminada correctamente" });
        }
    }
}
