using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeladeirosWeb.Data;
using PeladeirosWeb.Models;

namespace PeladeirosWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValorController : ControllerBase
    {
        private readonly PeladeirosContext _context;

        public ValorController(PeladeirosContext context)
        {
            _context = context;
        }

        // GET: api/Valors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Valor>>> GetValor()
        {
            return await _context.Valor.ToListAsync();
        }

        // GET: /api/Valors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Valor>> GetValor(int id)
        {
            var valor = await _context.Valor.FindAsync(id);

            if (valor == null)
            {
                return NotFound("");
            }

            return valor;
        }

        // PUT: api/Valors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutValor(int id, Valor valor)
        {
            if (id != valor.Id)
            {
                return BadRequest("Registro não encontrado");
            }

            _context.Entry(valor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ValorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Valor atualizado com sucesso");
        }

        // POST: api/Valors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Valor>> PostValor(Valor valor)
        {
            _context.Valor.Add(valor);
            await _context.SaveChangesAsync();

            return Ok("Valor incluído com sucesso");
        }

        // DELETE: api/Valors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Valor>> DeleteValor(int id)
        {
            var valor = await _context.Valor.FindAsync(id);
            if (valor == null)
            {
                return NotFound();
            }

            _context.Valor.Remove(valor);
            await _context.SaveChangesAsync();

            return valor;
        }

        private bool ValorExists(int id)
        {
            return _context.Valor.Any(e => e.Id == id);
        }
    }
}
