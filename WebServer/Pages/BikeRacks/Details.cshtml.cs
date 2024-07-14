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
    public class DetailsModel : PageModel
    {
        private readonly WebServer.Data.WebServerContext _context;

        public DetailsModel(WebServer.Data.WebServerContext context)
        {
            _context = context;
        }

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
    }
}
