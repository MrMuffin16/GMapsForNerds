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
    public class IndexModel : PageModel
    {
        private readonly WebServer.Data.WebServerContext _context;

        public IndexModel(WebServer.Data.WebServerContext context)
        {
            _context = context;
        }

        public IList<BikeRack> BikeRack { get;set; } = default!;

        public async Task OnGetAsync()
        {
            BikeRack = await _context.BikeRack.ToListAsync();
        }
    }
}
