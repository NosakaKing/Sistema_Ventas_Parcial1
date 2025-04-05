using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sistema_Ventas.Data;
using Sistema_Ventas.Models;

namespace Sistema_Ventas.Controllers
{
    public class ClientController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ClientController(ApplicationDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin, Vendedor")]
        public IActionResult Index()
        {
            return View();
        }


        // GET: Listar clientes
        public List<ClientModel> Listar()
        {
            return _context.Clients.ToList();
        }

        [HttpPost]
        public IActionResult Add([FromBody] ClientModel client)
        {
            if (ModelState.IsValid)
            {
                _context.Clients.Add(client);
                _context.SaveChanges();
                return Ok(new { message = "Cliente agregado correctamente" });
            }

            return BadRequest(ModelState);
        }


        // PUT: Editar cliente
        [HttpPut]
        public IActionResult Edit([FromBody] ClientModel client)
        {
            var clienteExistente = _context.Clients.Find(client.Id);
            if (clienteExistente == null)
                return NotFound();

            clienteExistente.Nombres = client.Nombres;
            clienteExistente.Apellidos = client.Apellidos;
            clienteExistente.Direccion = client.Direccion;
            clienteExistente.Telefono = client.Telefono;
            clienteExistente.CorreoElectronico = client.CorreoElectronico;

            _context.SaveChanges();
            return Ok(new { message = "Cliente actualizado correctamente" });
        }

        // DELETE: Eliminar cliente
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var cliente = _context.Clients.Find(id);
            if (cliente == null)
                return NotFound();

            _context.Clients.Remove(cliente);
            _context.SaveChanges();
            return Ok(new { message = "Cliente eliminado correctamente" });
        }
    }
}


