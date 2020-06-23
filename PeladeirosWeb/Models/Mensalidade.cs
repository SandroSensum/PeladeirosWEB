using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeladeirosWeb.Models
{
    public class Mensalidade
    {
        [Key]
        public int Id { get; set; }

        //Essa parte define a chave estrangeira para a tabela Peladeiros
        public int PeladeiroId { get; set; }
        public Peladeiro Peladeiro { get; set; }

        //Essa parte define a chave estrangeira para a tabela Valor
        public int ValorId { get; set; }
        public Valor Valor { get; set; }

        public DateTime DatPgto { get; set; }

        [MaxLength(1000)]
        public string Obs { get; set; }
    }
}
