// TODO:Fill application properties (AssemblyVersion, AssemblyFileVersion,
// AssemblyInformationalVersion, Copyright, Description, etc). Share some
// of the between assemblies using some Xde.Meta package or Xde.Specs (if
// simply shared file is linked).
// TODO:Choose versioning model
var appName = typeof(Xde.Team.Specs.NamespaceDoc).Assembly.GetName();

Console.WriteLine($"Team Server {appName.Version}");
