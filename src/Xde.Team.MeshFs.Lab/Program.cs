using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Xde.Lab.MeshFs;

var builder = WebApplication.CreateBuilder();

builder
    .Services
    .AddMesh()
;

var host = builder
    .Build()
;

host
    .UseMesh()
;

host.Run();
