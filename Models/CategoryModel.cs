using System.ComponentModel.DataAnnotations;

namespace Sistema_Ventas.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }

        // Opcional
        public string? Descripcion { get; set; }
    }
}
