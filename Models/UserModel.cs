using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Sistema_Ventas.Models
{
    public class UserModel : IdentityUser
    {
        [Required]
        public string Cedula { get; set; }
    }
}
