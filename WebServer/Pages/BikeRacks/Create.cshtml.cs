using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebServer.Data;
using WebServer.Models;

namespace WebServer.Pages.BikeRacks
{
    public class CreateModel : PageModel
    {
        private readonly WebServer.Data.WebServerContext _context;

        public CreateModel(WebServer.Data.WebServerContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public BikeRack BikeRack { get; set; } = default!;

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.BikeRack.Add(BikeRack);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
