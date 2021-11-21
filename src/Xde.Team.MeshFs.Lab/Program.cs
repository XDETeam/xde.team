using Microsoft.AspNetCore.Builder;
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
