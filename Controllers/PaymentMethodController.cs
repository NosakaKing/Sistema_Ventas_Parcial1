using Microsoft.AspNetCore.Mvc;
using Sistema_Ventas.Data;
using System.Linq;

namespace Sistema_Ventas.Controllers
{
    public class PaymentMethodController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PaymentMethodController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        // GET: Listar métodos de pago
        public IActionResult Listar()
        {
            var metodos = _context.PaymentMehods
                .Select(m => new { m.Id, m.Nombre })
                .ToList();

            return Json(metodos);
        }
    }
}
