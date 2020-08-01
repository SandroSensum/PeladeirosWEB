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
    public class PeladeiroController : ControllerBase
    {
        private readonly PeladeirosContext _context;

        public PeladeiroController(PeladeirosContext context)
        {
            _context = context;
        }

        // GET: api/Peladeiroe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Peladeiro>>> GetPeladeiro()
        {
            return await _context.Peladeiro.ToListAsync();
        }

        // GET: api/Peladeiroe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Peladeiro>> GetPeladeiro(int id)
        {
            var peladeiro = await _context.Peladeiro.FindAsync(id);

            if (peladeiro == null)
            {
                return NotFound();
            }

            return peladeiro;
        }

        // PUT: api/Peladeiroe/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPeladeiro(int id, Peladeiro peladeiro)
        {
            if (id != peladeiro.Id)
            {
                return BadRequest();
            }

            _context.Entry(peladeiro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeladeiroExists(id))
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

        // POST: api/Peladeiroe
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Peladeiro>> PostPeladeiro(Peladeiro peladeiro)
        {
            try
            {
                var erros = Validar(peladeiro);

                if (erros.Count == 0)
                {
                    peladeiro.DatCadastro = DateTime.Now;

                    _context.Peladeiro.Add(peladeiro);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetPeladeiro", new { id = peladeiro.Id }, peladeiro);
                }
                else
                    return BadRequest(erros);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Peladeiroe/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Peladeiro>> DeletePeladeiro(int id)
        {
            var peladeiro = await _context.Peladeiro.FindAsync(id);
            if (peladeiro == null)
            {
                return NotFound();
            }

            _context.Peladeiro.Remove(peladeiro);
            await _context.SaveChangesAsync();

            return peladeiro;
        }

        private bool PeladeiroExists(int id)
        {
            return _context.Peladeiro.Any(e => e.Id == id);
        }

        private List<Erro> Validar(Peladeiro peladeiro)
        {
            List<Erro> erros = new List<Erro>();
            if (_context.Peladeiro.Where(p => p.CPF == peladeiro.CPF).Count() > 0)
                erros.Add(new Erro
                {
                    Codigo = 400,
                    Mensagem = "CPF já cadastrado"
                });

            if(_context.Peladeiro.Where(p => p.Email == peladeiro.Email).Count() > 0)
                erros.Add(new Erro
                {
                    Codigo = 400,
                    Mensagem = "Email já cadastrado"
                });

            return erros;
        }

    }
}
