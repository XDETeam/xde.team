using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Xde.Lab.MeshFs;

var builder = WebApplication.CreateBuilder();

builder
    .Services
    .AddHostedService<MeshFsProvider>()
;

var host = builder
    .Build()
;

host.Run();
