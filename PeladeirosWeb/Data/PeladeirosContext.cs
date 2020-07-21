using Microsoft.EntityFrameworkCore;
using PeladeirosWeb.Models;
using System.ComponentModel;

namespace PeladeirosWeb.Data
{
    public class PeladeirosContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseFirebird(@"database=localhost:D:\PROJETOC#\2020\PELADEIROS.FDB;user=sysdba;password=masterkey")
                .UseLazyLoadingProxies();
        }
        
        public DbSet<Mensalidade> Mensalidade { get; set; }

        public DbSet<Peladeiro> Peladeiro { get; set; }

        public DbSet<Usuario> Usuario { get; set; }

        public DbSet<Valor> Valor { get; set; }

        public DbSet<Cidade> Cidade { get; set; }
    }
}