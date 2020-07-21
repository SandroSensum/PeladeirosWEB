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
    public class MensalidadeController : ControllerBase
    {
        private readonly PeladeirosContext _context;

        public MensalidadeController(PeladeirosContext context)
        {
            _context = context;
        }

        // GET: api/Mensalidade
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mensalidade>>> GetMensalidade()
        {
            return await _context.Mensalidade.ToListAsync();
        }

        // GET: api/Mensalidade/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mensalidade>> GetMensalidade(int id)
        {
            var mensalidade = await _context.Mensalidade.FindAsync(id);

            if (mensalidade == null)
            {
                return NotFound();
            }

            return mensalidade;
        }

        // PUT: api/Mensalidade/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMensalidade(int id, Mensalidade mensalidade)
        {
            if (id != mensalidade.Id)
            {
                return BadRequest();
            }

            _context.Entry(mensalidade).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MensalidadeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Mensalidade
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Mensalidade>> PostMensalidade(Mensalidade mensalidade)
        {
            _context.Mensalidade.Add(mensalidade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMensalidade", new { id = mensalidade.Id }, mensalidade);
        }

        // DELETE: api/Mensalidade/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Mensalidade>> DeleteMensalidade(int id)
        {
            var mensalidade = await _context.Mensalidade.FindAsync(id);
            if (mensalidade == null)
            {
                return NotFound();
            }

            _context.Mensalidade.Remove(mensalidade);
            await _context.SaveChangesAsync();

            return mensalidade;
        }

        private bool MensalidadeExists(int id)
        {
            return _context.Mensalidade.Any(e => e.Id == id);
        }
    }
}
