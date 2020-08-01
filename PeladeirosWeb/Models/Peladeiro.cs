using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeladeirosWeb.Models
{
    public class Peladeiro
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string Nome { get; set; }

        [MaxLength(14)]
        [Required]
        public string CPF { get; set; }

        [MaxLength(14)]
        public string Telefone { get; set; }

        [MaxLengthAttribute(15)]
        public string Celular { get; set; }

        public DateTimeOffset DatCadastro { get; set; }
        public DateTimeOffset DatInativo { get; set; }

        [MaxLength(50)]
        public string Endereço { get; set; }

        [MaxLength(10)]
        public string Numero { get; set; }

        public int CidadeId { get; set; }
        public virtual Cidade Cidade { get; set; }

        public byte[] Foto { get; set; }

        [Required]
        public DateTimeOffset DatNascimento { get; set; }
        
        [MaxLength(100)]
        public string Email { get; set; }
        
        [MaxLength(1000)]
        public string Observacao { get; set; }

        public virtual List<Mensalidade> Mensalidades { get; set; }
    }
}
