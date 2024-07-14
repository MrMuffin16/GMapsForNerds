using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WebServer.Data;
using WebServer.Models;

namespace WebServer.Pages.BikeRacks
{
    public class DeleteModel : PageModel
    {
        private readonly WebServer.Data.WebServerContext _context;

        public DeleteModel(WebServer.Data.WebServerContext context)
        {
            _context = context;
        }

        [BindProperty]
        public BikeRack BikeRack { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(double? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bikerack = await _context.BikeRack.FirstOrDefaultAsync(m => m.Id == id);

            if (bikerack == null)
            {
                return NotFound();
            }
            else
            {
                BikeRack = bikerack;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(double? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bikerack = await _context.BikeRack.FindAsync(id);
            if (bikerack != null)
            {
                BikeRack = bikerack;
                _context.BikeRack.Remove(BikeRack);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
