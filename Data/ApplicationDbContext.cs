using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Sistema_Ventas.Models;

namespace Sistema_Ventas.Data;

public class ApplicationDbContext : IdentityDbContext<UserModel>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<ClientModel> Clients { get; set; }
    public DbSet<SalesModel> Sales { get; set; }
    public DbSet<DetailsSalesModel> DetailsSales { get; set; }
    public DbSet<PaymentMehodModel> PaymentMehods { get; set; }
    public DbSet<ProductModel> Products { get; set; }
    public DbSet<StockModel> Stocks { get; set; }
    public DbSet<CategoryModel> Categorias { get; set; }

}
