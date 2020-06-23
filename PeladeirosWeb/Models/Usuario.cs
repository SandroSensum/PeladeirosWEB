using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PeladeirosWeb.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(30)]
        [Required]
        
        public string Nome { get; set; }

        [MaxLength(8)]
        [Required]
        public string Senha { get; set; }
        public DateTime DatCadastro { get; set; }
        public DateTime DatInativo { get; set; }
    }        
}
