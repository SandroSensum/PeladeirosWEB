using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeladeirosWeb.Models
{
    public class Cidade
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string CidadeNome { get; set; }

        [MaxLength(2)]
        [Required]
        public string UF { get; set; }
    }
}
