using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.Sqlite;
using System.Configuration;

namespace WebServer.Pages
{
    public class DatabaseModel : PageModel
    {
        public void OnGet()
        {
            using (var connection = new SqliteConnection("Data Source=map_data.db"))
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = @"SELECT * FROM bike_rack_location";

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var name = reader.GetString(0);

                        Console.WriteLine($"Hello, {name}!");
                    }
                }
            }
        }
    }
}
