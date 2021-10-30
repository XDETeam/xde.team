using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Xde.Lab.MeshFs;

public record MeshFsOptions
{
    public const string Section = "MeshFs";
    public const string DefaultWebDavRoute = "/webdav";

    public string WebDavRoute { get; set; } = DefaultWebDavRoute;

    internal class Setup
        : IConfigureOptions<MeshFsOptions>
    {
        private readonly IConfigurationSection _options;

        public Setup(IConfiguration config)
        {
            _options = config.GetSection(Section);
        }

        void IConfigureOptions<MeshFsOptions>.Configure(MeshFsOptions options)
        {
            _options?.Bind(options);
        }
    }
}
