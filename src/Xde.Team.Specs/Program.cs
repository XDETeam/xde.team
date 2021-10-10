// TODO:Fill application properties (AssemblyVersion, AssemblyFileVersion,
// AssemblyInformationalVersion, Copyright, Description, etc). Share some
// of the between assemblies using some Xde.Meta package or Xde.Specs (if
// simply shared file is linked).
// TODO:Choose versioning model
using Microsoft.Extensions.Configuration;
using static System.Console;

var appName = typeof(Xde.Team.Specs.NamespaceDoc).Assembly.GetName();
WriteLine($"Team Server {appName.Version}");

var builder = new ConfigurationBuilder();
builder.AddCommandLine(args);
var config = builder.Build();

WriteLine(config);
config
    .AsEnumerable()
    .ToList()
    .ForEach(setting => WriteLine($"{setting.Key} = {setting.Value}"))
;
