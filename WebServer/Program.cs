using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebServer.Data;
namespace WebServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<WebServerContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("WebServerContext") ?? throw new InvalidOperationException("Connection string 'WebServerContext' not found.")));

            // Add services to the container.
            builder.Services.AddRazorPages();
            builder.Services.AddDbContext<WebServer.Data.WebServerContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("RazorPagesMovieContext") ?? 
            throw new InvalidOperationException("Connection string 'RazorPagesMovieContext' not found.")));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapRazorPages();

            app.Run();
        }

        public class MapController : Controller
        {
            private readonly WebServerContext _dbContext;

            public MapController(WebServerContext dbContext)
            {
                _dbContext = dbContext;
            }

            public IActionResult Index()
            {
                var BikeRack = _dbContext.BikeRack.ToList();
                return View(BikeRack);
            }
        }
    }
}