using System.Text;
using api.Authentication.Models;
using api.Authentication.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace api.Authentication.DependencyInjection;
public static class AuthenticationServiceExtensions
{
    public static IServiceCollection AddTokenService(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<JwtSettings>(config.GetSection(nameof(JwtSettings)));

        var key = Encoding.ASCII.GetBytes(config.GetSection(nameof(JwtSettings)).Get<JwtSettings>()?.Secret ?? string.Empty);

        var issuer = config.GetSection(nameof(JwtSettings)).Get<JwtSettings>()?.Issuer ?? string.Empty;
        services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidIssuer = issuer,
                    ValidAudience = null,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("admin", policy => policy.RequireRole("admin"));
            options.AddPolicy("manager", policy => policy.RequireRole("manager"));
            options.AddPolicy("patient", policy => policy.RequireRole("patient"));
        });

        services.AddSingleton<ITokenService, TokenService>();
        return services;
    }
}