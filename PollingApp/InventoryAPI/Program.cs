
using Data;
using Data.Concrete;
using Data.Contract;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Concrete;
using Services.Concrete.PollingApp.Services;
using Services.Contract;
using Services.Contract.PollingApp.Interfaces;
using Services.Mapper.ItemService;
using System.Reflection;
using System.Text;





using Serilog;


var builder = WebApplication.CreateBuilder(args);


builder.Host.UseSerilog((context, services, configuration) =>
    configuration.WriteTo.Console()
);


Log.Logger = new LoggerConfiguration()
    .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// 1. Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// 2. Configure JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrEmpty(jwtKey))
{
    throw new Exception("JWT Key not found in configuration");
}
var key = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});








builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(MappingProfile));

// Register Services and Repositories
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IPollRepository, PollRepository>();

builder.Services.AddScoped<IPollService, PollService>();

builder.Services.AddScoped<IVoteService, VoteService>();
builder.Services.AddScoped<IVoteRepository, VoteRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});



// 3. Build and configure middleware
var app = builder.Build();


app.MapGet("/", () => "Hello World");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseCors("AllowAngular");

app.UseHttpsRedirection();
app.UseAuthentication(); // 🔐 JWT authentication
app.UseAuthorization();

app.MapControllers();

app.Run();
