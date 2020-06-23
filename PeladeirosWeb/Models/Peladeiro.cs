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

        [MaxLength(30)]
        [Required]
        public string Nome { get; set; }

        [MaxLength(14)]
        [Required]
        public string CPF { get; set; }

        [MaxLength(9)]
        public string Telefone { get; set; }

        [MaxLengthAttribute(10)]
        public string Celular { get; set; }

        public DateTime DatCadastro { get; set; }
        public DateTime DatInativo { get; set; }

        [MaxLength(50)]
        public string Endereço { get; set; }

        [MaxLength(10)]
        public string Numero { get; set; }

        public int CidadeId { get; set; }
        public Cidade Cidade { get; set; }

        public byte[] Foto { get; set; }

        [Required]
        public DateTime DatNascimento { get; set; }
        
        [MaxLength(30)]
        public string Email { get; set; }
        
        [MaxLength(1000)]
        public string Observacao { get; set; }

        public List<Mensalidade> Mensalidades { get; set; }
    }
}
