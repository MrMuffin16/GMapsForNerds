using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebServer.Data;
using WebServer.Models;

namespace WebServer.Pages.BikeRacks
{
    public class EditModel : PageModel
    {
        private readonly WebServer.Data.WebServerContext _context;

        public EditModel(WebServer.Data.WebServerContext context)
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

            var bikerack =  await _context.BikeRack.FirstOrDefaultAsync(m => m.Id == id);
            if (bikerack == null)
            {
                return NotFound();
            }
            BikeRack = bikerack;
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(BikeRack).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BikeRackExists(BikeRack.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool BikeRackExists(double id)
        {
            return _context.BikeRack.Any(e => e.Id == id);
        }
    }
}
