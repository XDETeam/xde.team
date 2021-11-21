using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Xde.Lab.MeshFs;

var builder = WebApplication
    .CreateBuilder()
;

builder
    .Configuration
    .AddUserSecrets(typeof(Program).Assembly)
;

builder
    .Services
    .AddDbContext<MeshContext>()
    .AddMesh()
;

var host = builder
    .Build()
;

host
    .UseMesh()
;

host.Run();
