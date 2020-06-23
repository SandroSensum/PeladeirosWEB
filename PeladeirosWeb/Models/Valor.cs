using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeladeirosWeb.Models
{
    public class Valor
    {
        [Key]
        public int Id { get; set; }

        public double Val { get; set; }

        [Required]
        public int Mes { get; set; }

        [Required]
        public int Ano { get; set; }
    }
}
