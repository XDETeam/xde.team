using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Xde.Lab.MeshFs;

public class MeshContext : DbContext
{
    private readonly IOptions<MeshFsOptions> _options;

    public DbSet<Flow> Flow { get; set; }

    public string DbPath { get; }

    public MeshContext(IOptions<MeshFsOptions> options)
    {
        _options = options;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        if (_options?.Value?.Postgres == null)
        {
            //TODO:Exception type
            throw new ApplicationException(
                $@"Missing Postgres connection string.
                Ideally use `dotnet user-secrets list ""MeshFs:{nameof(MeshFsOptions.Postgres)}"" ""<connection_string>""`"
            );
        }

        options.UseNpgsql(_options.Value.Postgres);
    }

    protected override void OnModelCreating(ModelBuilder model)
    {
        base.OnModelCreating(model);

        model.Entity<Flow>(entity =>
        {
            entity.ToTable("flow", "mess");

            entity.HasKey(entity => entity.Id);

            entity.Property(entity => entity.Id).HasColumnName("id");
            entity.Property(entity => entity.Topic).HasColumnName("topic");
            entity.Property(entity => entity.Created).HasColumnName("created");
            entity.Property(entity => entity.Tags).HasColumnName("tags");
            entity.Property(entity => entity.Value).HasColumnName("value");
        });
    }
}
